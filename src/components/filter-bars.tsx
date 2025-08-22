// app/search/search-bar.tsx
"use client";

import { useQueryState } from "nuqs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function FilterBars({
    categories,
}: {
    categories: {
        id: string;
        name: string;
        slug: string;
    }[];
}) {
    const [category, setCategory] = useQueryState("category", {
        defaultValue: "",
        history: "push", // makes navigation trigger refresh in Next.js
    });

    return (
        <div className="flex flex-col md:flex-row gap-3">
            {/* Category Dropdown */}
            <Select
                value={category || "All"}
                onValueChange={(val) => setCategory(val === "All" ? "" : val)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category.slug} value={category.slug}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
