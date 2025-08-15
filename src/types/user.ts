import z from "zod";

export const loginFormSchema = z.object({
    email: z.string().min(3),
    password: z.string().min(1)
});

export const registerFormSchema = z.object({
    email: z.string().min(3),
    name: z.string().min(3).max(50),
    username: z.string().min(1).max(20),
    password: z.string().min(1).max(20),
});

export const editProfileFormSchema = z.object({
    name: z.string().min(1).max(50),
    bio: z.string().max(150).optional(),
    skills: z.array(z.string().max(30)),
});