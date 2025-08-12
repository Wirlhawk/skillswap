import z from "zod";

export const loginFormSchema = z.object({
    email: z.string().min(3),
    password: z.string().min(1)
});

export const registerFormSchema = z.object({
    email: z.string().min(1),
    name: z.string().min(1),
    username: z.string().min(1),
    password: z.string().min(1),
});