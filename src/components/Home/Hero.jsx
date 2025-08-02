import { useEffect, useState } from "react";
import carImg2 from "../../Asset/car2.png";
import { MapPin, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={`py-24transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"} h-[100dvh] flex justify-center items-center`} id="home">
      <div className="container mx-auto px-4  max-md:pt-[20dvh] ">
        <div className="grid md:grid-cols-2 items-center gap-16 ">
          {/* Text content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Find <span className="text-yellow-500">Trusted Mechanics</span> Near You
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-lg text-gray-600">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>Fast</span>
              </div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-500" />
                <span>Reliable</span>
              </div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-yellow-500" />
                <span>Nearby</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Get Started
              </Link>
              <Link
                to="/register"
                className="border border-yellow-500 text-yellow-500 hover:bg-yellow-100 font-semibold px-6 py-3 rounded-lg transition"
              >
                Become a Mechanic
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src={carImg2}
              alt="Zooming Car"
              className={`max-w-sm w-full rounded-xl shadow-2xl transform transition-transform duration-1000 ${
                isVisible ? "scale-100" : "scale-50"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
