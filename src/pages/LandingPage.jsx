import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Wrench, Star, MapPin, Shield, Zap } from "lucide-react"
import HeroSection from "../components/Home/Hero"
import Testemonials from "../components/Home/testemonials"
import Navbar from "../components/common/Header"
import AboutPage from "../components/Sections/About"
import ServicesPage from "../components/Sections/Services"
import { StatsSection } from "../components/common/Status"
import Footer from "../components/common/Footer"
import ContactPage from "../components/Sections/Contact"

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Book Instantly",
      description: "Find and book mechanics in seconds. No waiting, no hassle.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Mechanics",
      description: "All our mechanics are thoroughly vetted and certified professionals.",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Interactive Map",
      description: "Locate mechanics and track requests with our real-time map feature.",
    },
  ]


  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      <HeroSection />
      <AboutPage />
      <ServicesPage />
      {/* Features Section */}
      <section className="pt-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gold mb-4">Why Choose  Elisoft?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of automotive service with our innovative platform
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform duration-300">
                <div className="text-gold mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        <StatsSection />
      </section>

      {/* Testimonials */}
      <Testemonials />
      <ContactPage />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default LandingPage
