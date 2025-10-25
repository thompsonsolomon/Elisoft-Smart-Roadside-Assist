import { MapPin, Settings, Truck, CheckCircle } from "lucide-react";
import { Card, CardContent } from "../../utils/Card";
import { motion } from "framer-motion";

// export function ServicesPage() {
//   const steps = [
//     {
//       icon: MapPin,
//       title: "Share Location",
//       description: "Tell us where you are and we'll find the nearest verified technician to help you.",
//       step: "01"
//     },
//     {
//       icon: Settings,
//       title: "Select Issue",
//       description: "Choose from common roadside issues or describe your specific problem in detail.",
//       step: "02"
//     },
//     {
//       icon: Truck,
//       title: "Help Arrives",
//       description: "A professional technician arrives at your location with the tools needed to help.",
//       step: "03"
//     },
//     {
//       icon: CheckCircle,
//       title: "Problem Solved",
//       description: "Get back on the road quickly with our efficient and reliable roadside assistance.",
//       step: "04"
//     }
//   ];

//   return (
//     <section id="services" className="py-20 bg-[#121212]">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             How It <span className="text-yellow-500">Works</span>
//           </h2>
//           <p className="text-lg text-gray-300 text-muted-foreground max-w-2xl mx-auto">
//             Getting help on the road has never been easier. Follow these simple steps to get assistance when you need it most.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
//           {steps.map((step, index) => {
//             const Icon = step.icon;
//             return (
//               <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-card border-border/50">
//                 {/* Step number */}
//                 <div className="absolute top-4 right-4 text-6xl font-bold text-yellow-500/10 group-hover:text-yellow-500/20 transition-colors">
//                   {step.step}
//                 </div>

//                 <CardContent className="p-6">
//                   <div className="mb-4">
//                     <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
//                       <Icon className="h-6 w-6 text-yellow-500" />
//                     </div>
//                     <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
//                   </div>
//                   <p className="text-muted-foreground text-gray-400 leading-relaxed">
//                     {step.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  Car,
  Wrench,
  Zap,
  CircleSlash,
  Building,
  Hammer,
  ShieldCheck,
  ThermometerSnowflake,
  GaugeCircle,
  MoveHorizontal,
  PaintBucket,
  KeyRound,
  Fuel,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function ServicesPage() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "free-snap",
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.2, spacing: 16 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 20 },
      },
    },
  });

  const services = [
    {
      title: "Roadside Assistant",
      icon: <Car className="w-10 h-10 text-yellow-500" />,
      description: "Emergency help wherever you are — fast and reliable roadside assistance at your fingertips.",
    },
    {
      title: "Mechanic Repair",
      icon: <Wrench className="w-10 h-10 text-yellow-500" />,
      description: "Professional mechanic services for all car issues, delivered to your location quickly.",
    },
    {
      title: "Towing Service",
      icon: <Truck className="w-10 h-10 text-yellow-500" />,
      description: "Stranded? We'll tow your vehicle to safety fast, no matter where you are.",
    },
    {
      title: "Electric Rewire / Battery Jumpstart",
      icon: <Zap className="w-10 h-10 text-yellow-500" />,
      description: "Electrical issues? We fix rewiring and jumpstart your battery on the spot.",
    },
    {
      title: "Flat Tyre",
      icon: <CircleSlash className="w-10 h-10 text-yellow-500" />,
      description: "Flat tyre? We’ll get it changed or patched quickly wherever you are.",
    },
    {
      title: "Car Service Center",
      icon: <Building className="w-10 h-10 text-yellow-500" />,
      description: "Access to our full car service centers for complete maintenance and upgrades.",
    },
    {
      title: "Body Repair",
      icon: <Hammer className="w-10 h-10 text-yellow-500" />,
      description: "From dents to crashes, we restore your car's body to perfection.",
    },
    {
      title: "Break Repair",
      icon: <ShieldCheck className="w-10 h-10 text-yellow-500" />,
      description: "Brake issues fixed fast — we prioritize your car’s stopping power.",
    },
    {
      title: "Car AC Repair",
      icon: <ThermometerSnowflake className="w-10 h-10 text-yellow-500" />,
      description: "Keep it cool. We fix car AC systems to beat the heat anytime.",
    },
    {
      title: "Engine Diagnostic",
      icon: <GaugeCircle className="w-10 h-10 text-yellow-500" />,
      description: "Get instant engine diagnostics and troubleshooting from professionals.",
    },
    {
      title: "Wheel Alignment",
      icon: <MoveHorizontal className="w-10 h-10 text-yellow-500" />,
      description: "We ensure perfect wheel balance and alignment for smooth rides.",
    },
    {
      title: "Oil Change",
      icon: <Fuel className="w-10 h-10 text-yellow-500" />,
      description: "Efficient oil changes to keep your engine running smoothly and reliably.",
    },
    {
      title: "Body Painting",
      icon: <PaintBucket className="w-10 h-10 text-yellow-500" />,
      description: "Auto body painting services with perfect finish and color matching.",
    },
    {
      title: "Key Lockout",
      icon: <KeyRound className="w-10 h-10 text-yellow-500" />,
      description: "Locked out of your car? Our experts will get you back in safely.",
    },
  ];

  return (
    <section className="h-fit bg-black pt-24 pb-20 px-4 md:px-12" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            Our <span className="text-yellow-500">Services</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We provide fast, reliable, and affordable automotive services that keep your life moving.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end mb-4 gap-2">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="bg-yellow-500 text-black p-2 rounded hover:bg-yellow-400 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="bg-yellow-500 text-black p-2 rounded hover:bg-yellow-400 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Keen Slider Carousel */}
        <div ref={sliderRef} className="keen-slider">
          {services.map((service, index) => (
            <div
              key={index}
              className="
    keen-slider__slide 
    border border-white 
    bg-transparent rounded-xl 
    shadow-md p-6 
    flex flex-col justify-between text-center 
    min-h-[300px] 
    hover:shadow-lg 
    transition duration-300
  "
            >
              <div className="flex flex-col items-center gap-3">
                {service.icon}
                <h3 className="text-lg font-bold text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {service.description}
                </p>
              </div>

              <button
                className="
      mt-6 bg-yellow-500 text-white
      px-4 py-2 rounded 
      hover:bg-yellow-400 transition
    "
              >
                Book Now
              </button>
            </div>

          ))}
        </div>
      </div>
    </section>
  );
}




export function HowITWorks() {
  const steps = [
    {
      icon: MapPin,
      title: "Share Location",
      description: "Tell us where you are and we'll find the nearest verified technician to help you.",
      step: "01"
    },
    {
      icon: Settings,
      title: "Select Issue",
      description: "Choose from common roadside issues or describe your specific problem.",
      step: "02"
    },
    {
      icon: Truck,
      title: "Help Arrives",
      description: "A professional technician arrives at your location with the tools needed to help.",
      step: "03"
    },
    {
      icon: CheckCircle,
      title: "Problem Solved",
      description: "Get back on the road quickly with our efficient and reliable roadside assistance.",
      step: "04"
    }
  ];

  // return (
  //   <section id="services" className="py-20 bg-[#121212]">
  //     <div className="container mx-auto px-4">
  //       <div className="text-center mb-16">
  //         <h2 className="text-3xl md:text-4xl font-bold mb-4">
  //           How It <span className="text-yellow-500">Works</span>
  //         </h2>
  //         <p className="text-lg text-gray-300 text-muted-foreground max-w-2xl mx-auto">
  //           Getting help on the road has never been easier. Follow these simple steps to get assistance when you need it most.
  //         </p>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
  //         {steps.map((step, index) => {
  //           const Icon = step.icon;
  //           return (
  //             <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-card border-border/50">
  //               {/* Step number */}
  //               <div className="absolute top-4 right-4 text-6xl font-bold text-yellow-500/10 group-hover:text-yellow-500/20 transition-colors">
  //                 {step.step}
  //               </div>

  //               <CardContent className="p-6">
  //                 <div className="mb-4">
  //                   <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
  //                     <Icon className="h-6 w-6 text-yellow-500" />
  //                   </div>
  //                   <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
  //                 </div>
  //                 <p className="text-muted-foreground text-gray-400 leading-relaxed">
  //                   {step.description}
  //                 </p>
  //               </CardContent>
  //             </Card>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </section>
  // );

 return (
    <section id="services" className="py-20 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-yellow-500">Works</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Getting help on the road has never been easier. Follow these simple
            steps to get assistance when you need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 bg-card border-border/50">
                  {/* Step number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-yellow-500/10 group-hover:text-yellow-500/20 transition-colors">
                    {step.step}
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-yellow-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}