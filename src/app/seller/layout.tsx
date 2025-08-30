import MainLayout from "@/app/(main)/layout";
import React from "react";

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
    return <MainLayout>{children}</MainLayout>;
};

export default SellerLayout;
