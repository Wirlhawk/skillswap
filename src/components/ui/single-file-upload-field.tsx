"use client";

import * as React from "react";
import { Upload, X, FileImage, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Progress } from "./progress";
import { Badge } from "./badge";
import { Alert, AlertDescription } from "./alert";

interface FileUploadFieldProps {
    value?: File[];
    onChange?: (files: File[]) => void;
    accept?: string;
    maxSize?: number; // in MB
    maxFiles?: number;
    className?: string;
    disabled?: boolean;
}

export function SingleFileUploadField({
    value = [],
    onChange,
    accept = "image/*,.pdf",
    maxSize = 5,
    maxFiles = 1,
    className,
    disabled = false,
}: FileUploadFieldProps) {
    const [dragActive, setDragActive] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = React.useState<number | null>(
        null
    );
    const inputRef = React.useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        // Check file size
        if (file.size > maxSize * 1024 * 1024) {
            return `File size must be less than ${maxSize}MB`;
        }

        // Check file type
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const isValidType = acceptedTypes.some((type) => {
            if (type.startsWith(".")) {
                return file.name.toLowerCase().endsWith(type.toLowerCase());
            }
            return file.type.match(type.replace("*", ".*"));
        });

        if (!isValidType) {
            return `File type not supported. Please upload: ${accept}`;
        }

        return null;
    };

    const handleFiles = (files: FileList) => {
        setError(null);
        const fileArray = Array.from(files);

        // Check max files limit
        if (value.length + fileArray.length > maxFiles) {
            setError(
                `Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed`
            );
            return;
        }

        // Validate each file
        for (const file of fileArray) {
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }
        }

        // Simulate upload progress for better UX
        setUploadProgress(0);
        const progressInterval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev === null || prev >= 100) {
                    clearInterval(progressInterval);
                    return null;
                }
                return prev + 10;
            });
        }, 50);

        // Update files
        const newFiles = [...value, ...fileArray];
        onChange?.(newFiles);
    };

    const removeFile = (index: number) => {
        const newFiles = value.filter((_, i) => i !== index);
        onChange?.(newFiles);
        setError(null);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (disabled || !e.dataTransfer.files) return;
        handleFiles(e.dataTransfer.files);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled || !e.target.files) return;
        handleFiles(e.target.files);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) +
            " " +
            sizes[i]
        );
    };

    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) {
            return <FileImage className="h-4 w-4" />;
        }
        return <FileImage className="h-4 w-4" />;
    };

    return (
        <div className={cn("space-y-4", className)}>
            {/* Upload Area */}
            <div
                className={cn(
                    "relative border-2 border-dashed rounded-lg p-6 transition-colors",
                    dragActive && !disabled
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-muted-foreground/50",
                    disabled && "opacity-50 cursor-not-allowed",
                    error && "border-destructive bg-destructive/5"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={maxFiles > 1}
                    onChange={handleInputChange}
                    disabled={disabled}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />

                <div className="flex flex-col items-center justify-center text-center">
                    <Upload
                        className={cn(
                            "h-10 w-10 mb-4",
                            dragActive
                                ? "text-primary"
                                : "text-muted-foreground"
                        )}
                    />

                    <div className="space-y-2">
                        <p className="text-sm font-medium">
                            {dragActive
                                ? "Drop your files here"
                                : "Upload your student ID"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Drag and drop or{" "}
                            <Button
                                type="button"
                                variant="link"
                                className="h-auto p-0 text-xs"
                                onClick={() => inputRef.current?.click()}
                                disabled={disabled}
                            >
                                browse files
                            </Button>
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Supports: {accept} • Max {maxSize}MB • {maxFiles}{" "}
                            file{maxFiles > 1 ? "s" : ""} max
                        </p>
                    </div>
                </div>

                {uploadProgress !== null && (
                    <div className="absolute inset-x-4 bottom-4">
                        <Progress value={uploadProgress} className="h-2" />
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* File List */}
            {value.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Files:</p>
                    {value.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                {getFileIcon(file)}
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>
                                <Badge variant="secondary" className="shrink-0">
                                    {file.type.startsWith("image/")
                                        ? "Image"
                                        : "Document"}
                                </Badge>
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                disabled={disabled}
                                className="shrink-0 ml-2"
                            >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove file</span>
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
