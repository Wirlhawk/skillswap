"use client";

import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { createOrder } from "@/server/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const orderFormSchema = z.object({
    requirements: z
        .string()
        .min(10, "Project requirements must be at least 10 characters long"),
    additionalNotes: z.string().optional(),
    serviceId: z.string(),
    sellerId: z.string(),
    totalPrice: z.number(),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

interface OrderFormProps {
    servicePrice: string;
    serviceId: string;
    sellerId: string;
    onBack: () => void;
    onSuccess?: () => void;
}

export function OrderForm({
    servicePrice,
    serviceId,
    sellerId,
    onBack,
    onSuccess,
}: OrderFormProps) {
    const router = useRouter();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<OrderFormData>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            requirements: "",
            additionalNotes: "",
            serviceId,
            sellerId,
            totalPrice: parseInt(servicePrice.replace(/[^\d]/g, "")),
        },
    });

    async function onSubmit(values: OrderFormData) {
        2;
        setIsLoading(true);
        setMessage(null);

        const res = await createOrder({
            requirements: values.requirements,
            additionalNotes: values.additionalNotes,
            serviceId: values.serviceId,
            sellerId: values.sellerId,
            totalPrice: values.totalPrice,
        });

        if (!res.success) {
            setMessage(res.error || "");
            setIsLoading(false);
            return;
        }

        console.log("Order created:", res.order);

        toast.success("Order Successfully Created!");
        form.reset();
        if (res.order) {
            router.push(`/order/${res.order.id}`);
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <CardTitle className="text-xl">Checkout Service</CardTitle>
                <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-muted-foreground">
                                Project Requirements *
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe your video editing requirements, style preferences, and any specific instructions..."
                                    className="resize-none h-24 text-sm"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-muted-foreground">
                                Additional Notes
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Any additional information or special requests..."
                                    className="resize-none h-16 text-sm"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Service</span>
                        <span className="text-sm">{servicePrice}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center font-semibold">
                        <span>Total</span>
                        <span className="text-primary">{servicePrice}</span>
                    </div>
                </div>

                {message && <FormMessage>{message}</FormMessage>}

                <div className="space-y-2">
                    <Button
                        type="submit"
                        className="w-full font-semibold py-3"
                        disabled={!form.formState.isValid || isLoading}
                    >
                        {isLoading ? "Placing Order..." : "Place Order"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={onBack}
                        disabled={isLoading}
                    >
                        Back to Package
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                    By placing this order, you agree to our Terms of Service and
                    Privacy Policy
                </p>
            </form>
        </Form>
    );
}
