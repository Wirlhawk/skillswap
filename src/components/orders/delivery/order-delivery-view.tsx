"use client";

import { useState } from "react";
import { OrderDeliveryHeader } from "./order-delivery-header";
import { OrderDeliverySummary } from "./order-delivery-summary";
import { OrderDeliveryUpload } from "./order-delivery-upload";
import { OrderDeliveryMessage } from "./order-delivery-message";
import { OrderDeliveryOptions } from "./order-delivery-options";
import { OrderDeliveryActions } from "./order-delivery-actions";
import {
    OrderDeliveryViewData,
    DeliveryFormData,
    DeliveryFile,
} from "@/types/order";
import { useDeliveryActions } from "@/hooks/use-delivery-actions";
import PageInset from "@/components/shared/page-inset";

interface OrderDeliveryViewProps {
    data: OrderDeliveryViewData;
}

export function OrderDeliveryView({ data }: OrderDeliveryViewProps) {
    const [formData, setFormData] = useState<DeliveryFormData>(data.formData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { deliveryActions, isLoading } = useDeliveryActions({
        orderId: data.orderData.id,
        onSuccess: () => {
            console.log("Delivery action completed successfully");
        },
        onError: (error) => {
            console.error("Delivery action failed:", error);
        },
    });

    const handleFileUpload = (files: File[]) => {
        const newFiles: DeliveryFile[] = files.map((file) => ({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            fileName: file.name,
            fileUrl: URL.createObjectURL(file), // In real app, this would be uploaded to storage
            fileSize: file.size,
            fileType: file.type,
            description: "",
            isPublic: true,
        }));

        setFormData((prev) => ({
            ...prev,
            files: [...prev.files, ...newFiles],
        }));
    };

    const handleFileRemove = (fileId: string) => {
        setFormData((prev) => ({
            ...prev,
            files: prev.files.filter((file) => file.id !== fileId),
        }));
    };

    const handleFileDescriptionUpdate = (
        fileId: string,
        description: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            files: prev.files.map((file) =>
                file.id === fileId ? { ...file, description } : file
            ),
        }));
    };

    const handleFileVisibilityToggle = (fileId: string) => {
        setFormData((prev) => ({
            ...prev,
            files: prev.files.map((file) =>
                file.id === fileId
                    ? { ...file, isPublic: !file.isPublic }
                    : file
            ),
        }));
    };

    const handleMessageChange = (message: string) => {
        setFormData((prev) => ({ ...prev, message }));
    };

    const handleMarkAsCompleteChange = (markAsComplete: boolean) => {
        setFormData((prev) => ({ ...prev, markAsComplete }));
    };

    const handleSubmitDelivery = async () => {
        if (formData.files.length === 0 && !formData.message.trim()) {
            alert("Please add at least one file or delivery message");
            return;
        }

        setIsSubmitting(true);
        try {
            await deliveryActions.onSubmitDelivery(formData);
        } catch (error) {
            console.error("Error submitting delivery:", error);
            alert("Error submitting delivery. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveDraft = () => {
        deliveryActions.onSaveDraft();
    };

    const handleBack = () => {
        deliveryActions.onBack();
    };

    const canSubmit =
        formData.files.length > 0 || formData.message.trim().length > 0;

    return (
        <PageInset>
            <OrderDeliveryHeader
                orderData={{
                    orderNumber: data.orderData.orderNumber,
                    orderTitle: data.orderData.service.title,
                }}
                onBack={handleBack}
            />

            <div className="max-w-7xl mx-auto py-6 space-y-6">
                <OrderDeliverySummary orderData={data.orderData} />

                <OrderDeliveryUpload
                    files={formData.files}
                    onFileUpload={handleFileUpload}
                    onFileRemove={handleFileRemove}
                    onFileDescriptionUpdate={handleFileDescriptionUpdate}
                    onFileVisibilityToggle={handleFileVisibilityToggle}
                />

                <OrderDeliveryMessage
                    message={formData.message}
                    onMessageChange={handleMessageChange}
                />

                <OrderDeliveryOptions
                    markAsComplete={formData.markAsComplete}
                    onMarkAsCompleteChange={handleMarkAsCompleteChange}
                />

                <OrderDeliveryActions
                    onSubmit={handleSubmitDelivery}
                    onSaveDraft={handleSaveDraft}
                    isSubmitting={isSubmitting || isLoading}
                    canSubmit={canSubmit}
                />
            </div>
        </PageInset>
    );
}
