"use client";
import React from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../ui/navigation-menu";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

const links = [
    { href: "/home", label: "Home" },
    { href: "/features", label: "Categories" },
    { href: "/label", label: "Dashboard" },
    { href: "/about", label: "Chat" },
];

export const BottomNavLinks = () => {
    const pathname = usePathname();
    const navigationLinks = links.map((link) => ({
        ...link,
        active: pathname === link.href,
    }));

    return (
        <div className="border-t py-2 max-md:hidden">
            {/* Navigation menu */}
            <div className="max-w-7xl mx-auto ">
                <NavigationMenu>
                    <NavigationMenuList className="gap-2">
                        {navigationLinks.map((link, index) => (
                            <NavigationMenuItem key={index}>
                                <NavigationMenuLink
                                    active={link.active}
                                    href={link.href}
                                    className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                                >
                                    {link.label}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
};

export const MobileNavLinks = () => {
    const pathname = usePathname();
    const navigationLinks = links.map((link) => ({
        ...link,
        active: pathname === link.href,
    }));

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
                            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                        />
                        <path
                            d="M4 12H20"
                            className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                        />
                    </svg>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                    <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                        {navigationLinks.map((link, index) => (
                            <NavigationMenuItem key={index} className="w-full">
                                <NavigationMenuLink
                                    href={link.href}
                                    className="py-1.5"
                                    active={link.active}
                                >
                                    {link.label}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </PopoverContent>
        </Popover>
    );
};
