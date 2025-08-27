import { OrderDeliveryView } from "@/components/orders/delivery/order-delivery-view";
import { getOrderById } from "@/server/order";
import { transformOrderDeliveryViewData } from "@/lib/order-transformers";
import { notFound } from "next/navigation";

export default async function DeliverOrderPage({
    params,
}: {
    params: { id: string };
}) {
    "use server";
    const result = await getOrderById(params.id);

    if (!result) {
        notFound();
    }

    // Transform the database data to component-friendly format
    const deliveryViewData = transformOrderDeliveryViewData(result);

    return <OrderDeliveryView data={deliveryViewData} />;
}
