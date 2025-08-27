"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MilestoneHeaderProps } from "@/types/order";

export function MilestoneHeader({ orderData, onBack }: MilestoneHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
                <Button variant="ghost" size="sm" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Order
                </Button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Project Milestones
            </h1>
            <p className="text-gray-600">
                Manage your project timeline and track progress
            </p>
            <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                    Order #{orderData.orderNumber} • {orderData.orderTitle}
                </p>
            </div>
        </div>
    );
}
