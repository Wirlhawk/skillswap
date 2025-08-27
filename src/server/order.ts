"use server"
import { db } from "@/db/drizzle";
import { user } from "@/db/schema/auth";
import { order, orderMessage, orderAttachment, orderTimeline } from "@/db/schema/order";
import { service } from "@/db/schema/service";
import { auth } from "@/lib/auth";
import {
    OrderFilters,
    OrderStats,
    OrderWithDetails,
    UpdateOrderRequest,
    OrderStatus,
    MessageType
} from "@/types/order";
import { and, desc, eq, or, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { review } from "@/db/schema/review";

// Generate unique order number
function generateOrderNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${new Date().getFullYear()}-${String(timestamp).slice(-6)}-${String(random).padStart(3, '0')}`;
}

// Create a new order
export async function createOrder({
    sellerId,
    serviceId,
    requirements,
    additionalNotes,
    totalPrice,
}: {
    sellerId: string;
    serviceId: string;
    requirements: string;
    additionalNotes?: string;
    totalPrice: number;
}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            throw new Error("User not authenticated");
        }

        const orderNumber = generateOrderNumber();

        const [newOrder] = await db.insert(order).values({
            orderNumber,
            clientId: session.user.id,
            sellerId: sellerId,
            serviceId: serviceId,
            requirements: requirements,
            additionalNotes: additionalNotes,
            totalPrice: totalPrice,
            status: "Pending",

        }).returning();

        return { success: true, order: newOrder };
    } catch (error) {
        console.error("Error creating order:", error);
        return { success: false, error: "Failed to create order" };
    }
}

// Get order by ID with full details
export async function getOrderById(orderId: string): Promise<OrderWithDetails | null> {
    try {
        // First get the order with service and client info
        const [orderData] = await db
            .select({
                id: order.id,
                orderNumber: order.orderNumber,
                clientId: order.clientId,
                sellerId: order.sellerId,
                serviceId: order.serviceId,
                requirements: order.requirements,
                additionalNotes: order.additionalNotes,
                totalPrice: order.totalPrice,
                status: order.status,
                deliveryDate: order.deliveryDate,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                service: {
                    id: service.id,
                    title: service.title,
                    description: service.description,
                    price: service.price,
                    deliveryTime: service.deliveryTime,
                    revisions: service.revisions,
                },
                client: {
                    id: user.id,
                    name: user.name,
                    username: user.username || "",
                    image: user.image,
                },
            })
            .from(order)
            .innerJoin(service, eq(order.serviceId, service.id))
            .innerJoin(user, eq(order.clientId, user.id))
            .where(eq(order.id, orderId));

        if (!orderData) return null;

        // Get seller info separately
        const [sellerData] = await db
            .select({
                id: user.id,
                name: user.name,
                username: user.username || "",
                image: user.image,
            })
            .from(user)
            .where(eq(user.id, orderData.sellerId));

        if (!sellerData) return null;

        // Fetch messages
        const messages = await db
            .select()
            .from(orderMessage)
            .where(eq(orderMessage.orderId, orderId));

        // Fetch attachments
        const attachments = await db
            .select()
            .from(orderAttachment)
            .where(eq(orderAttachment.orderId, orderId));

        // Fetch milestones
        const milestones = await db
            .select()
            .from(orderTimeline)
            .where(eq(orderTimeline.orderId, orderId));

        // Check if order has been reviewed
        const [reviewData] = await db
            .select({ id: review.id })
            .from(review)
            .where(eq(review.orderId, orderId))
            .limit(1);

        const hasReviewed = !!reviewData;

        // Calculate progress (example: percent of completed milestones)
        let progress = 0;
        if (milestones.length > 0) {
            const completed = milestones.filter(m => m.status === "completed").length;
            progress = Math.round((completed / milestones.length) * 100);
        }

        return {
            ...orderData,
            seller: sellerData,
            messages,
            attachments,
            milestones,
            progress,
            hasReviewed,
        };
    } catch (error) {
        console.error("Error getting order:", error);
        return null;
    }
}

// Get orders with filters
export async function getOrders(filters: OrderFilters = {}, limit = 20, offset = 0) {
    try {
        let whereConditions = [];

        if (filters.status) {
            whereConditions.push(eq(order.status, filters.status));
        }
        if (filters.clientId) {
            whereConditions.push(eq(order.clientId, filters.clientId));
        }
        if (filters.sellerId) {
            whereConditions.push(eq(order.sellerId, filters.sellerId));
        }
        if (filters.serviceId) {
            whereConditions.push(eq(order.serviceId, filters.serviceId));
        }
        if (filters.dateFrom) {
            whereConditions.push(sql`${order.createdAt} >= ${filters.dateFrom}`);
        }
        if (filters.dateTo) {
            whereConditions.push(sql`${order.createdAt} <= ${filters.dateTo}`);
        }

        const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

        const orders = await db
            .select({
                id: order.id,
                orderNumber: order.orderNumber,
                clientId: order.clientId,
                sellerId: order.sellerId,
                serviceId: order.serviceId,
                requirements: order.requirements,
                status: order.status,
                totalPrice: order.totalPrice,
                deliveryDate: order.deliveryDate,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                service: {
                    title: service.title,
                    price: service.price,
                },
                client: {
                    name: user.name,
                    username: user.username || "",
                },
                seller: {
                    name: user.name,
                    username: user.username || "",
                },
            })
            .from(order)
            .innerJoin(service, eq(order.serviceId, service.id))
            .innerJoin(user, eq(order.clientId, user.id))
            .where(whereClause)
            .orderBy(desc(order.createdAt))
            .limit(limit)
            .offset(offset);

        return { success: true, orders };
    } catch (error) {
        console.error("Error getting orders:", error);
        return { success: false, error: "Failed to get orders" };
    }
}

// Update order
export async function updateOrder(orderId: string, updateData: UpdateOrderRequest, userId: string) {
    try {
        const [updatedOrder] = await db
            .update(order)
            .set({
                ...updateData,
                updatedAt: new Date(),
            })
            .where(eq(order.id, orderId))
            .returning();

        if (!updatedOrder) {
            return { success: false, error: "Order not found" };
        }

        return { success: true, order: updatedOrder };
    } catch (error) {
        console.error("Error updating order:", error);
        return { success: false, error: "Failed to update order" };
    }
}

// Get order statistics
export async function getOrderStats(userId?: string): Promise<OrderStats> {
    try {
        let whereConditions = [];

        if (userId) {
            whereConditions.push(
                sql`(${order.clientId} = ${userId} OR ${order.sellerId} = ${userId})`
            );
        }

        const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

        const [stats] = await db
            .select({
                totalOrders: sql<number>`count(*)`,
                pendingOrders: sql<number>`count(*) filter (where ${order.status} = 'Pending')`,
                inProgressOrders: sql<number>`count(*) filter (where ${order.status} = 'In Progress')`,
                completedOrders: sql<number>`count(*) filter (where ${order.status} = 'Done')`,
                cancelledOrders: sql<number>`count(*) filter (where ${order.status} = 'Cancelled')`,
                totalRevenue: sql<number>`coalesce(sum(${order.totalPrice}), 0)`,
                averageOrderValue: sql<number>`coalesce(avg(${order.totalPrice}), 0)`,
            })
            .from(order)
            .where(whereClause);

        return {
            totalOrders: Number(stats.totalOrders) || 0,
            pendingOrders: Number(stats.pendingOrders) || 0,
            inProgressOrders: Number(stats.inProgressOrders) || 0,
            completedOrders: Number(stats.completedOrders) || 0,
            cancelledOrders: Number(stats.cancelledOrders) || 0,
            totalRevenue: Number(stats.totalRevenue) || 0,
            averageOrderValue: Number(stats.averageOrderValue) || 0,
        };
    } catch (error) {
        console.error("Error getting order stats:", error);
        return {
            totalOrders: 0,
            pendingOrders: 0,
            inProgressOrders: 0,
            completedOrders: 0,
            cancelledOrders: 0,
            totalRevenue: 0,
            averageOrderValue: 0,
        };
    }
}

// ===== ORDER ACTIONS =====

// Send a message in an order
export async function sendOrderMessage(
    orderId: string,
    message: string,
    messageType: MessageType = "text"
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Verify user has access to this order
        const [orderData] = await db
            .select()
            .from(order)
            .where(
                and(
                    eq(order.id, orderId),
                    or(
                        eq(order.clientId, session.user.id),
                        eq(order.sellerId, session.user.id)
                    )
                )
            );

        if (!orderData) {
            return { success: false, error: "Order not found or access denied" };
        }

        // Insert the message
        const [newMessage] = await db
            .insert(orderMessage)
            .values({
                orderId,
                senderId: session.user.id,
                message,
                messageType,
                isInternal: false,
            })
            .returning();

        revalidatePath(`/order/${orderId}`);

        return { success: true, message: newMessage };
    } catch (error) {
        console.error("Error sending message:", error);
        return { success: false, error: "Failed to send message" };
    }
}

// Update order status
export async function updateOrderStatus(
    orderId: string,
    status: OrderStatus
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Verify user has access to this order (either client or seller)
        const [orderData] = await db
            .select()
            .from(order)
            .where(
                and(
                    eq(order.id, orderId),
                    eq(order.clientId, session.user.id)
                )
            );

        if (!orderData) {
            // Check if user is the seller
            const [sellerOrder] = await db
                .select()
                .from(order)
                .where(
                    and(
                        eq(order.id, orderId),
                        eq(order.sellerId, session.user.id)
                    )
                );

            if (!sellerOrder) {
                return { success: false, error: "Order not found or access denied" };
            }
        }

        // Update the order status
        const [updatedOrder] = await db
            .update(order)
            .set({
                status,
                updatedAt: new Date(),
            })
            .where(eq(order.id, orderId))
            .returning();

        revalidatePath(`/order/${orderId}`);

        return { success: true, order: updatedOrder };
    } catch (error) {
        console.error("Error updating order status:", error);
        return { success: false, error: "Failed to update order status" };
    }
}

// Request revision
export async function requestRevision(orderId: string, revisionNotes?: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Verify user is the client
        const [orderData] = await db
            .select()
            .from(order)
            .where(
                and(
                    eq(order.id, orderId),
                    eq(order.clientId, session.user.id)
                )
            );

        if (!orderData) {
            return { success: false, error: "Order not found or access denied" };
        }

        // Add revision request as a message
        const revisionMessage = revisionNotes
            ? `Revision requested: ${revisionNotes}`
            : "Revision requested";

        await db
            .insert(orderMessage)
            .values({
                orderId,
                senderId: session.user.id,
                message: revisionMessage,
                messageType: "system",
                isInternal: false,
            });

        revalidatePath(`/order/${orderId}`);

        return { success: true };
    } catch (error) {
        console.error("Error requesting revision:", error);
        return { success: false, error: "Failed to request revision" };
    }
}

// Extend deadline
export async function extendDeadline(
    orderId: string,
    newDeliveryDate: Date,
    reason?: string
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Verify user has access to this order
        const [orderData] = await db
            .select()
            .from(order)
            .where(
                and(
                    eq(order.id, orderId),
                    eq(order.clientId, session.user.id)
                )
            );

        if (!orderData) {
            return { success: false, error: "Order not found or access denied" };
        }

        // Update delivery date
        const [updatedOrder] = await db
            .update(order)
            .set({
                deliveryDate: newDeliveryDate,
                updatedAt: new Date(),
            })
            .where(eq(order.id, orderId))
            .returning();

        // Add extension message
        const extensionMessage = reason
            ? `Deadline extended to ${newDeliveryDate.toLocaleDateString()}. Reason: ${reason}`
            : `Deadline extended to ${newDeliveryDate.toLocaleDateString()}`;

        await db
            .insert(orderMessage)
            .values({
                orderId,
                senderId: session.user.id,
                message: extensionMessage,
                messageType: "system",
                isInternal: false,
            });

        revalidatePath(`/order/${orderId}`);

        return { success: true, order: updatedOrder };
    } catch (error) {
        console.error("Error extending deadline:", error);
        return { success: false, error: "Failed to extend deadline" };
    }
}

// Cancel order
export async function cancelOrder(orderId: string, reason?: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Verify user has access to this order
        const [orderData] = await db
            .select()
            .from(order)
            .where(
                and(
                    eq(order.id, orderId),
                    eq(order.clientId, session.user.id)
                )
            );

        if (!orderData) {
            return { success: false, error: "Order not found or access denied" };
        }

        // Update order status to cancelled
        const [updatedOrder] = await db
            .update(order)
            .set({
                status: "Cancelled",
                updatedAt: new Date(),
            })
            .where(eq(order.id, orderId))
            .returning();

        // Add cancellation message
        const cancellationMessage = reason
            ? `Order cancelled. Reason: ${reason}`
            : "Order cancelled";

        await db
            .insert(orderMessage)
            .values({
                orderId,
                senderId: session.user.id,
                message: cancellationMessage,
                messageType: "system",
                isInternal: false,
            });

        revalidatePath(`/order/${orderId}`);

        return { success: true, order: updatedOrder };
    } catch (error) {
        console.error("Error cancelling order:", error);
        return { success: false, error: "Failed to cancel order" };
    }
}

// Approve and complete order
export async function approveAndCompleteOrder(orderId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Verify user is the client
        const [orderData] = await db
            .select()
            .from(order)
            .where(
                and(
                    eq(order.id, orderId),
                    eq(order.clientId, session.user.id)
                )
            );

        if (!orderData) {
            return { success: false, error: "Order not found or access denied" };
        }

        // Update order status to done
        const [updatedOrder] = await db
            .update(order)
            .set({
                status: "Done",
                updatedAt: new Date(),
            })
            .where(eq(order.id, orderId))
            .returning();

        // Add completion message
        await db
            .insert(orderMessage)
            .values({
                orderId,
                senderId: session.user.id,
                message: "Order approved and completed successfully!",
                messageType: "system",
                isInternal: false,
            });

        revalidatePath(`/order/${orderId}`);

        return { success: true, order: updatedOrder };
    } catch (error) {
        console.error("Error completing order:", error);
        return { success: false, error: "Failed to complete order" };
    }
}

// ===== ORDER DELIVERY ACTIONS =====

// Submit delivery with files and message
export async function submitDelivery(
    orderId: string,
    files: Array<{
        fileName: string;
        fileUrl: string;
        fileSize: number;
        fileType: string;
        description?: string;
        isPublic: boolean;
    }>,
    message: string,
    markAsComplete: boolean = false
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Verify user is the seller or client of this order
        const [orderData] = await db
            .select()
            .from(order)
            .where(
                and(
                    eq(order.id, orderId),
                    or(
                        eq(order.sellerId, session.user.id),
                        eq(order.clientId, session.user.id)
                    )
                )
            );

        if (!orderData) {
            return { success: false, error: "Order not found or access denied" };
        }

        // Insert attachments
        if (files.length > 0) {
            const attachmentsToInsert = files.map(file => ({
                orderId,
                fileName: file.fileName,
                fileUrl: file.fileUrl,
                fileSize: file.fileSize,
                fileType: file.fileType,
                description: file.description || null,
                isPublic: file.isPublic,
                uploadedBy: session.user.id,
            }));

            await db.insert(orderAttachment).values(attachmentsToInsert);
        }

        // Insert delivery message
        if (message.trim()) {
            await db
                .insert(orderMessage)
                .values({
                    orderId,
                    senderId: session.user.id,
                    message: message.trim(),
                    messageType: "text",
                    isInternal: false,
                });
        }

        // Update order status if marked as complete
        if (markAsComplete) {
            await db
                .update(order)
                .set({
                    status: "Done",
                    updatedAt: new Date(),
                })
                .where(eq(order.id, orderId));
        } else {
            // Update order status to indicate delivery submitted
            await db
                .update(order)
                .set({
                    status: "In Progress",
                    updatedAt: new Date(),
                })
                .where(eq(order.id, orderId));
        }

        revalidatePath(`/order/${orderId}`);
        revalidatePath(`/order/${orderId}/deliver`);

        return { success: true };
    } catch (error) {
        console.error("Error submitting delivery:", error);
        return { success: false, error: "Failed to submit delivery" };
    }
}

// Save delivery draft (for future implementation)
export async function saveDeliveryDraft(
    orderId: string,
    draftData: {
        files: Array<{
            fileName: string;
            fileUrl: string;
            fileSize: number;
            fileType: string;
            description?: string;
            isPublic: boolean;
        }>;
        message: string;
        markAsComplete: boolean;
    }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Verify user is the seller or client of this order
        const [orderData] = await db
            .select()
            .from(order)
            .where(
                and(
                    eq(order.id, orderId),
                    or(
                        eq(order.sellerId, session.user.id),
                        eq(order.clientId, session.user.id)
                    )
                )
            );

        if (!orderData) {
            return { success: false, error: "Order not found or access denied" };
        }

        // In a real app, you might save this to a separate draft table
        // For now, we'll just return success
        console.log("Saving delivery draft:", { orderId, draftData });

        return { success: true };
    } catch (error) {
        console.error("Error saving delivery draft:", error);
        return { success: false, error: "Failed to save draft" };
    }
}

// Upload file to storage (placeholder for file upload service)
export async function uploadDeliveryFile(file: File): Promise<{ success: boolean; fileUrl?: string; error?: string }> {
    try {
        // In a real app, this would upload to cloud storage (AWS S3, Cloudinary, etc.)
        // For now, we'll simulate the upload
        console.log("Uploading file:", file.name, file.size, file.type);

        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Return a mock file URL
        const fileUrl = `https://example-storage.com/deliveries/${Date.now()}-${file.name}`;

        return { success: true, fileUrl };
    } catch (error) {
        console.error("Error uploading file:", error);
        return { success: false, error: "Failed to upload file" };
    }
}

// ===== MILESTONE ACTIONS =====

// Create a new milestone
export async function createMilestone(
    orderId: string,
    data: {
        title: string;
        description?: string;
        status: "pending" | "in_progress" | "completed" | "cancelled";
        estimatedDate: Date;
        position: number;
    }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Verify user is the seller or client of this order
        const [orderData] = await db
            .select()
            .from(order)
            .where(
                and(
                    eq(order.id, orderId),
                    or(
                        eq(order.sellerId, session.user.id),
                        eq(order.clientId, session.user.id)
                    )
                )
            );

        if (!orderData) {
            return { success: false, error: "Order not found or access denied" };
        }

        const [newMilestone] = await db
            .insert(orderTimeline)
            .values({
                orderId,
                title: data.title,
                description: data.description || null,
                status: data.status as "pending" | "in_progress" | "completed",
                estimatedDate: data.estimatedDate,
                position: data.position,
            })
            .returning();

        revalidatePath(`/order/${orderId}`);
        revalidatePath(`/order/${orderId}/milestone`);

        return { success: true, milestone: newMilestone };
    } catch (error) {
        console.error("Error creating milestone:", error);
        return { success: false, error: "Failed to create milestone" };
    }
}

// Update a milestone
export async function updateMilestone(
    milestoneId: string,
    data: {
        title?: string;
        description?: string;
        status?: "pending" | "in_progress" | "completed" | "cancelled";
        estimatedDate?: Date;
        position?: number;
    }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        const [milestoneData] = await db
            .select({
                milestone: orderTimeline,
                order: order,
            })
            .from(orderTimeline)
            .innerJoin(order, eq(orderTimeline.orderId, order.id))
            .where(
                and(
                    eq(orderTimeline.id, milestoneId),
                    or(
                        eq(order.sellerId, session.user.id),
                        eq(order.clientId, session.user.id)
                    )
                )
            );

        if (!milestoneData) {
            return { success: false, error: "Milestone not found or access denied" };
        }

        const updateData: any = {
            updatedAt: new Date(),
        };

        if (data.title !== undefined) updateData.title = data.title;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.status !== undefined) updateData.status = data.status;
        if (data.estimatedDate !== undefined) updateData.estimatedDate = data.estimatedDate;
        if (data.position !== undefined) updateData.position = data.position;

        // Set completed date if status is completed
        if (data.status === "completed") {
            updateData.completedDate = new Date();
        } else if (data.status && !["completed", "in_progress", "pending", "cancelled"].includes(data.status)) {
            updateData.completedDate = null;
        }

        const [updatedMilestone] = await db
            .update(orderTimeline)
            .set(updateData)
            .where(eq(orderTimeline.id, milestoneId))
            .returning();

        revalidatePath(`/order/${milestoneData.order.id}`);
        revalidatePath(`/order/${milestoneData.order.id}/milestone`);

        return { success: true, milestone: updatedMilestone };
    } catch (error) {
        console.error("Error updating milestone:", error);
        return { success: false, error: "Failed to update milestone" };
    }
}

// Delete a milestone
export async function deleteMilestone(milestoneId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Get the milestone and verify user has access
        const [milestoneData] = await db
            .select({
                milestone: orderTimeline,
                order: order,
            })
            .from(orderTimeline)
            .innerJoin(order, eq(orderTimeline.orderId, order.id))
            .where(
                and(
                    eq(orderTimeline.id, milestoneId),
                    or(
                        eq(order.sellerId, session.user.id),
                        eq(order.clientId, session.user.id)
                    )
                )
            );

        if (!milestoneData) {
            return { success: false, error: "Milestone not found or access denied" };
        }

        await db
            .delete(orderTimeline)
            .where(eq(orderTimeline.id, milestoneId));

        revalidatePath(`/order/${milestoneData.order.id}`);
        revalidatePath(`/order/${milestoneData.order.id}/milestone`);

        return { success: true };
    } catch (error) {
        console.error("Error deleting milestone:", error);
        return { success: false, error: "Failed to delete milestone" };
    }
}

// Update milestone status
export async function updateMilestoneStatus(
    milestoneId: string,
    status: "pending" | "in_progress" | "completed" | "cancelled"
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Get the milestone and verify user has access
        const [milestoneData] = await db
            .select({
                milestone: orderTimeline,
                order: order,
            })
            .from(orderTimeline)
            .innerJoin(order, eq(orderTimeline.orderId, order.id))
            .where(
                and(
                    eq(orderTimeline.id, milestoneId),
                    or(
                        eq(order.sellerId, session.user.id),
                        eq(order.clientId, session.user.id)
                    )
                )
            );

        if (!milestoneData) {
            return { success: false, error: "Milestone not found or access denied" };
        }

        const updateData: any = {
            status,
            updatedAt: new Date(),
        };

        // Set completed date if status is completed
        if (status === "completed") {
            updateData.completedDate = new Date();
        } else {
            updateData.completedDate = null;
        }

        const [updatedMilestone] = await db
            .update(orderTimeline)
            .set(updateData)
            .where(eq(orderTimeline.id, milestoneId))
            .returning();

        revalidatePath(`/order/${milestoneData.order.id}`);
        revalidatePath(`/order/${milestoneData.order.id}/milestone`);

        return { success: true, milestone: updatedMilestone };
    } catch (error) {
        console.error("Error updating milestone status:", error);
        return { success: false, error: "Failed to update milestone status" };
    }
}

// Reorder milestones
export async function reorderMilestones(
    orderId: string,
    milestonePositions: Array<{ id: string; position: number }>
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Verify user is the seller of this order
        const [orderData] = await db
            .select()
            .from(order)
            .where(
                and(
                    eq(order.id, orderId),
                    eq(order.sellerId, session.user.id)
                )
            );

        if (!orderData) {
            return { success: false, error: "Order not found or access denied" };
        }

        // Update positions in a transaction
        for (const { id, position } of milestonePositions) {
            await db
                .update(orderTimeline)
                .set({
                    position,
                    updatedAt: new Date(),
                })
                .where(eq(orderTimeline.id, id));
        }

        revalidatePath(`/order/${orderId}`);
        revalidatePath(`/order/${orderId}/milestone`);

        return { success: true };
    } catch (error) {
        console.error("Error reordering milestones:", error);
        return { success: false, error: "Failed to reorder milestones" };
    }
}

// Get milestones for an order
export async function getOrderMilestones(orderId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        // Verify user has access to this order
        const [orderData] = await db
            .select()
            .from(order)
            .where(
                and(
                    eq(order.id, orderId),
                    sql`(${order.clientId} = ${session.user.id} OR ${order.sellerId} = ${session.user.id})`
                )
            );

        if (!orderData) {
            return { success: false, error: "Order not found or access denied" };
        }

        const milestones = await db
            .select()
            .from(orderTimeline)
            .where(eq(orderTimeline.orderId, orderId))
            .orderBy(orderTimeline.position);

        return { success: true, milestones };
    } catch (error) {
        console.error("Error getting milestones:", error);
        return { success: false, error: "Failed to get milestones" };
    }
}
