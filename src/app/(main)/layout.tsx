import { Footer } from "@/components/landing-page/footer";
import Navbar from "@/components/navbar/navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="px-6">{children}</div>
            <Footer />
        </div>
    );
};

export default MainLayout;
