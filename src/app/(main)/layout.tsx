import { Footer7 } from "@/components/landing-page/footer7";
import Navbar from "@/components/navbar/navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer7 />
        </div>
    );
};

export default MainLayout;
