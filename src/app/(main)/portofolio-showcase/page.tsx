"use client"

import About from "@/components/portofolio/about"
import Contact from "@/components/portofolio/contact"
import Hero from "@/components/portofolio/hero"
import Portfolio from "@/components/portofolio/portofolio"
import ProfileWorks from "@/components/portofolio/profile-works"
import Services from "@/components/portofolio/server"



export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <Portfolio />
      <Services />
      <ProfileWorks />
      <About />
      <Contact />
    </main>
  )
}
