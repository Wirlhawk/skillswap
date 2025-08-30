'use server';

import { db } from "@/db/drizzle";
import { order, orderStatusEnum } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

// Helper function to validate status transitions
function isValidStatusTransition(currentStatus: string, newStatus: string): boolean {
    // Define valid transitions
    const validTransitions: Record<string, string[]> = {
        'Pending': ['In Progress', 'Cancelled'],
        'In Progress': ['Done', 'Cancelled'],
        'Done': [], // Cannot change from Done
        'Cancelled': [] // Cannot change from Cancelled
    };
    
    return validTransitions[currentStatus]?.includes(newStatus) ?? false;
}

export async function updateOrderStatus(orderId: string, status: 'Pending' | 'In Progress' | 'Done' | 'Cancelled') {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!userId) {
        return { error: "Unauthorized" };
    }

    try {
        // First check if the order belongs to the seller
        const existingOrder = await db.select()
            .from(order)
            .where(and(eq(order.id, orderId), eq(order.sellerId, userId)))
            .limit(1);
            
        if (existingOrder.length === 0) {
            return { error: "Order not found or you don't have permission to update it." };
        }
        
        // Validate the status transition
        const currentStatus = existingOrder[0].status;
        if (!isValidStatusTransition(currentStatus, status)) {
            return { error: `Cannot change order status from ${currentStatus} to ${status}` };
        }
        
        await db.update(order)
            .set({ status, updatedAt: new Date() })
            .where(eq(order.id, orderId));

        revalidatePath("/seller/orders");
        return { success: "Order status updated successfully!" };

    } catch (error) {
        console.error("Error updating order status:", error);
        return { error: "Failed to update order status." };
    }
}
