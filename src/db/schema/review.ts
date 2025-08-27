import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth';
import { order } from './order';
import { service } from './service';

export const review = pgTable('review', {
    id: uuid("id").defaultRandom().primaryKey(),
    sellerId: text('seller_id').notNull().references(() => user.id), // Changed to text
    clientId: text('client_id').notNull().references(() => user.id), // Changed to text
    orderId: uuid('order_id').notNull().references(() => order.id),
    serviceId: uuid('service_id').notNull().references(() => service.id),
    rating: integer('rating').notNull(),
    comment: text('comment'),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
});