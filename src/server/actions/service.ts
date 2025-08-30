'use server';

import { db } from "@/db/drizzle";
import { service } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import * as z from "zod";
import crypto from "crypto";

// Zod schema for validation on the server
const serviceSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(10),
    longDescription: z.string().min(50),
    price: z.coerce.number().min(1),
    deliveryTime: z.string().min(1),
    revisions: z.coerce.number().min(0),
    packageName: z.string().min(3),
    packageDescription: z.string().min(10),
});

export async function createService(values: z.infer<typeof serviceSchema>): Promise<{ error: string } | { success: string }> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const validatedFields = serviceSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    try {
        await db.insert(service).values({
            ...validatedFields.data,
            price: validatedFields.data.price * 100, // Store in cents
            userId: userId,
            id: crypto.randomUUID(),
            categoryId: "default", // This should come from the form in a real implementation
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        revalidatePath("/seller/services");
        return { success: "Service created successfully!" };

    } catch (error: unknown) {
        return { error: "Failed to create service." };
    }
}



export async function deleteService(serviceId: string): Promise<{ error: string } | { success: string }> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!userId) {
        return { error: "Unauthorized" };
    }

    try {
        // First check if the service belongs to the user
        const existingService = await db.select()
            .from(service)
            .where(and(eq(service.id, serviceId), eq(service.userId, userId)))
            .limit(1);
            
        if (existingService.length === 0) {
            return { error: "Service not found or you don't have permission to delete it." };
        }
        
        await db.delete(service).where(eq(service.id, serviceId));

        revalidatePath("/seller/services");
        return { success: "Service deleted successfully!" };

    } catch (error: unknown) {
        console.error("Error deleting service:", error);
        return { error: "Failed to delete service." };
    }
}