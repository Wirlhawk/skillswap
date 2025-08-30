"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { Header } from "./ui/header";

export default function FilterBars({
    categories,
    searchParams,
}: {
    categories: {
        id: string;
        name: string;
        slug: string;
    }[];
    searchParams?: string;
}) {
    const router = useRouter();

    const [category, setCategory] = useQueryState("category", {
        defaultValue: "",
        history: "push",
    });

    const [min, setMin] = useQueryState("min", {
        defaultValue: "",
        history: "push",
    });

    const [max, setMax] = useQueryState("max", {
        defaultValue: "",
        history: "push",
    });

    const [minInput, setMinInput] = useState("");
    const [maxInput, setMaxInput] = useState("");

    useEffect(() => {
        setMinInput(min || "");
        setMaxInput(max || "");
    }, [min, max]);

    const handleApplyFilters = async () => {
        await setMin(minInput);
        await setMax(maxInput);
        router.refresh();
    };

    const handleCategoryChange = async (val: string) => {
        await setCategory(val === "All" ? "" : val);
        router.refresh();
    };

    const handleClearFilters = async () => {
        await setCategory("");
        await setMin("");
        await setMax("");
        setMinInput("");
        setMaxInput("");
        router.refresh();
    };

    return (
        <div className="flex sm:items-center justify-between gap-6 flex-col sm:flex-row items-start">
            <Header>
                {category
                    ? `Search results for "${categories.find((c) => c.slug === category)?.name || category}"${searchParams ? ` (${searchParams} results)` : ""}`
                    : `All Categories${searchParams ? ` (${searchParams} results)` : ""}`}
            </Header>
            <div className="flex items-center gap-4">
                <Select
                    value={category || "All"}
                    onValueChange={handleCategoryChange}
                >
                    <SelectTrigger className="h-9 bg-card min-w-40">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        {categories.map((category) => (
                            <SelectItem
                                key={category.slug}
                                value={category.slug}
                            >
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Price Range */}
                {/* <div className="flex items-center gap-2">
                    <Input
                        placeholder="Min"
                        type="number"
                        value={minInput}
                        onChange={(e) => setMinInput(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleApplyFilters()
                        }
                        className="w-20 h-9"
                    />
                    <span className="text-muted-foreground text-sm">-</span>
                    <Input
                        placeholder="Max"
                        type="number"
                        value={maxInput}
                        onChange={(e) => setMaxInput(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleApplyFilters()
                        }
                        className="w-20 h-9"
                    />
                </div> */}

                {/* Actions */}
                {/* <div className="flex gap-2">
                    <Button
                        onClick={handleApplyFilters}
                        size="sm"
                        className="h-9"
                    >
                        Apply
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        size="sm"
                        className="h-9 px-2 bg-transparent"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div> */}
            </div>
        </div>
    );
}
