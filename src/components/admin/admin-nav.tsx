"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, CheckCircle } from "lucide-react";

export function AdminNav() {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
        },
        {
            name: "Verifications",
            href: "/admin/verifications",
            icon: <CheckCircle className="h-4 w-4 mr-2" />,
        },
    ];

    return (
        <div className="flex items-center gap-2 mb-8">
            {navItems.map((item) => (
                <Button
                    key={item.href}
                    variant={pathname === item.href ? "default" : "outline"}
                    size="sm"
                    asChild
                >
                    <Link href={item.href}>
                        {item.icon}
                        {item.name}
                    </Link>
                </Button>
            ))}
        </div>
    );
}