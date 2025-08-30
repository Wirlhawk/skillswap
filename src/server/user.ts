"use server";

import { db } from "@/db/drizzle";
import { user, major, order, review } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, and, gte, desc, sql, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { put } from "@vercel/blob";

export const signIn = async (email: string, password: string) => {
    try {
        const res = await auth.api.signInEmail({
            body: { email, password },
        });

        return { success: true, data: res };
    } catch (err: unknown) {
        const message =
            (err as any)?.data?.error ||
            (err as any)?.message ||
            "Invalid email or password";

        return { success: false, error: message };
    }
}

export const getRisingStars = async (limit: number = 5) => {
    try {
        // Get the start of current month
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Query to get users with most completed orders this month
        const risingStarsQuery = await db
            .select({
                id: user.id,
                name: user.name,
                image: user.image,
                username: user.username,
                majorName: major.name,
                completedOrders: count(order.id),
            })
            .from(user)
            .leftJoin(order, eq(order.sellerId, user.id))
            .leftJoin(major, eq(user.majorId, major.id))
            .where(
                and(
                    eq(order.status, "Done"),
                    gte(order.updatedAt, startOfMonth)
                )
            )
            .groupBy(user.id, user.name, user.image, major.name)
            .orderBy(desc(count(order.id)))
            .limit(limit);

        // Get ratings for these users
        const userIds = risingStarsQuery.map(star => star.id);
        
        if (userIds.length === 0) {
            return { success: true, data: [] };
        }

        // Get average ratings for each user
        const ratingsQuery = await db
            .select({
                sellerId: order.sellerId,
                averageRating: sql<number>`COALESCE(AVG(${review.rating}), 0)`,
            })
            .from(review)
            .leftJoin(order, eq(review.orderId, order.id))
            .where(sql`${order.sellerId} IN (${sql.join(userIds.map(id => sql`${id}`), sql`, `)})`)
            .groupBy(order.sellerId);

        // Create a map of user ratings
        const ratingsMap = new Map<string, number>();
        ratingsQuery.forEach(rating => {
            if (rating.sellerId) {
                ratingsMap.set(rating.sellerId, Number(rating.averageRating) || 0);
            }
        });

        // Combine the data
        const risingStars = risingStarsQuery.map(star => ({
            id: star.id,
            name: star.name || "Unknown User",
            username: star.username,
            avatar: star.image || "/placeholder.svg?height=60&width=60",
            rating: ratingsMap.get(star.id) || 0,
            completedOrders: Number(star.completedOrders) || 0,
            majors: star.majorName || "Not specified",
        }));

        return { success: true, data: risingStars };
    } catch (err: unknown) {
        const message =
            (err as Error)?.message ||
            "Failed to fetch rising stars";
        return { success: false, error: message };
    }
};

export const signUp = async (
    name: string,
    email: string,
    username: string,
    password: string
) => {
    try {
        const res = await auth.api.signUpEmail({
            body: { name, username, email, password },
        });

        return { success: true, data: res };
    } catch (err: unknown) {
        const message =
            (err as any)?.data?.error ||
            (err as any)?.message ||
            "An unexpected error occurred";

        return { success: false, error: message };
    }
};

export const getProfile = async (username: string) => {
    try {
        const profile = await db
            .select({
                id: user.id,
                name: user.name,
                role: user.role,
                school: user.school,
                bio: user.bio,
                major: major.name,
                skills: user.skills,
                image: user.image,
                username: user.username,
                createdAt: user.createdAt,
            })
            .from(user)
            .leftJoin(major, eq(user.majorId, major.id))
            .where(eq(user.username, username))
            .limit(1);

        if (!profile || profile.length === 0) {
            return { success: false, error: "Profile not found" };
        }

        return { success: true, data: profile[0] };
    } catch (err: unknown) {
        const message =
            (err as any)?.data?.error ||
            (err as any)?.message ||
            "Failed to fetch profile";

        return { success: false, error: message };
    }
}

export const editProfile = async (
    name: string,
    bio: string,
    skills: string[]
) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            throw new Error("User not authenticated");
        }

        const updatedUser = await db
            .update(user)
            .set({ name, bio, skills })
            .where(eq(user.id, session.user.id))
            .returning();

        revalidatePath("/profile/" + session.user.username);
        return { success: true, data: updatedUser[0] };
    } catch (err: unknown) {
        const message =
            (err as any)?.data?.error ||
            (err as any)?.message ||
            "Failed to update profile";

        return { success: false, error: message };
    }
};

export const updateProfileImage = async (formData: FormData) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            throw new Error("User not authenticated");
        }

        const file = formData.get("image");
        if (!file || !(file instanceof File)) {
            throw new Error("No image provided");
        }

        const fileType = file.type || "image/jpeg";
        const extension = fileType.split("/")[1] || "jpg";
        const objectKey = `profile-images/${session.user.id}-${Date.now()}.${extension}`;

        const { url } = await put(objectKey, file, {
            access: "public",
            addRandomSuffix: false,
        });

        const updatedUser = await db
            .update(user)
            .set({ image: url })
            .where(eq(user.id, session.user.id))
            .returning();

        revalidatePath("/profile/" + session.user.username);
        return { success: true, data: updatedUser[0] };
    } catch (err: unknown) {
        const message =
            (err as any)?.data?.error ||
            (err as any)?.message ||
            "Failed to update profile image";

        return { success: false, error: message };
    }
}
