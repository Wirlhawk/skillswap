"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
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
import { submitSellerVerification } from "@/lib/actions/seller-verification";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FileUploadField } from "./ui/file-upload-field";
import FormButton from "./ui/form-button";
import { SingleFileUploadField } from "./ui/single-file-upload-field";

interface Major {
    id: string;
    name: string;
    alias: string;
}

interface SellerVerificationFormProps {
    majors: Major[];
}

// Define Zod schema for form validation
const formSchema = z.object({
    majorId: z.string({
        message: "Please select your major",
    }),
    schoolName: z
        .string({
            message: "Please enter your school name",
        })
        .min(10, {
            message: "School name must be at least 10 characters",
        })
        .trim(),
    studentIdImage: z
        .array(
            z.instanceof(File, {
                message: "Please upload your student ID image",
            })
        )
        .max(1, {
            message: "Only one student ID image can be uploaded",
        }),
    // We'll handle file validation separately since Zod doesn't handle File objects directly
});

// Define the type for our form values
type FormValues = z.infer<typeof formSchema>;

export function SellerVerificationForm({
    majors,
}: SellerVerificationFormProps) {
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Initialize react-hook-form with Zod validation
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            majorId: "",
            schoolName: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setMessage(null);
        const res = await submitSellerVerification({
            studentIdImage: {
                file: values.studentIdImage[0],
                id: "student-id-image",
                preview: URL.createObjectURL(values.studentIdImage[0])
            },
            majorId: values.majorId,
            schoolName: values.schoolName,
        });

        if (!res.success) {
            setMessage(res.message);
            setIsLoading(false);
            toast.error("Failed to submit verification request");

            return;
        }

        toast.success("Verification request submitted successfully!");
        setIsLoading(false);
    }

    // const onSubmit = async (values: FormValues) => {
    //     // Validate file upload separately since Zod doesn't handle it
    //     if (!studentIdImage) {
    //         toast.error("Please upload your student ID image");
    //         return;
    //     }

    //     setIsSubmitting(true);

    //     try {
    //         // Submit the form data
    //         const result = await submitSellerVerification({
    //             studentIdImage,
    //             majorId: values.majorId,
    //             schoolName: values.schoolName.trim(),
    //         });

    //         if (result.success) {
    //             toast.success(
    //                 "Verification request submitted successfully! We'll review your application shortly."
    //             );
    //             // Reset form
    //             setStudentIdImage(null);
    //             setImagePreview(null);
    //             form.reset();
    //         } else {
    //             toast.error( "Failed to submit verification request");
    //         }
    //     } catch (error) {
    //         console.error("Error submitting verification:", error);
    //         toast.error("An unexpected error occurred. Please try again.");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                    Become a Seller
                </CardTitle>
                <CardDescription>
                    Submit your student verification to start selling your
                    skills and services
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="studentIdImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Student ID Image</FormLabel>
                                    <FormControl>
                                        <SingleFileUploadField
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Major Selection */}
                        <FormField
                            control={form.control}
                            name="majorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Major *</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your major" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {majors.map((major) => (
                                                <SelectItem
                                                    key={major.id}
                                                    value={major.id}
                                                >
                                                    {major.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* School Name */}
                        <FormField
                            control={form.control}
                            name="schoolName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>School Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your school name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <FormButton
                            pending={isLoading}
                            title="Submit Verification Request"
                        />

                        <p className="text-xs text-muted-foreground text-center">
                            Please ensure your student ID is clearly visible and
                            legible. We&apos;ll review your application within
                            24-48 hours.
                        </p>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
