"use client";

import { toast } from "sonner";
import {
    approveAndCompleteOrder,
    cancelOrder,
    sendOrderMessage,
    updateOrderStatus
} from "@/server/order";
import { useRouter } from "next/navigation";
import { OrderActionHandlers, OrderAttachmentDisplay, ActionResult } from "@/types/order";
import { useState } from "react";

interface UseOrderActionsProps {
    orderId: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function useOrderActions({ orderId, onSuccess, onError }: UseOrderActionsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleAction = async <T>(
        action: () => Promise<ActionResult<T>>,
        successMessage: string,
        errorMessage: string
    ): Promise<T | null> => {
        setIsLoading(true);
        try {
            const result = await action();

            if (result.success) {
                toast.success(successMessage);
                onSuccess?.();
                return result.data || null;
            } else {
                const errorMsg = result.error || errorMessage;
                toast.error(errorMsg);
                onError?.(errorMsg);
                return null;
            }
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : errorMessage;
            toast.error(errorMsg);
            onError?.(errorMsg);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const orderActions: OrderActionHandlers = {
        onSendMessage: async (message: string, attachments?: File[]) => {
            await handleAction(
                () => sendOrderMessage(orderId, message),
                "Message sent successfully",
                "Failed to send message"
            );
        },

        onCancelOrder: async () => {
            await handleAction(
                () => cancelOrder(orderId),
                "Order cancelled successfully",
                "Failed to cancel order"
            );
        },

        onApproveComplete: async () => {
            await handleAction(
                () => approveAndCompleteOrder(orderId),
                "Order completed successfully",
                "Failed to complete order"
            );
        },

        onContactFreelancer: async () => {
            toast.info("Opening conversation with the freelancer.");
        },
        
        onGoToMilestone: () => {
            router.push(`/order/${orderId}/milestone`);
        },
        
        onGoToDeliver: () => {
            router.push(`/order/${orderId}/deliver`);
        },

        onLeaveReview: () => {
            // The actual review submission is handled by the ReviewDialog component
            toast.info("Opening review dialog");
        },

        onDownloadAttachment: async (attachment: OrderAttachmentDisplay) => {
            toast("Download started", {
                description: `Downloading ${attachment.fileName}`,
            });
        },
        
        onStartProgress: async () => {
            await handleAction(
                () => updateOrderStatus(orderId, "In Progress"),
                "Order started successfully",
                "Failed to start order"
            );
        },
    };

    return {
        orderActions,
        isLoading,
    };
}
