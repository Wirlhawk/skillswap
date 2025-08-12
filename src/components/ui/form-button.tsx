import { LoaderCircle } from "lucide-react";
import { Button } from "./button";

export default function FormButton({
    title,
    pending,
}: {
    title: string;
    pending: boolean;
}) {
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? <LoaderCircle className="animate-spin" /> : title}
        </Button>
    );
}
