import { Card, CardContent } from "@/components/ui/card";
import { APP_CONSTANTS } from "@/lib/constants";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function TestimonialSection() {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Product Manager",
            company: "TechCorp",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
            rating: 5,
            testimonial:
                "This platform has completely transformed how we manage our projects. The intuitive interface and powerful features have increased our team's productivity by 40%. The customer support is exceptional and they truly understand our business needs. I can't imagine working without this tool anymore.",
        },
        {
            id: 2,
            name: "Michael Rodriguez",
            role: "Startup Founder",
            company: "InnovateLab",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
            rating: 5,
            testimonial:
                "As a startup, we needed something reliable and scalable. This solution delivered beyond our expectations and helped us secure our Series A funding. The implementation was smooth and the ROI was immediate. Our investors were impressed with the efficiency gains we achieved.",
        },
        {
            id: 3,
            name: "Emma Thompson",
            role: "Creative Director",
            company: "DesignStudio",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
            rating: 5,
            testimonial:
                "The design flexibility and collaboration tools are outstanding. Our creative process has never been smoother, and client satisfaction has skyrocketed. The platform adapts to our workflow perfectly and has become an essential part of our creative arsenal. Highly recommended for any creative team.",
        },
        {
            id: 4,
            name: "David Chen",
            role: "Operations Manager",
            company: "LogiFlow",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
            rating: 5,
            testimonial:
                "Implementation was seamless and the support team is incredible. We've streamlined our operations and reduced costs by 25% in just three months. The automation features have freed up our team to focus on strategic initiatives rather than repetitive tasks.",
        },
        {
            id: 5,
            name: "Lisa Anderson",
            role: "Marketing Lead",
            company: "GrowthCo",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
            rating: 5,
            testimonial:
                "The analytics and reporting features give us insights we never had before. Our marketing campaigns are now data-driven and significantly more effective. The real-time dashboards help us make quick decisions and optimize our strategies on the fly.",
        },
        {
            id: 6,
            name: "James Wilson",
            role: "CTO",
            company: "DevSolutions",
            image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
            rating: 5,
            testimonial:
                "Security and performance are top-notch. Our development team loves the API integration, and we've reduced deployment time by 60%. The platform scales beautifully with our growing needs and the documentation is comprehensive and well-maintained.",
        },
    ];

    return (
        <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="mb-2 text-center text-3xl font-black lg:text-5xl">
                        What our client says
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Real testimonials from industry leaders who trust our
                        platform
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
                                        className={`size-${APP_CONSTANTS.HERO_AVATAR_SIZE} rounded-full object-cover mr-4 border-2`}
                                    />
                                    <div>
                                        <div className="font-bold text-foreground text-lg">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground font-medium">
                                            {testimonial.role}
                                        </div>
                                        <div className="text-sm">
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
