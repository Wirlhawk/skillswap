import z from "zod";
export const loginFormSchema = z.object({
    email: z.string().email("Please enter a valid email address").min(3, "Email must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

export const registerFormSchema = z.object({
    email: z.string().email("Please enter a valid email address").min(3, "Email must be at least 3 characters"),
    name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name cannot exceed 50 characters"),
    username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username cannot exceed 20 characters")
        .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores and hyphens"),
    password: z.string().min(8, "Password must be at least 8 characters")
        .max(100, "Password cannot exceed 100 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
});

export const editProfileFormSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name cannot exceed 50 characters"),
    bio: z.string().max(150, "Bio cannot exceed 150 characters").optional(),
    skills: z.array(z.string().max(30, "Each skill cannot exceed 30 characters"))
        .max(10, "You can add up to 10 skills")
        .min(1, "Please add at least one skill"),
});