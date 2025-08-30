'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ServiceForm } from "./service-form";
import { createService } from "@/server/actions/service";
import { toast } from "sonner";
import { z } from "zod";

// Re-define the schema here or import from a shared file
const formSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
    longDescription: z.string().min(50, "Long description must be at least 50 characters."),
    price: z.coerce.number().min(1, "Price must be at least 1."),
    deliveryTime: z.string().min(1, "Delivery time is required."),
    revisions: z.coerce.number().min(0, "Revisions cannot be negative."),
    packageName: z.string().min(3, "Package name is required."),
    packageDescription: z.string().min(10, "Package description is required."),
});

export function CreateServiceDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async (values: z.infer<typeof formSchema>) => {
        setIsSaving(true);
        try {
            const result = await createService(values);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(result.success);
                setIsOpen(false);
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Create New Service</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Create a New Service</DialogTitle>
                </DialogHeader>
                <ServiceForm onSave={handleSave} isSaving={isSaving} />
            </DialogContent>
        </Dialog>
    );
}
