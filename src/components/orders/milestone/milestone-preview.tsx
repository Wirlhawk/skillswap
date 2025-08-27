"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MilestonePreviewProps, MilestoneStatus } from "@/types/order";

const getStatusColor = (status: MilestoneStatus) => {
    switch (status) {
        case "completed":
            return "bg-green-500";
        case "in_progress":
            return "bg-blue-500";
        case "pending":
            return "bg-gray-400";
        case "cancelled":
            return "bg-red-500";
        default:
            return "bg-gray-400";
    }
};

const getStatusBadgeVariant = (status: MilestoneStatus) => {
    switch (status) {
        case "completed":
            return "default";
        case "in_progress":
            return "secondary";
        case "pending":
            return "outline";
        case "cancelled":
            return "destructive";
        default:
            return "outline";
    }
};

export function MilestonePreview({
    milestones,
    orderTitle,
}: MilestonePreviewProps) {
    const completedCount = milestones.filter(
        (m) => m.status === "completed"
    ).length;
    const progress =
        milestones.length > 0
            ? Math.round((completedCount / milestones.length) * 100)
            : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Timeline Preview</CardTitle>
                <p className="text-sm text-gray-600">
                    How clients will see your project progress
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Progress Overview */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            Overall Progress
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {completedCount} of {milestones.length} completed
                        </span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-muted-foreground">
                        {progress}% complete
                    </p>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                    <h4 className="font-medium text-sm">Project Timeline</h4>
                    <div className="space-y-3">
                        {milestones.map((milestone, index) => (
                            <div
                                key={milestone.id}
                                className="flex items-start gap-3"
                            >
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-3 h-3 rounded-full ${getStatusColor(milestone.status)}`}
                                    />
                                    {index < milestones.length - 1 && (
                                        <div className="w-0.5 h-8 bg-gray-200 mt-1" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h5 className="font-medium text-sm truncate">
                                            {milestone.title}
                                        </h5>
                                        <Badge
                                            variant={getStatusBadgeVariant(
                                                milestone.status
                                            )}
                                            className="ml-2"
                                        >
                                            {milestone.status.replace("_", " ")}
                                        </Badge>
                                    </div>
                                    {milestone.description && (
                                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                            {milestone.description}
                                        </p>
                                    )}
                                    {milestone.estimatedDate && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Due:{" "}
                                            {milestone.estimatedDate.toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Info */}
                <div className="pt-4 border-t">
                    <div className="text-xs text-gray-500">
                        <p>
                            <strong>Project:</strong> {orderTitle}
                        </p>
                        <p>
                            <strong>Total Milestones:</strong>{" "}
                            {milestones.length}
                        </p>
                        <p>
                            <strong>Last Updated:</strong>{" "}
                            {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
