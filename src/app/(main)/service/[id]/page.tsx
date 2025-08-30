import { getServiceById } from "@/server/service";
import { notFound } from "next/navigation";
import ServiceDetailClient from "@/components/service/service-detail";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface ServiceDetailPageProps {
    params: {
        id: string;
    };
}

export default async function ServiceDetailPage({
    params,
}: ServiceDetailPageProps) {
    const result = await getServiceById(params.id);
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <ServiceDetailClient
            serviceData={result.data}
            currentUserId={session?.user?.id || ""}
        />
    );
}
