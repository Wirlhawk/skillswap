import { ArrowRight, Star, Users, Award, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-100">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-gray-600 text-sm ml-2 font-medium">4.9/5</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <Users className="h-4 w-4 text-emerald-600" />
              <span className="text-gray-600 text-sm font-medium">500+ Happy Clients</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Where Skills Meet
            <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              Opportunity
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with top freelance designers and creative professionals. From stunning web designs to complete brand
            identities, discover talent that transforms your vision into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg px-10 py-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Explore Talent
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-4 bg-white/80 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
            >
              Join as Designer
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 mb-16">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-emerald-600" />
              <span>Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <img
              src="/modern-portfolio-showcase.png"
              alt="SkillSwap portfolio showcase"
              className="relative w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
