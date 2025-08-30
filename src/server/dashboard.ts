import { db } from "@/db/drizzle";
import { category, order, service, user } from "@/db/schema";
import { and, count, eq, sum, desc, gte, lte, sql } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

export const getSellerStats = async (sellerId: string, startDate?: Date, endDate?: Date) => {
    noStore();
    try {
        const dateFilter = and(
            eq(order.sellerId, sellerId),
            eq(order.status, "Done"),
            startDate ? gte(order.createdAt, startDate) : undefined,
            endDate ? lte(order.createdAt, endDate) : undefined
        );

        const totalRevenueQuery = db
            .select({ total: sum(order.totalPrice) })
            .from(order)
            .where(dateFilter);

        const totalOrdersQuery = db
            .select({ total: count() })
            .from(order)
            .where(dateFilter);
        
        const newCustomersQuery = db
            .select({ total: count(sql`DISTINCT ${order.clientId}`) })
            .from(order)
            .where(dateFilter);

        const [
            totalRevenueResult,
            totalOrdersResult,
            newCustomersResult
        ] = await Promise.all([
            totalRevenueQuery,
            totalOrdersQuery,
            newCustomersQuery
        ]);

        const totalRevenue = Number(totalRevenueResult[0]?.total ?? 0);
        const totalOrders = totalOrdersResult[0]?.total ?? 0;
        const newCustomers = newCustomersResult[0]?.total ?? 0;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        return {
            totalRevenue,
            netProfit: totalRevenue, // Assuming net profit is the same as total revenue
            averageOrderValue,
            totalOrders,
            newCustomers,
        };

    } catch (error) {
        console.error("Failed to fetch seller stats:", error);
        return {
            totalRevenue: 0,
            netProfit: 0,
            averageOrderValue: 0,
            totalOrders: 0,
            newCustomers: 0,
        };
    }
};

export const getTopPerformingServices = async (sellerId: string) => {
    noStore();
    try {
        const result = await db.select({
            serviceId: service.id,
            serviceTitle: service.title,
            totalRevenue: sum(order.totalPrice).mapWith(Number),
        })
        .from(order)
        .leftJoin(service, eq(order.serviceId, service.id))
        .where(and(eq(order.sellerId, sellerId), eq(order.status, "Done")))
        .groupBy(service.id, service.title)
        .orderBy(desc(sum(order.totalPrice)))
        .limit(5);
        
        return result;
    } catch (error) {
        console.error("Failed to fetch top performing services:", error);
        return [];
    }
}

export const getRevenueByPeriod = async (sellerId: string, period: 'day' | 'week' | 'month') => {
    noStore();
    // This is a placeholder. A real implementation would require more complex date truncation logic
    // specific to PostgreSQL to group by day, week, or month.
    try {
        const result = await db.select({
            date: order.createdAt,
            revenue: sum(order.totalPrice).mapWith(Number),
        })
        .from(order)
        .where(and(eq(order.sellerId, sellerId), eq(order.status, "Done")))
        .groupBy(order.createdAt)
        .orderBy(order.createdAt);

        return result;
    } catch (error) {
        console.error("Failed to fetch revenue data:", error);
        return [];
    }
}

export const getSellerOrders = async (sellerId: string, { page = 1, pageSize = 10, sortOrder = 'desc', status }: { page?: number, pageSize?: number, sortOrder?: 'asc' | 'desc', status?: string }) => {
    noStore();
    try {
        const whereConditions = [eq(order.sellerId, sellerId)];
        if (status) {
            whereConditions.push(eq(order.status, status as any));
        }

        const ordersQuery = db
            .select({
                id: order.id,
                orderNumber: order.orderNumber,
                serviceTitle: service.title,
                clientName: user.name,
                totalPrice: order.totalPrice,
                status: order.status,
                createdAt: order.createdAt,
            })
            .from(order)
            .leftJoin(service, eq(order.serviceId, service.id))
            .leftJoin(user, eq(order.clientId, user.id))
            .where(and(...whereConditions))
            .limit(pageSize)
            .offset((page - 1) * pageSize)
            .orderBy(order.createdAt, { direction: sortOrder === 'asc' ? 'asc' : 'desc' });

        const totalOrdersQuery = db
            .select({ total: count() })
            .from(order)
            .where(and(...whereConditions));

        const [orders, totalOrdersResult] = await Promise.all([ordersQuery, totalOrdersQuery]);
        
        return {
            orders,
            totalPages: Math.ceil(totalOrdersResult[0].total / pageSize),
            page,
            pageSize
        };

    } catch (error) {
        console.error("Failed to fetch seller orders:", error);
        return {
            orders: [],
            totalPages: 0
        };
    }
};

export const getSellerServices = async (sellerId: string, { page = 1, pageSize = 10 }: { page?: number, pageSize?: number }) => {
    noStore();
    try {
        const servicesQuery = db
            .select({
                id: service.id,
                title: service.title,
                description: service.description,
                price: service.price,
                images: service.images,
                tags: service.tags,
                userId: service.userId,
                username: user.username,
                userProfile: user.image,
                categoryId: service.categoryId,
                categoryName: category.name,
                createdAt: service.createdAt,
                updatedAt: service.updatedAt
            })
            .from(service)
            .leftJoin(user, eq(service.userId, user.id))
            .leftJoin(category, eq(service.categoryId, category.id))
            .where(eq(service.userId, sellerId))
            .limit(pageSize)
            .offset((page - 1) * pageSize);

        const totalServicesQuery = db
            .select({ total: count() })
            .from(service)
            .where(eq(service.userId, sellerId));

        const [services, totalServicesResult] = await Promise.all([servicesQuery, totalServicesQuery]);

        return {
            services,
            totalPages: Math.ceil(totalServicesResult[0].total / pageSize)
        };

    } catch (error) {
        console.error("Failed to fetch seller services:", error);
        return {
            services: [],
            totalPages: 0
        };
    }
};