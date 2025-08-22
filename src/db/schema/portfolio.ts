import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const portfolio = pgTable('portfolio', {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
        .references(() => user.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    images: text("image").array().default([]),
    tags: text("tag").array(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
});