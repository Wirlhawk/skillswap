"use client";

import {
    BookOpenIcon,
    LogOutIcon,
    User
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    username: string;
    name: string;
    email: string;
    image: string;
    role: string;
}

export default function UserMenu({
    username,
    name,
    image,
    role,
}: UserMenuProps) {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/login");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="link"
                    className="h-auto p-0 hover:bg-transparent"
                >
                    <Avatar>
                        <AvatarImage src={image} alt="Profile image" />
                        <AvatarFallback>KK</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64" align="end">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-muted-foreground truncate text-sm font-semibold">
                        {name}
                    </span>
                    <span className="text-foreground truncate text-xs font-medium">
                        @{username}
                    </span>
                    <span className="text-foreground truncate text-xs font-medium">
                        {role}
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={`/profile/${username}`}>
                        <DropdownMenuItem>
                            <User
                                size={16}
                                className="opacity-60"
                                aria-hidden="true"
                            />
                            <span>Profile</span>
                        </DropdownMenuItem>
                    </Link>
                    {role !== "STUDENT" && role !== "TEACHER" ? (
                        <Link href="/become-seller">
                            <DropdownMenuItem>
                                <BookOpenIcon
                                    size={16}
                                    className="opacity-60"
                                    aria-hidden="true"
                                />
                                <span>Become a Seller</span>
                            </DropdownMenuItem>
                        </Link>
                    ) : null}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                    />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
