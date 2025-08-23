"use client";

import { ArrowLeftIcon, Upload, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Cropper,
    CropperCropArea,
    CropperDescription,
    CropperImage,
} from "@/components/ui/cropper";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { APP_CONSTANTS } from "@/lib/constants";
import { useFileUpload } from "@/hooks/use-file-upload";
import { updateProfileImage } from "@/server/user";

type Area = { x: number; y: number; width: number; height: number };

const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous");
        image.src = url;
    });

async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area,
    outputWidth = 200,
    outputHeight = 200
): Promise<Blob | null> {
    try {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return null;
        }

        canvas.width = outputWidth;
        canvas.height = outputHeight;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            outputWidth,
            outputHeight
        );

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    resolve(blob);
                },
                "image/jpeg",
                0.9
            );
        });
    } catch (error) {
        console.error("Error in getCroppedImg:", error);
        return null;
    }
}

interface EditProfilePictureFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (image: Blob) => void;
    currentImage?: string;
}

export function EditProfilePictureForm({
    isOpen,
    onClose,
    onSave,
    currentImage,
}: EditProfilePictureFormProps) {
    const [
        { files, isDragging },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            getInputProps,
        },
    ] = useFileUpload({
        accept: "image/*",
    });

    const previewUrl = files[0]?.preview || null;
    const fileId = files[0]?.id;

    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
        null
    );
    const [zoom, setZoom] = useState(1);
    const [isUploading, setIsUploading] = useState(false);
    const [showCropper, setShowCropper] = useState(false);
    const [blobImage, setBlobImage] = useState<Blob | null>(null);
    const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(
        null
    );
    const [isSaving, setIsSaving] = useState(false);

    const previousFileIdRef = useRef<string | undefined | null>(null);

    const handleCropChange = useCallback((pixels: Area | null) => {
        setCroppedAreaPixels(pixels);
    }, []);

    const handleApply = async () => {
        if (!previewUrl || !fileId || !croppedAreaPixels) {
            console.error("Missing data for apply:", {
                previewUrl,
                fileId,
                croppedAreaPixels,
            });
            return;
        }

        setIsUploading(true);

        try {
            const croppedBlob = await getCroppedImg(
                previewUrl,
                croppedAreaPixels
            );

            if (!croppedBlob) {
                throw new Error("Failed to generate cropped image blob.");
            }

            const croppedUrl = URL.createObjectURL(croppedBlob);
            setBlobImage(croppedBlob);
            setCroppedPreviewUrl(croppedUrl);
            setShowCropper(false);
        } catch (error) {
            console.error("Error during apply:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        if (!blobImage) {
            console.error("No cropped image to save");
            return;
        }

        setIsSaving(true);

        try {
            const fd = new FormData();
            const fileName = `profile-${Date.now()}.jpg`;
            const file = new File([blobImage], fileName, {
                type: "image/jpeg",
            });
            fd.append("image", file);

            await updateProfileImage(fd);

            onSave(blobImage);
            handleCancel();
        } catch (error) {
            console.error("Error saving profile picture:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setShowCropper(false);
        setZoom(1);
        setCroppedAreaPixels(null);
        if (blobImage) {
            setBlobImage(null);
        }
        if (croppedPreviewUrl) {
            URL.revokeObjectURL(croppedPreviewUrl);
            setCroppedPreviewUrl(null);
        }
        if (fileId) {
            removeFile(fileId);
        }
        onClose();
    };

    useEffect(() => {
        if (fileId && fileId !== previousFileIdRef.current) {
            setShowCropper(true);
            setCroppedAreaPixels(null);
            setZoom(1);
            if (blobImage) {
                setBlobImage(null);
            }
        }
        previousFileIdRef.current = fileId;
    }, [fileId, blobImage]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className={
                    showCropper ? "gap-0 p-0 sm:max-w-140" : "sm:max-w-md"
                }
            >
                {showCropper ? (
                    <>
                        <DialogDescription className="sr-only">
                            Crop image dialog
                        </DialogDescription>
                        <DialogHeader className="contents space-y-0 text-left">
                            <DialogTitle className="flex items-center justify-between border-b p-4 text-base">
                                <div className="flex items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="-my-1 opacity-60"
                                        onClick={handleCancel}
                                        aria-label="Cancel"
                                    >
                                        <ArrowLeftIcon aria-hidden="true" />
                                    </Button>
                                    <span>Crop Profile Picture</span>
                                </div>
                                <Button
                                    className="-my-1"
                                    onClick={handleApply}
                                    disabled={!previewUrl || isUploading}
                                    autoFocus
                                >
                                    {isUploading ? "Processing..." : "Apply"}
                                </Button>
                            </DialogTitle>
                        </DialogHeader>
                        {previewUrl && (
                            <Cropper
                                className="h-96 sm:h-120"
                                image={previewUrl}
                                zoom={zoom}
                                onCropChange={handleCropChange}
                                onZoomChange={setZoom}
                            >
                                <CropperDescription />
                                <CropperImage />
                                <CropperCropArea />
                            </Cropper>
                        )}
                        <DialogFooter className="border-t px-4 py-6">
                            <div className="mx-auto flex w-full max-w-80 items-center gap-4">
                                <ZoomOutIcon
                                    className="shrink-0 opacity-60"
                                    size={16}
                                    aria-hidden="true"
                                />
                                <Slider
                                    defaultValue={[1]}
                                    value={[zoom]}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    onValueChange={(value) => setZoom(value[0])}
                                    aria-label="Zoom slider"
                                />
                                <ZoomInIcon
                                    className="shrink-0 opacity-60"
                                    size={16}
                                    aria-hidden="true"
                                />
                            </div>
                        </DialogFooter>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Edit Profile Picture</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col items-center gap-6 py-4">
                            <div className="relative">
                                <Avatar className="h-32 w-32">
                                    <AvatarImage
                                        src={
                                            croppedPreviewUrl ||
                                            currentImage ||
                                            "/placeholder.svg"
                                        }
                                        alt="Profile picture preview"
                                    />
                                    <AvatarFallback className="text-2xl">
                                        👤
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="w-full space-y-4">
                                <div className="space-y-2">
                                    <div
                                        className={`border-input hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 relative flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors outline-none focus-visible:ring-[3px] ${
                                            isDragging ? "bg-accent/50" : ""
                                        }`}
                                        onClick={openFileDialog}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                    >
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <Upload className="h-8 w-8 opacity-60" />
                                            <div>
                                                <p className="text-sm font-medium">
                                                    Click to upload or drag and
                                                    drop
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {APP_CONSTANTS.SUPPORTED_IMAGE_TYPES.join(", ")} up to {APP_CONSTANTS.MAX_FILE_SIZE_MB}MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        {...getInputProps()}
                                        className="sr-only"
                                        aria-label="Upload profile picture"
                                        tabIndex={-1}
                                    />
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button variant="outline" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={!blobImage || isSaving}
                            >
                                {isSaving ? "Saving..." : "Save"}
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
