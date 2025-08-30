"use client";

import { useState } from "react";
import {
    Star,
    Clock,
    CheckCircle,
    MessageCircle,
    ArrowLeft,
    Play,
    Eye,
    Award,
    Calendar,
    School,
    BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OrderForm } from "./order-form";
import Image from "next/image";
import Link from "next/link";

interface Review {
    id: string;
    client: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
    helpful: number;
    project: string;
}

interface Seller {
    id: string;
    name: string;
    username: string;
    avatar: string;
    school: string;
    major: string;
    joinDate: string;
    isVerified: boolean;
    level: string;
    rating: number;
    totalReviews: number;
    totalOrders: number;
    bio: string;
    skills: string[];
}

interface Package {
    name: string;
    price: string;
    description: string;
    deliveryTime: string;
    revisions: number;
    features: string[];
}

interface ServiceData {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    price: number;
    deliveryTime: string;
    revisions: string;
    category: string;
    subcategory: string;
    rating: number;
    totalReviews: number;
    totalOrders: number;
    images: string[];
    tags: string[];
    seller: Seller;
    package: Package;
    reviews: Review[];
}

interface OrderDetails {
    requirements: string;
    additionalNotes?: string;
}

interface ServiceDetailClientProps {
    serviceData: ServiceData;
    currentUserId: string;
}

// Image Gallery Component
function ImageGallery({
    images,
    selectedIndex,
    onImageSelect,
}: {
    images: string[];
    selectedIndex: number;
    onImageSelect: (index: number) => void;
}) {
    return (
        <Card className="pt-0">
            <div className="relative">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden border-b">
                    <Image
                        src={images[selectedIndex] || "/placeholder.svg"}
                        alt="Service preview"
                        fill
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <CardContent className="p-4">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                    {images.map((image: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => onImageSelect(index)}
                            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                selectedIndex === index
                                    ? "border-primary ring-2 ring-primary/20"
                                    : "border-border hover:border-primary/50"
                            }`}
                        >
                            <Image
                                src={image || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                width={80}
                                height={64}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// Service Information Component
function ServiceInformation({ serviceData }: { serviceData: ServiceData }) {
    return (
        <Card>
            <CardContent className="p-8">
                <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <Badge variant="default">{serviceData.category}</Badge>
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
                        <span>{serviceData.totalOrders} orders</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    {serviceData.tags.map((tag: string, index: number) => (
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
                        <div
                            className="text-muted-foreground leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: serviceData.longDescription,
                            }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Reviews Component
function Reviews({
    reviews,
    totalReviews,
    rating,
}: {
    reviews: Review[];
    totalReviews: number;
    rating: number;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Reviews ({totalReviews})</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-primary mb-1">
                                {rating}
                            </div>
                            <div className="flex justify-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                            i < Math.floor(rating)
                                                ? "fill-primary text-primary"
                                                : "text-muted-foreground"
                                        }`}
                                    />
                                ))}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Overall Rating
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-primary mb-1">
                                {totalReviews}
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
                    {reviews.map((review: Review) => (
                        <Card key={review.id}>
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={review.avatar} />
                                        <AvatarFallback>
                                            {review.client[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <h4 className="font-semibold text-foreground">
                                                    {review.client}
                                                </h4>
                                                <div className="flex items-center space-x-1">
                                                    {[...Array(5)].map(
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
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
                                                {review.date}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground mb-2">
                                            {review.comment}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>
                                                Project: {review.project}
                                            </span>
                                            <span>
                                                {review.helpful} found helpful
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// Seller Information Component
function SellerInformation({ seller }: { seller: Seller }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>About the Seller</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-start space-x-4 mb-6">
                    <div className="relative">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={seller.avatar} />
                            <AvatarFallback>{seller.name[0]}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold">{seller.name}</h3>
                        <p className="text-sm text-muted-foreground">
                            {seller.username}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                            {seller.isVerified && (
                                <Badge className="text-xs">
                                    <Award className="h-3 w-3 mr-1" />
                                    Verified
                                </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                                {seller.level}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                        <School className="h-4 w-4 text-primary" />
                        <span>{seller.school}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span>{seller.major}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Member since {seller.joinDate}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                        <Eye className="h-4 w-4 text-primary" />
                        <span>{seller.totalOrders} orders completed</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                        <Star className="h-4 w-4 text-primary" />
                        <span>
                            {seller.rating} rating ({seller.totalReviews}{" "}
                            reviews)
                        </span>
                    </div>
                </div>

                {seller.bio && (
                    <div className="mb-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                            {seller.bio}
                        </p>
                    </div>
                )}

                {seller.skills.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                            {seller.skills.map((skill, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex space-x-2">
                    <Button variant="outline" asChild>
                        <Link href={`/profile/${seller.username}`}>View Profile</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

// Service Package Component
function ServicePackage({
    servicePackage,
    showCheckout,
    orderDetails,
    onOrderDetailsChange,
    onShowCheckoutChange,
    serviceId,
    sellerId,
    currentUserId,
}: {
    servicePackage: Package;
    showCheckout: boolean;
    orderDetails: OrderDetails;
    onOrderDetailsChange: (details: OrderDetails) => void;
    onShowCheckoutChange: (show: boolean) => void;
    serviceId: string;
    currentUserId: string;
    sellerId: string;
}) {
    const isSeller = currentUserId === sellerId;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Service Package</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 border-2 border-primary bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold">{servicePackage.name}</h4>
                        <span className="text-xl font-bold text-primary">
                            {servicePackage.price}
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                        {servicePackage.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {servicePackage.deliveryTime}
                        </span>
                        <span>{servicePackage.revisions} revisions</span>
                    </div>
                    <ul className="space-y-1">
                        {servicePackage.features.map(
                            (feature: string, index: number) => (
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

                {!showCheckout ? (
                    <div className="pt-4 border-t">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-semibold">
                                Total:
                            </span>
                            <span className="text-2xl font-bold text-primary">
                                {servicePackage.price}
                            </span>
                        </div>
                        {!isSeller && (
                            <>
                                <Button
                                    className="w-full font-semibold py-3 text-lg"
                                    onClick={() => onShowCheckoutChange(true)}
                                >
                                    Continue ({servicePackage.price})
                                </Button>
                                <p className="text-xs text-muted-foreground text-center mt-2">
                                    You won&#39;t be charged until you review
                                    and confirm your order
                                </p>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        <>
                            <Separator className="my-6" />
                            <OrderForm
                                servicePrice={servicePackage.price}
                                serviceId={serviceId}
                                sellerId={sellerId}
                                onBack={() => onShowCheckoutChange(false)}
                                onSuccess={() => onShowCheckoutChange(false)}
                            />
                        </>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

// Main Component
export default function ServiceDetail({
    serviceData,
    currentUserId,
}: ServiceDetailClientProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);
    const [orderDetails, setOrderDetails] = useState<OrderDetails>({
        requirements: "",
        additionalNotes: "",
    });

    const handleOrderDetailsChange = (details: OrderDetails) => {
        setOrderDetails(details);
    };

    const handleShowCheckoutChange = (show: boolean) => {
        setShowCheckout(show);
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <ImageGallery
                            images={serviceData.images}
                            selectedIndex={selectedImageIndex}
                            onImageSelect={setSelectedImageIndex}
                        />
                        <ServiceInformation serviceData={serviceData} />
                        <Reviews
                            reviews={serviceData.reviews}
                            totalReviews={serviceData.totalReviews}
                            rating={serviceData.rating}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <SellerInformation seller={serviceData.seller} />
                        <ServicePackage
                            servicePackage={serviceData.package}
                            showCheckout={showCheckout}
                            orderDetails={orderDetails}
                            onOrderDetailsChange={handleOrderDetailsChange}
                            onShowCheckoutChange={handleShowCheckoutChange}
                            serviceId={serviceData.id}
                            sellerId={serviceData.seller.id}
                            currentUserId={currentUserId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
