"use server";

import { db } from "@/db/drizzle";
import { user, major } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
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
