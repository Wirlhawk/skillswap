import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user, orderStatus } from "./auth";
import { service } from "./service";

export const order = pgTable("order", {
    id: uuid("id").defaultRandom().primaryKey(),
    clientId: text("client_id")
        .references(() => user.id, { onDelete: "set null" }),
    sellerId: text("seller_id")
        .references(() => user.id, { onDelete: "set null" }),
    serviceId: uuid("service_id")
        .references(() => service.id, { onDelete: "set null" }),
    status: orderStatus("status").notNull().default("Pending"),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
});