"use server";

import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { put } from "@vercel/blob";
import { and, eq, gte, ilike, inArray, lte, or, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { category, major, review, service, user } from "../db/schema";
import { getServiceReviews } from "./review";

type FormattedReview = {
    id: string;
    client: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
    helpful: number;
    project: string;
};

// Define the seller type
type FormattedSeller = {
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
};

// Define the package type
type FormattedPackage = {
    name: string;
    price: string;
    description: string;
    deliveryTime: string;
    revisions: number;
    features: string[];
};

// Define the main service type
type FormattedService = {
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
    seller: FormattedSeller;
    package: FormattedPackage;
    reviews: FormattedReview[];
};


export const createService = async ({
    title,
    description,
    longDescription,
    categoryId,
    price,
    deliveryTime,
    revisions,
    packageName,
    packageDescription,
    features,
    tags,
    images,
}: {
    title: string;
    description: string;
    longDescription: string;
    categoryId: string;
    price: number;
    deliveryTime: string;
    revisions: string;
    packageName: string;
    packageDescription: string;
    features: string[];
    tags: string[];
    images: {
        file: File;
        id: string;
        preview: string;
    }[];
}) => {
    try {

        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user.id) {
            throw new Error("User not authenticated");
        }

        const uploadedImages = await Promise.all(
            images.map(async (img, i) => {
                const { url } = await put(
                    `${session.user.id}-${Date.now()}-${i}-${img.file.name}`,
                    img.file,
                    { access: "public" }
                );

                return url;
            })
        );

        const newService = await db
            .insert(service)
            .values({
                title,
                description,
                longDescription,
                categoryId,
                price,
                deliveryTime,
                revisions,
                packageName,
                packageDescription,
                features,
                tags,
                images: uploadedImages,
                userId: session.user.id,
            } satisfies typeof service.$inferInsert)
            .returning();


        return { success: true, data: newService[0] };
    } catch (err: unknown) {
        const message =
            (err as Error)?.message ||
            "Failed to create Service";

        return { success: false, error: message };
    }
};

type ServiceWithRating = {
    id: string;
    title: string;
    description: string;
    category: string | null;
    price: number;
    deliveryTime: string;
    revisions: string;
    tags: string[];
    images: string[];
    userId: string | null;
    user: {
        username: string | null;
        image: string | null;
        major: string | null;
    } | null;
    createdAt: Date;
    rating: number;
    totalReviews: number;
};

export const getAllService = async ({
    categorySlug,
    searchQuery,
    minPrice,
    maxPrice
}: {
    categorySlug?: string;
    searchQuery?: string;
    minPrice?: number;
    maxPrice?: number;
}) => {
    try {
        // Build the base query
        let query = db
            .select({
                id: service.id,
                title: service.title,
                description: service.description,
                category: category.name,
                price: service.price,
                deliveryTime: service.deliveryTime,
                revisions: service.revisions,
                tags: service.tags,
                images: service.images,
                userId: service.userId,
                user: {
                    username: user.username,
                    image: user.image,
                    major: major.name,
                },
                createdAt: service.createdAt,
            })
            .from(service)
            .leftJoin(category, eq(service.categoryId, category.id))
            .leftJoin(user, eq(service.userId, user.id))
            .leftJoin(major, eq(user.majorId, major.id));

        // Build WHERE conditions array
        const whereConditions = [];

        // Apply category filter
        if (categorySlug) {
            whereConditions.push(eq(category.slug, categorySlug));
        }

        // Apply search query filter
        if (searchQuery) {
            whereConditions.push(
                or(
                    ilike(service.title, `%${searchQuery}%`),
                    ilike(service.description, `%${searchQuery}%`)
                )
            );
        }

        // Apply price filters
        if (minPrice !== undefined) {
            whereConditions.push(gte(service.price, minPrice));
        }

        if (maxPrice !== undefined) {
            whereConditions.push(lte(service.price, maxPrice));
        }

        // Apply WHERE conditions if any exist
        if (whereConditions.length > 0) {
            query = query.where(and(...whereConditions)) as typeof query;
        }

        const services = await query;

        // Get ratings for all services
        const serviceIds = services.map(s => s.id);

        // If there are no services, return empty array
        if (serviceIds.length === 0) {
            return { success: true, data: [] as ServiceWithRating[] };
        }

        // Get average ratings for all services in one query
        const ratingsResult = await db
            .select({
                serviceId: review.serviceId,
                averageRating: sql<number>`COALESCE(AVG(${review.rating}), 0)`,
                totalReviews: sql<number>`COUNT(*)`,
            })
            .from(review)
            .where(inArray(review.serviceId, serviceIds))
            .groupBy(review.serviceId);

        // Create a map of service ID to rating data for quick lookup
        const ratingsMap = new Map<string, { rating: number; totalReviews: number }>();
        ratingsResult.forEach(rating => {
            ratingsMap.set(rating.serviceId, {
                rating: Number(rating.averageRating) || 0,
                totalReviews: Number(rating.totalReviews) || 0
            });
        });

        // Add ratings to each service
        const servicesWithRatings: ServiceWithRating[] = services.map(service => ({
            ...service,
            tags: service.tags || [],
            images: service.images || [],
            rating: ratingsMap.get(service.id)?.rating || 0,
            totalReviews: ratingsMap.get(service.id)?.totalReviews || 0
        }));

        return { success: true, data: servicesWithRatings };
    } catch (err: unknown) {
        const message =
            (err as Error)?.message ||
            "Failed to fetch services";
        return { success: false, error: message };
    }
};

export const getServiceById = async (serviceId: string) => {
    try {
        const result = await db
            .select({
                id: service.id,
                title: service.title,
                description: service.description,
                longDescription: service.longDescription,
                price: service.price,
                deliveryTime: service.deliveryTime,
                revisions: service.revisions,
                packageName: service.packageName,
                packageDescription: service.packageDescription,
                features: service.features,
                tags: service.tags,
                images: service.images,
                createdAt: service.createdAt,
                category: {
                    id: category.id,
                    name: category.name,
                },
                user: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    displayUsername: user.displayUsername,
                    image: user.image,
                    school: user.school,
                    bio: user.bio,
                    skills: user.skills,
                    createdAt: user.createdAt,
                },
                major: {
                    id: major.id,
                    name: major.name,
                },
            })
            .from(service)
            .leftJoin(category, eq(service.categoryId, category.id))
            .leftJoin(user, eq(service.userId, user.id))
            .leftJoin(major, eq(user.majorId, major.id))
            .where(eq(service.id, serviceId))
            .limit(1);

        if (!result || result.length === 0) {
            return { success: false, error: "Service not found" };
        }

        const serviceData = result[0];

        // Format the data to match the expected structure
        const formattedService: FormattedService = {
            id: serviceData.id,
            title: serviceData.title,
            description: serviceData.description,
            longDescription: serviceData.longDescription,
            price: serviceData.price,
            deliveryTime: serviceData.deliveryTime,
            revisions: serviceData.revisions,
            category: serviceData.category?.name || "Uncategorized",
            subcategory: "General", // You can add this field to your schema later
            rating: 0, // Will be updated with real data
            totalReviews: 0, // Will be updated with real data
            totalOrders: 0, // Will be updated later,
            images: serviceData.images || [],
            tags: serviceData.tags || [],
            seller: {
                id: serviceData.user?.id || "",
                name: serviceData.user?.name || "Unknown",
                username: serviceData.user?.username || serviceData.user?.displayUsername || "@unknown",
                avatar: serviceData.user?.image || "/placeholder.svg?height=80&width=80",
                school: serviceData.user?.school || "Not specified",
                major: serviceData.major?.name || "Not specified",
                joinDate: serviceData.user?.createdAt ? new Date(serviceData.user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Unknown",
                isVerified: false, // You can add this field to your schema later
                level: "Level 1 Seller", // You can add this field to your schema later
                rating: 0, // Will be updated with real data
                totalReviews: 0, // Will be updated with real data
                totalOrders: 0, // Will be updated later
                bio: serviceData.user?.bio || "No bio available",
                skills: serviceData.user?.skills || [],
            },
            package: {
                name: serviceData.packageName,
                price: `Rp. ${serviceData.price.toLocaleString()}`,
                description: serviceData.packageDescription,
                deliveryTime: serviceData.deliveryTime,
                revisions: parseInt(serviceData.revisions) || 0,
                features: serviceData.features || [],
            },
            reviews: [], // Will be populated with real reviews 
        };

        // Get reviews for this service
        const reviewsResult = await getServiceReviews(serviceId);

        if (reviewsResult.success) {
            // Update service with real review data
            const averageRating = Number(reviewsResult.stats!.averageRating) || 0;
            const totalReviews = Number(reviewsResult.stats!.totalReviews) || 0;

            formattedService.rating = averageRating;
            formattedService.totalReviews = totalReviews;
            formattedService.seller.rating = averageRating;
            formattedService.seller.totalReviews = totalReviews;

            // Format reviews for the UI
            formattedService.reviews = (reviewsResult.reviews || []).map((review): FormattedReview => ({
                id: review.id,
                client: review.client?.name || 'Anonymous',
                avatar: review.client?.image || '/placeholder.svg?height=40&width=40',
                rating: review.rating || 0,
                date: review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown',
                comment: review.comment || '',
                helpful: 0, // This could be implemented in the future
                project: 'Service Order', // This could be enhanced in the future
            }));
        }

        return { success: true, data: formattedService };
    } catch (err: unknown) {
        const message =
            (err as Error)?.message ||
            "Failed to fetch service";
        return { success: false, error: message };
    }
};