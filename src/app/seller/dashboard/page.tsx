import RevenueChart from "@/components/seller-dashboard/revenue-chart";
import StatsGrid from "@/components/seller-dashboard/stats-grid";
import TopServicesList from "@/components/seller-dashboard/top-services-list";
import { getRevenueByPeriod, getSellerOrders } from "@/server/dashboard";
import { auth } from "@/lib/auth";
import React, { Suspense } from "react";
import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp,
    TrendingDown,
    Calendar,
    Clock,
    Package,
    Plus,
    ArrowUpRight,
    Users,
    Star,
    Activity,
} from "lucide-react";
import Link from "next/link";
import PageInset from "@/components/shared/page-inset";

const SellerDashboardPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!userId) {
        return (
            <PageInset>
                <div className="p-4 text-center">
                    Please log in to view your dashboard.
                </div>
            </PageInset>
        );
    }

    // Fetch data for the dashboard
    const [revenueData, recentOrders] = await Promise.all([
        getRevenueByPeriod(userId, "day"),
        getSellerOrders(userId, { page: 1, pageSize: 5 }),
    ]);

    // Calculate some additional metrics
    const totalRevenue = recentOrders.orders.reduce(
        (sum, order) => sum + order.totalPrice,
        0
    );
    const avgOrderValue =
        recentOrders.orders.length > 0
            ? totalRevenue / recentOrders.orders.length
            : 0;

    // Get current month and previous month for comparison
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const isGrowth = Math.random() > 0.5; // This would be real data in production

    return (
        <PageInset>
            <div className="min-h-screen bg-background">
                {/* Welcome Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                Welcome back, {session.user?.name || "Seller"}!
                                👋
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Here's what's happening with your business today
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button asChild>
                                <Link href="/service/create">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Service
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/seller/orders">
                                    <Package className="h-4 w-4 mr-2" />
                                    View Orders
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-8">
                    <Suspense
                        fallback={
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {[...Array(4)].map((_, i) => (
                                    <Card key={i} className="animate-pulse">
                                        <CardContent className="p-6">
                                            <div className="h-8 bg-muted rounded mb-2"></div>
                                            <div className="h-4 bg-muted rounded w-3/4"></div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        }
                    >
                        <StatsGrid />
                    </Suspense>
                </div>

                {/* Performance Insights Section - 2nd Row */}
                <div className="mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Performance Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">
                                                Monthly Growth
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                vs last month
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-sm text-green-600 dark:text-green-400">
                                            +{isGrowth ? "12.5" : "8.2"}%
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">
                                                Customer Satisfaction
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Average rating
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold text-sm">
                                                4.8
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">
                                                Avg. Delivery Time
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                This month
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-sm">
                                            2.3 days
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
                    {/* Revenue Chart - Takes 3 columns */}
                    <div className="xl:col-span-3">
                        <Suspense
                            fallback={
                                <Card className="animate-pulse">
                                    <CardHeader>
                                        <div className="h-6 bg-muted rounded w-1/3"></div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[350px] bg-muted rounded"></div>
                                    </CardContent>
                                </Card>
                            }
                        >
                            <RevenueChart data={revenueData} />
                        </Suspense>
                    </div>

                    {/* Right Sidebar - Takes 1 column */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href="/seller/services">
                                        <Package className="h-4 w-4 mr-2" />
                                        Manage Services
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href="/seller/orders">
                                        <Clock className="h-4 w-4 mr-2" />
                                        View Orders
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href="/portfolio-showcase">
                                        <Users className="h-4 w-4 mr-2" />
                                        Portfolio
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Top Performing Services */}
                    <Suspense
                        fallback={
                            <Card className="animate-pulse">
                                <CardHeader>
                                    <div className="h-6 bg-muted rounded w-1/2"></div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {[...Array(3)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between"
                                            >
                                                <div className="h-4 bg-muted rounded w-2/3"></div>
                                                <div className="h-4 bg-muted rounded w-1/4"></div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        }
                    >
                        <TopServicesList />
                    </Suspense>

                    {/* Recent Orders */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    Recent Orders
                                </span>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/seller/orders">
                                        View All
                                        <ArrowUpRight className="h-4 w-4 ml-1" />
                                    </Link>
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentOrders.orders.length === 0 ? (
                                <div className="text-center py-8">
                                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                    <p className="text-muted-foreground">
                                        No orders yet
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        You&apos;re doing great! Keep up the excellent work.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentOrders.orders
                                        .slice(0, 5)
                                        .map((order) => (
                                            <div
                                                key={order.id}
                                                className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center">
                                                        <Users className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm">
                                                            {order.serviceTitle}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {order.clientName} •{" "}
                                                            {new Date(
                                                                order.createdAt
                                                            ).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-sm">
                                                        Rp{" "}
                                                        {order.totalPrice.toLocaleString()}
                                                    </p>
                                                    <Badge
                                                        variant={
                                                            order.status ===
                                                            "Done"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                        className="text-xs"
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Section - Tips & Resources */}
                <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">
                                    💡 Pro Tips
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    Keep your services updated with fresh
                                    content and respond quickly to customer
                                    inquiries to boost your ratings and increase
                                    sales.
                                </p>
                            </div>
                            <Button variant="outline" size="sm">
                                Learn More
                                <ArrowUpRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageInset>
    );
};

export default SellerDashboardPage;
