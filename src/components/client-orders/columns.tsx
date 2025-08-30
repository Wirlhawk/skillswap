'use client';

import { ColumnDef } from "@tanstack/react-table";
import formatRupiah from "@/utils/format-rupiah";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type Order = {
    id: string;
    orderNumber: string;
    serviceTitle: string | null;
    sellerName: string | null;
    totalPrice: number;
    status: 'Pending' | 'In Progress' | 'Done' | 'Cancelled';
    createdAt: Date;
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "orderNumber",
        header: "Order ID",
    },
    {
        accessorKey: "serviceTitle",
        header: "Service",
    },
    {
        accessorKey: "sellerName",
        header: "Seller",
    },
    {
        accessorKey: "totalPrice",
        header: () => <div className="text-right">Price</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("totalPrice"));
            return <div className="text-right font-medium">{formatRupiah(amount)}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return <Badge variant={status === 'Done' ? 'default' : 'secondary'}>{status}</Badge>;
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return <div>{date.toLocaleDateString()}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original;
            return (
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
                        <DropdownMenuItem asChild>
                            <a href={`/orders/${order.id}`}>View Details</a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];