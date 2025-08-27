import { AboutCTA } from "@/components/about/about-cta";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStory } from "@/components/about/about-story";
import { Team } from "@/components/about/team";

export default function AboutUsPage() {
    return (
        <>  
            <AboutHero />
            <AboutStory/>
            <Team />
            <AboutCTA/>
        </>
    );
}
