import { Award, Users, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function About() {
  const stats = [
    { icon: Users, number: "500+", label: "Happy Clients" },
    { icon: Award, number: "50+", label: "Awards Won" },
    { icon: Clock, number: "5+", label: "Years Experience" },
    { icon: CheckCircle, number: "1000+", label: "Projects Completed" },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">
              Crafting Digital Experiences Since 2019
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We're a passionate team of designers and developers who believe that great design has the power to
              transform businesses. Our mission is to create visual experiences that not only look stunning but also
              drive meaningful results for our clients.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From startups to Fortune 500 companies, we've helped brands across industries establish their digital
              presence and connect with their audiences in meaningful ways.
            </p>
            <Button size="lg" >
              Learn More About Us
            </Button>
          </div>

          <div className="relative">
            <img
              src="/creative-design-team.png"
              alt="About us"
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-background p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12  rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Award Winning</p>
                  <p className="text-sm text-gray-600">Design Agency</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
              <div className="text-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
