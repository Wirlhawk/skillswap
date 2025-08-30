import { Card, CardContent } from "@/components/ui/card";
import { APP_CONSTANTS } from "@/lib/constants";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function TestimonialSection() {
    const testimonials = [
        {
            id: 1,
            name: "John Smith",
            role: "Small Business Owner",
            company: "Smith Digital",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
            rating: 5,
            testimonial:
                "SkillSwap helped my business get professional website design at an affordable price. I'm very impressed with the quality of work and professionalism of the students who worked on my project. They were very responsive and understood my small business needs."
        },
        {
            id: 2,
            name: "Sarah Chen",
            role: "Content Creator",
            company: "SC Media",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
            rating: 5,
            testimonial:
                "As a content creator, I needed fast and quality video editing help. Through SkillSwap, I found talented students who consistently deliver outstanding results. This collaboration has been beneficial for both parties.",
        },
        {
            id: 3,
            name: "Michael Wong",
            role: "IT Teacher",
            company: "Tech High School",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
            rating: 5,
            testimonial:
                "As a teacher, I'm delighted to see my students' growth on SkillSwap. This platform gives them opportunities to apply what they learn in class to real projects. I've seen significant improvements in their skills and confidence."
        },
        {
            id: 4,
            name: "Emma Thompson",
            role: "High School Student",
            company: "Central High School",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
            rating: 5,
            testimonial:
                "SkillSwap has transformed how I view education. I can earn pocket money with my graphic design skills while building an impressive portfolio for college applications. This experience is invaluable for my future.",
        },
        {
            id: 5,
            name: "David Park",
            role: "Startup Founder",
            company: "EduTech Solutions",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
            rating: 5,
            testimonial:
                "As a startup with limited budget, SkillSwap is the perfect solution for our website development needs. We get high-quality results at reasonable costs, while supporting practical education for students.",
        },
        {
            id: 6,
            name: "Lisa Garcia",
            role: "Vocational Student",
            company: "Technical Institute",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
            rating: 5,
            testimonial:
                "Thanks to SkillSwap, I've been able to develop my programming skills through real projects. Client feedback has helped me improve my work quality. More importantly, I now have a strong portfolio for job applications after graduation.",
        },
    ];

    return (
        <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="mb-2 text-center text-3xl font-black lg:text-5xl">
                        What Our Users Say
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Real testimonials from students, teachers, and clients who have used SkillSwap
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <Card
                            key={testimonial.id}
                            className="bg-white border-black rounded-2xl hover:shadow-lg transition-all duration-300 min-h-[400px] flex flex-col"
                        >
                            <CardContent className="p-8 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center border">
                                        <Quote className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="flex items-center">
                                        {[...Array(testimonial.rating)].map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-4 h-4 text-yellow-400 fill-current"
                                                />
                                            )
                                        )}
                                    </div>
                                </div>

                                <blockquote className="text-gray-700 mb-6 leading-relaxed flex-grow text-base">
                                    &quot;{testimonial.testimonial}&quot;
                                </blockquote>

                                <div className="flex items-center mt-auto">
                                    <Image
                                        src={
                                            testimonial.image ||
                                            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                                        }
                                        alt={testimonial.name}
                                        width={48}
                                        height={48}
                                        className="size-12 rounded-full object-cover mr-4 border-2 border-purple-100"
                                    />
                                    <div>
                                        <div className="font-bold text-foreground text-lg">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground font-medium">
                                            {testimonial.role}
                                        </div>
                                        <div className="text-sm text-purple-600">
                                            {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
