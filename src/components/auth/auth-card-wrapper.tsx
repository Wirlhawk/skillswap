import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Box } from "lucide-react";
import { FormMessage } from "../ui/form";

export function AuthCardWrapper({
    title,
    description,
    className,
    footer,
    href,
    linkTitle,
    children,
    ...props
}: {
    title: string;
    description: string;
    className?: string;
    footer: string;
    href: string;
    linkTitle: string;
    errorMessage?: string;
    children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("flex flex-col gap-6 max-w-sm w-full", className)}
            {...props}
        >
            <Card>
                <CardHeader className="my-2 flex-row flex items-center gap-3">
                    {/* <Box className="size-10" /> */}
                    <img
                        src="/assets/skillswap.png"
                        alt="SkillSwap logo"
                        className="w-14"
                    />

                    <div className="">
                        <CardTitle className="text-xl font-bold">
                            {title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            {description}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>{children}</CardContent>

                <CardFooter>
                    <div className="mt-2 text-center text-sm mx-auto">
                        {footer}{" "}
                        <a href={href} className="underline underline-offset-4">
                            {linkTitle}
                        </a>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
