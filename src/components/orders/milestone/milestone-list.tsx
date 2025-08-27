"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, GripVertical, Calendar } from "lucide-react";
import { MilestoneListProps, MilestoneStatus } from "@/types/order";

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

export function MilestoneList({
    milestones,
    onEdit,
    onDelete,
    onStatusChange,
    onReorder,
}: MilestoneListProps) {
    const [draggedId, setDraggedId] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent, milestoneId: string) => {
        setDraggedId(milestoneId);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        if (draggedId && draggedId !== targetId) {
            const draggedIndex = milestones.findIndex(
                (m) => m.id === draggedId
            );
            const targetIndex = milestones.findIndex((m) => m.id === targetId);
            const newPosition =
                targetIndex > draggedIndex ? targetIndex : targetIndex;
            onReorder(draggedId, newPosition);
        }
        setDraggedId(null);
    };

    return (
        <div className="space-y-4">
            {milestones.map((milestone, index) => (
                <Card
                    key={milestone.id}
                    className={`relative transition-all ${
                        draggedId === milestone.id ? "opacity-50" : ""
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, milestone.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, milestone.id)}
                >
                    <CardContent className="pt-6">
                        <div className="space-y-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                    <div
                                        className={`w-3 h-3 rounded-full mt-2 ${getStatusColor(milestone.status)}`}
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">
                                            {milestone.title}
                                        </h3>
                                        {milestone.description && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                {milestone.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit(milestone.id)}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDelete(milestone.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Badge
                                        variant={getStatusBadgeVariant(
                                            milestone.status
                                        )}
                                    >
                                        {milestone.status.replace("_", " ")}
                                    </Badge>
                                    {milestone.estimatedDate && (
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <Calendar className="w-3 h-3" />
                                            <span>
                                                Due:{" "}
                                                {milestone.estimatedDate.toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500">
                                    #{index + 1}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
