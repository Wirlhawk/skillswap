"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TagInputProps {
    tags: string[];
    onTagsChange: (tags: string[]) => void;
    placeholder?: string;
    error?: string;
}

export function TagInput({
    tags,
    onTagsChange,
    placeholder = "Add a tag",
    error,
}: TagInputProps) {
    const [newTag, setNewTag] = useState("");

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            onTagsChange([...tags, newTag.trim()]);
            setNewTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        onTagsChange(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Input
                    placeholder={placeholder}
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                    className="flex-1"
                />
                <Button type="button" onClick={addTag}>
                    Add Tag
                </Button>
            </div>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="px-3 py-1"
                        >
                            {tag}
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                className="h-auto p-0 ml-2 hover:bg-transparent"
                                onClick={() => removeTag(tag)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    ))}
                </div>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
