import { OrderWithDetails } from "@/types/order";
import {
    OrderViewData,
    OrderOverviewData,
    OrderParticipant,
    OrderAttachmentDisplay,
    OrderMessageDisplay,
    OrderMilestoneDisplay,
    OrderPaymentData,
    OrderDeliveryData,
    OrderDeliveryViewData,
    DeliveryFormData,
    MilestoneViewData,
    MilestoneDisplayData
} from "@/types/order";

// Transform database order data to component-friendly format
export function transformOrderData(orderData: OrderWithDetails): OrderViewData {
    return {
        overview: transformOrderOverview(orderData),
        client: transformOrderParticipant(orderData.client),
        seller: transformOrderParticipant(orderData.seller),
        attachments: transformOrderAttachments(orderData.attachments),
        messages: transformOrderMessages(orderData.messages, orderData),
        milestones: transformOrderMilestones(orderData.milestones),
        payment: transformOrderPayment(orderData),
        hasReviewed: orderData.hasReviewed || false, // Default to false if undefined
    };
}

// Transform order data for delivery view
export function transformOrderDeliveryData(orderData: OrderWithDetails): OrderDeliveryData {
    return {
        id: orderData.id,
        orderNumber: orderData.orderNumber,
        requirements: orderData.requirements,
        status: orderData.status,
        totalPrice: orderData.totalPrice,
        deliveryDate: orderData.deliveryDate,
        service: {
            title: orderData.service.title,
            category: orderData.service.description || "General", // Using description as category for now
        },
        client: {
            name: orderData.client.name,
            avatar: orderData.client.image,
        },
    };
}

// Transform order data for milestone view
export function transformMilestoneViewData(orderData: OrderWithDetails): MilestoneViewData {
    const milestones = transformMilestoneDisplayData(orderData.milestones);
    const completedCount = milestones.filter(m => m.status === "completed").length;
    const progress = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

    return {
        orderData: {
            orderId: orderData.id,
            orderNumber: orderData.orderNumber,
            orderTitle: orderData.service.title,
        },
        milestones,
        management: {
            totalMilestones: milestones.length,
            completedMilestones: completedCount,
            progress,
        },
    };
}

// Transform milestone data for display
export function transformMilestoneDisplayData(milestones: OrderWithDetails['milestones']): MilestoneDisplayData[] {
    return milestones.map(milestone => ({
        id: milestone.id,
        title: milestone.title,
        description: milestone.description || undefined,
        status: milestone.status as "pending" | "in_progress" | "completed" | "cancelled",
        estimatedDate: milestone.estimatedDate,
        completedDate: milestone.completedDate,
        position: milestone.position,
        createdAt: milestone.createdAt,
        updatedAt: milestone.updatedAt,
    }));
}

// Create initial delivery form data
export function createInitialDeliveryFormData(): DeliveryFormData {
    return {
        files: [],
        message: "",
        markAsComplete: false,
    };
}

// Transform order data to delivery view data
export function transformOrderDeliveryViewData(orderData: OrderWithDetails): OrderDeliveryViewData {
    return {
        orderData: transformOrderDeliveryData(orderData),
        formData: createInitialDeliveryFormData(),
    };
}

function transformOrderOverview(orderData: OrderWithDetails): OrderOverviewData {
    return {
        id: orderData.id,
        orderNumber: orderData.orderNumber,
        title: orderData.service.title,
        totalPrice: orderData.totalPrice,
        requirements: orderData.requirements,
        additionalNotes: orderData.additionalNotes,
        deliveryDate: orderData.deliveryDate,
        progress: orderData.progress,
        status: orderData.status,
        createdAt: orderData.createdAt,
    };
}

function transformOrderParticipant(participant: OrderWithDetails['client'] | OrderWithDetails['seller']): OrderParticipant {
    return {
        id: participant.id,
        name: participant.name,
        username: participant.username,
        image: participant.image,
        // These fields would need to be fetched separately or added to the database query
        rating: undefined,
        completedOrders: undefined,
        responseTime: undefined,
    };
}

function transformOrderAttachments(attachments: OrderWithDetails['attachments']): OrderAttachmentDisplay[] {
    return attachments.map(attachment => ({
        id: attachment.id,
        fileName: attachment.fileName,
        fileUrl: attachment.fileUrl,
        fileSize: attachment.fileSize || undefined,
        fileType: attachment.fileType || "application/octet-stream",
        description: attachment.description || undefined,
        isPublic: attachment.isPublic,
        createdAt: attachment.createdAt,
    }));
}

function transformOrderMessages(messages: OrderWithDetails['messages'], order: OrderWithDetails): OrderMessageDisplay[] {
    return messages.map(message => ({
        id: message.id,
        senderId: message.senderId,
        message: message.message,
        messageType: message.messageType, // Removed 'as any'
        isInternal: message.isInternal,
        createdAt: message.createdAt,
        sender: {
            name: message.senderId === order.clientId ? order.client.name : order.seller.name,
            image: message.senderId === order.clientId ? order.client.image : order.seller.image,
        },
    }));
}

function transformOrderMilestones(milestones: OrderWithDetails['milestones']): OrderMilestoneDisplay[] {
    return milestones.map(milestone => ({

        id: milestone.id,
        description: milestone.description,
        title: milestone.title,
        status: milestone.status as "completed" | "in_progress" | "pending",
        estimatedDate: milestone.estimatedDate,
    }));
}

function transformOrderPayment(orderData: OrderWithDetails): OrderPaymentData {
    const platformFee = 1250; // $12.50 in cents
    const totalPaid = orderData.totalPrice + platformFee;

    return {
        servicePrice: orderData.totalPrice,
        platformFee,
        totalPaid,
        isSecured: true, // This would need to be determined based on payment status
    };
}

// Helper function to get status configuration
export function getOrderStatusConfig(status: string) {
    switch (status) {
        case "Done":
            return {
                label: "Completed",
                color: "bg-green-500",
                bgColor: "bg-green-100",
                textColor: "text-green-800",
            };
        case "In Progress":
            return {
                label: "In Progress",
                color: "bg-blue-500",
                bgColor: "bg-blue-100",
                textColor: "text-blue-800",
            };
        case "Pending":
            return {
                label: "Pending",
                color: "bg-yellow-500",
                bgColor: "bg-yellow-100",
                textColor: "text-yellow-800",
            };
        case "Cancelled":
            return {
                label: "Cancelled",
                color: "bg-red-500",
                bgColor: "bg-red-100",
                textColor: "text-red-800",
            };
        default:
            return {
                label: status,
                color: "bg-gray-500",
                bgColor: "bg-gray-100",
                textColor: "text-gray-800",
            };
    }
}
