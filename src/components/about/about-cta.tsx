import { Button } from "@/components/ui/button";

export function AboutCTA() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                    Let's build it together
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Join our growing community of talented students who are
                    turning their skills into opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="px-8">
                        Explore Services
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="px-8 bg-transparent"
                    >
                        Start Offering Your Skill
                    </Button>
                </div>
            </div>
        </section>
    );
}
