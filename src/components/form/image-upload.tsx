"use client";

import React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { default as Image } from "next/image";

interface FileWithPreview {
    id: string;
    file: File;
    preview: string;
}

interface ImageUploadProps {
    images: FileWithPreview[];
    onImagesChange: (images: FileWithPreview[]) => void;
    maxImages?: number;
    error?: string;
}

export function ImageUpload({
    images,
    onImagesChange,
    maxImages = 5,
    error,
}: ImageUploadProps) {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newFiles: FileWithPreview[] = files.map((file) => ({
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file),
        }));

        onImagesChange([...images, ...newFiles].slice(0, maxImages));
    };

    const removeImage = (index: number) => {
        const updated = images.filter((_, i) => i !== index);
        onImagesChange(updated);
    };

    // Clean up object URLs on unmount
    React.useEffect(() => {
        return () => {
            images.forEach((img) => URL.revokeObjectURL(img.preview));
        };
    }, [images]);

    return (
        <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <div className="space-y-2">
                    <p className="text-sm font-medium">Upload service images</p>
                    <p className="text-xs text-muted-foreground">
                        Upload up to {maxImages} images. First image will be the
                        main preview.
                    </p>
                </div>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                />
                <Button
                    type="button"
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() =>
                        document.getElementById("image-upload")?.click()
                    }
                    disabled={images.length >= maxImages}
                >
                    Choose Images
                </Button>
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <div key={image.id} className="relative group">
                            <Image
                                src={image.preview}
                                alt={image.file.name}
                                width={100}
                                height={100}
                                className="w-full h-24 object-cover rounded-lg border"
                            />
                            <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                            {index === 0 && (
                                <Badge className="absolute bottom-1 left-1 text-xs">
                                    Main
                                </Badge>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
