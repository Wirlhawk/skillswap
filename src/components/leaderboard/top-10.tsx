"use client";

import { Trophy, Medal, Award, Star, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const topStudents = [
    {
        id: 1,
        rank: 1,
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=60&width=60",
        university: "MIT",
        totalOrders: 247,
        rating: 4.9,
        totalEarnings: "$12,450",
        specialties: ["Web Dev", "Mobile"],
        completionRate: 98,
        responseTime: "< 1 hour",
        badge: "Elite Seller",
    },
    {
        id: 2,
        rank: 2,
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=60&width=60",
        university: "Stanford",
        totalOrders: 189,
        rating: 4.8,
        totalEarnings: "$9,230",
        specialties: ["Design", "Branding"],
        completionRate: 96,
        responseTime: "< 2 hours",
        badge: "Top Rated",
    },
    {
        id: 3,
        rank: 3,
        name: "David Kim",
        avatar: "/placeholder.svg?height=60&width=60",
        university: "UC Berkeley",
        totalOrders: 156,
        rating: 4.7,
        totalEarnings: "$7,890",
        specialties: ["Writing", "Marketing"],
        completionRate: 94,
        responseTime: "< 3 hours",
        badge: "Rising Star",
    },
    {
        id: 4,
        rank: 4,
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=60&width=60",
        university: "Harvard",
        totalOrders: 134,
        rating: 4.8,
        totalEarnings: "$6,720",
        specialties: ["Video", "Animation"],
        completionRate: 97,
        responseTime: "< 2 hours",
        badge: "Top Rated",
    },
    {
        id: 5,
        rank: 5,
        name: "James Wilson",
        avatar: "/placeholder.svg?height=60&width=60",
        university: "CMU",
        totalOrders: 128,
        rating: 4.6,
        totalEarnings: "$6,400",
        specialties: ["Data Science", "AI"],
        completionRate: 93,
        responseTime: "< 4 hours",
        badge: "Specialist",
    },
    {
        id: 6,
        rank: 6,
        name: "Emma Davis",
        avatar: "/placeholder.svg?height=60&width=60",
        university: "Yale",
        totalOrders: 112,
        rating: 4.7,
        totalEarnings: "$5,600",
        specialties: ["Photography", "Design"],
        completionRate: 95,
        responseTime: "< 3 hours",
        badge: "Creative Pro",
    },
    {
        id: 7,
        rank: 7,
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=60&width=60",
        university: "Princeton",
        totalOrders: 98,
        rating: 4.5,
        totalEarnings: "$4,900",
        specialties: ["Business", "Consulting"],
        completionRate: 91,
        responseTime: "< 5 hours",
        badge: "Advisor",
    },
    {
        id: 8,
        rank: 8,
        name: "Lisa Anderson",
        avatar: "/placeholder.svg?height=60&width=60",
        university: "Columbia",
        totalOrders: 87,
        rating: 4.6,
        totalEarnings: "$4,350",
        specialties: ["Translation", "Writing"],
        completionRate: 92,
        responseTime: "< 4 hours",
        badge: "Language Expert",
    },
];

const getRankIcon = (rank: number) => {
    switch (rank) {
        case 1:
            return <Trophy className="h-6 w-6 text-yellow-500" />;
        case 2:
            return <Medal className="h-6 w-6 text-gray-400" />;
        case 3:
            return <Award className="h-6 w-6 text-amber-600" />;
        default:
            return (
                <span className="text-2xl font-bold text-muted-foreground">
                    #{rank}
                </span>
            );
    }
};

const getBadgeColor = (badge: string) => {
    switch (badge) {
        case "Elite Seller":
            return "bg-purple-100 text-purple-800 border-purple-200";
        case "Top Rated":
            return "bg-blue-100 text-blue-800 border-blue-200";
        case "Rising Star":
            return "bg-green-100 text-green-800 border-green-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
    }
};

export default function LeaderboardPage() {
    return (
        <div>
            <section className="bg-background py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Trophy className="h-8 w-8 text-yellow-500" />
                        <h2 className="text-4xl font-bold">
                            Student Leaderboard
                        </h2>
                    </div>
                    <p className="text-xl text-muted-foreground mb-8">
                        Top performing student freelancers ranked by total
                        orders completed
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                                <div className="text-2xl font-bold">2,847</div>
                                <div className="text-sm text-muted-foreground">
                                    Active Students
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                                <div className="text-2xl font-bold">15,234</div>
                                <div className="text-sm text-muted-foreground">
                                    Orders Completed
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="pt-6">
                                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                                <div className="text-2xl font-bold">4.7</div>
                                <div className="text-sm text-muted-foreground">
                                    Average Rating
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Top Performers</h3>
                    <p className="text-muted-foreground">
                        Students ranked by total orders completed this semester
                    </p>
                </div>

                <div className="space-y-4">
                    {topStudents.map((student) => (
                        <Card
                            key={student.id}
                            className="hover:shadow-lg transition-shadow"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-center gap-6">
                                    {/* Rank */}
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                                        {getRankIcon(student.rank)}
                                    </div>

                                    {/* Avatar and Basic Info */}
                                    <div className="flex items-center gap-4 flex-1">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage
                                                src={
                                                    student.avatar ||
                                                    "/placeholder.svg"
                                                }
                                            />
                                            <AvatarFallback className="text-lg">
                                                {student.name[0]}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-xl font-semibold">
                                                    {student.name}
                                                </h4>
                                                <Badge
                                                    className={getBadgeColor(
                                                        student.badge
                                                    )}
                                                >
                                                    {student.badge}
                                                </Badge>
                                            </div>
                                            <p className="text-muted-foreground mb-2">
                                                {student.university}
                                            </p>
                                            <div className="flex gap-2">
                                                {student.specialties.map(
                                                    (specialty) => (
                                                        <Badge
                                                            key={specialty}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {specialty}
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-primary">
                                                {student.totalOrders}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Orders
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xl font-bold">
                                                    {student.rating}
                                                </span>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Rating
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-green-600">
                                                {student.totalEarnings}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Earned
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold">
                                                {student.completionRate}%
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Complete
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    <div className="flex flex-col gap-2">
                                        <Button size="sm">View Profile</Button>
                                        <div className="text-xs text-muted-foreground text-center">
                                            {student.responseTime}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Button variant="outline" size="lg">
                        View More Students
                    </Button>
                </div>
            </main>
        </div>
    );
}
