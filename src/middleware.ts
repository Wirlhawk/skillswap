import { betterFetch } from "@/lib/better-fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
	try {
		const { data: session, error } = await betterFetch<Session>("/api/auth/get-session", {
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "", 
			},
		});

		if (!session || error) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		return NextResponse.next();
	} catch (error) {
		console.error("Middleware error:", error);
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|login|register|$).+)"]
};
