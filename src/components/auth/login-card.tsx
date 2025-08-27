"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordInput } from "../ui/password-input";
import { AuthCardWrapper } from "./auth-card-wrapper";
import { loginFormSchema } from "@/types/user";
import { signIn } from "@/server/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormButton from "../ui/form-button";

export default function LoginCard() {
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        setIsLoading(true);
        setMessage(null);
        const res = await signIn(values.email, values.password);

        if (!res.success) {
            setMessage(res.error);
            setIsLoading(false);
            return;
        }

        toast.success("Login successful!");
        router.push("/");
    }

    return (
        <AuthCardWrapper
            title="Login"
            description="Please enter your credentials to login"
            footer="Dont have an account?"
            href="/register"
            linkTitle="Register"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Johndoe@mail.com"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="*********"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {message && <FormMessage>{message}</FormMessage>}

                    <FormButton pending={isLoading} title="Login" />
                </form>
            </Form>
        </AuthCardWrapper>
    );
}
