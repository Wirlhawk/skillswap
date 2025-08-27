"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createReview } from "@/server/review";

const reviewSchema = z.object({
    rating: z
        .number()
        .min(1, "Please select a rating")
        .max(5, "Rating must be between 1 and 5"),
    comment: z
        .string()
        .min(10, "Review must be at least 10 characters")
        .max(500, "Review must be less than 500 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewDialogProps {
    orderId: string;
    sellerName: string;
    children: React.ReactNode;
}

export function ReviewDialog({
    orderId,
    sellerName,
    children,
}: ReviewDialogProps) {
    const [open, setOpen] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(0);

    const form = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 0,
            comment: "",
        },
    });

    const watchedRating = form.watch("rating");
    const watchedComment = form.watch("comment");

    const onSubmit = async (data: ReviewFormData) => {
        try {
            const result = await createReview({
                orderId,
                rating: data.rating,
                comment: data.comment,
            });

            if (!result.success) {
              throw new Error(result.error);
            }
            toast.success("Review submitted!", {
                description: "Thank you for your feedback.",
            });

            setOpen(false);
            form.reset();
        } catch (error) {
            toast.error("Error", {
                description:
                    (error as Error)?.message ||
                    "Failed to submit review. Please try again.",
            });
        }
    };

    const renderStars = (interactive = false) => {
        return Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            const isActive = interactive
                ? hoveredStar > 0
                    ? starValue <= hoveredStar
                    : starValue <= watchedRating
                : starValue <= watchedRating;

            return (
                <button
                    key={index}
                    type="button"
                    disabled={!interactive}
                    className={`p-1 transition-colors ${interactive ? "hover:scale-110" : ""}`}
                    onClick={() =>
                        interactive && form.setValue("rating", starValue)
                    }
                    onMouseEnter={() =>
                        interactive && setHoveredStar(starValue)
                    }
                    onMouseLeave={() => interactive && setHoveredStar(0)}
                >
                    <Star
                        className={`h-6 w-6 transition-colors ${isActive ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                </button>
            );
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Leave a Review</DialogTitle>
                    <DialogDescription>
                        Share your experience working with {sellerName}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-1">
                                            {renderStars(true)}
                                            {watchedRating > 0 && (
                                                <span className="ml-2 text-sm text-muted-foreground">
                                                    {watchedRating} star
                                                    {watchedRating !== 1
                                                        ? "s"
                                                        : ""}
                                                </span>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Review</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Share your experience working with this freelancer..."
                                            className="min-h-[100px] resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className="flex justify-between items-center">
                                        <FormMessage />
                                        <span className="text-xs text-muted-foreground">
                                            {watchedComment.length}/500
                                        </span>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1">
                                Submit Review
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
