import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { category } from "./category";

export const service = pgTable("service", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    longDescription: text("long_description").notNull(),
    price: integer("price").notNull(),
    userId: text("user_id")
        .references(() => user.id, { onDelete: "set null" }),
    categoryId: uuid("category_id")
        .references(() => category.id, { onDelete: "set null" }),
    deliveryTime: text("delivery_time").notNull(),
    revisions: text("revisions").notNull(),
    packageName: text("package_name").notNull(),
    packageDescription: text("package_description").notNull(),
    features: text("features").array().default([]),
    tags: text("tags").array().default([]),
    images: text("images").array().default([]),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
});