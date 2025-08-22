import { Lightbulb, Target } from "lucide-react";

export function AboutStory() {
    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Our Story */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Lightbulb className="h-8 w-8 text-primary" />
                            <h2 className="text-3xl font-bold text-foreground">
                                Our Story
                            </h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            SkillSwap was born from a simple observation:
                            students have incredible talents that often go
                            unrecognized and underutilized. Whether it's graphic
                            design, tutoring, coding, or creative writing, every
                            student brings unique skills to the table.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            We created this platform to bridge the gap between
                            talented students and those who need their services,
                            fostering a community where learning and earning go
                            hand in hand.
                        </p>
                    </div>

                    {/* Our Mission */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="h-8 w-8 text-primary" />
                            <h2 className="text-3xl font-bold text-foreground">
                                Our Mission
                            </h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            To empower students by providing a trusted platform
                            where they can monetize their skills, gain
                            real-world experience, and build meaningful
                            connections with their peers.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            We're not just a marketplace – we're a community
                            that believes in the potential of every student and
                            the value of peer-to-peer learning and
                            collaboration.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
