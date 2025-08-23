import { MoveRight, Star } from "lucide-react";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { APP_CONSTANTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { TextEffect } from "../ui/text-effect";

interface HeroProps {
    heading?: string;
    description?: string;
    button?: {
        text: string;
        url: string;
    };
    reviews?: {
        count: number;
        rating?: number;
        avatars: {
            src: string;
            alt: string;
        }[];
    };
}

const Hero = ({
    heading = "Connect, Collaborate, and Grow with Student Freelancers",
    description = "Discover top student talent for your projects. Connect, collaborate, and achieve more together on our platform. our community of student freelancers is ready to support your goals.",
    button = {
        text: "Broswe Thousands of Services",
        url: "/register",
    },
    reviews = {
        count: 200,
        rating: 4.9,
        avatars: [
            {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
                alt: "Avatar 1",
            },
            {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
                alt: "Avatar 2",
            },
            {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
                alt: "Avatar 3",
            },
            {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
                alt: "Avatar 4",
            },
            {
                src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
                alt: "Avatar 5",
            },
        ],
    },
}: HeroProps) => {
    return (
        <section className="py-32 px-6 min-h-screen flex">
            <div className="container text-center mx-auto">
                <div className="mx-auto flex max-w-5xl flex-col gap-6">
                    {/* <h1 className="text-4xl font-extrabold lg:text-6xl"> */}
                    <TextEffect
                        per="word"
                        as="h1"
                        preset="slide"
                        speedReveal={0.7}
                        className="text-4xl font-extrabold lg:text-6xl"
                    >
                        {heading}
                    </TextEffect>
                    {/* </h1> */}
                    <TextEffect
                        per="word"
                        preset="fade"
                        delay={0.1}
                        speedReveal={1.5}
                        className="text-muted-foreground text-balance lg:text-lg max-w-sm:hidden"
                    >
                        {description}
                    </TextEffect>
                </div>
                <Button asChild size="lg" className="mt-10 px-5">
                    <a href={button.url}>
                        {button.text} <MoveRight />
                    </a>
                </Button>
                <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
                    <span className="mx-4 inline-flex items-center -space-x-4">
                        {reviews.avatars.map((avatar, index) => (
                            <Avatar
                                key={index}
                                className={`size-${APP_CONSTANTS.HERO_AVATAR_SIZE} border`}
                            >
                                <AvatarImage
                                
                                    src={avatar.src}
                                    alt={avatar.alt}
                                />
                            </Avatar>
                        ))}
                    </span>
                    <div>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    className="size-5 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                            <span className="mr-1 font-semibold">
                                {reviews.rating?.toFixed(1)}
                            </span>
                        </div>
                        <p className="text-muted-foreground text-left font-medium">
                            more than {reviews.count}+ students has joined
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Hero };
