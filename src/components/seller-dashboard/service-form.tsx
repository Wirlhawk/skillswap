'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Service } from "./services-columns"; // Assuming this type can be reused or adapted

// Define the form schema using Zod
const formSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    longDescription: z.string().min(50, "Long description must be at least 50 characters."),
    price: z.coerce.number().min(1, "Price must be at least 1."),
    deliveryTime: z.string().min(1, "Delivery time is required."),
    revisions: z.coerce.number().min(0, "Revisions cannot be negative."),
    packageName: z.string().min(3, "Package name is required."),
    packageDescription: z.string().min(10, "Package description is required."),
    // features, tags, and images will be handled separately, perhaps with a more complex input
});

interface ServiceFormProps {
    service?: Service;
    onSave: (values: z.infer<typeof formSchema>) => void;
    isSaving: boolean;
}

export function ServiceForm({ service, onSave, isSaving }: ServiceFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: service ? {
            ...service,
            price: service.price / 100, // Assuming price is in cents
        } : {
            title: "",
            description: "",
            longDescription: "",
            price: 0,
            deliveryTime: "",
            revisions: 0,
            packageName: "",
            packageDescription: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Service Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., I will design a modern logo" {...field} />
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
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="A brief summary of your service" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="longDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Service Description</FormLabel>
                            <FormControl>
                                <Textarea rows={6} placeholder="Describe your service in detail..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price (in Rupiah)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="e.g., 50000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Add other fields for deliveryTime, revisions, etc. following the same pattern */}
                
                <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Service"}
                </Button>
            </form>
        </Form>
    );
}
