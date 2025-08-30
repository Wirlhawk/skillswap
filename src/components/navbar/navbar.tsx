import Logo from "@/components/navbar/logo";
import NotificationMenu from "@/components/navbar/notification-menu";
import UserMenu from "@/components/navbar/user-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { SearchIcon } from "lucide-react";
import { headers } from "next/headers";

import { BottomNavLinks, MobileNavLinks } from "./nav-links";
import SearchInput from "./search-input";

// Navigation links array to be used in both desktop and mobile menus

export default async function Navbar() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <header className="border-b px-4">
            <div className="flex h-16 items-center justify-between gap-4 max-w-7xl mx-auto ">
                {/* Left side */}
                <div className="flex flex-1 items-center gap-2">
                    {/* Mobile menu trigger */}
                    <MobileNavLinks
                        userRole={session?.user?.role || undefined}
                        username={session?.user?.username || undefined}
                    />
                    {/* Logo */}
                    <div className="items-center flex md:flex hidden">
                        <a
                            href="#"
                            className="text-primary hover:text-primary/90"
                        >
                            <Logo />
                        </a>
                    </div>
                </div>
                {/* Middle area */}
                <div className="grow">
                    {/* Search form */}
                    <SearchInput />
                </div>
                {/* Right side */}
                <div className="flex flex-1 items-center justify-end gap-3">
                    {session ? (
                        <>
                            {/* <NotificationMenu /> */}
                            <UserMenu
                                username={session.user.username ?? ""}
                                name={session.user.name ?? ""}
                                email={session.user.email ?? ""}
                                image={session.user.image ?? ""}
                                role={session.user.role ?? ""}
                            />
                        </>
                    ) : (
                        <Button asChild variant="secondary" size="sm">
                            <a href="/login">Try For Free</a>
                        </Button>
                    )}
                </div>
            </div>
            {/* Bottom navigation */}
            <BottomNavLinks 
                userRole={session?.user?.role || undefined} 
                username={session?.user?.username || undefined} 
            />
        </header>
    );
}
