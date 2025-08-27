"use client";
import { FeatureList } from "@/components/form/feature-list";
import { ImageUpload } from "@/components/form/image-upload";
import { TagInput } from "@/components/form/tag-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import { cn } from "@/lib/utils";
import TiptapEditor from "../ui/tiptap-editor";
import { useState } from "react";
import { createService } from "@/server/service";
import FormButton from "../ui/form-button";
import { createServiceSchema } from "@/types/service";
import MoneyInput from "../ui/money-input";
import { useRouter } from "next/navigation";

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
    const router = useRouter()

    const form = useForm<z.infer<typeof createServiceSchema>>({
        resolver: zodResolver(createServiceSchema),
        defaultValues: {
            title: "Professional Video Editing Service",
            description:
                "I will edit your videos with professional quality and attention to detail",
            longDescription:
                "<p>As an experienced video editor with over 5 years of experience, I offer comprehensive video editing services including color correction, transitions, effects, and sound mixing. I use industry-standard software like Adobe Premiere Pro and After Effects.</p>",
            categoryId: "",
            price: 250000,
            deliveryTime: "3 days",
            revisions: "2",
            packageName: "Standard Video Editing Package",
            packageDescription:
                "Professional video editing with basic effects and color grading",
            features: [
                "Color correction",
                "Transitions",
                "Background music",
                "Basic effects",
            ],
            tags: ["video editing", "post production", "color grading"],
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
            price: values.price,
            deliveryTime: values.deliveryTime,
            revisions: values.revisions,
            packageName: values.packageName,
            packageDescription: values.packageDescription,
            features: values.features,
            tags: values.tags,
            images: values.images,
        });

        if (!res.success) {
            setMessage(res.error || "");
            setIsLoading(false);
            return;
        }

        toast.success("Service Successfully Created!");
        router.push(`/service/${res.data!.id}`)
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service Title *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="I'll Edit Your Professional Video Content"
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
                                    <FormLabel>Short Description *</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Transform your raw footage into engaging, professional videos..."
                                            className="h-24"
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
                                    <FormDescription>
                                        Provide a detailed description of your
                                        service, your experience, tools you use,
                                        and what makes your service unique.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                                        {categories.map(
                                                            (category) => (
                                                                <CommandItem
                                                                    value={
                                                                        category.name
                                                                    }
                                                                    key={
                                                                        category.id
                                                                    }
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
                                                                    {
                                                                        category.name
                                                                    }
                                                                </CommandItem>
                                                            )
                                                        )}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                {/* Service Images */}
                <Card>
                    <CardHeader>
                        <CardTitle>Service Images</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <ImageUpload
                                            images={field.value}
                                            onImagesChange={field.onChange}
                                            error={
                                                form.formState.errors.images
                                                    ?.message
                                            }
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                {/* Package Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Package Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="packageName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Package Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Professional Video Editing"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="packageDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Package Description *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Professional editing with motion graphics and effects"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <MoneyInput
                                form={form}
                                label="Price"
                                name="price"
                                placeholder="Rp 0.00"
                            />

                            <FormField
                                control={form.control}
                                name="deliveryTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Delivery Time *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select delivery time" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1 day">
                                                    1 day
                                                </SelectItem>
                                                <SelectItem value="2 days">
                                                    2 days
                                                </SelectItem>
                                                <SelectItem value="3 days">
                                                    3 days
                                                </SelectItem>
                                                <SelectItem value="4 days">
                                                    4 days
                                                </SelectItem>
                                                <SelectItem value="5 days">
                                                    5 days
                                                </SelectItem>
                                                <SelectItem value="6 days">
                                                    6 days
                                                </SelectItem>
                                                <SelectItem value="1 week">
                                                    1 week
                                                </SelectItem>
                                                <SelectItem value="10 days">
                                                    10 days
                                                </SelectItem>
                                                <SelectItem value="2 weeks">
                                                    2 weeks
                                                </SelectItem>
                                                <SelectItem value="3 weeks">
                                                    3 weeks
                                                </SelectItem>
                                                <SelectItem value="1 month">
                                                    1 month
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="revisions"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Number of Revisions *
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select revisions" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    1 revision
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    2 revisions
                                                </SelectItem>
                                                <SelectItem value="3">
                                                    3 revisions
                                                </SelectItem>
                                                <SelectItem value="unlimited">
                                                    Unlimited revisions
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="features"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <FeatureList
                                            features={field.value}
                                            onFeaturesChange={field.onChange}
                                            error={
                                                form.formState.errors.features
                                                    ?.message
                                            }
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                {/* Tags */}
                <Card>
                    <CardHeader>
                        <CardTitle>Service Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <TagInput
                                            tags={field.value}
                                            onTagsChange={field.onChange}
                                            placeholder="Add a tag (e.g., Video Editing, Motion Graphics)"
                                            error={
                                                form.formState.errors.tags
                                                    ?.message
                                            }
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                {/* Submit Buttons */}
                {message && <FormMessage>{message}</FormMessage>}
                <FormButton pending={isLoading} title="Publish Service" />{" "}
            </form>
        </Form>
    );
}
