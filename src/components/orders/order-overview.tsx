"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrderStatusConfig } from "@/lib/order-transformers";
import { MilestoneStatus, OrderOverviewProps } from "@/types/order";
import formatRupiah from "@/utils/format-rupiah";
import { Calendar, User } from "lucide-react";
import { Progress } from "../ui/progress";

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



export function OrderOverview({
    data,
    milestones,
    client,
}: OrderOverviewProps) {
    const statusConfig = getOrderStatusConfig(data.status);

    return (
        <div className="space-y-6">
           <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl">
                                {data.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Order #{data.orderNumber}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge
                                className={`${statusConfig.bgColor} ${statusConfig.textColor}`}
                            >
                                {statusConfig.label}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Client Information */}
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src={client?.image || "/placeholder.svg"}
                                />
                                <AvatarFallback>
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">
                                    {client?.name || "Client"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {client?.username && (
                                        <span className="block">
                                            @{client.username}
                                        </span>
                                    )}
                                    <span>
                                        Order placed{" "}
                                        {data.createdAt.toLocaleDateString()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
                <CardHeader>
                    <CardTitle>Project Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{data.requirements}</p>
                    {data.additionalNotes && (
                        <>
                            <Separator className="my-4" />
                            <div>
                                <h4 className="font-medium mb-2">
                                    Additional Notes
                                </h4>
                                <p className="text-muted-foreground">
                                    {data.additionalNotes}
                                </p>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Progress */}
            <Card>
                <CardHeader>
                    <CardTitle>Project Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                Overall Progress
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {data.progress}%
                            </span>
                        </div>
                        <Progress value={data.progress} className="w-full" />
                        <div className="space-y-4">
                            <h4 className="font-medium text-sm">
                                Project Timeline
                            </h4>
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
                                                    className={
                                                        milestone.status ===
                                                        "completed"
                                                            ? "bg-green-100 text-green-800"
                                                            : milestone.status ===
                                                                "in_progress"
                                                              ? "bg-blue-100 text-blue-800"
                                                              : "bg-gray-100 text-gray-800"
                                                    }
                                                >
                                                    {milestone.status.replace(
                                                        "_",
                                                        " "
                                                    )}
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
                    </div>
                </CardContent>
            </Card>

            {/* Milestones */}
            {/* {milestones && milestones.length > 0 && (
                    // <Card>
                    //     <CardHeader>
                    //         <CardTitle>Project Milestones</CardTitle>
                    //     </CardHeader>
                    //     <CardContent>
                    //         <div className="space-y-3">
                    //             {milestones.map((milestone) => (
                    //                 <div
                    //                     key={milestone.id}
                    //                     className="flex items-center justify-between p-3 border rounded-lg"
                    //                 >
                    //                     <div>
                    //                         <p className="font-medium">
                    //                             {milestone.title}
                    //                         </p>
                    //                         <p className="text-sm text-muted-foreground">
                    //                             {milestone.estimatedDate?.toLocaleDateString()}
                    //                         </p>
                    //                     </div>
                    //                     <Badge
                    //                         className={
                    //                             milestone.status === "completed"
                    //                                 ? "bg-green-100 text-green-800"
                    //                                 : milestone.status ===
                    //                                     "in_progress"
                    //                                 ? "bg-blue-100 text-blue-800"
                    //                                 : "bg-gray-100 text-gray-800"
                    //                         }
                    //                     >
                    //                         {milestone.status.replace("_", " ")}
                    //                     </Badge>
                    //                 </div>
                    //             ))}
                    //         </div>
                    //     </CardContent>
                    // </Card>
            )} */}

            {/* <Timeline items={milestones} /> */}

            {/* Extend Deadline Button */}
            {/* {onExtendDeadline && (
                <Card>
                    <CardContent className="pt-6">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={onExtendDeadline}
                        >
                            <Clock className="h-4 w-4 mr-2" />
                            Extend Deadline
                        </Button>
                    </CardContent>
                </Card>
            )} */}
        </div>
    );
}
