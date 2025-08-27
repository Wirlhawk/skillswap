"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { APP_CONSTANTS } from "@/lib/constants";
import {
    Camera,
    User,
    MapPin,
    Briefcase,
    GraduationCap,
    Upload,
    X,
} from "lucide-react";

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    location: string;
    profession: string;
    education: string;
    bio: string;
    skills: string[];
    experience: string;
}

export default function ProfileEditForm() {
    const [profileImage, setProfileImage] = useState<string>(
        "/professional-profile.png"
    );
    const [newSkill, setNewSkill] = useState("");
    const [profile, setProfile] = useState<UserProfile>({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        profession: "Full Stack Developer",
        education: "Computer Science, MIT",
        bio: "Passionate developer with 5+ years of experience in building scalable web applications. I love creating innovative solutions and collaborating with talented teams.",
        skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "MongoDB"],
        experience: "5+ years",
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (
        field: keyof UserProfile,
        value: string | string[]
    ) => {
        setProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const addSkill = () => {
        if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
            setProfile((prev) => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()],
            }));
            setNewSkill("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setProfile((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill !== skillToRemove),
        }));
    };

    const handleSave = () => {
        // Here you would typically send the data to your backend
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-8 text-center">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"></div>
                <div className="relative space-y-4">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        Edit Your Profile
                    </h1>
                    <p className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed">
                        Showcase your talents and connect with amazing
                        opportunities in our community of{" "}
                        {APP_CONSTANTS.COMMUNITY_SIZE} students
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-slate-200/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-slate-800 flex items-center gap-2 text-lg">
                                <Camera className="h-5 w-5 text-emerald-500" />
                                Profile Photo
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center space-y-6">
                                <div className="relative group">
                                    <Avatar
                                        className={`h-${APP_CONSTANTS.EDIT_AVATAR_SIZE} w-${APP_CONSTANTS.EDIT_AVATAR_SIZE} border-4 border-white shadow-xl shadow-slate-200/50 transition-transform group-hover:scale-105`}
                                    >
                                        <AvatarImage
                                            src={
                                                profileImage ||
                                                "/placeholder.svg"
                                            }
                                            alt="Profile"
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="text-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 font-semibold">
                                            {profile.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Upload className="h-8 w-8 text-white" />
                                    </div>
                                </div>

                                <div className="w-full">
                                    <Label
                                        htmlFor="photo-upload"
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center justify-center w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                            <Camera className="h-4 w-4 mr-2" />
                                            Upload New Photo
                                        </div>
                                    </Label>
                                    <Input
                                        id="photo-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <p className="text-sm text-slate-500 mt-3 text-center">
                                        {APP_CONSTANTS.SUPPORTED_IMAGE_TYPES.join(
                                            ", "
                                        )}{" "}
                                        (max. {APP_CONSTANTS.MAX_FILE_SIZE_MB}
                                        MB)
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-6 space-y-4">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50">
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        <Briefcase className="h-4 w-4 text-emerald-600" />
                                    </div>
                                    <span className="text-slate-700 font-medium">
                                        {profile.profession}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <MapPin className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="text-slate-700 font-medium">
                                        {profile.location}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <GraduationCap className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <span className="text-slate-700 font-medium">
                                        {profile.education}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-slate-200/50">
                        <CardHeader className="pb-6">
                            <CardTitle className="text-slate-800 flex items-center gap-2 text-xl">
                                <User className="h-6 w-6 text-emerald-500" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label
                                        htmlFor="name"
                                        className="text-slate-700 font-medium"
                                    >
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={profile.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-12 rounded-xl"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label
                                        htmlFor="email"
                                        className="text-slate-700 font-medium"
                                    >
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-12 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label
                                        htmlFor="phone"
                                        className="text-slate-700 font-medium"
                                    >
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phone"
                                        value={profile.phone}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-12 rounded-xl"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label
                                        htmlFor="location"
                                        className="text-slate-700 font-medium"
                                    >
                                        Location
                                    </Label>
                                    <Input
                                        id="location"
                                        value={profile.location}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "location",
                                                e.target.value
                                            )
                                        }
                                        className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-12 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label
                                        htmlFor="profession"
                                        className="text-slate-700 font-medium"
                                    >
                                        Profession
                                    </Label>
                                    <Input
                                        id="profession"
                                        value={profile.profession}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "profession",
                                                e.target.value
                                            )
                                        }
                                        className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-12 rounded-xl"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label
                                        htmlFor="experience"
                                        className="text-slate-700 font-medium"
                                    >
                                        Experience
                                    </Label>
                                    <Input
                                        id="experience"
                                        value={profile.experience}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "experience",
                                                e.target.value
                                            )
                                        }
                                        className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-12 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label
                                    htmlFor="education"
                                    className="text-slate-700 font-medium"
                                >
                                    Education
                                </Label>
                                <Input
                                    id="education"
                                    value={profile.education}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "education",
                                            e.target.value
                                        )
                                    }
                                    className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-12 rounded-xl"
                                />
                            </div>

                            <div className="space-y-4">
                                <Label className="text-slate-700 font-medium">
                                    Skills
                                </Label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {profile.skills.map((skill, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1 text-sm font-medium rounded-full"
                                        >
                                            {skill}
                                            <button
                                                onClick={() =>
                                                    removeSkill(skill)
                                                }
                                                className="ml-2 hover:text-emerald-900"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        value={newSkill}
                                        onChange={(e) =>
                                            setNewSkill(e.target.value)
                                        }
                                        placeholder="Add a skill..."
                                        className="border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-12 rounded-xl"
                                        onKeyPress={(e) =>
                                            e.key === "Enter" && addSkill()
                                        }
                                    />
                                    <Button
                                        onClick={addSkill}
                                        variant="outline"
                                        className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 h-12 px-6 rounded-xl bg-transparent"
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label
                                    htmlFor="bio"
                                    className="text-slate-700 font-medium"
                                >
                                    Bio
                                </Label>
                                <Textarea
                                    id="bio"
                                    value={profile.bio}
                                    onChange={(e) =>
                                        handleInputChange("bio", e.target.value)
                                    }
                                    placeholder="Tell us about yourself, your experience, and what makes you unique..."
                                    className={`border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 min-h-[${APP_CONSTANTS.TEXTAREA_MIN_HEIGHT}px] rounded-xl resize-none`}
                                />
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-slate-100">
                                <Button
                                    onClick={handleSave}
                                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 h-12 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    Save Changes
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-slate-200 text-slate-700 hover:bg-slate-50 bg-white h-12 px-8 rounded-xl"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
