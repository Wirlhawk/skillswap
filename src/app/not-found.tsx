// app/not-found.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <h1 className="text-7xl font-bold text-foreground">404</h1>
            <h2 className="mt-4 text-2xl font-semibold text-foreground">
                Page Not Found
            </h2>

            <p className="mt-2 max-w-md text-muted-foreground">
                Oops! The page you are looking for doesn’t exist or has been
                moved.
            </p>

            <Link href="/" className="mt-6">
                <Button>
                    <ArrowLeft size={18} />
                    Back to Home
                </Button>
            </Link>
        </section>
    );
}

