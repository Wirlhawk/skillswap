import {
    boolean,
    integer,
    pgTable,
    text,
    timestamp,
    uuid
} from "drizzle-orm/pg-core";
import { orderStatus, user } from "./auth";
import { service } from "./service";

import { pgEnum } from "drizzle-orm/pg-core";

export const orderStatusEnum = pgEnum("order_status", [
    "Pending",
    "In Progress",
    "Done",
    "Cancelled"
]);

export const order = pgTable("order", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderNumber: text("order_number").notNull().unique(), // Human-readable order number like "ORD-2024-001"

    // Relationships
    clientId: text("client_id")
        .references(() => user.id, { onDelete: "set null" })
        .notNull(),
    sellerId: text("seller_id")
        .references(() => user.id, { onDelete: "set null" })
        .notNull(),
    serviceId: uuid("service_id")
        .references(() => service.id, { onDelete: "set null" })
        .notNull(),

    // Order details from form
    requirements: text("requirements").notNull(), // Project requirements from form
    additionalNotes: text("additional_notes"), // Optional additional notes

    // Pricing information
    totalPrice: integer("total_price").notNull(), // Final total price

    // Order status and workflow
    status: orderStatusEnum("status").notNull().default("Pending"),

    deliveryDate: timestamp("delivery_date"),

    // Timestamps
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),

});

// Order messages/communication table
export const orderMessage = pgTable("order_message", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
        .references(() => order.id, { onDelete: "cascade" })
        .notNull(),
    senderId: text("sender_id")
        .references(() => user.id, { onDelete: "set null" })
        .notNull(),
    message: text("message").notNull(),
    messageType: text("message_type").notNull().default("text"), // text, file, image, etc.
    attachmentUrl: text("attachment_url"), // URL to attached file if any
    isInternal: boolean("is_internal").notNull().default(false), // Internal note vs client-visible message
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
});

// Order attachments table
export const orderAttachment = pgTable("order_attachment", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
        .references(() => order.id, { onDelete: "cascade" })
        .notNull(),
    uploadedBy: text("uploaded_by")
        .references(() => user.id, { onDelete: "set null" })
        .notNull(),
    fileName: text("file_name").notNull(),
    fileUrl: text("file_url").notNull(),
    fileSize: integer("file_size"), // File size in bytes
    fileType: text("file_type"), // MIME type
    description: text("description"), // Optional description
    isPublic: boolean("is_public").notNull().default(true), // Whether client can see this file
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
});


export const milestoneStatusEnum = pgEnum("milestone_status", [
    "pending",
    "in_progress",
    "completed"
]);

export const orderTimeline = pgTable("order_timeline", {
    id: uuid("id").defaultRandom().primaryKey(),

    orderId: uuid("order_id")
        .notNull()
        .references(() => order.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    status: milestoneStatusEnum("status").notNull().default("pending"),
    position: integer("position").notNull().default(0),
    estimatedDate: timestamp("estimated_date"),
    completedDate: timestamp("completed_date"),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
});