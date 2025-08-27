"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { OrderDeliveryMessageProps } from "@/types/order";

export function OrderDeliveryMessage({
    message,
    onMessageChange,
}: OrderDeliveryMessageProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Delivery Message</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Add a message to explain your delivery and any important
                    notes for the client.
                </p>
            </CardHeader>
            <CardContent>
                <Textarea
                    placeholder="Hi! I've completed your project. Here are the deliverables as requested..."
                    value={message}
                    onChange={(e) => onMessageChange(e.target.value)}
                    rows={4}
                    className="w-full"
                />
            </CardContent>
        </Card>
    );
}
