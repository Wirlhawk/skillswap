"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Star, User } from "lucide-react";
import { OrderSidebarProps } from "@/types/order";
import formatRupiah from "@/utils/format-rupiah";

export function OrderSidebar({
    seller,
    payment,
    onContactFreelancer,
}: OrderSidebarProps) {
    return (
        <div className="space-y-6">
            {/* Freelancer Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Freelancer
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage
                                src={seller.image || "/placeholder.svg"}
                            />
                            <AvatarFallback>{seller.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{seller.name}</p>
                            {seller.rating && (
                                <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm">
                                        {seller.rating}
                                    </span>
                                    {seller.completedOrders && (
                                        <span className="text-sm text-muted-foreground">
                                            ({seller.completedOrders} orders)
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {seller.responseTime && (
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Response time:
                                </span>
                                <span>{seller.responseTime}</span>
                            </div>
                        </div>
                    )}

                    {/* <Button
                        className="w-full mt-4 bg-transparent"
                        variant="outline"
                        onClick={onContactFreelancer}
                    >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Freelancer
                    </Button> */}
                </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Service price:
                            </span>
                            <span>
                                {formatRupiah(payment.servicePrice)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Platform fee:
                            </span>
                            <span>
                                {formatRupiah(payment.platformFee)}
                            </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                            <span>Total paid:</span>
                            <span>{formatRupiah(payment.totalPaid)}</span>
                        </div>
                    </div>
                    <Badge
                        className={`w-full mt-3 justify-center ${
                            payment.isSecured
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                        {payment.isSecured
                            ? "Payment Secured"
                            : "Payment Pending"}
                    </Badge>
                </CardContent>
            </Card>
        </div>
    );
}
