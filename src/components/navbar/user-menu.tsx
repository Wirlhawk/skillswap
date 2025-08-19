"use client";

import {
    BookOpenIcon,
    Layers2Icon,
    LogOutIcon,
    PinIcon,
    User,
    UserPenIcon,
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
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserMenuProps {
    username: string;
    name: string;
    email: string;
    image: string;
}

export default function UserMenu({ username, name, image }: UserMenuProps) {
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
                    <Link href="/portfolio-showcase">
                        <DropdownMenuItem>
                            <Layers2Icon
                                size={16}
                                className="opacity-60"
                                aria-hidden="true"
                            />
                            <span>Portfolio</span>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        <BookOpenIcon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                        <span>Skills</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <PinIcon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                        />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <Link href="/user/edit">
                        <DropdownMenuItem>
                            <UserPenIcon
                                size={16}
                                className="opacity-60"
                                aria-hidden="true"
                            />
                            <span>Edit Profile</span>
                        </DropdownMenuItem>
                    </Link>
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
