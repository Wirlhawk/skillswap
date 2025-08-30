import { getTopPerformingServices } from "@/server/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import formatRupiah from "@/utils/format-rupiah";
import { headers } from "next/headers";
import { TrendingUp, Package, Star } from "lucide-react";
import Link from "next/link";

const TopServicesList = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!userId) {
        return null;
    }

    const services = await getTopPerformingServices(userId);

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Top Performing Services
                </CardTitle>
            </CardHeader>
            <CardContent>
                {services.length === 0 ? (
                    <div className="text-center py-6">
                        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground mb-1">
                            No completed orders yet
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Start selling to see your top services
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {services.map((service, index) => (
                            <div
                                key={service.serviceId}
                                className="group p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate group-hover:text-primary transition-colors duration-200">
                                            {service.serviceTitle}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs text-muted-foreground">
                                                    4.8
                                                </span>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                Top Seller
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 text-right">
                                        <p className="font-semibold text-sm text-primary">
                                            {formatRupiah(service.totalRevenue)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Total Revenue
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {services.length > 0 && (
                            <div className="pt-2">
                                <Link
                                    href="/seller/services"
                                    className="text-xs text-primary hover:text-primary/80 transition-colors duration-200 flex items-center gap-1 justify-center"
                                >
                                    View all services
                                    <TrendingUp className="h-3 w-3" />
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default TopServicesList;
