import { getServiceById } from "@/server/service";
import { notFound } from "next/navigation";
import ServiceDetailClient from "@/components/service/service-detail";

interface ServiceDetailPageProps {
    params: {
        id: string;
    };
}

export default async function ServiceDetailPage({
    params,
}: ServiceDetailPageProps) {
    const result = await getServiceById(params.id);

    if (!result.success || !result.data) {
        notFound();
    }

    return <ServiceDetailClient serviceData={result.data} />;
}
