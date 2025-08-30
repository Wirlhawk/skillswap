import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "../ui/header";
import Link from "next/link";
import { getRisingStars } from "@/server/user";

export async function RisingStarsLeaderboard() {
    const risingStarsResult = await getRisingStars(5);
    const risingStars = risingStarsResult.success ? risingStarsResult.data : [];
    return (
        // <Card className="max-w-7xl mx-auto bg-accent mb-8">
        //     <CardContent className="px-8 gap">
        <div className="max-w-7xl mx-auto bg-accent mb-8 rounded-lg border p-6">
            <Header>Rising Stars 🔥</Header>
            <p>Top 5 Students with most order this month</p>
            <div
                className="mt-5 flex gap-6 overflow-x-auto pb-2 px-1 scrollbar-thin scrollbar-thumb-gray-300 [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                        scrollbar-hidden
                        "
            >
                {risingStars!.length > 0 ? (
                    risingStars!.map((star, index) => (
                        <Link href={`/profile/${star.username}`} key={star.id}>
                            <Card className="min-w-[300px] flex-shrink-0 hover:shadow-lg transition-all duration-200 cursor-pointer">
                                <CardContent className="p-6 py-2">
                                    <div className="flex items-center justify-between gap-10">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <Avatar className="h-14 w-14">
                                                    <AvatarImage
                                                        src={
                                                            star.avatar ||
                                                            "/placeholder.svg"
                                                        }
                                                        alt={star.name}
                                                    />
                                                    <AvatarFallback className="text-lg font-semibold">
                                                        {star.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="absolute -top-2 -right-2 bg-foreground text-background text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-lg truncate">
                                                    {star.name}
                                                </h4>
                                                <div className="text-sm text-muted-foreground mb-2">
                                                    {star.majors}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-sm font-medium">
                                                        {star.rating.toFixed(1)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center flex-col bg-primary rounded-full size-14 gap-0 border">
                                            <div className="text-lg font-bold text-foreground">
                                                {star.completedOrders}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="w-full text-center py-8">
                        <p className="text-muted-foreground">
                            {risingStarsResult.success === false
                                ? `Error loading rising stars: ${risingStarsResult.error}`
                                : "No rising stars this month yet. Be the first to complete an order!"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
