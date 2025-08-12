import { db } from "@/db/drizzle";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, username } from "better-auth/plugins"
import * as schema from "@/db/schema";  // Import where you define user, session, etc.


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.user,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
        },
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                input: false,
            },
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    plugins: [nextCookies(), username()]
});