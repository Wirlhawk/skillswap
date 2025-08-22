"use client";

import { useState } from "react";
import {
    Star,
    Heart,
    Share2,
    Clock,
    CheckCircle,
    MessageCircle,
    ArrowLeft,
    Play,
    Eye,
    ThumbsUp,
    Award,
    Calendar,
    MapPin,
    School,
    BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const serviceData = {
    id: "1",
    title: "I'll Edit Your Professional Video Content",
    description:
        "Transform your raw footage into engaging, professional videos that captivate your audience. I specialize in creating compelling video content for businesses, content creators, and personal projects.",
    longDescription: `I'm a passionate video editor with 2+ years of experience creating content for various clients. My expertise includes:

• Color correction and grading to enhance visual appeal
• Audio synchronization and enhancement for crystal clear sound
• Motion graphics and text animations to add professional touches
• Smooth transitions and cuts that maintain viewer engagement
• Social media optimization for different platforms (YouTube, Instagram, TikTok)

I use industry-standard software including Adobe Premiere Pro, After Effects, and DaVinci Resolve to deliver high-quality results that exceed expectations.`,
    price: "Rp. 15,000",
    priceRange: "Rp. 15,000 - Rp. 75,000",
    deliveryTime: "2-3 days",
    revisions: "2 free revisions",
    category: "Video Editing",
    subcategory: "Social Media Videos",
    rating: 4.8,
    totalReviews: 47,
    totalOrders: 156,
    responseTime: "< 1 hour",
    lastOnline: "Online now",
    images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%2012-UF8PwZxFNDDkBaFnxMUHpaNALixj3h.png",
        "/placeholder.svg?height=400&width=600&text=Video+Sample+1",
        "/placeholder.svg?height=400&width=600&text=Video+Sample+2",
        "/placeholder.svg?height=400&width=600&text=Before+After",
    ],
    videoPreview: "/placeholder.svg?height=300&width=500&text=Video+Preview",
    tags: [
        "Video Editing",
        "Motion Graphics",
        "Color Grading",
        "Audio Sync",
        "Social Media",
    ],
    seller: {
        id: "wirilll",
        name: "Wira Pratama",
        username: "@wirilll",
        avatar: "/placeholder.svg?height=80&width=80",
        school: "SMK Negeri 1 Jakarta",
        major: "Multimedia (MM)",
        class: "XII MM 1",
        joinDate: "September 2023",
        location: "Jakarta, Indonesia",
        isVerified: true,
        isOnline: true,
        level: "Level 2 Seller",
        rating: 4.8,
        totalReviews: 47,
        totalOrders: 156,
        responseRate: "98%",
        completionRate: "100%",
        bio: "Passionate multimedia student specializing in video editing and motion graphics. I love bringing stories to life through creative visual content.",
        skills: [
            "Adobe Premiere Pro",
            "After Effects",
            "DaVinci Resolve",
            "Photoshop",
            "Motion Graphics",
        ],
        languages: ["Bahasa Indonesia (Native)", "English (Intermediate)"],
        badges: ["Fast Responder", "Top Rated", "Client Favorite"],
    },
    packages: [
        {
            name: "Basic",
            price: "Rp. 15,000",
            description: "Simple video editing with basic cuts and transitions",
            deliveryTime: "2 days",
            revisions: 1,
            features: [
                "Basic video editing",
                "Simple transitions",
                "Color correction",
                "Audio sync",
                "Up to 3 minutes duration",
            ],
        },
        {
            name: "Standard",
            price: "Rp. 35,000",
            description:
                "Professional editing with motion graphics and effects",
            deliveryTime: "3 days",
            revisions: 2,
            features: [
                "Professional video editing",
                "Motion graphics",
                "Advanced transitions",
                "Color grading",
                "Audio enhancement",
                "Up to 10 minutes duration",
                "Social media optimization",
            ],
            popular: true,
        },
        {
            name: "Premium",
            price: "Rp. 75,000",
            description: "Complete video production with custom animations",
            deliveryTime: "5 days",
            revisions: 3,
            features: [
                "Complete video production",
                "Custom motion graphics",
                "Advanced color grading",
                "Professional audio mixing",
                "Custom animations",
                "Up to 30 minutes duration",
                "Multiple format delivery",
                "Priority support",
            ],
        },
    ],
    portfolio: [
        {
            id: 1,
            title: "Corporate Promotional Video",
            thumbnail:
                "/placeholder.svg?height=200&width=300&text=Corporate+Video",
            duration: "2:30",
            views: 245,
            likes: 34,
        },
        {
            id: 2,
            title: "Social Media Content Package",
            thumbnail:
                "/placeholder.svg?height=200&width=300&text=Social+Media",
            duration: "0:45",
            views: 189,
            likes: 28,
        },
        {
            id: 3,
            title: "Product Demo Animation",
            thumbnail:
                "/placeholder.svg?height=200&width=300&text=Product+Demo",
            duration: "1:15",
            views: 167,
            likes: 22,
        },
    ],
    reviews: [
        {
            id: 1,
            client: "Sarah Wijaya",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "2 weeks ago",
            comment:
                "Wira exceeded my expectations! The video editing was professional and the turnaround time was amazing. Will definitely work with him again.",
            helpful: 12,
            project: "Corporate Video Editing",
        },
        {
            id: 2,
            client: "PT. Digital Maju",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 5,
            date: "1 month ago",
            comment:
                "Outstanding work! The motion graphics and color grading really made our promotional video stand out. Highly recommended!",
            helpful: 8,
            project: "Promotional Video",
        },
        {
            id: 3,
            client: "Rudi Santoso",
            avatar: "/placeholder.svg?height=40&width=40",
            rating: 4,
            date: "1 month ago",
            comment:
                "Good quality work and responsive communication. The final video looked great and was delivered on time.",
            helpful: 5,
            project: "Social Media Content",
        },
    ],
    faqs: [
        {
            question: "What video formats do you accept?",
            answer: "I accept most common video formats including MP4, MOV, AVI, and MKV. If you have a different format, just let me know and I'll work with it.",
        },
        {
            question: "Do you provide the music/soundtrack?",
            answer: "I can source royalty-free music for your project, or you can provide your own. Custom music selection is included in Standard and Premium packages.",
        },
        {
            question: "How many revisions are included?",
            answer: "Basic package includes 1 revision, Standard includes 2, and Premium includes 3. Additional revisions can be purchased separately.",
        },
        {
            question: "Can you work with tight deadlines?",
            answer: "Yes! I offer express delivery for urgent projects. Contact me before ordering to discuss timeline and pricing.",
        },
    ],
};

interface ServiceDetailPageProps {
    params: {
        id: string;
    };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
    const [selectedPackage, setSelectedPackage] = useState("Standard");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const selectedPackageData = serviceData.packages.find(
        (pkg) => pkg.name === selectedPackage
    );

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="pt-0">
                            <div className="relative">
                                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden border-b">
                                    <img
                                        src={
                                            serviceData.images[
                                                selectedImageIndex
                                            ] || "/placeholder.svg"
                                        }
                                        alt={serviceData.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex space-x-2 overflow-x-auto pb-2">
                                    {serviceData.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSelectedImageIndex(index)
                                            }
                                            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                                selectedImageIndex === index
                                                    ? "border-primary ring-2 ring-primary/20"
                                                    : "border-border hover:border-primary/50"
                                            }`}
                                        >
                                            <img
                                                src={
                                                    image || "/placeholder.svg"
                                                }
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-8">
                                <div className="mb-6">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Badge variant="default">
                                            {serviceData.category}
                                        </Badge>
                                        <Badge variant="outline">
                                            {serviceData.subcategory}
                                        </Badge>
                                    </div>
                                    <h1 className="text-3xl font-bold mb-4">
                                        {serviceData.title}
                                    </h1>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {serviceData.description}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-6 mb-6">
                                    <div className="flex items-center space-x-1">
                                        <Star className="h-5 w-5 fill-primary text-primary" />
                                        <span className="font-semibold">
                                            {serviceData.rating}
                                        </span>
                                        <span className="text-muted-foreground">
                                            ({serviceData.totalReviews} reviews)
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-muted-foreground">
                                        <Eye className="h-4 w-4" />
                                        <span>
                                            {serviceData.totalOrders} orders
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {serviceData.tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>

                                <Separator className="my-8" />

                                <div>
                                    <h3 className="text-xl font-bold mb-4">
                                        About This Service
                                    </h3>
                                    <div className="prose prose-gray max-w-none">
                                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                            {serviceData.longDescription}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <Tabs defaultValue="portfolio" className="w-full">
                                <CardHeader>
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="portfolio">
                                            Portfolio
                                        </TabsTrigger>
                                        <TabsTrigger value="reviews">
                                            Reviews ({serviceData.totalReviews})
                                        </TabsTrigger>
                                        <TabsTrigger value="faq">
                                            FAQ
                                        </TabsTrigger>
                                    </TabsList>
                                </CardHeader>

                                <CardContent>
                                    <TabsContent
                                        value="portfolio"
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {serviceData.portfolio.map(
                                                (item) => (
                                                    <Card
                                                        key={item.id}
                                                        className="hover:shadow-lg transition-shadow group"
                                                    >
                                                        <div className="relative">
                                                            <img
                                                                src={
                                                                    item.thumbnail ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt={item.title}
                                                                className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                                                            />
                                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <Button
                                                                    size="sm"
                                                                    variant="secondary"
                                                                >
                                                                    <Play className="h-4 w-4 mr-1" />
                                                                    Play
                                                                </Button>
                                                            </div>
                                                            <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                                                                {item.duration}
                                                            </Badge>
                                                        </div>
                                                        <CardContent className="p-4">
                                                            <h4 className="font-semibold text-foreground mb-2">
                                                                {item.title}
                                                            </h4>
                                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                                <span className="flex items-center">
                                                                    <Eye className="h-4 w-4 mr-1" />
                                                                    {item.views}{" "}
                                                                    views
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                                                    {item.likes}{" "}
                                                                    likes
                                                                </span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                )
                                            )}
                                        </div>
                                    </TabsContent>

                                    <TabsContent
                                        value="reviews"
                                        className="space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                            <Card>
                                                <CardContent className="p-6 text-center">
                                                    <div className="text-3xl font-bold text-primary mb-1">
                                                        {serviceData.rating}
                                                    </div>
                                                    <div className="flex justify-center mb-2">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-4 w-4 ${
                                                                        i <
                                                                        Math.floor(
                                                                            serviceData.rating
                                                                        )
                                                                            ? "fill-primary text-primary"
                                                                            : "text-muted-foreground"
                                                                    }`}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Overall Rating
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardContent className="p-6 text-center">
                                                    <div className="text-3xl font-bold text-primary mb-1">
                                                        {
                                                            serviceData.totalReviews
                                                        }
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Total Reviews
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardContent className="p-6 text-center">
                                                    <div className="text-3xl font-bold text-primary mb-1">
                                                        100%
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Positive Reviews
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div className="space-y-6">
                                            {serviceData.reviews.map(
                                                (review) => (
                                                    <Card key={review.id}>
                                                        <CardContent className="p-6">
                                                            <div className="flex items-start space-x-4">
                                                                <Avatar className="h-12 w-12">
                                                                    <AvatarImage
                                                                        src={
                                                                            review.avatar ||
                                                                            "/placeholder.svg"
                                                                        }
                                                                    />
                                                                    <AvatarFallback>
                                                                        {
                                                                            review
                                                                                .client[0]
                                                                        }
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <div>
                                                                            <h4 className="font-semibold text-foreground">
                                                                                {
                                                                                    review.client
                                                                                }
                                                                            </h4>
                                                                            <div className="flex items-center space-x-1">
                                                                                {[
                                                                                    ...Array(
                                                                                        5
                                                                                    ),
                                                                                ].map(
                                                                                    (
                                                                                        _,
                                                                                        i
                                                                                    ) => (
                                                                                        <Star
                                                                                            key={
                                                                                                i
                                                                                            }
                                                                                            className={`h-4 w-4 ${
                                                                                                i <
                                                                                                review.rating
                                                                                                    ? "fill-primary text-primary"
                                                                                                    : "text-muted-foreground"
                                                                                            }`}
                                                                                        />
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-sm text-muted-foreground">
                                                                            {
                                                                                review.date
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-muted-foreground">
                                                                        {
                                                                            review.comment
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                )
                                            )}
                                        </div>
                                    </TabsContent>

                                    <TabsContent
                                        value="faq"
                                        className="space-y-4"
                                    >
                                        {serviceData.faqs.map((item, index) => (
                                            <Card key={index}>
                                                <CardContent className="p-6">
                                                    <h4 className="font-semibold text-foreground mb-2">
                                                        {item.question}
                                                    </h4>
                                                    <p className="text-muted-foreground">
                                                        {item.answer}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </TabsContent>
                                </CardContent>
                            </Tabs>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>About the Seller</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-start space-x-4 mb-6">
                                    <div className="relative">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage
                                                src={
                                                    serviceData.seller.avatar ||
                                                    "/placeholder.svg"
                                                }
                                            />
                                            <AvatarFallback>
                                                {serviceData.seller.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div
                                            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background ${
                                                serviceData.seller.isOnline
                                                    ? "bg-green-500"
                                                    : "bg-muted-foreground"
                                            }`}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold">
                                            {serviceData.seller.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {serviceData.seller.username}
                                        </p>
                                        {serviceData.seller.isVerified && (
                                            <Badge className="mt-1 text-xs">
                                                <Award className="h-3 w-3 mr-1" />
                                                Verified
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6 text-sm">
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <School className="h-4 w-4 text-primary" />
                                        <span>{serviceData.seller.school}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                        <span>{serviceData.seller.major}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        <span>
                                            {serviceData.seller.location}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span>
                                            Member since{" "}
                                            {serviceData.seller.joinDate}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    <Button className="flex-1">
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        Contact
                                    </Button>
                                    <Button variant="outline">
                                        View Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Choose Your Package
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {serviceData.packages.map((pkg) => (
                                    <div
                                        key={pkg.name}
                                        className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                            selectedPackage === pkg.name
                                                ? "border-primary bg-primary/5 shadow-md"
                                                : "border-border hover:border-primary/50 hover:shadow-sm"
                                        }`}
                                        onClick={() =>
                                            setSelectedPackage(pkg.name)
                                        }
                                    >
                                        {pkg.popular && (
                                            <Badge className="absolute -top-2 left-4 bg-primary">
                                                Most Popular
                                            </Badge>
                                        )}
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold">
                                                {pkg.name}
                                            </h4>
                                            <span className="text-xl font-bold text-primary">
                                                {pkg.price}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {pkg.description}
                                        </p>
                                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                                            <span className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {pkg.deliveryTime}
                                            </span>
                                            <span>
                                                {pkg.revisions} revisions
                                            </span>
                                        </div>
                                        <ul className="space-y-1">
                                            {pkg.features.map(
                                                (feature, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center text-sm text-muted-foreground"
                                                    >
                                                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))}

                                <div className="pt-4 border-t">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-lg font-semibold">
                                            Total:
                                        </span>
                                        <span className="text-2xl font-bold text-primary">
                                            {selectedPackageData?.price}
                                        </span>
                                    </div>
                                    <Button className="w-full font-semibold py-3 text-lg">
                                        Continue ({selectedPackageData?.price})
                                    </Button>
                                    <p className="text-xs text-muted-foreground text-center mt-2">
                                        {
                                            "You won't be charged until you review and confirm your order"
                                        }
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
