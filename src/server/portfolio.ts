"use server";
import { db } from "@/db/drizzle";
import { portfolio, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const createPortfolio = async (
    title: string,
    description: string,
    tags: string[],
    images: {
        file: File;
        id: string;
        preview: string;
    }[]
) => {
    try {

        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            throw new Error("User not authenticated");
        }

        const uploadedImages = await Promise.all(
            images.map(async (img, i) => {
                const { url } = await put(
                    `${session.user.id}-${Date.now()}-${i}-${img.file.name}`,
                    img.file,
                    { access: "public" }
                );

                return url;
            })
        );

        const newPortfolio = await db
            .insert(portfolio)
            .values({
                title,
                description,
                tags,
                images: uploadedImages,
                userId: session.user.id
            })
            .returning();

        revalidatePath("/profile/" + session.user.username);

        return { success: true, data: newPortfolio[0] };
    } catch (err: unknown) {
        const message =
            (err as Error)?.message ||
            "Failed to create portfolio";

        return { success: false, error: message };
    }
};

export const getPortfolio = async (username: string) => {
    try {
        // Get user by username
        const userResult = await db
            .select({ id: user.id })
            .from(user)
            .where(eq(user.username, username))
            .limit(1);

        if (!userResult || userResult.length === 0) {
            return { success: false, error: "User not found" };
        }

        const userId = userResult[0].id;

        // Get portfolios for the user
        const portfolios = await db
            .select({
                id: portfolio.id,
                title: portfolio.title,
                description: portfolio.description,
                images: portfolio.images,
                tags: portfolio.tags,
                createdAt: portfolio.createdAt,
            })
            .from(portfolio)
            .where(eq(portfolio.userId, userId));

        return { success: true, data: portfolios };
    } catch (err: unknown) {
        const message =
            (err as Error)?.message ||
            "Failed to fetch portfolio";
        return { success: false, error: message };
    }
};

export const deletePortfolio = async (portfolioId: string) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            throw new Error("User not authenticated");
        }

        const portfolioResult = await db
            .select({ user_id: portfolio.userId })
            .from(portfolio)
            .where(eq(portfolio.id, portfolioId))
            .limit(1);

        if (!portfolioResult || portfolioResult.length === 0) {
            return { success: false, error: "Portfolio not found" };
        }

        if (portfolioResult[0].user_id !== session.user.id) {
            return { success: false, error: "Unauthorized: You do not own this portfolio" };
        }

        await db
            .delete(portfolio)
            .where(eq(portfolio.id, portfolioId))
            .returning();

        revalidatePath("/profile/" + session.user.username);

        return { success: true };
    } catch (err: unknown) {
        const message =
            (err as Error)?.message ||
            "Failed to delete portfolio";
        return { success: false, error: message };
    }
}