import z from "zod";

export const  createServiceSchema = z.object({
    title: z
        .string()
        .min(10, "Title must be at least 10 characters")
        .max(100, "Title must be less than 100 characters"),
    description: z
        .string()
        .min(50, "Description must be at least 50 characters")
        .max(300, "Description must be less than 300 characters"),
    longDescription: z
        .string()
        .min(100, "Detailed description must be at least 100 characters"),
    categoryId: z.string().min(1, "Please select a category"),
    price: z.number().min(1),
    deliveryTime: z.string().min(1, "Please select delivery time"),
    revisions: z.string().min(1, "Please select number of revisions"),
    packageName: z
        .string()
        .min(5, "Package name must be at least 5 characters"),
    packageDescription: z
        .string()
        .min(10, "Package description must be at least 10 characters"),
    features: z
        .array(z.string().min(1, "Feature cannot be empty"))
        .min(1, "At least one feature is required"),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    images: z.array(z.any()).min(1, "At least one image is required"),
});