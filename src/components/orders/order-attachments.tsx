"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { OrderAttachmentsProps } from "@/types/order";

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
        Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
};

const getFileTypeIcon = (fileType: string) => {
    if (fileType?.includes("pdf")) {
        return <span className="text-xs font-bold text-blue-600">PDF</span>;
    }
    if (fileType?.includes("zip")) {
        return <span className="text-xs font-bold text-blue-600">ZIP</span>;
    }
    if (fileType?.includes("html")) {
        return <span className="text-xs font-bold text-blue-600">URL</span>;
    }
    if (fileType?.includes("image")) {
        return <span className="text-xs font-bold text-green-600">IMG</span>;
    }
    if (fileType?.includes("video")) {
        return <span className="text-xs font-bold text-purple-600">VID</span>;
    }
    return <span className="text-xs font-bold text-gray-600">FILE</span>;
};

export function OrderAttachments({
    attachments,
    onDownload,
}: OrderAttachmentsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Attachments & Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {attachments.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">
                            No attachments yet
                        </p>
                    ) : (
                        attachments.map((attachment) => (
                            <div
                                key={attachment.id}
                                className="flex items-center justify-between p-3 border rounded-lg "
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        {getFileTypeIcon(attachment.fileType)}
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {attachment.fileName}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {attachment.fileSize &&
                                                `${formatFileSize(attachment.fileSize)} • `}
                                            {attachment.createdAt
                                                ? new Date(
                                                      attachment.createdAt
                                                  ).toLocaleDateString()
                                                : "Not uploaded yet"}
                                        </p>
                                        {attachment.description && (
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {attachment.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {attachment.createdAt ? (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onDownload(attachment)}
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                ) : (
                                    <Badge variant="secondary">Pending</Badge>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
