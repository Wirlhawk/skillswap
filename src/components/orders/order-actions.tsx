"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderActionsProps, OrderStatus } from "@/types/order";
import { ReviewDialog } from "./order-reviews-dialog";

const getStatusConfig = (status: OrderStatus, userRole?: 'seller' | 'client', hasReviewed?: boolean) => {
    switch (status) {
        case "Done":
            return {
                canCancel: false,
                canApprove: false,
                canStartProgress: false,
                canAccessMilestone: false,
                canAccessDeliver: false,
                canReview: userRole === 'client' && hasReviewed === false,
                primaryAction: "Completed",
            };
        case "In Progress":
            return {
                canCancel: true,
                canApprove: false,
                canStartProgress: false,
                canAccessMilestone: userRole === 'seller',
                canAccessDeliver: userRole === 'seller',
                canReview: false,
                primaryAction: "In Progress",
            };
        case "Pending":
            return {
                canCancel: true,
                canApprove: false,
                canStartProgress: userRole === 'seller',
                canAccessMilestone: false,
                canAccessDeliver: false,
                canReview: false,
                primaryAction: "Pending",
            };
        case "Cancelled":
            return {
                canCancel: false,
                canApprove: false,
                canStartProgress: false,
                canAccessMilestone: false,
                canAccessDeliver: false,
                canReview: false,
                primaryAction: "Cancelled",
            };
        default:
            return {
                canCancel: false,
                canApprove: false,
                canStartProgress: false,
                canAccessMilestone: false,
                canAccessDeliver: false,
                canReview: false,
                primaryAction: status,
            };
    }
};

export function OrderActions({
    onCancelOrder,
    onApproveComplete,
    onStartProgress,
    onGoToMilestone,
    onGoToDeliver,
    onLeaveReview,
    status,
    userRole,
    hasReviewed,
}: OrderActionsProps) {
    const config = getStatusConfig(status, userRole, hasReviewed);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {config.canAccessMilestone && onGoToMilestone && (
                    <Button
                        className="w-full"
                        onClick={onGoToMilestone}
                    >
                        Manage Milestones
                    </Button>
                )}

                {config.canAccessDeliver && onGoToDeliver && (
                    <Button
                        className="w-full"
                        onClick={onGoToDeliver}
                    >
                        Deliver Work
                    </Button>
                )}

                {config.canStartProgress && onStartProgress && (
                    <Button
                        className="w-full"
                        onClick={onStartProgress}
                    >
                        Start Progress
                    </Button>
                )}

                {config.canCancel && (
                    <Button
                        className="w-full bg-transparent"
                        variant="outline"
                        onClick={onCancelOrder}
                    >
                        Cancel Order
                    </Button>
                )}

                {config.canApprove && (
                    <>
                        <Separator className="my-3" />
                        <Button className="w-full" onClick={onApproveComplete}>
                            Approve & Complete
                        </Button>
                    </>
                )}

                {config.canReview && onLeaveReview && (
                    <ReviewDialog orderId={orderId} sellerName={userRole === 'client' ? 'Seller' : 'Client'}>
                        <Button
                            className="w-full"
                            onClick={() => {}}
                        >
                            Leave a Review
                        </Button>
                    </ReviewDialog>
                )}

                {!config.canAccessMilestone &&
                    !config.canAccessDeliver &&
                    !config.canCancel &&
                    !config.canApprove &&
                    !config.canStartProgress &&
                    !config.canReview && (
                        <p className="text-sm text-muted-foreground text-center py-2">
                            No actions available for {config.primaryAction}{" "}
                            orders
                        </p>
                    )}
            </CardContent>
        </Card>
    );
}
