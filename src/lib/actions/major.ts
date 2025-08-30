"use server";

import { db } from "@/db/drizzle";
import { major } from "@/db/schema";

export async function getMajors() {
    try {
        const majors = await db.select().from(major).orderBy(major.name);
        return majors;
    } catch (error) {
        console.error("Error fetching majors:", error);
        return [];
    }
}

export async function getMajorById(id: string) {
    try {
        const [majorData] = await db
            .select()
            .from(major)
            .where(major.id.equals(id))
            .limit(1);

        return majorData || null;
    } catch (error) {
        console.error("Error fetching major:", error);
        return null;
    }
}
