"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { submitDelivery, saveDeliveryDraft, uploadDeliveryFile } from "@/server/order";
import { DeliveryActionHandlers, DeliveryFormData, DeliveryFile, ActionResult } from "@/types/order";

interface UseDeliveryActionsProps {
    orderId: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function useDeliveryActions({ orderId, onSuccess, onError }: UseDeliveryActionsProps) {
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

    const deliveryActions: DeliveryActionHandlers = {
        onSubmitDelivery: async (deliveryData: DeliveryFormData) => {
            // First upload all files
            const uploadedFiles: DeliveryFile[] = [];

            for (const file of deliveryData.files) {
                if (file.fileUrl.startsWith("blob:")) {
                    const response = await fetch(file.fileUrl);
                    const blob = await response.blob();
                    const fileObj = new File([blob], file.fileName, { type: file.fileType });

                    const uploadResult = await uploadDeliveryFile(fileObj);
                    if (uploadResult.success && uploadResult.fileUrl) {
                        uploadedFiles.push({
                            ...file,
                            fileUrl: uploadResult.fileUrl,
                        });
                    } else {
                        throw new Error(`Failed to upload ${file.fileName}`);
                    }
                } else {
                    uploadedFiles.push(file);
                }
            }

            // Submit delivery with uploaded files
            await handleAction(
                () =>
                    submitDelivery(orderId, uploadedFiles, deliveryData.message, deliveryData.markAsComplete),
                "Delivery submitted successfully!",
                "Failed to submit delivery"
            );

            router.push(`/order/${orderId}`);
        },

        onSaveDraft: async () => {
            toast("Draft saved", {
                description: "Your delivery draft has been saved.",
            });
        },

        onBack: () => {
            router.push(`/order/${orderId}`);
        },
    };

    return {
        deliveryActions,
        isLoading,
    };
}
