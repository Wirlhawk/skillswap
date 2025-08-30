import CreateServiceForm2 from "@/components/service/create-service-form";
import PageInset from "@/components/shared/page-inset";
import { Header } from "@/components/ui/header";
import { getCategories } from "@/server/category";
import React from "react";

const page = async () => {
    const categories = await getCategories();

    return (
        <PageInset>
            <Header className="mb-5">Create New Service</Header>
            <CreateServiceForm2 categories={categories.data || []} />
        </PageInset>
    );
};

export default page;
