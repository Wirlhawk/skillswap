import ClientOrdersView from "@/components/client-orders/orders-view";

interface MyOrdersPageProps {
    searchParams: {
        page?: string;
        status?: string;
    };
}

export default async function MyOrdersPage({ searchParams }: MyOrdersPageProps) {
    // The searchParams object is a promise-like object in Next.js 14,
    // so we need to await it to get the actual values.
    const awaitedSearchParams = {
        page: searchParams.page,
        status: searchParams.status,
    };

    return <ClientOrdersView searchParams={Promise.resolve(awaitedSearchParams)} />;
}
