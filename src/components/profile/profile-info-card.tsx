"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "../ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { BookOpen, Calendar, Pencil, School } from "lucide-react";
import EditProfileForm from "./edit-profile-form";
import { EditProfilePictureForm } from "./edit-profile-picture-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { APP_CONSTANTS } from "../../lib/constants";

interface ProfileInfoCardProps {
    user: {
        username: string;
        name: string;
        bio?: string;
        school?: string;
        skills?: string[];
        image: string;
        createdAt?: string;
    };
    major?: string | null;
    isEditable?: boolean;
}

export default function ProfileInfoCard({
    user,
    major,
    isEditable = false,
}: ProfileInfoCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentProfilePicture, setCurrentProfilePicture] = useState<string>(
        user.image
    );

    const handleProfilePictureUpdate = (newImageBlob: Blob) => {
        const newImageUrl = URL.createObjectURL(newImageBlob);
        setCurrentProfilePicture(newImageUrl);
        setIsDialogOpen(false);
    };

    return (
        <Card className="col-span-1 py-8 h-fit gap-2 ">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar
                            className={`size-${APP_CONSTANTS.PROFILE_AVATAR_SIZE}`}
                        >
                            <AvatarImage src={user.image} alt="Profile image" />
                            <AvatarFallback className="text-xl">
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        {isEditable && (
                            <>
                                <button
                                    onClick={() => setIsDialogOpen(true)}
                                    className="absolute -bottom-1 -right-1 rounded-full p-1 bg-secondary text-secondary-foreground"
                                >
                                    <Pencil className="size-3" />
                                </button>
                                <EditProfilePictureForm
                                    isOpen={isDialogOpen}
                                    onClose={() => setIsDialogOpen(false)}
                                    onSave={handleProfilePictureUpdate}
                                    currentImage={currentProfilePicture}
                                />
                            </>
                        )}
                    </div>

                    <div>
                        <h2 className="font-bold text-foreground text-lg">
                            @{user.username}
                        </h2>
                        <p className="text-sm text-muted-foreground font-medium">
                            {user.name}
                        </p>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                    {user.bio || "No Bio Available"}
                </p>
            </CardHeader>
            <CardContent className="mt-5">
                <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                        <School className="size-4 text-foreground" />
                        <p className="text-muted-foreground">
                            {user.school || "No School Info"}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BookOpen className="size-4 text-foreground" />
                        <p>{major || "No Majors"}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className="size-4 text-foreground" />
                        <p>
                            Joined on{" "}
                            {user.createdAt
                                ? new Date(user.createdAt).toLocaleDateString(
                                      "en-US",
                                      APP_CONSTANTS.DATE_FORMAT_OPTIONS
                                  )
                                : "Recently"}
                        </p>
                    </div>
                    <span className="flex flex-wrap gap-1 mt-5">
                        {user.skills &&
                            user.skills.map((skill) => (
                                <Badge key={skill}>{skill}</Badge>
                            ))}
                    </span>
                </div>
            </CardContent>
            {isEditable && (
                <CardFooter>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="w-full mt-2"
                                variant="secondary"
                                size={"sm"}
                            >
                                Edit Profile
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                            </DialogHeader>
                            <EditProfileForm
                                defaultValues={{
                                    name: user.name || "",
                                    bio: user.bio || "",
                                    skills: user.skills || [],
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            )}
        </Card>
    );
}
