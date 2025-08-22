import { db } from "@/db/drizzle";
import { category } from "../db/schema";



export const getCategories = async () => {

    try {
        const categories = await db.select().from(category)

        return { success: true, data: categories };
    } catch (err: unknown) {
        const message =
            (err as Error)?.message ||
            "Failed to fetch category";
        return { success: false, error: message };
    }
};