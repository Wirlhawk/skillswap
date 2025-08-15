import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
}

interface TeamProps {
    heading?: string;
    subheading?: string;
    description?: string;
    members?: TeamMember[];
}

const Team = ({
    heading = "Team",
    description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
    members = [
        {
            id: "member-1",
            name: "Riyadh Irham Diando",
            role: "Nigga",
            avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        },

        {
            id: "member-2",
            name: "Rayyy Sigma",
            role: "Lead Engineer",
            avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        },

        {
            id: "member-3",
            name: "Mhmdiamd",
            role: "UX Designer",
            avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
        },
    ],
}: TeamProps) => {
    return (
        <section className="py-32">
            <div className="container flex flex-col items-center text-center max-w-7xl mx-auto">
                <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
                    {heading}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-3xl lg:text-xl">
                    {description}
                </p>
            </div>
            <div className="container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                {members.map((member) => (
                    <div key={member.id} className="flex flex-col items-center">
                        <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name}</AvatarFallback>
                        </Avatar>
                        <p className="text-center font-medium">{member.name}</p>
                        <p className="text-muted-foreground text-center">
                            {member.role}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export { Team };
