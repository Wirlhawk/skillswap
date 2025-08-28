import FilterBars from "@/components/filter-bars";
import ServiceCard from "@/components/service/service-card";
import PageInset from "@/components/shared/page-inset";
import { getCategories } from "@/server/category";
import { getAllService } from "@/server/service";

type SP = {
    category?: string;
    min?: string;
    max?: string;
    q?: string;
};

export default async function page({
    params,
    searchParams,
}: {
    params: { query: string };
    searchParams: Promise<SP>;
}) {
    const sp = await searchParams;
    const [services, categories] = await Promise.all([
        getAllService({
            categorySlug: sp.category,
            searchQuery: params.query,
            minPrice: sp.min ? parseInt(sp.min) : undefined,
            maxPrice: sp.max ? parseInt(sp.max) : undefined,
        }),
        getCategories(),
    ]);

    console.log("services", services);

    return (
        <PageInset>
            <FilterBars categories={categories.data || []} searchParams={params.query} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
                {!services.success ? (
                    <div className="col-span-full text-center py-8">
                        <p className="text-gray-500">Error: {services.error}</p>
                    </div>
                ) : services.data?.length === 0 ? (
                    <div className="col-span-full text-center py-8">
                        <p className="text-gray-500">No services found</p>
                    </div>
                ) : (
                    services.data?.map((service) => (
                        <ServiceCard
                            key={service.id}
                            serviceId={service.id}
                            title={service.title}
                            description={service.description}
                            images={service.images ?? []}
                            category={service.category ?? ""}
                            price={service.price}
                            tags={service.tags ?? []}
                            rating={service.rating}
                            totalOrder={service.totalReviews}
                            user={{
                                username: service.user?.username ?? "",
                                major: service.user?.major ?? "",
                                image: service.user?.image ?? "",
                            }}
                        />
                    ))
                )}
            </div>
        </PageInset>
    );
}
