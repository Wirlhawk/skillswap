import {
    BatteryCharging,
    GitPullRequest,
    Layers,
    RadioTower,
    SquareKanban,
    WandSparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

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
    heading = "Why Work With Us?",
    reasons = [
        {
            title: "Quality",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?",
            icon: <GitPullRequest className="size-6" />,
        },
        {
            title: "Experience",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?",
            icon: <SquareKanban className="size-6" />,
        },
        {
            title: "Support",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?",
            icon: <RadioTower className="size-6" />,
        },
        {
            title: "Innovation",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?",
            icon: <WandSparkles className="size-6" />,
        },
        {
            title: "Results",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?",
            icon: <Layers className="size-6" />,
        },
        {
            title: "Efficiency",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?",
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
