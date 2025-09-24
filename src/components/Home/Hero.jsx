import { useEffect, useState } from "react";
import bgImage from "../../Asset/about.png";
import { Link } from "react-router-dom";
import { PhoneCall } from "lucide-react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // trigger animation after mount
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image with zoom-in */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] ${isVisible ? "scale-90" : "scale-50"
          }`}
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div
        className={`relative z-10 text-center text-white px-4 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <h1 className="text-4xl md:text-7xl font-bold mb-6">
          Stuck on the  <span className="text-yellow-500">Road?</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 text-center max-w-2xl mx-auto">
          Elisoft Assist connects you with verified roadside help within minutes – anytime, anywhere.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="bg-yellow-500 hover:bg-yellow-600 text-sm  text-white flex items-center gap-4 font-semibold px-4 py-2 rounded-lg transition"
          >
            <PhoneCall size={16} />
            Get Started
          </Link>
          <Link
            to="/register"
            className="border border-yellow-500 text-yellow-500 text-sm hover:bg-yellow-500 hover:text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Become a Mechanic
          </Link>
        </div>

        <div className="mt-8">
          <div className="text-sm flex max-w-2xl text-center items-center justify-center gap-2 md:gap-8 text-gray-300">
            <span>
              ✓ Available 24/7
            </span>
            <span>
              ✓ Licensed Professionals
            </span>
            <span>
              ✓ Fast Response
            </span>

          </div>
        </div>
      </div>
    </section>
  );
}
