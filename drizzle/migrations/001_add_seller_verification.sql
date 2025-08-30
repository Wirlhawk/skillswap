-- Create verification_status enum
CREATE TYPE "verification_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');

-- Create seller_verification table
CREATE TABLE "seller_verification" (
    "id" text PRIMARY KEY,
    "user_id" text NOT NULL,
    "student_id_image" text NOT NULL,
    "major_id" text NOT NULL,
    "school_name" text NOT NULL,
    "status" "verification_status" NOT NULL DEFAULT 'PENDING',
    "rejection_reason" text,
    "verified_at" timestamp,
    "verified_by" text,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now()
);

-- Add foreign key constraints
ALTER TABLE "seller_verification" ADD CONSTRAINT "seller_verification_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;
ALTER TABLE "seller_verification" ADD CONSTRAINT "seller_verification_major_id_major_id_fk" FOREIGN KEY ("major_id") REFERENCES "major"("id") ON DELETE RESTRICT;

-- Create indexes for better performance
CREATE INDEX "seller_verification_user_id_idx" ON "seller_verification"("user_id");
CREATE INDEX "seller_verification_status_idx" ON "seller_verification"("status");
CREATE INDEX "seller_verification_created_at_idx" ON "seller_verification"("created_at");
