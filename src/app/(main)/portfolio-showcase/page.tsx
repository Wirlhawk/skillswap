"use client";

import About from "@/components/ex-portfolio/about";
import Contact from "@/components/ex-portfolio/contact";
import Hero from "@/components/ex-portfolio/hero";
import Portfolio from "@/components/ex-portfolio/portfolio";
import ProfileWorks from "@/components/ex-portfolio/profile-works";
import Services from "@/components/ex-portfolio/server";

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Hero />
            <Portfolio />
            <Services />
            <ProfileWorks />
            <About />
            <Contact />
        </main>
    );
}
