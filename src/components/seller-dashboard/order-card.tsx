'use client';

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import formatRupiah from "@/utils/format-rupiah";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { UpdateOrderStatusAction } from "./update-order-status-action";
import { Order } from "./columns";
import dayjs from 'dayjs'

interface OrderCardProps {
    order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
    const statusColors = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Done': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800'
    };

    const statusColor = statusColors[order.status] || 'bg-gray-100 text-gray-800';

    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
                <div>
                    <p className="text-sm text-muted-foreground">Order #{order.orderNumber}</p>
                    <h3 className="font-semibold text-lg mt-1">{order.serviceTitle}</h3>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>Copy Order ID</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <UpdateOrderStatusAction order={order}>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                Update Status
                            </DropdownMenuItem>
                        </UpdateOrderStatusAction>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Client:</span>
                        <span className="text-sm">{order.clientName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Date:</span>
                        <span className="text-sm">{dayjs(order.createdAt).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Price:</span>
                        <span className="text-sm font-semibold">{formatRupiah(order.totalPrice)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <Badge className={statusColor}>{order.status}</Badge>
                <UpdateOrderStatusAction order={order}>
                    <Button size="sm" variant="outline">Update Status</Button>
                </UpdateOrderStatusAction>
            </CardFooter>
        </Card>
    );
}