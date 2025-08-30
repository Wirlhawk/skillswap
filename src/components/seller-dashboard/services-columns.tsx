'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteServiceAction } from "./delete-service-action";
import formatRupiah from "@/utils/format-rupiah";
import Link from "next/link";

// This type is based on the service schema
export type Service = {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    price: number;
    userId: string | null;
    categoryId: string | null;
    deliveryTime: string;
    revisions: string;
    packageName: string;
    packageDescription: string;
    features: string[] | null;
    tags: string[] | null;
    images: string[] | null;
    createdAt: Date;
    updatedAt: Date;
};

export const columns: ColumnDef<Service>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            return <div className="font-medium">{row.getValue("title")}</div>;
        }
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">Price</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"));
            return <div className="text-right font-medium">{formatRupiah(amount)}</div>;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return <div>{date.toLocaleDateString()}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const service = row.original;
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
                        <Link href={`/service/create`} passHref>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                Create New Service
                            </DropdownMenuItem>
                        </Link>
                        <Link href={`/service/${service.id}`} passHref>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                View Service
                            </DropdownMenuItem>
                        </Link>
                        <DeleteServiceAction serviceId={service.id} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];