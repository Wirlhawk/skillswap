"use server"

import { db } from "@/db/drizzle";
import { review } from "@/db/schema/review";
import { user } from "@/db/schema/auth";
import { service } from "@/db/schema/service";
import { order } from "@/db/schema/order";
import { auth } from "@/lib/auth";
import { and, desc, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

// Create a new review
export async function createReview({
    orderId,
    rating,
    comment,
}: {
    orderId: string;
    rating: number;
    comment: string;
}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        console.log("Session user ID:", session.user.id);
        console.log("Order ID:", orderId);

        const [orderData] = await db
            .select({
                id: order.id,
                clientId: order.clientId,
                sellerId: order.sellerId,
                serviceId: order.serviceId,
                status: order.status,
            })
            .from(order)
            .where(eq(order.id, orderId));
        
        // Debug: Log the order data IDs
        console.log("Order data:", {
            id: orderData.id,
            clientId: orderData.clientId,
            sellerId: orderData.sellerId,
            serviceId: orderData.serviceId
        });

        if (!orderData) {
            return { success: false, error: "Order not found" };
        }

        // Verify the user is the client of this order
        if (orderData.clientId !== session.user.id) {
            return { success: false, error: "You can only review orders you've placed" };
        }

        // Verify the order is completed
        if (orderData.status !== "Done") {
            return { success: false, error: "You can only review completed orders" };
        }

        // Check if a review already exists for this order
        const existingReview = await db
            .select({ id: review.id })
            .from(review)
            .where(eq(review.orderId, orderId))
            .limit(1);

        if (existingReview.length > 0) {
            return { success: false, error: "You have already reviewed this order" };
        }

        // Create the review
        const [newReview] = await db.insert(review).values({
            orderId: orderData.id,
            sellerId: orderData.sellerId,
            clientId: session.user.id,
            serviceId: orderData.serviceId,
            rating,
            comment,
        }).returning();

        // Revalidate paths to update UI
        revalidatePath(`/service/${orderData.serviceId}`);
        revalidatePath(`/orders/${orderId}`);
        revalidatePath(`/profile/${orderData.sellerId}`);

        return { success: true, review: newReview };
    } catch (error) {
        console.error("Error creating review:", error);
        return { success: false, error: "Failed to create review" };
    }
}

// Get reviews for a service
export async function getServiceReviews(serviceId: string, limit = 10, offset = 0) {
    try {
        const reviews = await db
            .select({
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                createdAt: review.createdAt,
                client: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    image: user.image,
                },
                orderId: review.orderId,
            })
            .from(review)
            .innerJoin(user, eq(review.clientId, user.id))
            .where(eq(review.serviceId, serviceId))
            .orderBy(desc(review.createdAt))
            .limit(limit)
            .offset(offset);

        // Get the average rating for the service
        const [ratingStats] = await db
            .select({
                averageRating: sql`AVG(${review.rating})`,
                totalReviews: sql`COUNT(*)`,
            })
            .from(review)
            .where(eq(review.serviceId, serviceId));

        return { 
            success: true, 
            reviews, 
            stats: {
                averageRating: ratingStats?.averageRating || 0,
                totalReviews: ratingStats?.totalReviews || 0,
            }
        };
    } catch (error) {
        console.error("Error getting service reviews:", error);
        return { success: false, error: "Failed to get reviews" };
    }
}

// Get reviews for a seller
export async function getSellerReviews(sellerId: string, limit = 10, offset = 0) {
    try {
        const reviews = await db
            .select({
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                createdAt: review.createdAt,
                client: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    image: user.image,
                },
                service: {
                    id: service.id,
                    title: service.title,
                },
                orderId: review.orderId,
            })
            .from(review)
            .innerJoin(user, eq(review.clientId, user.id))
            .innerJoin(service, eq(review.serviceId, service.id))
            .where(eq(review.sellerId, sellerId))
            .orderBy(desc(review.createdAt))
            .limit(limit)
            .offset(offset);

        // Get the average rating for the seller
        const [ratingStats] = await db
            .select({
                averageRating: sql`AVG(${review.rating})`,
                totalReviews: sql`COUNT(*)`,
            })
            .from(review)
            .where(eq(review.sellerId, sellerId));

        return { 
            success: true, 
            reviews, 
            stats: {
                averageRating: ratingStats?.averageRating || 0,
                totalReviews: ratingStats?.totalReviews || 0,
            }
        };
    } catch (error) {
        console.error("Error getting seller reviews:", error);
        return { success: false, error: "Failed to get reviews" };
    }
}

// Check if a user has reviewed an order
export async function hasUserReviewedOrder(orderId: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            return { success: false, error: "User not authenticated" };
        }

        const existingReview = await db
            .select({ id: review.id })
            .from(review)
            .where(
                and(
                    eq(review.orderId, orderId),
                    eq(review.clientId, session.user.id)
                )
            )
            .limit(1);

        return { 
            success: true, 
            hasReviewed: existingReview.length > 0 
        };
    } catch (error) {
        console.error("Error checking review status:", error);
        return { success: false, error: "Failed to check review status" };
    }
}