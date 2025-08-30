import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function ProfilePage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (!session.user.username) {
        redirect("/user/edit");
    }

    // Redirect to the user's profile page
    redirect(`/profile/${session.user.username}`);
}
