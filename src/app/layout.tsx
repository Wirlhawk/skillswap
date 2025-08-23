import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const lexend = Lexend({
    variable: "--font-lexend",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SkillSwap: A Freelance Platform for Students",
    description: "A Freelance Platform for Students",
    icons: {
        icon: "/assets/skillswap-bg.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${lexend.className} antialiased`}>
                <NuqsAdapter>{children}</NuqsAdapter>
                <Toaster />
            </body>
        </html>
    );
}
