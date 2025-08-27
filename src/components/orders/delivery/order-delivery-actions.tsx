"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderDeliveryActionsProps } from "@/types/order";

export function OrderDeliveryActions({
    onSubmit,
    onSaveDraft,
    isSubmitting,
    canSubmit,
}: OrderDeliveryActionsProps) {
    return (
        <div className="flex items-center justify-between pt-4">
            <Button variant="outline" onClick={onSaveDraft}>
                Save as Draft
            </Button>
            <Button
                onClick={onSubmit}
                disabled={isSubmitting || !canSubmit}
                className="min-w-[120px]"
            >
                {isSubmitting ? (
                    "Submitting..."
                ) : (
                    <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Delivery
                    </>
                )}
            </Button>
        </div>
    );
}
