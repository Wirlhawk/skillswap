"use client";

import PageInset from "@/components/shared/page-inset";
import { OrderOverview } from "./order-overview";
import { OrderAttachments } from "./order-attachments";
import { OrderMessages } from "./order-messages";
import { OrderSidebar } from "./order-sidebar";
import { OrderActions } from "./order-actions";
import { OrderViewData } from "@/types/order";
import { useOrderActions } from "@/hooks/use-order-actions";

interface OrderViewRefactoredProps {
    data: OrderViewData;
    currentUserId?: string;
}

export function OrderViewRefactored({
    data,
    currentUserId,
}: OrderViewRefactoredProps) {
    const { orderActions, isLoading } = useOrderActions({
        orderId: data.overview.id,
        onSuccess: () => {
            console.log("Order action completed successfully");
        },
        onError: (error) => {
            console.error("Order action failed:", error);
        },
    });

    return (
        <PageInset>
            <div className="max-w-7xl mx-auto py-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <OrderOverview
                            data={data.overview}
                            milestones={data.milestones}
                            client={data.client}
                        />

                        <OrderAttachments
                            attachments={data.attachments}
                            onDownload={orderActions.onDownloadAttachment}
                        />

                        <OrderMessages
                            messages={data.messages}
                            onSendMessage={orderActions.onSendMessage}
                            currentUserId={currentUserId}
                            orderData={{
                                clientId: data.client.id,
                                sellerId: data.seller.id,
                            }}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <OrderSidebar
                            seller={data.seller}
                            payment={data.payment}
                            onContactFreelancer={
                                orderActions.onContactFreelancer
                            }
                        />

                        <OrderActions
                            orderId={data.overview.id}
                            sellerName={data.seller.name}
                            onCancelOrder={orderActions.onCancelOrder}
                            onApproveComplete={orderActions.onApproveComplete}
                            onStartProgress={orderActions.onStartProgress}
                            onGoToMilestone={orderActions.onGoToMilestone}
                            onGoToDeliver={orderActions.onGoToDeliver}
                            onLeaveReview={orderActions.onLeaveReview}
                            status={data.overview.status}
                            userRole={
                                currentUserId === data.seller.id
                                    ? "seller"
                                    : "client"
                            }
                            hasReviewed={data.hasReviewed}
                        />
                    </div>
                </div>
            </div>
        </PageInset>
    );
}
