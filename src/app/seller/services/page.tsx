import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/service/service-card";
import PageInset from "@/components/shared/page-inset";
import React from "react";
import { getSellerServices } from "@/server/dashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Package,
    Star,
    TrendingUp,
    Users,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SellerServicesPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

const SellerServicesPage = async ({
    searchParams,
}: SellerServicesPageProps) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!userId) {
        return (
            <PageInset>
                <div className="p-4 text-center">
                    Please log in to view your services.
                </div>
            </PageInset>
        );
    }

    // Parse and validate page parameter
    const params = await searchParams;
    const page = params.page ? parseInt(params.page) : 1;

    // Redirect if page is invalid
    if (isNaN(page) || page < 1) {
        redirect("/seller/services?page=1");
    }

    const { services, totalPages } = await getSellerServices(userId, {
        page,
        pageSize: 10,
    });

    // Calculate stats
    const totalServices = services.length;
    const activeServices = services.filter((s) => s.createdAt).length;
    const totalRevenue = services.reduce(
        (sum, service) => sum + service.price,
        0
    );
    const avgPrice = totalServices > 0 ? totalRevenue / totalServices : 0;

    return (
        <PageInset>
            <div className="min-h-screen bg-background">
                {/* Welcome Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                My Services 📦
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Manage and showcase your professional services
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button asChild>
                                <Link href="/service/create">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create New Service
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/seller/dashboard">
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    View Dashboard
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
                                        Total Services
                                    </p>
                                    <p className="text-2xl font-bold text-foreground">
                                        {totalServices}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30">
                                    <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">
                                        Active Services
                                    </p>
                                    <p className="text-2xl font-bold text-foreground">
                                        {activeServices}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30">
                                    <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">
                                        Total Value
                                    </p>
                                    <p className="text-2xl font-bold text-primary">
                                        Rp {totalRevenue.toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">
                                        Avg. Price
                                    </p>
                                    <p className="text-2xl font-bold text-foreground">
                                        Rp {avgPrice.toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30">
                                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Services Grid */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-foreground">
                            All Services ({totalServices})
                        </h2>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-sm">
                                Page {page} of {totalPages}
                            </Badge>
                        </div>
                    </div>

                    {services.length === 0 ? (
                        <Card className="text-center py-12">
                            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                                No services yet
                            </h3>
                            <p className="text-muted-foreground mb-4">
                                Start building your business by creating your
                                first service
                            </p>
                            <Button asChild>
                                <Link href="/service/create">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Your First Service
                                </Link>
                            </Button>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div key={service.id} className="group">
                                    <ServiceCard
                                        serviceId={service.id}
                                        title={service.title}
                                        description={service.description}
                                        images={service.images ?? []}
                                        category={""}
                                        price={service.price}
                                        tags={service.tags ?? []}
                                        user={{
                                            username: "",
                                            major: "",
                                            image: "",
                                        }}
                                    />
                                    <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={`/service/${service.id}`}
                                            >
                                                View Details
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={`/seller/services/edit/${service.id}`}
                                            >
                                                Edit
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 py-6">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page <= 1}
                            asChild
                        >
                            <Link href={`/seller/services?page=${page - 1}`}>
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Link>
                        </Button>
                        <div className="text-sm">
                            Page {page} of {totalPages}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages}
                            asChild
                        >
                            <Link href={`/seller/services?page=${page + 1}`}>
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </PageInset>
    );
};

export default SellerServicesPage;
