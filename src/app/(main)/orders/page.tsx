import PageInset from "@/components/shared/page-inset";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getClientOrders } from "@/server/dashboard";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    DollarSign,
    Filter,
    MoreHorizontal,
    Package,
    Search,
    ShoppingBag,
    Users,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import ClientOrdersTable from "@/components/client-orders/orders-table";

interface ClientOrdersPageProps {
    searchParams: {
        page?: string;
        status?: string;
    };
}

const ClientOrdersPage = async ({ searchParams }: ClientOrdersPageProps) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!userId) {
        return (
            <PageInset>
                <div className="p-4 text-center">
                    Please log in to view your orders.
                </div>
            </PageInset>
        );
    }

    // Parse and validate page parameter
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const status = searchParams.status || "";

    // Redirect if page is invalid
    if (isNaN(page) || page < 1) {
        redirect("/orders?page=1" + (status ? `&status=${status}` : ""));
    }

    const { orders, totalPages } = await getClientOrders(userId, {
        page,
        pageSize: 10,
        status,
    });

    // Calculate stats for different order statuses
    const processingOrders = orders.filter(
        (o) => o.status === "In Progress"
    ).length;
    const deliveredOrders = orders.filter((o) => o.status === "Done").length;
    const pendingOrders = orders.filter((o) => o.status === "Pending").length;
    const cancelledOrders = orders.filter(
        (o) => o.status === "Cancelled"
    ).length;

    // Calculate additional metrics
    const totalSpent = orders.reduce(
        (sum, order) => sum + order.totalPrice,
        0
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending":
                return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800";
            case "In Progress":
                return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800";
            case "Done":
                return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800";
            case "Cancelled":
                return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-orange-800";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800";
        }
    };

    return (
        <PageInset>
            <div className="min-h-screen bg-background">
                {/* Welcome Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                My Orders 🛒
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Track and manage all your orders in one place
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button asChild>
                                <Link href="/services">
                                    <ShoppingBag className="h-4 w-4 mr-2" />
                                    Browse Services
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">
                                        Processing
                                    </p>
                                    <p className="text-2xl font-bold text-primary">
                                        {processingOrders}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                                    <Clock className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">
                                        Delivered
                                    </p>
                                    <p className="text-2xl font-bold text-foreground">
                                        {deliveredOrders}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30">
                                    <Package className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">
                                        Pending
                                    </p>
                                    <p className="text-2xl font-bold text-accent-foreground">
                                        {pendingOrders}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30">
                                    <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">
                                        Total Spent
                                    </p>
                                    <p className="text-2xl font-bold text-primary">
                                        Rp {totalSpent.toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                                    <DollarSign className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <div className="flex justify-between items-center mb-4 sm:mb-8">
                        <h2 className="text-xl font-bold text-foreground">
                            All Orders ({orders.length})
                        </h2>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            <Link href="/orders?page=1">
                                <Button
                                    variant={!status ? "default" : "outline"}
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                >
                                    All
                                </Button>
                            </Link>
                            <Link href="/orders?status=Pending&page=1">
                                <Button
                                    variant={
                                        status === "Pending"
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                >
                                    Pending
                                </Button>
                            </Link>
                            <Link href="/orders?status=In%20Progress&page=1">
                                <Button
                                    variant={
                                        status === "In Progress"
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                >
                                    Processing
                                </Button>
                            </Link>
                            <Link href="/orders?status=Done&page=1">
                                <Button
                                    variant={
                                        status === "Done"
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                >
                                    Delivered
                                </Button>
                            </Link>
                            <Link href="/orders?status=Cancelled&page=1">
                                <Button
                                    variant={
                                        status === "Cancelled"
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    className="text-xs sm:text-sm"
                                >
                                    Cancelled
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <ClientOrdersTable 
                        initialOrders={orders} 
                        initialTotalPages={totalPages}
                        initialPage={page}
                    />
                </div>
            </div>
        </PageInset>
    );
};

export default ClientOrdersPage;