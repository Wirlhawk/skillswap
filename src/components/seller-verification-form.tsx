"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Upload, FileImage, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Major {
    id: string;
    name: string;
    alias: string;
}

interface SellerVerificationFormProps {
    majors: Major[];
    onSubmit: (data: {
        studentIdImage: File;
        majorId: string;
        schoolName: string;
    }) => Promise<void>;
}

export function SellerVerificationForm({
    majors,
    onSubmit,
}: SellerVerificationFormProps) {
    const [studentIdImage, setStudentIdImage] = useState<File | null>(null);
    const [majorId, setMajorId] = useState<string>("");
    const [schoolName, setSchoolName] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                setStudentIdImage(file);
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagePreview(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                toast.error("Please select an image file");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!studentIdImage) {
            toast.error("Please upload your student ID image");
            return;
        }

        if (!majorId) {
            toast.error("Please select your major");
            return;
        }

        if (!schoolName.trim()) {
            toast.error("Please enter your school name");
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit({
                studentIdImage,
                majorId,
                schoolName: schoolName.trim(),
            });

            toast.success("Verification request submitted successfully!");

            // Reset form
            setStudentIdImage(null);
            setMajorId("");
            setSchoolName("");
            setImagePreview("");
        } catch (error) {
            toast.error(
                "Failed to submit verification request. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                    Become a Seller
                </CardTitle>
                <CardDescription>
                    Submit your student verification to start selling your
                    skills and services
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Student ID Image Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="studentIdImage">
                            Student ID Image *
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                            <input
                                id="studentIdImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="studentIdImage"
                                className="cursor-pointer"
                            >
                                {imagePreview ? (
                                    <div className="space-y-2">
                                        <img
                                            src={imagePreview}
                                            alt="Student ID preview"
                                            className="w-32 h-20 object-cover mx-auto rounded border"
                                        />
                                        <p className="text-sm text-gray-600">
                                            Click to change image
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                                        <p className="text-sm text-gray-600">
                                            Click to upload your student ID
                                            image
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Supports: JPG, PNG, GIF (Max 5MB)
                                        </p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    {/* Major Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="major">Major *</Label>
                        <Select value={majorId} onValueChange={setMajorId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your major" />
                            </SelectTrigger>
                            <SelectContent>
                                {majors.map((major) => (
                                    <SelectItem key={major.id} value={major.id}>
                                        {major.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* School Name */}
                    <div className="space-y-2">
                        <Label htmlFor="schoolName">School Name *</Label>
                        <Input
                            id="schoolName"
                            type="text"
                            placeholder="Enter your school name"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={
                            isSubmitting ||
                            !studentIdImage ||
                            !majorId ||
                            !schoolName.trim()
                        }
                        className="w-full"
                    >
                        {isSubmitting
                            ? "Submitting..."
                            : "Submit Verification Request"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                        Please ensure your student ID is clearly visible and legible.
                        We&apos;ll review your application within 24-48 hours.
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
