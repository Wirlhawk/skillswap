"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Bold,
    Italic,
    UnderlineIcon,
    Link as LinkIcon,
    Undo2,
    Redo2,
    List,
    ListOrdered,
} from "lucide-react";

interface TiptapEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            BulletList,
            OrderedList,
            ListItem,
        ],
        content: value,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) return null;

    const addLink = () => {
        const url = prompt("Enter URL");
        if (url) {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
        }
    };

    return (
        <div className="border rounded-md p-3 bg-card shadow-xs space-y-2 w-full">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
                {/* Bold */}
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive("bold") ? "default" : "outline"}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <Bold className="h-4 w-4" />
                </Button>

                {/* Italic */}
                <Button
                    type="button"
                    size="sm"
                    variant={editor.isActive("italic") ? "default" : "outline"}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <Italic className="h-4 w-4" />
                </Button>

                {/* Underline */}
                <Button
                    type="button"
                    size="sm"
                    variant={
                        editor.isActive("underline") ? "default" : "outline"
                    }
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                >
                    <UnderlineIcon className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="mx-2" />

                {/* Bullet List */}
                <Button
                    type="button"
                    size="sm"
                    variant={
                        editor.isActive("bulletList") ? "default" : "outline"
                    }
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <List className="h-4 w-4" />
                </Button>

                {/* Ordered List */}
                <Button
                    type="button"
                    size="sm"
                    variant={
                        editor.isActive("orderedList") ? "default" : "outline"
                    }
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="mx-2" />

                {/* Link */}
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addLink}
                >
                    <LinkIcon className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="mx-2" />

                {/* Undo / Redo */}
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <Undo2 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <Redo2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="tiptap min-h-[150px] prose max-w-none p-2 rounded-md border active:outline-none"
            />
        </div>
    );
}
