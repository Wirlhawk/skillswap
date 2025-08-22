import { pgTable, text } from "drizzle-orm/pg-core";

export const major = pgTable("major", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    alias: text("alias").notNull(),
});