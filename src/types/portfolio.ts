import z from "zod";

export const createPortfolioSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(10, {}),
    tags: z.array(z.string().max(30)).min(1).max(5),
    images: z.array(z.any()).min(1, {
        message: "Please upload at least one file.",
    }),
});