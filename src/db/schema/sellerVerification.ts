import { pgEnum, pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { major } from "./major";

// Verification status enum
export const verificationStatus = pgEnum("verification_status", [
    "PENDING",
    "APPROVED",
    "REJECTED"
]);

// Seller verification schema
export const sellerVerification = pgTable("seller_verification", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    studentIdImage: text("student_id_image").notNull(), // URL to uploaded image
    majorId: text("major_id")
        .notNull()
        .references(() => major.id, { onDelete: "restrict" }),
    schoolName: text("school_name").notNull(),
    status: verificationStatus("status").notNull().default("PENDING"),
    rejectionReason: text("rejection_reason"), // Reason if rejected
    verifiedAt: timestamp("verified_at"), // When verification was completed
    verifiedBy: text("verified_by"), // Admin who verified (optional)
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
});
