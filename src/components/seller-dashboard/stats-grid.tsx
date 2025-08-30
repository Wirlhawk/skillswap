import React from "react";
import KpiCard from "./kpi-card";
import { getSellerStats } from "@/server/dashboard";
import { DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { auth } from "@/lib/auth";
import formatRupiah from "@/utils/format-rupiah";
import { headers } from "next/headers";

const StatsGrid = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!userId) {
        return (
            <div className="text-center text-muted-foreground">
                Please log in to see your stats.
            </div>
        );
    }

    const stats = await getSellerStats(userId);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
                title="Total Revenue"
                value={formatRupiah(stats.totalRevenue)}
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            />
            <KpiCard
                title="Total Orders"
                value={stats.totalOrders}
                icon={
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                }
            />
            <KpiCard
                title="New Customers"
                value={stats.newCustomers}
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <KpiCard
                title="Avg. Order Value"
                value={formatRupiah(stats.averageOrderValue)}
                icon={<Package className="h-4 w-4 text-muted-foreground" />}
            />
        </div>
    );
};

export default StatsGrid;
