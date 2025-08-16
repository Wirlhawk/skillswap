import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
    variable: "--font-lexend",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SkillSwap: A Freelance Platform for Students",
    description: "A Freelance Platform for Students",
    icons: {
        icon: "/assets/skillswap.png",
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
                {children}
                <Toaster />
            </body>
        </html>
    );
}
