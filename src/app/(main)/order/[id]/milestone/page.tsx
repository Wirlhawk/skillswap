import { MilestoneView } from "@/components/orders/milestone/milestone-view";
import { getOrderById } from "@/server/order";
import { transformMilestoneViewData } from "@/lib/order-transformers";
import { notFound } from "next/navigation";

export default async function MilestonePage({
    params,
}: {
    params: { id: string };
}) {
        const { id } = await Promise.resolve(params);
    const result = await getOrderById(id);

    if (!result) {
        notFound();
    }

    // Transform the database data to component-friendly format
    const milestoneViewData = transformMilestoneViewData(result);

    return <MilestoneView data={milestoneViewData} />;
}
