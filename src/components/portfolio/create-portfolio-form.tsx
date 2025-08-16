"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPortfolio } from "@/server/portfolio";
import { createPortfolioSchema } from "@/types/portfolio";
import { useState } from "react";
import { toast } from "sonner";
import FormButton from "../ui/form-button";
import { TagsInput } from "../ui/tags-input";
import { FileUploadField } from "../ui/file-upload-field";

export default function CreatePortfolioForm() {
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof createPortfolioSchema>>({
        resolver: zodResolver(createPortfolioSchema),
        defaultValues: {
            title: "",
            description: "",
            tags: [],
            images: [],
        },
    });

    async function onSubmit(values: z.infer<typeof createPortfolioSchema>) {
        setIsLoading(true);
        setMessage(null);
        const res = await createPortfolio(
            values.title,
            values.description,
            values.tags,
            values.images
        );

        if (!res.success) {
            setMessage(res.error);
            setIsLoading(false);
            return;
        }

        toast.success("Portfolio Successfully Created!");
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter a title..."
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter a description..."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tag</FormLabel>
                            <FormControl>
                                <TagsInput
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Enter your portfolio tag"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                <FileUploadField
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormDescription>
                                Upload images (SVG, PNG, or JPG, max 5MB each).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {message && <FormMessage>{message}</FormMessage>}

                <FormButton pending={isLoading} title="Create Portfolio" />
            </form>
        </Form>
    );
}
