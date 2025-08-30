import { Button } from "@/components/ui/button";

export function AboutCTA() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                    Mari Berkembang Bersama
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Bergabunglah dengan komunitas pelajar berbakat yang mengubah keterampilan mereka menjadi peluang nyata.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="px-8">
                        Jelajahi Layanan
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="px-8 bg-transparent"
                    >
                        Mulai Tawarkan Keterampilanmu
                    </Button>
                </div>
            </div>
        </section>
    );
}
