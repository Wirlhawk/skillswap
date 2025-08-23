"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
    X,
    Heart,
    MessageCircle,
    Share2,
    Download,
    ChevronLeft,
    ChevronRight,
    Eye,
} from "lucide-react";

interface Work {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string;
    files: File[];
    createdAt: string;
    views?: number;
    likes?: number;
    comments?: number;
}

interface MediaPreviewProps {
    work: Work | null;
    onClose: () => void;
    open: boolean;
}

export default function MediaPreview({
    work,
    onClose,
    open,
}: MediaPreviewProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    // Don't render if work is null
    if (!work) {
        return null;
    }

    // Mock images for preview since we don't have actual uploaded files
    const mockImages = [
        `https://0xctge55estdjuk2.public.blob.vercel-storage.com/hKLeq1aHGXNxAVWBuo6cMKw6Vucn8jA1-1755328084908-0-Screenshot%202025-06-26%20223020.png`,
        `https://0xctge55estdjuk2.public.blob.vercel-storage.com/hKLeq1aHGXNxAVWBuo6cMKw6Vucn8jA1-1755328084908-0-Screenshot%202025-06-26%20223020.png`,
        `https://0xctge55estdjuk2.public.blob.vercel-storage.com/hKLeq1aHGXNxAVWBuo6cMKw6Vucn8jA1-1755328084908-0-Screenshot%202025-06-26%20223020.png`,
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % mockImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(
            (prev) => (prev - 1 + mockImages.length) % mockImages.length
        );
    };

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            "web-design": "bg-blue-100 text-blue-800",
            "ui-ux": "bg-purple-100 text-purple-800",
            branding: "bg-orange-100 text-orange-800",
            illustration: "bg-pink-100 text-pink-800",
            photography: "bg-green-100 text-green-800",
            "motion-graphics": "bg-indigo-100 text-indigo-800",
        };
        return colors[category] || "bg-background text-gray-800";
    };

    const categories = [
        { value: "web-design", label: "Web Design" },
        { value: "ui-ux", label: "UI/UX Design" },
        { value: "branding", label: "Branding" },
        { value: "illustration", label: "Illustration" },
        { value: "photography", label: "Photography" },
        { value: "motion-graphics", label: "Motion Graphics" },
    ];

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-6xl max-h-[90vh] p-0 overflow-hidden flex flex-col lg:flex-row">
                <DialogTitle className="sr-only">
                    {work.title} - Portfolio Preview
                </DialogTitle>

                {/* Image Section */}
                <div className="flex-1 relative bg-background">
                    <img
                        // src={mockImages[currentImageIndex]}
                        src="https://0xctge55estdjuk2.public.blob.vercel-storage.com/hKLeq1aHGXNxAVWBuo6cMKw6Vucn8jA1-1755328084908-0-Screenshot%202025-06-26%20223020.png"
                        alt={work.title}
                        className="w-full h-full object-contain"
                    />

                    {/* Navigation Arrows */}
                    {mockImages.length > 1 && (
                        <>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background"
                                onClick={prevImage}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background"
                                onClick={nextImage}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </>
                    )}

                    {/* Image Counter */}
                    {mockImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-background px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} / {mockImages.length}
                        </div>
                    )}

                    {/* Close Button */}
                    <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-4 right-4 bg-background"
                        onClick={onClose}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-96 p-6 flex flex-col">
                    <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                            <Badge className={getCategoryColor(work.category)}>
                                {
                                    categories.find(
                                        (c) => c.value === work.category
                                    )?.label
                                }
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Eye className="w-4 h-4" />
                                {work.views}
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-3 text-gray-900">
                            {work.title}
                        </h2>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {work.description}
                        </p>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-gray-900">
                                Tags:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {work.tags.split(",").map((tag, index) => (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        {tag.trim()}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-2 text-gray-900">
                                Dibuat:
                            </h3>
                            <p className="text-gray-600">
                                {new Date(work.createdAt).toLocaleDateString(
                                    "id-ID",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t pt-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={isLiked ? "text-red-500" : ""}
                                >
                                    <Heart
                                        className={`w-4 h-4 mr-1 ${isLiked ? "fill-current" : ""}`}
                                    />
                                    {work.likes}
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    {work.comments}
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                            Hubungi untuk Proyek Serupa
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
