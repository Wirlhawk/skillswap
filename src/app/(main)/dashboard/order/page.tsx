"use client";
import PageInset from "@/components/shared/page-inset";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Calendar,
    Clock,
    Filter,
    MoreHorizontal,
    Plus,
    Search,
    Star,
    Users,
} from "lucide-react";
import { useState } from "react";

const orders = [
    {
        id: 1,
        title: "Premium Laptop",
        client: "John Doe",
        clientAvatar: "https://ui.shadcn.com/avatars/04.png",
        status: "delivered",
        total: "Rp 850,000",
        date: "15 Dec 2024",
        estimatedDelivery: "2 days",
        rating: 5,
        description:
            "High-performance laptop with 16GB RAM and 512GB SSD for professional use",
        progress: 100,
        quantity: 1,
    },
    {
        id: 2,
        title: "Gaming Headset",
        client: "Jane Smith",
        clientAvatar: "https://ui.shadcn.com/avatars/04.png",
        status: "processing",
        total: "Rp 1,200,000",
        date: "20 Dec 2024",
        estimatedDelivery: "3 days",
        description:
            "Wireless gaming headset with noise cancellation and RGB lighting",
        progress: 65,
        quantity: 2,
    },
    {
        id: 3,
        title: "Smartphone Case",
        client: "Mike Johnson",
        clientAvatar: "https://ui.shadcn.com/avatars/04.png",
        status: "shipped",
        total: "Rp 750,000",
        date: "10 Dec 2024",
        estimatedDelivery: "1 day",
        description:
            "Protective smartphone case with wireless charging compatibility",
        progress: 90,
        quantity: 3,
    },
    {
        id: 4,
        title: "Wireless Mouse",
        client: "Sarah Wilson",
        clientAvatar: "https://ui.shadcn.com/avatars/04.png",
        status: "pending",
        total: "Rp 500,000",
        date: "25 Dec 2024",
        estimatedDelivery: "1 day",
        description:
            "Ergonomic wireless mouse with precision tracking and long battery life",
        progress: 0,
        quantity: 1,
    },
    {
        id: 5,
        title: "Bluetooth Speaker",
        client: "David Brown",
        clientAvatar: "https://ui.shadcn.com/avatars/04.png",
        status: "cancelled",
        total: "Rp 950,000",
        date: "05 Dec 2024",
        estimatedDelivery: "2 days",
        description:
            "Portable Bluetooth speaker with waterproof design that was cancelled due to stock unavailability",
        progress: 30,
        quantity: 1,
    },
];

const page = () => {
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredOrders = orders.filter((order) => {
        if (statusFilter === "all") return true;
        return order.status === statusFilter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800";
            case "processing":
                return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800";
            case "shipped":
                return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800";
            case "delivered":
                return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800";
        }
    };

    return (
        <PageInset>
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="mb-6">
                    <div className="max-w-7xl mx-auto ">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">
                                    Order Management
                                </h1>
                            </div>
                            <Button className="w-full sm:w-auto">
                                <Plus className="h-4 w-4 mr-2" />
                                New Order
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto ">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 mb-6 sm:mb-8">
                        <Card>
                            <CardContent className="p-3 sm:p-6 text-center">
                                <div className="text-xl sm:text-3xl font-bold text-primary">
                                    {
                                        orders.filter(
                                            (o) => o.status === "processing"
                                        ).length
                                    }
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                                    Processing Orders
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-3 sm:p-6 text-center">
                                <div className="text-xl sm:text-3xl font-bold text-foreground">
                                    {
                                        orders.filter(
                                            (o) => o.status === "delivered"
                                        ).length
                                    }
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                                    Delivered Orders
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-3 sm:p-6 text-center">
                                <div className="text-xl sm:text-3xl font-bold text-muted-foreground">
                                    {
                                        orders.filter(
                                            (o) => o.status === "shipped"
                                        ).length
                                    }
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                                    Shipped Orders
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-3 sm:p-6 text-center">
                                <div className="text-xl sm:text-3xl font-bold text-accent-foreground">
                                    {
                                        orders.filter(
                                            (o) => o.status === "pending"
                                        ).length
                                    }
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                                    Pending Orders
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-3 sm:p-6 text-center">
                                <div className="text-xl sm:text-3xl font-bold text-red-500">
                                    {
                                        orders.filter(
                                            (o) => o.status === "cancelled"
                                        ).length
                                    }
                                </div>
                                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                                    Cancelled Orders
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <div className="flex justify-between items-center mb-4 sm:mb-8">
                            <h2 className="text-xl font-bold text-foreground">
                                All Orders
                            </h2>
                        </div>

                        {/* Filter Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    variant={
                                        statusFilter === "all"
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() => setStatusFilter("all")}
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                >
                                    All
                                </Button>
                                <Button
                                    variant={
                                        statusFilter === "pending"
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() => setStatusFilter("pending")}
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                >
                                    Pending
                                </Button>
                                <Button
                                    variant={
                                        statusFilter === "processing"
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() =>
                                        setStatusFilter("processing")
                                    }
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                >
                                    Processing
                                </Button>
                                <Button
                                    variant={
                                        statusFilter === "shipped"
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() => setStatusFilter("shipped")}
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                >
                                    Shipped
                                </Button>
                                <Button
                                    variant={
                                        statusFilter === "delivered"
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() => setStatusFilter("delivered")}
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                >
                                    Delivered
                                </Button>
                                <Button
                                    variant={
                                        statusFilter === "cancelled"
                                            ? "default"
                                            : "outline"
                                    }
                                    onClick={() => setStatusFilter("cancelled")}
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                >
                                    Cancelled
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 sm:flex-none text-xs sm:text-sm bg-transparent"
                                >
                                    <Filter className="size-3 sm:size-4 mr-1 sm:mr-2" />
                                    Filter
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 sm:flex-none text-xs sm:text-sm bg-transparent"
                                >
                                    <Search className="size-3 sm:size-4 mr-1 sm:mr-2" />
                                    Search
                                </Button>
                            </div>
                        </div>

                        {/* Orders List */}
                        <div className="space-y-3 sm:space-y-4">
                            {filteredOrders.map((order) => (
                                <Card
                                    key={order.id}
                                    className="hover:shadow-lg transition-all duration-200"
                                >
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                            <div className="flex-1 space-y-4">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-base sm:text-lg font-semibold text-foreground leading-tight">
                                                            {order.title}
                                                        </h3>
                                                        <Badge
                                                            className={`text-xs font-medium px-2 py-1 border ${getStatusColor(order.status)}`}
                                                        >
                                                            {order.status}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                                    {order.description}
                                                </p>

                                                <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        {order.date}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                                                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        {
                                                            order.estimatedDelivery
                                                        }
                                                    </span>
                                                    <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md">
                                                        <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                                                        Qty: {order.quantity}
                                                    </span>
                                                </div>

                                                {order.progress > 0 && (
                                                    <div className="space-y-2 bg-muted/30 p-3 rounded-lg">
                                                        <div className="flex justify-between items-center text-xs sm:text-sm">
                                                            <span className="text-muted-foreground font-medium">
                                                                Order Progress
                                                            </span>
                                                            <span className="text-foreground font-semibold">
                                                                {order.progress}
                                                                %
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                                                            <div
                                                                className="bg-gradient-to-r from-primary to-primary/80 h-2.5 rounded-full transition-all duration-500 ease-out"
                                                                style={{
                                                                    width: `${order.progress}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={
                                                            order.clientAvatar ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt={`${order.client} avatar`}
                                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border"
                                                    />
                                                    <div className="text-left">
                                                        <p className="text-xs text-muted-foreground">
                                                            Customer
                                                        </p>
                                                        <p className="text-sm font-bold text-foreground">
                                                            {order.client}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-end gap-4 lg:gap-3 lg:min-w-[200px]">
                                                <div className="flex flex-col lg:items-end space-y-2">
                                                    <div className="bg-primary/5 px-3 py-2 rounded-lg">
                                                        <p className="text-base sm:text-lg font-bold text-primary">
                                                            {order.total}
                                                        </p>
                                                    </div>

                                                    {order.rating && (
                                                        <div className="flex items-center justify-center lg:justify-end gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md">
                                                            {[
                                                                ...Array(
                                                                    order.rating
                                                                ),
                                                            ].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400"
                                                                />
                                                            ))}
                                                            <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 ml-1">
                                                                {order.rating}
                                                                .0
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hover:bg-primary/10 rounded-full p-2"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageInset>
    );
};

export default page;
