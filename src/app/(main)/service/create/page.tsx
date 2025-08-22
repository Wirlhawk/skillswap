import CreateServiceForm from "@/components/service/create-service-form";
import PageInset from "@/components/shared/page-inset";
import { Header } from "@/components/ui/header";
import { getCategories } from "@/server/category";
import React from "react";

const page = async () => {
    const categories = await getCategories();

    return (
        <PageInset>
            <Header>New Service</Header>
            <CreateServiceForm categories={categories.data || []} />
        </PageInset>
    );
};

export default page;
