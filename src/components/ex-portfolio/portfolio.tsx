import { ExternalLink, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "Web Design",
      image: "/modern-ecommerce-website.png",
      description:
        "Complete redesign of an e-commerce platform with focus on user experience and conversion optimization.",
    },
    {
      id: 2,
      title: "Brand Identity System",
      category: "Branding",
      image: "/placeholder-13x10.png",
      description:
        "Comprehensive brand identity including logo, color palette, and brand guidelines for a tech startup.",
    },
    {
      id: 3,
      title: "Mobile App Interface",
      category: "UI/UX Design",
      image: "/mobile-app-interface-design-screens.png",
      description: "Intuitive mobile app design for a fitness tracking application with clean, modern interface.",
    },
    {
      id: 4,
      title: "Corporate Website",
      category: "Web Design",
      image: "/corporate-business-website.png",
      description: "Professional corporate website design with emphasis on trust and credibility.",
    },
    {
      id: 5,
      title: "Restaurant Branding",
      category: "Branding",
      image: "/restaurant-branding-menu.png",
      description: "Complete branding package for a premium restaurant including menu design and signage.",
    },
    {
      id: 6,
      title: "SaaS Dashboard",
      category: "UI/UX Design",
      image: "/saas-dashboard-interface-design.png",
      description: "Complex data visualization dashboard with intuitive user interface and seamless user experience.",
    },
  ]

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">Featured Work</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our latest projects and see how we transform ideas into stunning visual experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button size="sm" variant="secondary" className="bg-background/90 hover:bg-background">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-background/90 hover:bg-background">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
