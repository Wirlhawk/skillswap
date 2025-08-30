"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

interface NavLinksProps {
    userRole?: string;
    username?: string;
}

const getLinks = (userRole?: string, username?: string) => {
    const baseLinks = [
        { href: "/home", label: "Home" },
        { href: "/my-orders", label: "My Orders" },
        { href: username ? `/profile/${username}` : "/profile", label: "Profile" },
    ];

    // Add dashboard link for SELLER (STUDENT) or TEACHER users
    if (userRole && (userRole === "STUDENT" || userRole === "TEACHER")) {
        const dashboardLink =
            userRole === "TEACHER"
                ? { href: "/admin/dashboard", label: "Admin Dashboard" }
                : { href: "/seller/dashboard", label: "Seller Dashboard" };
        baseLinks.push(dashboardLink);
    }

    return baseLinks;
};

export const BottomNavLinks = ({ userRole, username }: NavLinksProps) => {
    const pathname = usePathname();
    const links = getLinks(userRole, username);

    return (
        <div className="border-t py-2 max-md:hidden">
            {/* Navigation menu */}
            <div className="max-w-7xl mx-auto">
                <nav className="flex items-center gap-6">
                    {links.map((link, index) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className={`py-1.5 font-medium transition-colors ${
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-primary"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export const MobileNavLinks = ({ userRole, username }: NavLinksProps) => {
    const pathname = usePathname();
    const links = getLinks(userRole, username);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className={`group size-8 md:hidden`}
                    variant="ghost"
                    size="icon"
                >
                    <svg
                        className="pointer-events-none"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 12L20 12"
                            className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                        />
                        <path
                            d="M4 12H20"
                            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:rotate-45"
                        />
                        <path
                            d="M4 12H20"
                            className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                        />
                    </svg>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <nav className="flex flex-col gap-1">
                    {links.map((link, index) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className={`py-1.5 px-2 rounded-sm transition-colors ${
                                    isActive
                                        ? "bg-accent text-accent-foreground"
                                        : "hover:bg-accent hover:text-accent-foreground"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </PopoverContent>
        </Popover>
    );
};
