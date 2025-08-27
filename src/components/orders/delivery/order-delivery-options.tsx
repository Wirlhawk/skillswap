"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { OrderDeliveryOptionsProps } from "@/types/order";

export function OrderDeliveryOptions({
    markAsComplete,
    onMarkAsCompleteChange,
}: OrderDeliveryOptionsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Delivery Options</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="mark-complete"
                        checked={markAsComplete}
                        onCheckedChange={(checked) =>
                            onMarkAsCompleteChange(checked as boolean)
                        }
                    />
                    <Label htmlFor="mark-complete" className="text-sm">
                        Mark this order as completed (client will be notified
                        for final approval)
                    </Label>
                </div>
                {markAsComplete && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                            ✓ The order will be marked as "Done" and the client
                            will be notified to review and approve your
                            delivery.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
