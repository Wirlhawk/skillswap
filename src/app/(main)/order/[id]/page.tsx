import { OrderViewRefactored } from "@/components/orders/order-view";
import { getOrderById } from "@/server/order";
import { transformOrderData } from "@/lib/order-transformers";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function OrderViewPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await Promise.resolve(params);

    // Fetch order data and user session in parallel
    const [result, session] = await Promise.all([
        getOrderById(id),
        auth.api.getSession({
            headers: await headers(),
        }),
    ]);

    if (!result) {
        notFound();
    }

    const currentUserId = session?.user?.id;
    // Transform the database data to component-friendly format
    const orderViewData = transformOrderData(result);

    return (
        <OrderViewRefactored
            data={orderViewData}
            currentUserId={currentUserId}
        />
    );
}
