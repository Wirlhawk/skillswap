import { LoaderCircle } from "lucide-react";
import { Button } from "./button";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

interface FormButtonProps {
    title: string;
    pending: boolean;
    variant?: ButtonVariant;
}

export default function FormButton({
    title,
    pending,
    variant = "default",
}: FormButtonProps) {
    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-full flex items-center justify-center gap-2"
            variant={variant}
            aria-busy={pending}
        >
            {pending ? (
                <LoaderCircle
                    className="animate-spin"
                    size={18}
                    strokeWidth={2}
                />
            ) : (
                title
            )}
        </Button>
    );
}
