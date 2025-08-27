"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OrderDeliverySummaryProps } from "@/types/order";
import formatRupiah from "@/utils/format-rupiah";
import { order } from "@/db/schema";

export function OrderDeliverySummary({ orderData }: OrderDeliverySummaryProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{orderData.service.title}</span>
                    <span className="text-lg font-bold">
                        {formatRupiah(orderData.totalPrice)}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={orderData.client.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                            {orderData.client.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium">{orderData.client.name}</p>
                        <p className="text-sm text-muted-foreground">Client</p>
                    </div>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Project Requirements</h4>
                    <p className="text-muted-foreground text-sm">
                        {orderData.requirements}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
