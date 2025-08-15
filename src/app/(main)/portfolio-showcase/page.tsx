"use client";

import About from "@/components/portfolio/about";
import Contact from "@/components/portfolio/contact";
import Hero from "@/components/portfolio/hero";
import Portfolio from "@/components/portfolio/portfolio";
import ProfileWorks from "@/components/portfolio/profile-works";
import Services from "@/components/portfolio/server";

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
