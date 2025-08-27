"use client";

import { useState } from "react";
import { Upload, X, FileText, ImageIcon, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderDeliveryUploadProps, DeliveryFile } from "@/types/order";

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
        Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
};

const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="h-5 w-5" />;
    if (fileType.includes("pdf")) return <FileText className="h-5 w-5" />;
    if (fileType.includes("zip") || fileType.includes("rar"))
        return <Archive className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
};

export function OrderDeliveryUpload({
    files,
    onFileUpload,
    onFileRemove,
    onFileDescriptionUpdate,
    onFileVisibilityToggle,
}: OrderDeliveryUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            onFileUpload(Array.from(selectedFiles));
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        onFileUpload(droppedFiles);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload Deliverables</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Upload your completed work files. Supported formats: Images,
                    PDFs, ZIP files, and more.
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Upload Area */}
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDragOver
                            ? "border-blue-400 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="space-y-2">
                        <p className="text-lg font-medium">
                            Drop files here or click to upload
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Maximum file size: 100MB per file
                        </p>
                    </div>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="*/*"
                    />
                </div>

                {/* Uploaded Files */}
                {files.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="font-medium">
                            Uploaded Files ({files.length})
                        </h4>
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="border rounded-lg p-4 space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                            {getFileIcon(file.fileType)}
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {file.fileName}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatFileSize(file.fileSize)}{" "}
                                                • {file.fileType}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onFileRemove(file.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor={`desc-${file.id}`}
                                        className="text-sm"
                                    >
                                        File Description (Optional)
                                    </Label>
                                    <Textarea
                                        id={`desc-${file.id}`}
                                        placeholder="Describe what this file contains..."
                                        value={file.description}
                                        onChange={(e) =>
                                            onFileDescriptionUpdate(
                                                file.id,
                                                e.target.value
                                            )
                                        }
                                        rows={2}
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`public-${file.id}`}
                                        checked={file.isPublic}
                                        onCheckedChange={() =>
                                            onFileVisibilityToggle(file.id)
                                        }
                                    />
                                    <Label
                                        htmlFor={`public-${file.id}`}
                                        className="text-sm"
                                    >
                                        Make this file visible to client
                                    </Label>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
