import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { order, orderMessage, orderAttachment, orderTimeline } from "@/db/schema/order";

// Order types
export type Order = InferSelectModel<typeof order>;
export type NewOrder = InferInsertModel<typeof order>;

// Order history types
// export type OrderHistory = InferSelectModel<typeof orderHistory>;
// export type NewOrderHistory = InferInsertModel<typeof orderHistory>;

// Order message types
export type OrderMessage = InferSelectModel<typeof orderMessage>;
export type NewOrderMessage = InferInsertModel<typeof orderMessage>;

// Order attachment types
export type OrderAttachment = InferSelectModel<typeof orderAttachment>;
export type NewOrderAttachment = InferInsertModel<typeof orderAttachment>;

// Order timeline types
export type OrderTimeline = InferSelectModel<typeof orderTimeline>;
export type NewOrderTimeline = InferInsertModel<typeof orderTimeline>;

// Order status enum
export type OrderStatus = "Pending" | "In Progress" | "Done" | "Cancelled";

// Order form data (matches the form component)
export interface OrderFormData {
    requirements: string;
    additionalNotes: string | null;
}

// Extended order data for display
export interface OrderWithDetails extends Order {
    service: {
        id: string;
        title: string;
        description: string;
        price: number;
        deliveryTime: string;
        revisions: string;
    };
    client: {
        id: string;
        name: string;
        username: string | null;
        image?: string | null;
    };
    seller: {
        id: string;
        name: string;
        username: string | null;
        image?: string | null;
    };
    messages: OrderMessage[];
    attachments: OrderAttachment[];
    milestones: OrderTimeline[];
    progress: number;
    hasReviewed?: boolean;
}

// Order creation request
export interface CreateOrderRequest {
    serviceId: string;
    requirements: string;
    additionalNotes?: string;
    clientId: string;
    sellerId: string;
    totalPrice: number;
}

// Order update request
export interface UpdateOrderRequest {
    status?: OrderStatus;
    requirements?: string;
    additionalNotes?: string;
    totalPrice?: number;
    deliveryDate?: Date;
}

// Order filter options
export interface OrderFilters {
    status?: OrderStatus;
    clientId?: string;
    sellerId?: string;
    serviceId?: string;
    dateFrom?: Date;
    dateTo?: Date;
    search?: string;
}

// Order statistics
export interface OrderStats {
    totalOrders: number;
    pendingOrders: number;
    inProgressOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
}

// Order message types
export type MessageType = "text" | "file" | "image" | "system";

// Order attachment types
export interface OrderAttachmentUpload {
    file: File;
    description?: string;
    isPublic?: boolean;
}

// Order workflow actions
export type OrderAction =
    | "create"
    | "update_status"
    | "add_note"
    | "add_message"
    | "upload_attachment"
    | "mark_paid"
    | "set_delivery_date"
    | "cancel"
    | "complete";

// Order notification types
export interface OrderNotification {
    orderId: string;
    type: "status_change" | "new_message" | "new_attachment" | "payment_received" | "delivery_update";
    title: string;
    message: string;
    recipientId: string;
    isRead: boolean;
    createdAt: Date;
}

// ===== NEW TYPE-SAFE INTERFACES FOR ORDER VIEW COMPONENTS =====

// Order status configuration
export interface OrderStatusConfig {
    status: OrderStatus;
    label: string;
    color: string;
    bgColor: string;
    textColor: string;
}

// Order overview data
export interface OrderOverviewData {
    id: string;
    orderNumber: string;
    title: string;
    totalPrice: number;
    requirements: string;
    additionalNotes?: string | null;
    deliveryDate: Date | null;
    progress: number;
    status: OrderStatus;
    createdAt: Date;
}

// Order participant data
export interface OrderParticipant {
    id: string;
    name: string;
    username: string | null;
    image?: string | null;
    rating?: number;
    completedOrders?: number;
    responseTime?: string;
}

// Order attachment display data
export interface OrderAttachmentDisplay {
    id: string;
    fileName: string;
    fileUrl: string;
    fileSize?: number;
    fileType: string;
    description?: string;
    isPublic: boolean;
    createdAt: Date | null;
}

// Order message display data
export interface OrderMessageDisplay {
    id: string;
    senderId: string;
    message: string;
    messageType: MessageType;
    isInternal: boolean;
    createdAt: Date;
    sender: {
        name: string;
        image?: string | null;
    };
}

// Order milestone display data
export interface OrderMilestoneDisplay {
    id: string;
    description?: string | null;
    title: string;
    status: "completed" | "in_progress" | "pending";
    estimatedDate: Date | null;
}

// Order payment data
export interface OrderPaymentData {
    servicePrice: number;
    platformFee: number;
    totalPaid: number;
    isSecured: boolean;
}

// Order action handlers
export interface OrderActionHandlers {
    onSendMessage: (message: string, attachments?: File[]) => void;
    onCancelOrder: () => void;
    onApproveComplete: () => void;
    onStartProgress?: () => void;
    onContactFreelancer: () => void;
    onDownloadAttachment: (attachment: OrderAttachmentDisplay) => void;
    onGoToMilestone?: () => void;
    onGoToDeliver?: () => void;
    onLeaveReview?: () => void;
}

// Complete order view data
export interface OrderViewData {
    overview: OrderOverviewData;
    client: OrderParticipant;
    seller: OrderParticipant;
    attachments: OrderAttachmentDisplay[];
    messages: OrderMessageDisplay[];
    milestones: OrderMilestoneDisplay[];
    payment: OrderPaymentData;
    hasReviewed?: boolean;
}

// Component props interfaces
export interface OrderOverviewProps {
    data: OrderOverviewData;
    milestones: OrderMilestoneDisplay[];
    client?: OrderParticipant;
}

export interface OrderAttachmentsProps {
    attachments: OrderAttachmentDisplay[];
    onDownload: (attachment: OrderAttachmentDisplay) => void;
}

export interface OrderMessagesProps {
    messages: OrderMessageDisplay[];
    onSendMessage: (message: string) => void;
    currentUserId?: string;
    orderData?: {
        clientId: string;
        sellerId: string;
    };
}

export interface OrderSidebarProps {
    seller: OrderParticipant;
    payment: OrderPaymentData;
    onContactFreelancer: () => void;
}

export interface OrderActionsProps {
    orderId: string;
    sellerName: string;
    onCancelOrder: () => void;
    onApproveComplete: () => void;
    onStartProgress?: () => void;
    onGoToMilestone?: () => void;
    onGoToDeliver?: () => void;
    onLeaveReview?: () => void;
    status: OrderStatus;
    userRole?: 'seller' | 'client';
    hasReviewed?: boolean;
}

export interface OrderPaymentProps {
    data: OrderPaymentData;
}

// ===== ORDER DELIVERY TYPES =====

// Delivery file interface
export interface DeliveryFile {
    id: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    fileType: string;
    description: string;
    isPublic: boolean;
}

// Delivery form data
export interface DeliveryFormData {
    files: DeliveryFile[];
    message: string;
    markAsComplete: boolean;
}

// Delivery submission request
export interface DeliverySubmissionRequest {
    orderId: string;
    files: DeliveryFile[];
    message: string;
    markAsComplete: boolean;
}

// Order delivery data for display
export interface OrderDeliveryData {
    id: string;
    orderNumber: string;
    requirements: string;
    status: OrderStatus;
    totalPrice: number;
    deliveryDate: Date | null;
    service: {
        title: string;
        category: string;
    };
    client: {
        name: string;
        avatar?: string | null;
    };
}

// Component props for delivery components
export interface OrderDeliveryHeaderProps {
    orderData: OrderDeliveryData;
    onBack: () => void;
}

export interface OrderDeliverySummaryProps {
    orderData: OrderDeliveryData;
}

export interface OrderDeliveryUploadProps {
    files: DeliveryFile[];
    onFileUpload: (files: File[]) => void;
    onFileRemove: (fileId: string) => void;
    onFileDescriptionUpdate: (fileId: string, description: string) => void;
    onFileVisibilityToggle: (fileId: string) => void;
}

export interface OrderDeliveryMessageProps {
    message: string;
    onMessageChange: (message: string) => void;
}

export interface OrderDeliveryOptionsProps {
    markAsComplete: boolean;
    onMarkAsCompleteChange: (complete: boolean) => void;
}

export interface OrderDeliveryActionsProps {
    onSubmit: () => void;
    onSaveDraft: () => void;
    isSubmitting: boolean;
    canSubmit: boolean;
}

// Delivery action handlers
export interface DeliveryActionHandlers {
    onSubmitDelivery: (data: DeliveryFormData) => Promise<void>;
    onSaveDraft: () => void;
    onBack: () => void;
}

// Complete delivery view data
export interface OrderDeliveryViewData {
    orderData: OrderDeliveryData;
    formData: DeliveryFormData;
}

// ===== MILESTONE TYPES =====

// Milestone status enum
export type MilestoneStatus = "pending" | "in_progress" | "completed" | "cancelled";

// Milestone form data
export interface MilestoneFormData {
    title: string;
    description?: string;
    status: MilestoneStatus;
    estimatedDate: string;
}

// Milestone creation request
export interface CreateMilestoneRequest {
    orderId: string;
    title: string;
    description?: string;
    status: MilestoneStatus;
    estimatedDate: Date;
    position: number;
}

// Milestone update request
export interface UpdateMilestoneRequest {
    title?: string;
    description?: string;
    status?: MilestoneStatus;
    estimatedDate?: Date;
    position?: number;
}

// Milestone data for display
export interface MilestoneDisplayData {
    id: string;
    title: string;
    description?: string;
    status: MilestoneStatus;
    estimatedDate: Date | null;
    completedDate: Date | null;
    position: number;
    createdAt: Date;
    updatedAt: Date;
}

// Milestone management data
export interface MilestoneManagementData {
    orderId: string;
    orderNumber: string;
    orderTitle: string;
    milestones: MilestoneDisplayData[];
    totalMilestones: number;
    completedMilestones: number;
    progress: number;
}

// Component props for milestone components
export interface MilestoneHeaderProps {
    orderData: {
        orderNumber: string;
        orderTitle: string;
    };
    onBack: () => void;
}

export interface MilestoneListProps {
    milestones: MilestoneDisplayData[];
    onEdit: (milestoneId: string) => void;
    onDelete: (milestoneId: string) => void;
    onStatusChange: (milestoneId: string, status: MilestoneStatus) => void;
    onReorder: (milestoneId: string, newPosition: number) => void;
}

export interface MilestoneFormProps {
    milestone?: MilestoneDisplayData;
    onSubmit: (data: MilestoneFormData) => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

export interface MilestonePreviewProps {
    milestones: MilestoneDisplayData[];
    orderTitle: string;
}

export interface MilestoneActionsProps {
    onAddMilestone: () => void;
    onSaveAll: () => void;
    onReset: () => void;
    isSubmitting: boolean;
    hasChanges: boolean;
}

// Milestone action handlers
export interface MilestoneActionHandlers {
    onCreateMilestone: (data: MilestoneFormData) => Promise<void>;
    onUpdateMilestone: (milestoneId: string, data: Partial<MilestoneFormData>) => Promise<void>;
    onDeleteMilestone: (milestoneId: string) => Promise<void>;
    onUpdateStatus: (milestoneId: string, status: MilestoneStatus) => Promise<void>;
    onReorderMilestones: (milestoneId: string, newPosition: number) => Promise<void>;
    onSaveAllChanges: () => Promise<void>;
    onBack: () => void;
}

// Complete milestone view data
export interface MilestoneViewData {
    orderData: {
        orderId: string;
        orderNumber: string;
        orderTitle: string;
    };
    milestones: MilestoneDisplayData[];
    management: {
        totalMilestones: number;
        completedMilestones: number;
        progress: number;
    };
}
