import MainLayout from "@/app/(main)/layout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() });

    // Check if user is logged in and has TEACHER role
    if (!session?.user?.id) {
        redirect("/login");
    }

    if (session.user.role !== "TEACHER") {
        redirect("/");
    }

    return <MainLayout>{children}</MainLayout>;
};

export default AdminLayout;
