import { ProfileInfoCard } from "@/components/profile";
import TabsSeparatedDemo from "@/components/tabs-03";
import { auth } from "@/lib/auth";
import { getProfile } from "@/server/user";
import { getPortfolio } from "@/server/portfolio";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { PortfolioShowcase } from "@/components/portfolio/portfolio-showcase";
import PageInset from "@/components/shared/page-inset";


interface PageProps {
    params: {
        username: string;
    };
}

export default async function ProfilePage({ params }: PageProps) {
    const { username } = await params;

    const [session, profileResult, portfolioResult] = await Promise.all([
        auth.api.getSession({ headers: await headers() }),
        getProfile(username),
        getPortfolio(username),
    ]);

    if (!session?.user) {
        redirect("/login");
    }

    if (!profileResult.data) {
        notFound();
    }

    const profile = profileResult.data;
    const isOwnProfile = session.user.username === username;

    return (
        <PageInset>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <ProfileInfoCard
                    user={{
                        username: profile.username || "",
                        name: profile.name || "",
                        bio: profile.bio || undefined,
                        school: profile.school || undefined,
                        skills: profile.skills || undefined,
                        image: profile.image || "",
                    }}
                    major={profile.major || ""}
                    isEditable={isOwnProfile}
                />
                <div className="col-span-1 md:col-span-2 space-y-3">
                    <TabsSeparatedDemo />
                    <PortfolioShowcase
                        portfolios={
                            portfolioResult.success && portfolioResult.data
                                ? portfolioResult.data
                                : []
                        }
                        isOwnProfile={isOwnProfile}
                    />
                </div>
            </div>
        </PageInset>
    );
}
