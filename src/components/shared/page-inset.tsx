import React from "react";

export default function PageInset({ children }: { children: React.ReactNode }) {
    return (
        <section className="min-h-screen py-10 max-w-7xl mx-auto">
            {children}
        </section>
    );
}


