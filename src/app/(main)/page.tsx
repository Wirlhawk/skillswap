import { Features } from "@/components/landing-page/features";

import { Hero } from "@/components/landing-page/hero";
import TestimonialSection from "@/components/landing-page/testimonial";

export default function Home() {
    return (
        <div className="">
            <Hero />
            <Features />
            <TestimonialSection />
        </div>
    );
}
