"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { TagsInput } from "@/components/ui/tags-input";
import { FileUploadField } from "../ui/file-upload-field";
import { createServiceSchema } from "@/types/service";
import MoneyInput from "../ui/money-input";
import FormButton from "../ui/form-button";
import { createService } from "@/server/service";
import TiptapEditor from "../ui/tiptap-editor";

export default function CreateServiceForm({
    categories,
}: {
    categories: {
        id: string;
        name: string;
        slug: string;
    }[];
}) {
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof createServiceSchema>>({
        resolver: zodResolver(createServiceSchema),
        defaultValues: {
            title: "",
            description: "",
            longDescription: "<p></p>",
            categoryId: "",
            duration: 0,
            price: 0,
            tags: [],
            images: [],
        },
    });

    async function onSubmit(values: z.infer<typeof createServiceSchema>) {
        setIsLoading(true);
        setMessage(null);
        const res = await createService({
            title: values.title,
            description: values.description,
            longDescription: values.longDescription,
            categoryId: values.categoryId,
            duration: values.duration,
            price: values.price,
            tags: values.tags,
            images: values.images,
        });

        if (!res.success) {
            setMessage(res.error || "");
            setIsLoading(false);
            return;
        }

        toast.success("Service Successfully Created!");

        // TODOs : redirect to detail page of service/:id
        // router.push(`/service/${res.data.id}`)

        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 py-10 max-w-5xl"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your title"
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe your service"
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
                    name="longDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Long Description</FormLabel>
                            <FormControl>
                                <TiptapEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <MoneyInput
                        form={form}
                        label="Price"
                        name="price"
                        placeholder="Rp 0.00"
                    />

                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Duration (days)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="Enter duration"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full">
                            <FormLabel>Category</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-full bg-card justify-between font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? categories.find(
                                                      (category) =>
                                                          category.id ===
                                                          field.value
                                                  )?.name
                                                : "Select category"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search category..." />
                                        <CommandList>
                                            <CommandEmpty>
                                                No category found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {categories.map((category) => (
                                                    <CommandItem
                                                        value={category.name}
                                                        key={category.id}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                "categoryId",
                                                                category.id
                                                            );
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                category.id ===
                                                                    field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {category.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <TagsInput
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Enter your tags"
                                />
                            </FormControl>
                            <FormDescription>Add tags.</FormDescription>
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

                <FormButton pending={isLoading} title="Create Service" />
            </form>
        </Form>
    );
}
