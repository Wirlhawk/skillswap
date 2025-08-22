import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Star } from "lucide-react";
import formatRupiah from "@/utils/format-rupiah";

const service = {
    title: "I Will Create A Modern Landing Page Website",
    description:
        "profesional website with react js, tailwind css and bootsrap with custom responsive layout that matches your need.",
    category: "Web Development",
    tags: ["NodeJS", "React", "Laravel", "Golang"],
    user: {
        username: "Wirlhawk",
        majors: "Rekayasa Perangkat Lunak",
        image: "/assets/editor.png",
    },
    images: ["/assets/editor.png"],
    rating: 4.5,
    totalOrder: 30,
    price: 500000,
};

interface ServiceCardProps {
    title: string;
    description: string;
    category: string;
    tags: string[];
    user: {
        username: string;
        major: string;
        image: string;
    };
    images: string[];
    rating?: number;
    totalOrder?: number;
    price: number;
}

export default function ServiceCard({
    title,
    description,
    category,
    tags,
    user,
    images,
    rating = 4.5,
    totalOrder = 30,
    price,
}: ServiceCardProps) {
    return (
        <Link href="/service/">
            <Card className="p-4 pb-6 gap-2 h-full hover:bg-muted">
                <CardHeader className="p-0 h-fit">
                    <img
                        src={images[0]}
                        width={300}
                        height={300}
                        alt="Service Thumbnail"
                        className="aspect-video object-cover w-full rounded-xl border "
                    />
                </CardHeader>
                <CardContent className="pl-2 space-y-4">
                    <div className="flex items-center gap-2">
                        <div>
                            <Avatar className={`size-8`}>
                                <AvatarImage
                                    src={user.image}
                                    alt="Profile image"
                                />
                                <AvatarFallback className="text-sm">
                                    {user.username
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <span className="">
                            <h1 className="text-sm font-semibold">
                                {user.username}
                            </h1>
                            <p className="text-xs text-muted-foreground">
                                {user.major}
                            </p>
                        </span>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-md font-bold">{title}</h1>
                        <p className="text-muted-foreground text-sm">
                            {description}
                        </p>
                    </div>
                    <span className="flex gap-1 flex-wrap">
                        <Badge>{category}</Badge>
                        {tags &&
                            tags.map((tag) => (
                                <Badge key={tag} className="bg-muted">
                                    {tag}
                                </Badge>
                            ))}
                    </span>
                </CardContent>
                <CardFooter className="p-0 pl-2 flex flex-row justify-between items-end mt-auto pt-2">
                    <div className="flex flex-col gap-0">
                        <p className="text-xs text-muted-foreground ">
                            Starting At
                        </p>
                        <h1 className="text-lg font-bold">
                            {formatRupiah(price)}
                        </h1>
                    </div>
                    <div className="flex flex-row items-center gap-1 justify-center">
                        <Star fill="#F6E05E" className="size-4" />
                        <h1 className="font-bold text-sm">{rating}</h1>
                        <h2 className="text-muted-foreground text-sm">
                            ({totalOrder})
                        </h2>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
