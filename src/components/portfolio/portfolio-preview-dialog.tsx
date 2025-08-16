// "use client";

// import type React from "react";

// import { useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface PortfolioPreviewDialogProps {
//     trigger: React.ReactNode;
//     portfolio: {
//         id: string;
//         title: string;
//         description: string;
//         images: string[];
//         tags: string[];
//         createdAt: string;
//     };
// }

// export function PortfolioPreviewDialog({
//     trigger,
//     portfolio,
// }: PortfolioPreviewDialogProps) {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);

//     const nextImage = () => {
//         setCurrentImageIndex((prev) => (prev + 1) % portfolio.images.length);
//     };

//     const prevImage = () => {
//         setCurrentImageIndex(
//             (prev) =>
//                 (prev - 1 + portfolio.images.length) % portfolio.images.length
//         );
//     };

//     return (
//         <Dialog>
//             <DialogTrigger asChild>{trigger}</DialogTrigger>
//             <DialogContent className="p-0 ">
//                 <DialogHeader className="hidden">
//                     <DialogTitle>Are you absolutely sure?</DialogTitle>
//                 </DialogHeader>
//                 <div className="flex flex-col md:flex-row h-full">
//                     {/* Left side - Image preview */}
//                     <div className="flex-1 relative bg-muted h-1/2 md:h-full">
//                         <img
//                             src={
//                                 portfolio.images[currentImageIndex] ||
//                                 "/placeholder.svg?height=600&width=800&query=modern e-commerce website design mockup" ||
//                                 "/placeholder.svg"
//                             }
//                             alt={portfolio.title}
//                             className="w-full h-full object-cover"
//                         />

//                         {/* Image navigation */}
//                         {portfolio.images.length > 1 && (
//                             <>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
//                                     onClick={prevImage}
//                                 >
//                                     <ChevronLeft className="h-4 w-4" />
//                                 </Button>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
//                                     onClick={nextImage}
//                                 >
//                                     <ChevronRight className="h-4 w-4" />
//                                 </Button>

//                                 {/* Image counter */}
//                                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
//                                     {currentImageIndex + 1} /{" "}
//                                     {portfolio.images.length}
//                                 </div>
//                             </>
//                         )}
//                     </div>

//                     {/* Right side - Post details */}
//                     <div className="w-full md:w-96 p-4 md:p-6 flex flex-col h-1/2 md:h-full overflow-y-auto">
//                         {/* <div className="flex items-center justify-between mb-4">
//                             <Badge
//                                 variant="secondary"
//                                 className="bg-blue-100 text-blue-800"
//                             >
//                                 Web Design
//                             </Badge>
//                         </div> */}

//                         {/* Title and description */}
//                         <div className="flex-1">
//                             <h2 className="text-xl font-semibold mb-3">
//                                 {portfolio.title}
//                             </h2>
//                             <p className="text-muted-foreground text-sm leading-relaxed mb-4">
//                                 {portfolio.description}
//                             </p>

//                             {/* Tags */}
//                             <div className="mb-4">
//                                 <p className="text-sm font-medium mb-2">
//                                     Tags:
//                                 </p>
//                                 <div className="flex flex-wrap gap-2">
//                                     {portfolio.tags.map((tag) => (
//                                         <Badge key={tag}>{tag}</Badge>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Date */}
//                             <div className="mb-6">
//                                 <p className="text-sm font-medium mb-1">
//                                     Dibuat:
//                                 </p>
//                                 <p className="text-sm text-muted-foreground">
//                                     {portfolio.createdAt}
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             {/* Contact button */}
//                             <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
//                                 Hubungi untuk Proyek Serupa
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// }
"use client";

import type React from "react";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
}

export function PortfolioPreviewDialog({
    trigger,
    portfolio,
}: PortfolioPreviewDialogProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % portfolio.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(
            (prev) =>
                (prev - 1 + portfolio.images.length) % portfolio.images.length
        );
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-6xl w-[95vw] h-[85vh] p-0 md:w-full">
                <DialogHeader className="hidden">
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                     
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

                        {/* Image navigation */}
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
                    <div className="w-full md:w-96 p-4 md:p-6 flex flex-col h-1/2 md:h-full overflow-y-auto">
                        {/* Title and description */}
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-3">
                                {portfolio.title}
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
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
                            {/* Contact button */}
                            <Button>Hubungi untuk Proyek Serupa</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
