"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Star, User, GraduationCap, MessageSquare, Award } from "lucide-react";

interface FormData {
    studentName: string;
    class: string;
    rating: string;
    comments: string;
}

export default function StudentRatingFormComponent() {
    const { toast } = useToast();
    const [formData, setFormData] = useState<FormData>({
        studentName: "",
        class: "",
        rating: "",
        comments: "",
    });
    const [hoveredRating, setHoveredRating] = useState<number>(0);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        toast({
            description: "Rating submitted successfully ✅",
        });

        setFormData({
            studentName: "",
            class: "",
            rating: "",
            comments: "",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-6">
            <Card className="w-full max-w-lg shadow-xl border-0 bg-card/95 backdrop-blur-sm">
                <CardHeader className="text-center space-y-2 pb-8">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                        <Award className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-serif font-bold text-foreground">
                        Student Rating Form
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Evaluate student performance and provide feedback
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <Label
                                htmlFor="studentName"
                                className="text-sm font-medium flex items-center gap-2"
                            >
                                <User className="w-4 h-4 text-primary" />
                                Student Name
                            </Label>
                            <Input
                                id="studentName"
                                type="text"
                                value={formData.studentName}
                                onChange={(e) =>
                                    handleInputChange(
                                        "studentName",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter student's full name"
                                className="h-12 px-4 bg-background border-border focus:border-primary transition-colors"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <Label
                                htmlFor="class"
                                className="text-sm font-medium flex items-center gap-2"
                            >
                                <GraduationCap className="w-4 h-4 text-primary" />
                                Class
                            </Label>
                            <Input
                                id="class"
                                type="text"
                                value={formData.class}
                                onChange={(e) =>
                                    handleInputChange("class", e.target.value)
                                }
                                placeholder="Enter class or grade level"
                                className="h-12 px-4 bg-background border-border focus:border-primary transition-colors"
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <Star className="w-4 h-4 text-primary" />
                                Performance Rating
                            </Label>
                            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                                <div className="flex justify-center space-x-2">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            type="button"
                                            className="group transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full p-1"
                                            onClick={() =>
                                                handleInputChange(
                                                    "rating",
                                                    rating.toString()
                                                )
                                            }
                                            onMouseEnter={() =>
                                                setHoveredRating(rating)
                                            }
                                            onMouseLeave={() =>
                                                setHoveredRating(0)
                                            }
                                        >
                                            <Star
                                                className={`w-8 h-8 transition-colors ${
                                                    rating <=
                                                    (hoveredRating ||
                                                        Number.parseInt(
                                                            formData.rating
                                                        ) ||
                                                        0)
                                                        ? "fill-accent text-accent"
                                                        : "text-muted-foreground hover:text-accent/50"
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <div className="text-center">
                                    <span className="text-sm text-muted-foreground">
                                        {formData.rating && (
                                            <>
                                                {formData.rating === "1" &&
                                                    "Needs Improvement"}
                                                {formData.rating === "2" &&
                                                    "Below Average"}
                                                {formData.rating === "3" &&
                                                    "Average"}
                                                {formData.rating === "4" &&
                                                    "Good"}
                                                {formData.rating === "5" &&
                                                    "Excellent"}
                                            </>
                                        )}
                                        {!formData.rating && "Click to rate"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label
                                htmlFor="comments"
                                className="text-sm font-medium flex items-center gap-2"
                            >
                                <MessageSquare className="w-4 h-4 text-primary" />
                                Comments & Feedback
                            </Label>
                            <Textarea
                                id="comments"
                                value={formData.comments}
                                onChange={(e) =>
                                    handleInputChange(
                                        "comments",
                                        e.target.value
                                    )
                                }
                                placeholder="Provide detailed feedback about the student's performance..."
                                rows={4}
                                className="resize-none bg-background border-border focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Submit Rating
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
