"use client";

import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/custom-dialog";
import { deletePortfolio } from "@/server/portfolio";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";

interface PortfolioPreviewDialogProps {
    trigger: React.ReactNode;
    portfolio: {
        id: string;
        title: string;
        description: string;
        images: string[];
        tags: string[];
        createdAt: string;
    };
    onDelete?: () => void;
    isEditable?: boolean;
}

export function PortfolioPreviewDialog({
    trigger,
    portfolio,
    onDelete,
    isEditable = false,
}: PortfolioPreviewDialogProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % portfolio.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(
            (prev) =>
                (prev - 1 + portfolio.images.length) % portfolio.images.length
        );
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        setDeleteError(null);

        try {
            const result = await deletePortfolio(portfolio.id);

            if (result.success) {
                toast.success("Portfolio deleted successfully!");
                setIsOpen(false); // Close the dialog
                onDelete?.();
            } else {
                setDeleteError(result.error || "Failed to delete portfolio");
                toast.error(result.error || "Failed to delete portfolio");
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred";
            setDeleteError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-6xl w-[95vw] h-[85vh] p-0 md:w-full">
                <DialogHeader className="hidden">
                    <DialogTitle>Portfolio</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col md:flex-row h-full">
                    {/* Left side - Image preview */}
                    <div className="flex-1 relative bg-accent h-1/2 md:h-full">
                        <img
                            src={
                                portfolio.images[currentImageIndex] ||
                                "/placeholder.svg?height=600&width=800&query=modern e-commerce website design mockup" ||
                                "/placeholder.svg" ||
                                "/placeholder.svg"
                            }
                            alt={portfolio.title}
                            className="w-full h-full object-contain aspect-video"
                        />

                        {portfolio.images.length > 1 && (
                            <>
                                {/* Image counter */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
                                    {currentImageIndex + 1} /{" "}
                                    {portfolio.images.length}
                                </div>
                            </>
                        )}

                        {portfolio.images.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                                    onClick={prevImage}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                                    onClick={nextImage}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>

                                {/* Image counter */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
                                    {currentImageIndex + 1} /{" "}
                                    {portfolio.images.length}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right side - Portfolio details */}
                    <div className="w-full md:w-96 p-4 md:p-6 flex flex-col h-1/2 md:h-full overflow-y-auto border-t-2 md:border-l-2">
                        {/* Title and description */}
                        <div className="flex-1">
                            <h2 className="text-xl font-bold mb-3">
                                {portfolio.title}
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4 break-words line-clamp-6 overflow-hidden">
                                {portfolio.description}
                            </p>

                            {/* Tags */}
                            <div className="mb-4">
                                <p className="text-sm font-medium mb-2">
                                    Tags:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {portfolio.tags.map((tag) => (
                                        <Badge key={tag}>{tag}</Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Date */}
                            <div className="mb-6">
                                <p className="text-sm font-medium mb-1">
                                    Dibuat:
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {portfolio.createdAt}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {isEditable && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            className="w-full"
                                            disabled={isDeleting}
                                        >
                                            {isDeleting
                                                ? "Deleting..."
                                                : "Delete Portfolio"}
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                                                                This will permanently delete your portfolio {portfolio.title}.
                                                {deleteError && (
                                                    <div className="mt-2 text-red-600 text-sm">
                                                        {deleteError}
                                                    </div>
                                                )}
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel
                                                disabled={isDeleting}
                                            >
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDelete}
                                                disabled={isDeleting}
                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                            >
                                                {isDeleting
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
