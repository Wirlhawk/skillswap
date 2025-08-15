import { ProfileInfoCard } from "@/components/profile";
import { auth } from "@/lib/auth";
import { getProfile } from "@/server/user";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

interface PageProps {
    params: {
        username: string;
    };
}

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
                <div className="col-span-1 md:col-span-2"></div>
            </div>
        </section>
    );
}
