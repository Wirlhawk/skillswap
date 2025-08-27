"use server";

import { auth } from "@/lib/auth";
import { put } from "@vercel/blob";
import { headers } from "next/headers";
import { category, major, service, user } from "../db/schema";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";


export const createService = async ({
    title,
    description,
    longDescription,
    categoryId,
    price,
    deliveryTime,
    revisions,
    packageName,
    packageDescription,
    features,
    tags,
    images,
}: {
    title: string;
    description: string;
    longDescription: string;
    categoryId: string;
    price: number;
    deliveryTime: string;
    revisions: string;
    packageName: string;
    packageDescription: string;
    features: string[];
    tags: string[];
    images: {
        file: File;
        id: string;
        preview: string;
    }[];
}) => {
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

        const newService = await db
            .insert(service)
            .values({
                title,
                description,
                longDescription,
                categoryId,
                price,
                deliveryTime,
                revisions,
                packageName,
                packageDescription,
                features,
                tags,
                images: uploadedImages,
                userId: session.user.id,
            } satisfies typeof service.$inferInsert)
            .returning();


        return { success: true, data: newService[0] };
    } catch (err: unknown) {
        const message =
            (err as Error)?.message ||
            "Failed to create Service";

        return { success: false, error: message };
    }
};

export const getAllService = async ({ categorySlug }: { categorySlug?: string }) => {
    try {
        const query = db
            .select({
                id: service.id,
                title: service.title,
                description: service.description,
                category: category.name,
                price: service.price,
                deliveryTime: service.deliveryTime,
                revisions: service.revisions,
                tags: service.tags,
                images: service.images,
                user: {
                    username: user.username,
                    image: user.image,
                    major: major.name,
                },
                createdAt: service.createdAt,
            })
            .from(service)
            .leftJoin(category, eq(service.categoryId, category.id))
            .leftJoin(user, eq(service.userId, user.id))
            .leftJoin(major, eq(user.majorId, major.id));

        if (categorySlug) {
            query.where(eq(category.slug, categorySlug));
        }

        const services = await query;

        return { success: true, data: services };
    } catch (err: unknown) {
        const message =
            (err as Error)?.message ||
            "Failed to fetch service";
        return { success: false, error: message };
    }
}