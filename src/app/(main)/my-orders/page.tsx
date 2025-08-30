import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import PageInset from "@/components/shared/page-inset";

export default async function MyOrdersPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
        redirect("/login");
    }

    return (
        <PageInset>
            <div className="min-h-screen bg-background">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                My Orders 📦
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                View and manage your service orders
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid gap-6">
                    {/* Orders content will go here */}
                    <div className="text-center py-12 text-muted-foreground">
                        <p>Orders functionality coming soon...</p>
                    </div>
                </div>
            </div>
        </PageInset>
    );
}
