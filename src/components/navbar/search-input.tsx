"use client"
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
            router.push(`/q/${encodeURIComponent(trimmedQuery)}`);
        } else {
            router.push('/home');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative mx-auto w-full max-w-xs">
            <Input
                className="peer h-8 ps-8 pe-10"
                placeholder="Search..."
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
                <SearchIcon size={16} />
            </div>
            <div className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2">
                <kbd className="text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    ⌘K
                </kbd>
            </div>
        </form>
    );
}
