"use client";

import type React from "react";

import { useState } from "react";
import { Star, MessageSquare, User } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ReviewData {
    name: string;
    rating: number;
    comment: string;
}

export default function StarReview() {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast({
                title: "Name Required",
                description: "Please enter your name before submitting.",
                variant: "destructive",
            });
            return;
        }

        if (rating === 0) {
            toast({
                title: "Rating Required",
                description: "Please select a star rating before submitting.",
                variant: "destructive",
            });
            return;
        }

        const reviewData: ReviewData = {
            name: name.trim(),
            rating,
            comment: comment.trim(),
        };

        // Here you would typically send the review data to your backend
        console.log("Review submitted:", reviewData);

        toast({
            title: "Review Submitted!",
            description: `Thank you ${name} for your ${rating}-star review!`,
        });

        // Reset form
        setRating(0);
        setHoveredRating(0);
        setName("");
        setComment("");
    };

    const getRatingText = (stars: number) => {
        switch (stars) {
            case 1:
                return "Poor";
            case 2:
                return "Fair";
            case 3:
                return "Good";
            case 4:
                return "Very Good";
            case 5:
                return "Excellent";
            default:
                return "Select Rating";
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-serif font-bold text-foreground">
                        Leave a Review
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Share your experience with others
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="text-sm font-medium flex items-center gap-2"
                            >
                                <User className="h-4 w-4 text-primary" />
                                Your Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {/* Star Rating */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium">
                                Rating
                            </Label>
                            <div className="flex flex-col items-center space-y-2">
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                                            onMouseEnter={() =>
                                                setHoveredRating(star)
                                            }
                                            onMouseLeave={() =>
                                                setHoveredRating(0)
                                            }
                                            onClick={() => setRating(star)}
                                        >
                                            <Star
                                                className={`h-8 w-8 transition-colors duration-200 ${
                                                    star <=
                                                    (hoveredRating || rating)
                                                        ? "fill-primary text-primary"
                                                        : "text-muted-foreground hover:text-primary/50"
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <p className="text-sm font-medium text-primary">
                                    {getRatingText(hoveredRating || rating)}
                                </p>
                            </div>
                        </div>

                        {/* Comment */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="comment"
                                className="text-sm font-medium flex items-center gap-2"
                            >
                                <MessageSquare className="h-4 w-4 text-primary" />
                                Comments (Optional)
                            </Label>
                            <Textarea
                                id="comment"
                                placeholder="Tell us about your experience..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="min-h-[100px] resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 transition-colors duration-200"
                        >
                            Submit Review
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
