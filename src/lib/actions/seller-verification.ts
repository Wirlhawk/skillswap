"use server";

import { db } from "@/db/drizzle";
import { sellerVerification, user, major } from "@/db/schema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function submitSellerVerification(data: {
    studentIdImage: File;
    majorId: string;
    schoolName: string;
}) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session?.user?.id) {
            throw new Error("You must be logged in to submit verification");
        }

        // Check if user already has a pending or approved verification
        const existingVerification = await db
            .select()
            .from(sellerVerification)
            .where(eq(sellerVerification.userId, session.user.id))
            .limit(1);

        if (existingVerification.length > 0) {
            const verification = existingVerification[0];
            if (verification.status === "PENDING") {
                throw new Error("You already have a pending verification request");
            }
            if (verification.status === "APPROVED") {
                throw new Error("You are already a verified seller");
            }
        }

        // TODO: Upload image to cloud storage (e.g., AWS S3, Cloudinary)
        // For now, we'll store a placeholder URL
        const imageUrl = `placeholder-${Date.now()}`;

        // Create verification record
        await db.insert(sellerVerification).values({
            id: `verification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            userId: session.user.id,
            studentIdImage: imageUrl,
            majorId: data.majorId,
            schoolName: data.schoolName,
            status: "PENDING",
        });

        // Update user role to STUDENT when they apply for verification
        await db
            .update(user)
            .set({ role: "STUDENT" })
            .where(eq(user.id, session.user.id));

        revalidatePath("/profile");
        return { success: true };
    } catch (error) {
        console.error("Error submitting verification:", error);
        throw error;
    }
}

export async function getSellerVerificationStatus(userId: string) {
    try {
        const [verification] = await db
            .select()
            .from(sellerVerification)
            .where(eq(sellerVerification.userId, userId))
            .limit(1);

        return verification || null;
    } catch (error) {
        console.error("Error fetching verification status:", error);
        return null;
    }
}

export async function getAllVerifications() {
    try {
        const verifications = await db
            .select({
                id: sellerVerification.id,
                userId: sellerVerification.userId,
                studentIdImage: sellerVerification.studentIdImage,
                majorId: sellerVerification.majorId,
                schoolName: sellerVerification.schoolName,
                status: sellerVerification.status,
                rejectionReason: sellerVerification.rejectionReason,
                verifiedAt: sellerVerification.verifiedAt,
                verifiedBy: sellerVerification.verifiedBy,
                createdAt: sellerVerification.createdAt,
                updatedAt: sellerVerification.updatedAt,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                major: {
                    name: major.name,
                    alias: major.alias,
                },
            })
            .from(sellerVerification)
            .leftJoin(user, eq(sellerVerification.userId, user.id))
            .leftJoin(major, eq(sellerVerification.majorId, major.id))
            .orderBy(sellerVerification.createdAt);

        return verifications;
    } catch (error) {
        console.error("Error fetching verifications:", error);
        return [];
    }
}

export async function updateVerificationStatus(
    verificationId: string,
    status: "APPROVED" | "REJECTED",
    rejectionReason?: string
) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session?.user?.id) {
            throw new Error("You must be logged in to update verification status");
        }

        // Check if user is a TEACHER (admin) to review verifications
        if (session.user.role !== "TEACHER") {
            throw new Error("Only teachers can review verification requests");
        }

        // Get the verification to find the user ID
        const [verification] = await db
            .select()
            .from(sellerVerification)
            .where(eq(sellerVerification.id, verificationId))
            .limit(1);

        if (!verification) {
            throw new Error("Verification not found");
        }

        // Update verification status
        await db
            .update(sellerVerification)
            .set({
                status,
                rejectionReason: status === "REJECTED" ? rejectionReason : null,
                verifiedAt: status === "APPROVED" ? new Date() : null,
                verifiedBy: session.user.id,
                updatedAt: new Date(),
            })
            .where(eq(sellerVerification.id, verificationId));

        // If approved, update user role to TEACHER
        if (status === "APPROVED") {
            await db
                .update(user)
                .set({ role: "TEACHER" })
                .where(eq(user.id, verification.userId));
        }

        revalidatePath("/admin/verifications");
        revalidatePath("/profile");
        return { success: true };
    } catch (error) {
        console.error("Error updating verification status:", error);
        throw error;
    }
}
