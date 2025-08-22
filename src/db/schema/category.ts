import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const category = pgTable('category', {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
});