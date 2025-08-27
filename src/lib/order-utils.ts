import { OrderStatus, OrderStatusConfig, OrderWithDetails, OrderViewData, OrderOverviewData, OrderParticipant, OrderAttachmentDisplay, OrderMessageDisplay, OrderMilestoneDisplay, OrderPaymentData } from "@/types/order";

// Order status configurations
export const ORDER_STATUS_CONFIGS: Record<OrderStatus, OrderStatusConfig> = {
    "Pending": {
        status: "Pending",
        label: "Pending",
        color: "bg-yellow-500",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800"
    },
    "In Progress": {
        status: "In Progress",
        label: "In Progress",
        color: "bg-blue-500",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800"
    },
    "Done": {
        status: "Done",
        label: "Completed",
        color: "bg-green-500",
        bgColor: "bg-green-100",
        textColor: "text-green-800"
    },
    "Cancelled": {
        status: "Cancelled",
        label: "Cancelled",
        color: "bg-red-500",
        bgColor: "bg-red-100",
        textColor: "text-red-800"
    }
};

// Get status configuration
export function getOrderStatusConfig(status: OrderStatus): OrderStatusConfig {
    return ORDER_STATUS_CONFIGS[status];
}

// Format file size
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Transform database order to view data
export function transformOrderToViewData(orderData: OrderWithDetails): OrderViewData {
    const overview: OrderOverviewData = {
        id: orderData.id,
        orderNumber: orderData.orderNumber,
        title: orderData.service.title,
        totalPrice: orderData.totalPrice,
        requirements: orderData.requirements,
        additionalNotes: orderData.additionalNotes,
        deliveryDate: orderData.deliveryDate,
        progress: orderData.progress,
        status: orderData.status,
        createdAt: orderData.createdAt
    };

    const client: OrderParticipant = {
        id: orderData.client.id,
        name: orderData.client.name,
        username: orderData.client.username,
        image: orderData.client.image
    };

    const seller: OrderParticipant = {
        id: orderData.seller.id,
        name: orderData.seller.name,
        username: orderData.seller.username,
        image: orderData.seller.image,
        rating: 4.8, // This would come from a separate query in real app
        completedOrders: 150, // This would come from a separate query in real app
        responseTime: "2 hours" // This would be calculated in real app
    };

    const attachments: OrderAttachmentDisplay[] = orderData.attachments.map(attachment => ({
        id: attachment.id,
        fileName: attachment.fileName,
        fileUrl: attachment.fileUrl,
        fileSize: attachment.fileSize || undefined,
        fileType: attachment.fileType,
        description: attachment.description || undefined,
        isPublic: attachment.isPublic,
        createdAt: attachment.createdAt
    }));

    const messages: OrderMessageDisplay[] = orderData.messages.map(message => ({
        id: message.id,
        senderId: message.senderId,
        message: message.message,
        messageType: message.messageType as any,
        isInternal: message.isInternal,
        createdAt: message.createdAt,
        sender: {
            name: message.senderId === orderData.clientId ? orderData.client.name : orderData.seller.name,
            image: message.senderId === orderData.clientId ? orderData.client.image : orderData.seller.image
        }
    }));

    const milestones: OrderMilestoneDisplay[] = orderData.milestones.map(milestone => ({
        id: milestone.id,
        title: milestone.title,
        status: milestone.status as "completed" | "in_progress" | "pending",
        date: milestone.date
    }));

    const payment: OrderPaymentData = {
        servicePrice: orderData.totalPrice,
        platformFee: 1250, // $12.50 in cents
        totalPaid: orderData.totalPrice + 1250,
        isSecured: true
    };

    return {
        overview,
        client,
        seller,
        attachments,
        messages,
        milestones,
        payment
    };
}

// Calculate days remaining
export function calculateDaysRemaining(deliveryDate: Date | null): number {
    if (!deliveryDate) return 0;
    const now = new Date();
    const diffTime = deliveryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
}

// Get file type icon
export function getFileTypeIcon(fileType: string): string {
    if (fileType.includes("pdf")) return "PDF";
    if (fileType.includes("zip")) return "ZIP";
    if (fileType.includes("html")) return "URL";
    if (fileType.includes("image")) return "IMG";
    if (fileType.includes("video")) return "VID";
    return "FILE";
}
