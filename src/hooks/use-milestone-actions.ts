"use client";

import { toast } from "sonner";
import {
    createMilestone,
    deleteMilestone,
    updateMilestone,
    updateMilestoneStatus
} from "@/server/order";
import {
    MilestoneActionHandlers,
    MilestoneFormData,
    MilestoneStatus,
    ActionResult
} from "@/types/order";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UseMilestoneActionsProps {
    orderId: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function useMilestoneActions({ orderId, onSuccess, onError }: UseMilestoneActionsProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

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

    const milestoneActions: MilestoneActionHandlers = {
        onCreateMilestone: async (data: MilestoneFormData) => {
            await handleAction(
                () =>
                    createMilestone(orderId, {
                        title: data.title,
                        description: data.description,
                        status: data.status,
                        estimatedDate: new Date(data.estimatedDate),
                        position: 0, // Will be set by the server
                    }),
                "Milestone created successfully!",
                "Failed to create milestone"
            );
        },

        onUpdateMilestone: async (milestoneId: string, data: Partial<MilestoneFormData>) => {
            const updateData: UpdateMilestoneData = {};

            if (data.title !== undefined) updateData.title = data.title;
            if (data.description !== undefined) updateData.description = data.description;
            if (data.status !== undefined) updateData.status = data.status;
            if (data.estimatedDate !== undefined) updateData.estimatedDate = new Date(data.estimatedDate);

            await handleAction(
                () => updateMilestone(milestoneId, updateData),
                "Milestone updated successfully!",
                "Failed to update milestone"
            );
        },

        onDeleteMilestone: async (milestoneId: string) => {
            await handleAction(
                () => deleteMilestone(milestoneId),
                "Milestone deleted successfully!",
                "Failed to delete milestone"
            );
        },

        onUpdateStatus: async (milestoneId: string, status: MilestoneStatus) => {
            await handleAction(
                () => updateMilestoneStatus(milestoneId, status),
                "Milestone status updated successfully!",
                "Failed to update milestone status"
            );
        },

        onReorderMilestones: async (milestoneId: string, newPosition: number) => {
            await handleAction(
                () => updateMilestone(milestoneId, { position: newPosition }),
                "Milestones reordered successfully!",
                "Failed to reorder milestones"
            );
        },

        onSaveAllChanges: async (): Promise<void> => {
            await handleAction<{ success: boolean }>(
                async () => {
                    // This function is now called after all individual milestones have been created
                    // We just need to return success to trigger the success message and page refresh
                    return { success: true };
                },
                "All changes saved successfully!",
                "Failed to save all changes"
            );
        },

        onBack: () => {
            router.push(`/order/${orderId}`);
        },
    };

    return {
        milestoneActions,
        isLoading,
    };
}
