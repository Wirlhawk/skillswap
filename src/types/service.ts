import z from "zod";

export const createServiceSchema = z.object({
    title: z.string().min(10).max(50),
    description: z.string().min(30),
    longDescription: z.string().min(30).max(700),
    categoryId: z.string(),
    price: z.number().min(1),
    duration: z.number().min(1),
    tags: z.array(z.string()).min(1, {
        error: "Please select at least one item",
    }),
    images: z.array(z.any()).min(1, {
        message: "Please upload at least one file.",
    }),
});
