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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormButton from "../ui/form-button";
import { TagsInput } from "../ui/tags-input";
import { editProfileFormSchema } from "@/types/user";
import { editProfile } from "@/server/user";
import { useState } from "react";
import { toast } from "sonner";

export default function EditProfileForm({
    defaultValues,
}: {
    defaultValues?: Partial<z.infer<typeof editProfileFormSchema>>;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof editProfileFormSchema>>({
        resolver: zodResolver(editProfileFormSchema),
        defaultValues: {
            name: "",
            bio: "",
            skills: [],
            ...defaultValues,
        },
    });

    async function onSubmit(values: z.infer<typeof editProfileFormSchema>) {
        setIsLoading(true);
        // Ensure name and bio are always strings
        const res = await editProfile(
            values.name ?? "",
            values.bio ?? "",
            values.skills
        );

        if (!res.success) {
            setIsLoading(false);
            toast.error(res.error);

            return;
        }
        setIsLoading(false);
        toast.success("Profile Updated");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="John Doe"
                                    type=""
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your biography"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skills</FormLabel>
                            <FormControl>
                                <TagsInput
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Enter your Skills"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormButton pending={isLoading} title="Update Profile" />
            </form>
        </Form>
    );
}
