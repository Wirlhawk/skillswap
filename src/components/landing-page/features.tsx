import {
    BatteryCharging,
    GitPullRequest,
    Layers,
    RadioTower,
    SquareKanban,
    WandSparkles,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface Reason {
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface FeaturesProps {
    heading?: string;
    reasons?: Reason[];
}

const Features = ({
    heading = "Why Choose SkillSwap?",
    reasons = [
        {
            title: "Real Portfolio",
            description:
                "Build a professional portfolio with real projects from actual clients. Showcase your best work and enhance your future career opportunities.",
            icon: <GitPullRequest className="size-6" />,
        },
        {
            title: "Practical Experience",
            description:
                "Gain real work experience while still in school. Develop industry-sought skills through client projects.",
            icon: <SquareKanban className="size-6" />,
        },
        {
            title: "Teacher Support",
            description:
                "Get guidance from teachers who monitor your progress. Student account verification ensures platform quality and security.",
            icon: <RadioTower className="size-6" />,
        },
        {
            title: "Flexibility",
            description:
                "Work on projects according to your own schedule. Balance between school and skill development without excessive pressure.",
            icon: <WandSparkles className="size-6" />,
        },
        {
            title: "Additional Income",
            description:
                "Turn your skills into a source of income. Get paid for services you offer while learning financial management.",
            icon: <Layers className="size-6" />,
        },
        {
            title: "Professional Network",
            description:
                "Build relationships with clients and fellow students. Develop valuable professional networks for your future career.",
            icon: <BatteryCharging className="size-6" />,
        },
    ],
}: FeaturesProps) => {
    return (
        <section className="py-32 px-6">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-10 md:mb-20">
                    <h1 className="mb-2 text-center text-3xl font-black lg:text-5xl">
                        {heading}
                    </h1>
                </div>
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {reasons.map((reason, i) => (
                        <Card key={i} className="gap-2">
                            <CardContent key={i} className="flex flex-col">
                                <div>
                                    <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-primary border shadow-2xs">
                                        {reason.icon}
                                    </div>
                                    <h3 className="mb-2 text-2xl font-bold">
                                        {reason.title}
                                    </h3>
                                </div>
                                <p className="text-muted-foreground">
                                    {reason.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Features };
