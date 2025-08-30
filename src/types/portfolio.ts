import z from "zod";

export const createPortfolioSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters long"
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters long"
    }),
    tags: z.array(z.string().max(30, {
        message: "Each tag must be 30 characters or less"
    })).min(1, {
        message: "Please add at least one tag"
    }).max(5, {
        message: "Maximum of 5 tags allowed"
    }),
    images: z.array(z.instanceof(File)).min(1, {
        message: "Please upload at least one image file"
    }).max(5, {
        message: "Maximum of 5 images allowed"
    }),
});