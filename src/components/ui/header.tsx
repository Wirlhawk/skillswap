import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headerVariants = cva("scroll-m-20 tracking-tight", {
    variants: {
        size: {
            default: "text-2xl font-bold",
            lg: "text-4xl font-extrabold lg:text-5xl",
            md: "text-xl font-semibold",
            sm: "text-lg font-semibold",
            xs: "text-base font-semibold",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

export interface HeaderProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof headerVariants> {}

const Header = React.forwardRef<HTMLHeadingElement, HeaderProps>(
    ({ className, size, ...props }, ref) => {
        return (
            <h1
                ref={ref}
                className={cn(headerVariants({ size, className }))}
                {...props}
            />
        );
    }
);

Header.displayName = "Header";

export { Header, headerVariants };
