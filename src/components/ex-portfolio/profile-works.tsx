"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Eye,
    Heart,
    MessageCircle,
    Share2,
    Edit,
    Trash2,
    Plus,
} from "lucide-react";
import MediaPreview from "./media-preview";
import UploadForm from "./upload-form";

interface Work {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string;
    files: File[];
    createdAt: string;
    views?: number;
    likes?: number;
    comments?: number;
}

export default function ProfileWorks() {
    const [works, setWorks] = useState<Work[]>([
        {
            id: 1,
            title: "Modern E-commerce Website",
            description:
                "Desain website e-commerce modern dengan fokus pada user experience dan konversi yang tinggi.",
            category: "web-design",
            tags: "web, ecommerce, modern, ui/ux",
            files: [],
            createdAt: "2024-01-15",
            views: 1250,
            likes: 89,
            comments: 12,
        },
        {
            id: 2,
            title: "Brand Identity - Coffee Shop",
            description:
                "Identitas visual lengkap untuk coffee shop lokal, termasuk logo, packaging, dan merchandise.",
            category: "branding",
            tags: "branding, logo, coffee, identity",
            files: [],
            createdAt: "2024-01-10",
            views: 890,
            likes: 67,
            comments: 8,
        },
    ]);

    const [showUploadForm, setShowUploadForm] = useState(false);
    const [selectedWork, setSelectedWork] = useState<Work | null>(null);
    const [filter, setFilter] = useState("all");

    const categories = [
        { value: "all", label: "Semua Karya" },
        { value: "web-design", label: "Web Design" },
        { value: "ui-ux", label: "UI/UX Design" },
        { value: "branding", label: "Branding" },
        { value: "illustration", label: "Illustration" },
        { value: "photography", label: "Photography" },
        { value: "motion-graphics", label: "Motion Graphics" },
    ];

    const filteredWorks =
        filter === "all"
            ? works
            : works.filter((work) => work.category === filter);

    const handleAddWork = (newWork: Work) => {
        setWorks((prev) => [newWork, ...prev]);
        setShowUploadForm(false);
    };

    const handleDeleteWork = (id: number) => {
        setWorks((prev) => prev.filter((work) => work.id !== id));
    };

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            "web-design": "bg-blue-100 text-blue-800",
            "ui-ux": "bg-purple-100 text-purple-800",
            branding: "bg-orange-100 text-orange-800",
            illustration: "bg-pink-100 text-pink-800",
            photography: "bg-green-100 text-green-800",
            "motion-graphics": "bg-indigo-100 text-indigo-800",
        };
        return colors[category] || "bg-gray-100 text-gray-800";
    };

    return (
        <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Portfolio Karya
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Koleksi karya terbaik yang telah saya buat untuk
                        berbagai klien dan proyek personal
                    </p>
                </div>

                {/* Filter and Add Button */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category.value}
                                variant={
                                    filter === category.value
                                        ? "default"
                                        : "outline"
                                }
                                size="sm"
                                onClick={() => setFilter(category.value)}
                                className={
                                    filter === category.value
                                        ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                                        : ""
                                }
                            >
                                {category.label}
                            </Button>
                        ))}
                    </div>
                    <Button
                        onClick={() => setShowUploadForm(true)}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Karya
                    </Button>
                </div>

                {/* Works Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredWorks.map((work) => (
                        <Card
                            key={work.id}
                            className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <div className="aspect-video bg-gradient-to-br from-emerald-100 to-teal-100 relative overflow-hidden">
                                <img
                                    src={`/abstract-geometric-shapes.png?height=300&width=400&query=${work.title}`}
                                    alt={work.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                                    onClick={() => setSelectedWork(work)}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        onClick={() => setSelectedWork(work)}
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Preview
                                    </Button>
                                </div>
                            </div>

                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <Badge
                                        className={getCategoryColor(
                                            work.category
                                        )}
                                    >
                                        {
                                            categories.find(
                                                (c) => c.value === work.category
                                            )?.label
                                        }
                                    </Badge>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="sm">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleDeleteWork(work.id)
                                            }
                                        >
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
                                    {work.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {work.description}
                                </p>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {work.tags.split(",").map((tag, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            {tag.trim()}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {work.views}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Heart className="w-4 h-4" />
                                            {work.likes}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MessageCircle className="w-4 h-4" />
                                            {work.comments}
                                        </span>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredWorks.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <Plus className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            Belum ada karya
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Mulai tambahkan karya pertama Anda
                        </p>
                        <Button
                            onClick={() => setShowUploadForm(true)}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Karya
                        </Button>
                    </div>
                )}
            </div>

            {/* Upload Form Modal */}
            {showUploadForm && (
                <UploadForm
                    onSubmit={handleAddWork}
                    onClose={() => setShowUploadForm(false)}
                />
            )}

            {/* Media Preview Modal */}
            <MediaPreview
                work={selectedWork}
                onClose={() => setSelectedWork(null)}
                open={!!selectedWork}
            />
        </section>
    );
}
