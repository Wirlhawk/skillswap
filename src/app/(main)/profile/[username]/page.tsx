import { PortfolioShowcase } from "../../../../components/portfolio/portfolio-showcase";
import { ProfileInfoCard } from "../../../../components/profile";
import PageInset from "../../../../components/shared/page-inset";
import { ModularTabs } from "../../../../components/tabs-03";
import { auth } from "../../../../lib/auth";
import { getPortfolio } from "../../../../server/portfolio";
import { getProfile } from "../../../../server/user";
import {
    getSellerServices,
    getSellerStats,
} from "../../../../server/dashboard";
import { getSellerReviews } from "../../../../server/review";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Card } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Package, Star, Users, Plus } from "lucide-react";
import Link from "next/link";
import ServiceCard from "../../../../components/service/service-card";
import { user } from "@/db/schema";

interface PageProps {
    params: {
        username: string;
    };
}

export default async function ProfilePage({ params }: PageProps) {
    const { username } = await params;

    const [session, profileResult, portfolioResult] = await Promise.all([
        auth.api.getSession({ headers: await headers() }),
        getProfile(username),
        getPortfolio(username),
    ]);

    if (!session?.user) {
        redirect("/login");
    }

    if (!profileResult.data) {
        notFound();
    }

    const profile = profileResult.data;
    const isOwnProfile = session.user.username === username;
    // Check if user is a seller (STUDENT or TEACHER role)
    const isSeller = profile.role === "STUDENT" || profile.role === "TEACHER";

    // Fetch seller data if the user is a seller
    let sellerServices = null;
    let sellerReviews = null;
    let sellerStats = null;

    if (isSeller && session.user.id) {
        try {
            [sellerServices, sellerReviews, sellerStats] = await Promise.all([
                getSellerServices(session.user.id, { page: 1, pageSize: 10 }),
                getSellerReviews(session.user.id, 10, 0),
                getSellerStats(session.user.id),
            ]);
        } catch (error) {
            console.error("Failed to fetch seller data:", error);
        }
    }

    return (
        <PageInset>
            <div className="space-y-8">
                {/* Profile Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="space-y-6">
                        <ProfileInfoCard
                            user={{
                                username: profile.username || "",
                                name: profile.name || "",
                                bio: profile.bio || undefined,
                                school: profile.school || undefined,
                                skills: profile.skills || undefined,
                                image: profile.image || "",
                            }}
                            major={profile.major || ""}
                            isEditable={isOwnProfile}
                        />

                        {/* Seller Stats Card */}
                        {isSeller && (
                            <Card className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Package className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-semibold">
                                            Seller Statistics
                                        </h3>
                                    </div>

                                    {sellerStats && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="text-center p-3 rounded-lg bg-primary/5">
                                                    <p className="text-2xl font-bold text-primary">
                                                        {sellerStats.totalOrders || 0}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Total Orders
                                                    </p>
                                                </div>

                                                <div className="text-center p-3 rounded-lg bg-green-500/5">
                                                    <p className="text-2xl font-bold text-green-600">
                                                        {sellerStats.newCustomers || 0}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        New Customers
                                                    </p>
                                                </div>

                                                <div className="text-center p-3 rounded-lg bg-orange-500/5">
                                                    <p className="text-2xl font-bold text-orange-600">
                                                        {sellerServices?.services
                                                            ?.length || 0}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Active Services
                                                    </p>
                                                </div>

                                                <div className="text-center p-3 rounded-lg bg-purple-500/5">
                                                    <p className="text-2xl font-bold text-purple-600">
                                                        {sellerReviews &&
                                                        sellerReviews.success &&
                                                        sellerReviews.stats &&
                                                        typeof sellerReviews.stats.totalReviews === "number"
                                                            ? sellerReviews.stats.totalReviews
                                                            : 0}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Total Reviews
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Revenue Stats - Only visible to the seller (own profile) */}
                                            {isOwnProfile && (
                                                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                                                    <div className="text-center p-3 rounded-lg bg-blue-500/5">
                                                    <p className="text-2xl font-bold text-blue-600">
                                                            {sellerStats.totalRevenue
                                                                ? `Rp ${sellerStats.totalRevenue.toLocaleString()}`
                                                                : "Rp 0"}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Total Revenue
                                                        </p>
                                                    </div>

                                                    <div className="text-center p-2 rounded-lg bg-indigo-500/5">
                                                        <p className="text-2xl font-bold text-indigo-600">
                                                            {sellerStats.averageOrderValue
                                                                ? `Rp ${sellerStats.averageOrderValue.toLocaleString()}`
                                                                : "Rp 0"}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Avg. Order Value
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="pt-2 border-t">
                                                <p className="text-xs text-muted-foreground text-center">
                                                    Based on completed orders
                                                </p>
                                            </div>
                                        </>
                                    )}
                                    {!sellerStats && (
                                        <div className="text-center py-4">
                                            <p className="text-sm text-muted-foreground">
                                                No statistics available yet
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        )}
                    </div>

                    <div className="col-span-1 md:col-span-2 space-y-3">
                        {isSeller ? (
                            <ModularTabs
                                tabs={[
                                    {
                                        name: "Portfolio",
                                        value: "portfolio",
                                        content: (
                                            <PortfolioShowcase
                                                portfolios={
                                                    portfolioResult.success &&
                                                    portfolioResult.data
                                                        ? portfolioResult.data
                                                        : []
                                                }
                                                isOwnProfile={isOwnProfile && isSeller}
                                            />
                                        ),
                                    },
                                    {
                                        name: "Services",
                                        value: "services",
                                        content: (
                                            <div className="space-y-4">
                                                {sellerServices &&
                                                sellerServices.services.length >
                                                    0 ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {sellerServices.services.map(
                                                            (service) => (
                                                                <ServiceCard
                                                                    key={service.id}
                                                                    serviceId={
                                                                        service.id
                                                                    }
                                                                    title={
                                                                        service.title
                                                                    }
                                                                    description={
                                                                        service.description
                                                                    }
                                                                    images={
                                                                        service.images ??
                                                                        []
                                                                    }
                                                                    category={service.categoryName || ""}
                                                                    price={
                                                                        service.price
                                                                    }
                                                                    tags={
                                                                        service.tags ??
                                                                        []
                                                                    }
                                                                    user={{
                                                                        username:
                                                                            service.username || "",
                                                                        major: "",
                                                                        image: service.userProfile || "",
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-12">
                                                        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                                        <h3 className="text-lg font-semibold mb-2">
                                                            No services yet
                                                        </h3>
                                                        <p className="text-muted-foreground mb-4">
                                                            {isOwnProfile
                                                                ? "Start building your business by creating your first service"
                                                                : "This user hasn't created any services yet"}
                                                        </p>
                                                        {isOwnProfile && (
                                                            <Button asChild>
                                                                <Link href="/service/create">
                                                                    <Plus className="h-4 w-4 mr-2" />
                                                                    Create Your
                                                                    First Service
                                                                </Link>
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ),
                                    },
                                    {
                                        name: "Reviews",
                                        value: "reviews",
                                        content: (
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between mb-6">
                                                    <h3 className="text-xl font-bold text-foreground">
                                                        Customer Reviews
                                                    </h3>
                                                    {sellerReviews &&
                                                        sellerReviews.success &&
                                                        "stats" in
                                                            sellerReviews && (
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex items-center gap-1">
                                                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                                                    <span className="font-semibold text-lg">
                                                                        {Number(
                                                                            sellerReviews
                                                                                .stats!
                                                                                .averageRating
                                                                        ).toFixed(
                                                                            1
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <Badge variant="outline">
                                                                    {Number(
                                                                        sellerReviews
                                                                            .stats!
                                                                            .averageRating
                                                                    ) >= 4.5
                                                                        ? "Excellent"
                                                                        : Number(
                                                                                sellerReviews
                                                                                    .stats!
                                                                                    .averageRating
                                                                            ) >= 4.0
                                                                          ? "Very Good"
                                                                          : Number(
                                                                                  sellerReviews
                                                                                      .stats!
                                                                                      .averageRating
                                                                              ) >=
                                                                              3.5
                                                                            ? "Good"
                                                                            : Number(
                                                                                    sellerReviews
                                                                                        .stats!
                                                                                        .averageRating
                                                                                ) >=
                                                                                3.0
                                                                              ? "Fair"
                                                                              : "Poor"}
                                                                </Badge>
                                                            </div>
                                                        )}
                                                </div>

                                                {/* Reviews List */}
                                                <div className="space-y-4">
                                                    {sellerReviews &&
                                                    sellerReviews.success &&
                                                    "reviews" in sellerReviews &&
                                                    sellerReviews.reviews!.length >
                                                        0 ? (
                                                        sellerReviews.reviews!.map(
                                                            (review) => (
                                                                <Card
                                                                    key={review.id}
                                                                    className="p-4"
                                                                >
                                                                    <div className="flex items-start gap-3">
                                                                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                                            {review
                                                                                .client
                                                                                .image ? (
                                                                                <img
                                                                                    src={
                                                                                        review
                                                                                            .client
                                                                                            .image
                                                                                    }
                                                                                    alt={
                                                                                        review
                                                                                            .client
                                                                                            .name ||
                                                                                        "User"
                                                                                    }
                                                                                    className="w-10 h-10 rounded-full object-cover"
                                                                                />
                                                                            ) : (
                                                                                <Users className="h-5 w-5 text-muted-foreground" />
                                                                            )}
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <div className="flex items-center gap-2 mb-2">
                                                                                <span className="font-medium text-sm">
                                                                                    {review
                                                                                        .client
                                                                                        .name ||
                                                                                        "Anonymous"}
                                                                                </span>
                                                                                <div className="flex items-center gap-1">
                                                                                    {[
                                                                                        ...Array(
                                                                                            5
                                                                                        ),
                                                                                    ].map(
                                                                                        (
                                                                                            _,
                                                                                            i
                                                                                        ) => (
                                                                                            <Star
                                                                                                key={
                                                                                                    i
                                                                                                }
                                                                                                className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                                                                            />
                                                                                        )
                                                                                    )}
                                                                                </div>
                                                                                <span className="text-xs text-muted-foreground">
                                                                                    {new Date(
                                                                                        review.createdAt
                                                                                    ).toLocaleDateString(
                                                                                        "en-US",
                                                                                        {
                                                                                            year: "numeric",
                                                                                            month: "short",
                                                                                            day: "numeric",
                                                                                        }
                                                                                    )}
                                                                                </span>
                                                                            </div>
                                                                            {review.service && (
                                                                                <p className="text-xs text-muted-foreground mb-2">
                                                                                    Service:{" "}
                                                                                    {
                                                                                        review
                                                                                            .service
                                                                                            .title
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                            <p className="text-sm text-muted-foreground">
                                                                                &ldquo;
                                                                                {
                                                                                    review.comment
                                                                                }
                                                                                &rdquo;
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </Card>
                                                            )
                                                        )
                                                    ) : (
                                                        <div className="text-center py-12">
                                                            <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                                            <h3 className="text-lg font-semibold mb-2">
                                                                No reviews yet
                                                            </h3>
                                                            <p className="text-muted-foreground">
                                                                {isOwnProfile
                                                                    ? "Start selling services to receive customer reviews"
                                                                    : "This user hasn't received any reviews yet"}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    },
                                ]}
                                defaultValue="portfolio"
                                className="w-full"
                            />
                        ) : (
                            <div className="text-center py-12 bg-muted/20 rounded-lg">
                                <h3 className="text-lg font-semibold mb-2">
                                    User Profile
                                </h3>
                                <p className="text-muted-foreground">
                                    This user is not a seller and doesn't have portfolio, services, or reviews.
                                </p>
                                {isOwnProfile && (
                                    <div className="mt-4">
                                        <Button asChild variant="outline">
                                            <Link href="/become-seller">
                                                <Plus className="h-4 w-4 mr-2" />
                                                Become a Seller
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageInset>
    );
}
