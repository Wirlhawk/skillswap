import FilterBars from "@/components/filter-bars";
import ServiceCard from "@/components/service/service-card";
import PageInset from "@/components/shared/page-inset";
import { Header } from "@/components/ui/header";
import { getCategories } from "@/server/category";
import { getAllService } from "@/server/service";
import React from "react";

type SP = {
    category?: string;
    min?: string;
    max?: string;
};

export default async function page({
    searchParams,
}: {
    searchParams: Promise<SP>;
}) {
    const sp = await searchParams;
    const services = await getAllService({ categorySlug: sp.category });
    const categories = await getCategories();

    return (
        <PageInset>
            <Header>All Categories</Header>
            <FilterBars categories={categories.data || []} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
                {services.data!.map((service) => (
                    <ServiceCard
                        key={service.id}
                        title={service.title}
                        description={service.description}
                        images={service.images || []}
                        category={service.category || ""}
                        price={service.price}
                        tags={service.tags || []}
                        user={{
                            username: service.user.username || "",
                            major: service.user.major || "",
                            image: service.user.image || "",
                        }}
                    />
                ))}
            </div>
        </PageInset>
    );
}
