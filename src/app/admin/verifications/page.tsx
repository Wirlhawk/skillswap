import { VerificationRequestsList } from "@/components/admin/verification-requests-list";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import PageInset from "@/components/shared/page-inset";

export default async function AdminVerificationsPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    // Check if user is logged in and has TEACHER role
    if (!session?.user?.id) {
        redirect("/login");
    }

    if (session.user.role !== "TEACHER") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Seller Verification Requests
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Review and manage student verification requests
                        </p>
                    </div>
                </div>
            </div>

            {/* Verification Requests */}
            <div className="grid gap-6">
                <VerificationRequestsList />
            </div>
        </div>
    );
}