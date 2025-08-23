import { Palette, Monitor, Smartphone, Zap, Target, Headphones } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Services() {
  const services = [
    {
      icon: Palette,
      title: "Brand Identity",
      description: "Create memorable brand identities that resonate with your audience and stand out in the market.",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Monitor,
      title: "Web Design",
      description: "Design responsive, user-friendly websites that convert visitors into customers and drive growth.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Craft intuitive mobile experiences that users love and keep them engaged with your brand.",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising on quality. Get your projects delivered on schedule.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "Every design decision is backed by data and focused on achieving your business objectives.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated support throughout your project and beyond. We're here when you need us most.",
      gradient: "from-violet-500 to-purple-500",
    },
  ]

  return (
    <section
      id="services"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">Why Choose SkillSwap?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with verified professionals who combine creativity with strategy to deliver designs that drive real
            business results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group border-0 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-2"
            >
              <CardContent className="p-8 relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br opacity-5 rounded-full -translate-y-4 translate-x-4 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                />

                <div
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                >
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
