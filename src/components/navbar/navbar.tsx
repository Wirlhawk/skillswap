import Logo from "@/components/navbar/logo";
import NotificationMenu from "@/components/navbar/notification-menu";
import UserMenu from "@/components/navbar/user-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { SearchIcon } from "lucide-react";
import { headers } from "next/headers";

import { BottomNavLinks, MobileNavLinks } from "./nav-links";

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
                    <MobileNavLinks />
                    {/* Logo */}
                    <div className="items-center flex">
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
                    <div className="relative mx-auto w-full max-w-xs">
                        <Input
                            className="peer h-8 ps-8 pe-10"
                            placeholder="Search..."
                            type="search"
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                            <SearchIcon size={16} />
                        </div>
                        <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
                            <kbd className="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                                ⌘K
                            </kbd>
                        </div>
                    </div>
                </div>
                {/* Right side */}
                <div className="flex flex-1 items-center justify-end gap-3">
                    {session ? (
                        <>
                            <NotificationMenu />
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
            <BottomNavLinks />
        </header>
    );
}
