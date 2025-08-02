import { Wrench, ShieldCheck, TimerReset, MapPin } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "On-Demand Repair",
      icon: <Wrench className="w-10 h-10 text-yellow-500" />,
      description:
        "Instant access to skilled mechanics near you. Whether you're at home, work, or stranded—help is just a tap away.",
    },
    {
      title: "Verified Professionals",
      icon: <ShieldCheck className="w-10 h-10 text-yellow-500" />,
      description:
        "All our mechanics go through a strict verification process to ensure top-quality and trustworthy service every time.",
    },
    {
      title: "Quick Response",
      icon: <TimerReset className="w-10 h-10 text-yellow-500" />,
      description:
        "Get connected with a nearby mechanic in minutes. We prioritize speed without compromising quality.",
    },
    {
      title: "Location-Based Matchmaking",
      icon: <MapPin className="w-10 h-10 text-yellow-500" />,
      description:
        "Using smart geolocation, we match you with the closest available expert to reduce wait time and cost.",
    },
  ];

  return (
    <section className="min-h-screen bg-black pt-24 pb-20 px-4 md:px-12" id="services">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            Our <span className="text-yellow-500">Services</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We provide fast, reliable, and affordable automotive services that
            keep your life moving.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need help now?
          </h3>
          <a
            href="/register"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 rounded-lg transition"
          >
            Book a Mechanic
          </a>
        </div> */}
      </div>
    </section>
  );
}
