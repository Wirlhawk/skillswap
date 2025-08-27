import { CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
    id: string | number;
    title: string;
    description?: string;
    status: "completed" | "in_progress" | "pending" | "cancelled";
    date?: string;
    timestamp?: string;
}

interface TimelineProps {
    items: TimelineItem[];
    className?: string;
}

const getStatusConfig = (status: TimelineItem["status"]) => {
    switch (status) {
        case "completed":
            return {
                dotColor: "bg-green-500",
                icon: CheckCircle,
                iconColor: "text-green-500",
                lineColor: "bg-green-200",
            };
        case "in_progress":
            return {
                dotColor: "bg-blue-500",
                icon: Clock,
                iconColor: "text-blue-500",
                lineColor: "bg-blue-200",
            };
        case "pending":
            return {
                dotColor: "bg-gray-300",
                icon: Clock,
                iconColor: "text-gray-400",
                lineColor: "bg-gray-200",
            };
        case "cancelled":
            return {
                dotColor: "bg-red-500",
                icon: XCircle,
                iconColor: "text-red-500",
                lineColor: "bg-red-200",
            };
        default:
            return {
                dotColor: "bg-gray-300",
                icon: AlertCircle,
                iconColor: "text-gray-400",
                lineColor: "bg-gray-200",
            };
    }
};

export function Timeline({ items, className }: TimelineProps) {
    return (
        <div className={cn("space-y-4", className)}>
            {items.map((item, index) => {
                const config = getStatusConfig(item.status);
                const Icon = config.icon;
                const isLast = index === items.length - 1;

                return (
                    <div
                        key={item.id}
                        className="relative flex items-start gap-4"
                    >
                        {/* Timeline line */}
                        {!isLast && (
                            <div
                                className={cn(
                                    "absolute left-[11px] top-6 w-0.5 h-full",
                                    config.lineColor
                                )}
                            />
                        )}

                        {/* Status indicator */}
                        <div className="relative flex items-center justify-center">
                            <div
                                className={cn(
                                    "w-6 h-6 rounded-full border",
                                    config.dotColor
                                )}
                            />
                            <Icon
                                className={cn(
                                    "absolute w-3 h-3",
                                    config.iconColor
                                )}
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pb-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-900">
                                    {item.title}
                                </h4>
                                {item.date && (
                                    <time className="text-xs text-gray-500">
                                        {new Date(
                                            item.date
                                        ).toLocaleDateString()}
                                    </time>
                                )}
                            </div>

                            {item.description && (
                                <p className="mt-1 text-sm text-gray-600">
                                    {item.description}
                                </p>
                            )}

                            {item.timestamp && (
                                <p className="mt-1 text-xs text-gray-500">
                                    {new Date(item.timestamp).toLocaleString()}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// Progress Timeline variant with percentage
interface ProgressTimelineProps {
    items: TimelineItem[];
    progress: number;
    className?: string;
}

export function ProgressTimeline({
    items,
    progress,
    className,
}: ProgressTimelineProps) {
    return (
        <div className={cn("space-y-4", className)}>
            {/* Progress bar */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                        Overall Progress
                    </span>
                    <span className="text-sm text-gray-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Timeline */}
            <Timeline items={items} />
        </div>
    );
}
