"use client";

import React, { useState } from "react";
import { DataTable } from "./data-table";
import { columns, Order } from "./columns";
import { getClientOrders } from "@/server/dashboard";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface OrdersTableProps {
    initialOrders: Order[];
    initialTotalPages: number;
    initialPage: number;
}

const ClientOrdersTable = ({
    initialOrders,
    initialTotalPages,
    initialPage,
}: OrdersTableProps) => {
    const router = useRouter();
    const [data, setData] = useState<{ orders: Order[]; totalPages: number }>({ 
        orders: initialOrders, 
        totalPages: initialTotalPages 
    });
    const [page, setPage] = useState(initialPage);
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handlePageChange = (newPage: number) => {
        setIsLoading(true);
        setPage(newPage);
        router.push(`/orders?status=${status}&page=${newPage}`);
    };

    return (
        <div>
            <div className="flex items-center py-4">
                <Select
                    onValueChange={(value) => {
                        setIsLoading(true);
                        setStatus(value === "all" ? "" : value);
                        setPage(1); // Reset to page 1 when changing status filter
                        router.push(
                            `/orders?status=${value === "all" ? "" : value}&page=1`
                        );
                    }}
                    defaultValue="all"
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Done">Done</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <DataTable
                columns={columns}
                data={data.orders}
                filterKey="serviceTitle"
                page={page}
                totalPages={data.totalPages}
                setPage={handlePageChange}
                isLoading={isLoading}
            />
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        if (page > 1) {
                            handlePageChange(page - 1);
                        }
                    }}
                    disabled={page === 1 || isLoading}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {page} of {data.totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        if (page < data.totalPages) {
                            handlePageChange(page + 1);
                        }
                    }}
                    disabled={page >= data.totalPages || isLoading}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default ClientOrdersTable;