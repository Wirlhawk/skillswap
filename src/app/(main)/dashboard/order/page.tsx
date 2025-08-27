"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    Download,
    MessageCircle,
    Star,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const orderData = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    orderNumber: "ORD-2024-001",
    requirements:
        "I need a modern, responsive website for my small business. The site should include a homepage, about page, services page, and contact form. I want it to be mobile-friendly and fast-loading with clean design aesthetics.",
    additionalNotes:
        "Please use blue and white color scheme to match our brand. Include a contact form with email integration.",
    status: "In Progress", // Using actual enum values
    totalPrice: 25000, // Price in cents
    deliveryDate: "2024-01-15T00:00:00Z",
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    service: {
        title: "Modern responsive website development",
        category: "Web Development",
    },
    client: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    seller: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=60&width=60",
        rating: 4.9,
        completedOrders: 127,
        responseTime: "1 hour",
    },
    progress: 65,
    milestones: [
        {
            id: 1,
            title: "Project Planning",
            status: "completed",
            date: "2024-01-08",
        },
        {
            id: 2,
            title: "Design Mockups",
            status: "completed",
            date: "2024-01-10",
        },
        {
            id: 3,
            title: "Development",
            status: "in_progress",
            date: "2024-01-12",
        },
        {
            id: 4,
            title: "Testing & Review",
            status: "pending",
            date: "2024-01-14",
        },
        {
            id: 5,
            title: "Final Delivery",
            status: "pending",
            date: "2024-01-15",
        },
    ],
    attachments: [
        {
            id: 1,
            fileName: "Initial Design Mockups.pdf",
            fileUrl: "/mockups.pdf",
            fileSize: 2457600, // bytes
            fileType: "application/pdf",
            description: "Initial design concepts and wireframes",
            isPublic: true,
            createdAt: "2024-01-10T11:20:00Z",
        },
        {
            id: 2,
            fileName: "Homepage Preview",
            fileUrl: "https://preview.example.com",
            fileType: "text/html",
            description: "Live preview of homepage development",
            isPublic: true,
            createdAt: "2024-01-12T09:15:00Z",
        },
        {
            id: 3,
            fileName: "Final Website Files.zip",
            fileUrl: "/final-files.zip",
            fileSize: 15728640, // bytes
            fileType: "application/zip",
            description: "Complete website files and assets",
            isPublic: true,
            createdAt: null, // Not uploaded yet
        },
    ],
    messages: [
        {
            id: 1,
            senderId: "seller-id",
            message:
                "Hi! I've started working on your project. I'll have the initial mockups ready by tomorrow.",
            messageType: "text",
            isInternal: false,
            createdAt: "2024-01-08T14:30:00Z",
            sender: {
                name: "Alex Chen",
                avatar: "/placeholder.svg?height=32&width=32",
            },
        },
        {
            id: 2,
            senderId: "client-id",
            message:
                "Great! Looking forward to seeing them. Please make sure the design is modern and clean.",
            messageType: "text",
            isInternal: false,
            createdAt: "2024-01-08T15:45:00Z",
            sender: {
                name: "John Smith",
                avatar: "/placeholder.svg?height=32&width=32",
            },
        },
        {
            id: 3,
            senderId: "seller-id",
            message:
                "Mockups are ready! Please check the deliverables section. Let me know if you need any changes.",
            messageType: "text",
            isInternal: false,
            createdAt: "2024-01-10T11:20:00Z",
            sender: {
                name: "Alex Chen",
                avatar: "/placeholder.svg?height=32&width=32",
            },
        },
    ],
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "Done":
            return "bg-green-500";
        case "In Progress":
            return "bg-blue-500";
        case "Pending":
            return "bg-gray-300";
        case "Cancelled":
            return "bg-red-500";
        default:
            return "bg-gray-300";
    }
};

const getStatusBadge = (status: string) => {
    switch (status) {
        case "Done":
            return (
                <Badge className="bg-green-100 text-green-800">Completed</Badge>
            );
        case "In Progress":
            return (
                <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
            );
        case "Pending":
            return (
                <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
            );
        case "Cancelled":
            return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
        Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
};

export default function OrderViewPage({ params }: { params: { id: string } }) {
    const [newMessage, setNewMessage] = useState("");
    const [activeTab, setActiveTab] = useState("overview");

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // In real app, this would send message via API
            console.log("Sending message:", newMessage);
            setNewMessage("");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-semibold">
                                Order #{orderData.orderNumber}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Placed on{" "}
                                {new Date(
                                    orderData.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {getStatusBadge(orderData.status)}
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>{orderData.service.title}</span>
                                    <span className="text-2xl font-bold">
                                        $
                                        {(orderData.totalPrice / 100).toFixed(
                                            2
                                        )}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <h4 className="font-medium mb-2">
                                            Project Requirements
                                        </h4>
                                        <p className="text-muted-foreground">
                                            {orderData.requirements}
                                        </p>
                                    </div>
                                    {orderData.additionalNotes && (
                                        <div>
                                            <h4 className="font-medium mb-2">
                                                Additional Notes
                                            </h4>
                                            <p className="text-muted-foreground">
                                                {orderData.additionalNotes}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            Delivery:{" "}
                                            {new Date(
                                                orderData.deliveryDate
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                            Days remaining: 3
                                        </span>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">
                                            Progress
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {orderData.progress}%
                                        </span>
                                    </div>
                                    <Progress
                                        value={orderData.progress}
                                        className="h-2"
                                    />
                                </div>

                                {/* Milestones */}
                                <div className="space-y-3">
                                    <h4 className="font-medium">
                                        Project Milestones
                                    </h4>
                                    {orderData.milestones.map(
                                        (milestone, index) => (
                                            <div
                                                key={milestone.id}
                                                className="flex items-center gap-3"
                                            >
                                                <div
                                                    className={`w-3 h-3 rounded-full ${getStatusColor(milestone.status)}`}
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">
                                                        {milestone.title}
                                                    </p>
                                                    {milestone.date && (
                                                        <p className="text-xs text-muted-foreground">
                                                            {new Date(
                                                                milestone.date
                                                            ).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                                {milestone.status ===
                                                    "completed" && (
                                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                                )}
                                                {milestone.status ===
                                                    "in_progress" && (
                                                    <Clock className="h-4 w-4 text-blue-500" />
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Attachments & Deliverables
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {orderData.attachments.map((attachment) => (
                                        <div
                                            key={attachment.id}
                                            className="flex items-center justify-between p-3 border rounded-lg"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    {attachment.fileType?.includes(
                                                        "pdf"
                                                    ) && (
                                                        <span className="text-xs font-bold text-blue-600">
                                                            PDF
                                                        </span>
                                                    )}
                                                    {attachment.fileType?.includes(
                                                        "zip"
                                                    ) && (
                                                        <span className="text-xs font-bold text-blue-600">
                                                            ZIP
                                                        </span>
                                                    )}
                                                    {attachment.fileType?.includes(
                                                        "html"
                                                    ) && (
                                                        <span className="text-xs font-bold text-blue-600">
                                                            URL
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">
                                                        {attachment.fileName}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {attachment.fileSize &&
                                                            `${formatFileSize(attachment.fileSize)} • `}
                                                        {attachment.createdAt
                                                            ? new Date(
                                                                  attachment.createdAt
                                                              ).toLocaleDateString()
                                                            : "Not uploaded yet"}
                                                    </p>
                                                    {attachment.description && (
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {
                                                                attachment.description
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            {attachment.createdAt ? (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Download
                                                </Button>
                                            ) : (
                                                <Badge variant="secondary">
                                                    Pending
                                                </Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Messages</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                                    {orderData.messages.map((message) => {
                                        const isClient =
                                            message.senderId === "client-id";
                                        return (
                                            <div
                                                key={message.id}
                                                className={`flex gap-3 ${isClient ? "flex-row-reverse" : ""}`}
                                            >
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={
                                                            message.sender
                                                                .avatar ||
                                                            "/placeholder.svg"
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {isClient
                                                            ? "You"
                                                            : message.sender
                                                                  .name[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className={`flex-1 max-w-md ${isClient ? "text-right" : ""}`}
                                                >
                                                    <div
                                                        className={`p-3 rounded-lg ${isClient ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                                                    >
                                                        <p className="text-sm">
                                                            {message.message}
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {new Date(
                                                            message.createdAt
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <Separator className="my-4" />

                                <div className="flex gap-2">
                                    <Textarea
                                        placeholder="Type your message..."
                                        value={newMessage}
                                        onChange={(e) =>
                                            setNewMessage(e.target.value)
                                        }
                                        className="flex-1"
                                        rows={2}
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim()}
                                    >
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        Send
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Freelancer</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3 mb-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage
                                            src={
                                                orderData.seller.avatar ||
                                                "/placeholder.svg"
                                            }
                                        />
                                        <AvatarFallback>
                                            {orderData.seller.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">
                                            {orderData.seller.name}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm">
                                                {orderData.seller.rating}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                (
                                                {
                                                    orderData.seller
                                                        .completedOrders
                                                }{" "}
                                                orders)
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Response time:
                                        </span>
                                        <span>
                                            {orderData.seller.responseTime}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full mt-4 bg-transparent"
                                    variant="outline"
                                >
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    Contact Freelancer
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Order Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button
                                    className="w-full bg-transparent"
                                    variant="outline"
                                >
                                    Request Revision
                                </Button>
                                <Button
                                    className="w-full bg-transparent"
                                    variant="outline"
                                >
                                    Extend Deadline
                                </Button>
                                <Button
                                    className="w-full bg-transparent"
                                    variant="outline"
                                >
                                    Cancel Order
                                </Button>
                                <Separator className="my-3" />
                                <Button className="w-full">
                                    Approve & Complete
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Payment</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Service price:
                                        </span>
                                        <span>
                                            $
                                            {(
                                                orderData.totalPrice / 100
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Platform fee:
                                        </span>
                                        <span>$12.50</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-medium">
                                        <span>Total paid:</span>
                                        <span>
                                            $
                                            {(
                                                orderData.totalPrice / 100 +
                                                12.5
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <Badge className="w-full mt-3 bg-green-100 text-green-800 justify-center">
                                    Payment Secured
                                </Badge>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
