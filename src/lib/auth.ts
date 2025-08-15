import { db } from "@/db/drizzle";
import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";


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
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                input: false,
            },
            bio: {
                type: "string",
                required: false,
                input: false,
            },
            school: {
                type: "string",
                required: false,
                input: false,
            },
            major_id: {
                type: "string",
                required: false,
                input: false,
            },
            skills: {
                type: "string[]",
                required: false,
                input: false,
            },
        },
    },
    plugins: [nextCookies(), username()]
});