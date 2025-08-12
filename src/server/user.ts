"use server"

import { auth } from "@/lib/auth"


export const signIn = async (email: string, password: string) => {
    try {
        const res = await auth.api.signInEmail({
            body: { email, password },
        });

        return { success: true, data: res };
    } catch (err: any) {
        const message =
            err?.data?.error ||
            err?.message ||
            "Invalid email or password";

        return { success: false, error: message };
    }
};

export const signUp = async (
    name: string,
    email: string,
    username: string,
    password: string
) => {
    try {
        const res = await auth.api.signUpEmail({
            body: { name, username, email, password },
        });

        return { success: true, data: res };
    } catch (err: any) {
        const message =
            err?.data?.error ||
            err?.message ||
            "An unexpected error occurred";

        return { success: false, error: message };
    }
};