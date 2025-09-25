import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Wrench, Star, MapPin, Shield, Zap } from "lucide-react"
import HeroSection from "../components/Home/Hero"
import Testemonials from "../components/Home/testemonials"
import Navbar from "../components/common/Header"
import AboutPage from "../components/Sections/About"
import { StatsSection } from "../components/common/Status"
import Footer from "../components/common/Footer"
import ContactPage from "../components/Sections/Contact"
import { HowITWorks, ServicesPage } from "../components/Sections/Services"
import { WhyUs } from "../components/Sections/WhyUs"

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
      <HowITWorks />
      <WhyUs />
      <AboutPage />
      <ServicesPage />
      <ContactPage />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default LandingPage
