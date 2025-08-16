import CreatePortfolioForm from "@/components/portfolio/create-portfolio-form";
import { ProfileInfoCard } from "@/components/profile";
import TabsSeparatedDemo from "@/components/tabs-03";
import { auth } from "@/lib/auth";
import { getProfile } from "@/server/user";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PortfolioPreviewDialog } from "@/components/portfolio/portfolio-preview-dialog";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Profile - SkillSwap",
};

interface PageProps {
    params: {
        username: string;
    };
}

const samplePortfolio = {
    id: "1",
    title: "Modern E-commerce Website",
    description:
        "Desain website e-commerce modern dengan fokus pada user experience dan konversi yang tinggi.",
    images: [
        "https://0xctge55estdjuk2.public.blob.vercel-storage.com/hKLeq1aHGXNxAVWBuo6cMKw6Vucn8jA1-1755328084908-0-Screenshot%202025-06-26%20223020.png",
        "https://0xctge55estdjuk2.public.blob.vercel-storage.com/hKLeq1aHGXNxAVWBuo6cMKw6Vucn8jA1-1755326782470-1-Home%20Page%20%284%29.png",
        "https://0xctge55estdjuk2.public.blob.vercel-storage.com/hKLeq1aHGXNxAVWBuo6cMKw6Vucn8jA1-1755326782469-0-SS%20%281%29.png",
    ],
    tags: ["web", "ecommerce", "modern", "ui/ux"],
    createdAt: "15 Januari 2024",
};

export default async function ProfilePage({ params }: PageProps) {
    const { username } = await params;

    const [session, profileResult] = await Promise.all([
        auth.api.getSession({ headers: await headers() }),
        getProfile(username),
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
        <section className="min-h-screen py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-6">
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

                    <div className="flex justify-between">
                        <h1 className="font-bold text-2xl">
                            Portfolio Showcase
                        </h1>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="secondary">
                                    Add Portfolio
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create Portfolio</DialogTitle>
                                </DialogHeader>
                                <CreatePortfolioForm />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div>
                        <PortfolioPreviewDialog
                            trigger={
                                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                                    <CardContent className="p-4">
                                        <img
                                            src={"/placeholder.svg"}
                                            alt={samplePortfolio.title}
                                            className="w-full h-48 object-cover rounded-md mb-4"
                                        />
                                        <h3 className="font-semibold mb-2">
                                            {samplePortfolio.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {samplePortfolio.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            }
                            portfolio={samplePortfolio}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
