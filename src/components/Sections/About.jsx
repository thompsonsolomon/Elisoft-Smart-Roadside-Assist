//  import teamImg  from "../../Asset/about.png"

// export default function AboutPage() {
//   return (
//     <section className="pt-24 pb-16 px-4 md:px-12 bg-gray-900/50 min-h-screen" id="about">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-white">
//             About <span className="text-yellow-500">Elisoft Assist</span>
//           </h2>
//           <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
//             We connect car owners with skilled and trusted mechanics near them, ensuring fast, affordable, and reliable service anytime, anywhere.
//           </p>
//         </div>

//         {/* Two Column Section */}
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           {/* Text Content */}
//           <div>
//             <h3 className="text-2xl font-semibold mb-4 text-white">Our Mission</h3>
//             <p className="text-gray-400 mb-6">
//               Our goal is to revolutionize vehicle repair and maintenance by bridging the gap between drivers and verified mechanics. Whether you're stranded or just need regular maintenance, Elisoft Assist ensures help is just a click away.
//             </p>

//             <h3 className="text-2xl font-semibold mb-4 text-white">Why Choose Us?</h3>
//             <ul className="list-disc list-inside text-gray-400 space-y-2">
//               <li>Verified and skilled mechanics</li>
//               <li>Real-time location-based assistance</li>
//               <li>Secure and fast payments</li>
//               <li>Friendly customer support</li>
//             </ul>
//           </div>

//           {/* Image */}
//           <div className="rounded-xl overflow-hidden shadow-xl">
//             <img src={teamImg} alt="Our Team" className="w-full h-auto object-cover" />
//           </div>
//         </div>

//         {/* Footer CTA */}
//         {/* <div className="mt-16 text-center">
//           <h3 className="text-2xl font-bold mb-4 text-white">
//             Ready to experience stress-free car service?
//           </h3>
//           <a
//             href="/register"
//             className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 rounded-lg transition"
//           >
//             Join Elisoft Assist Today
//           </a>
//         </div> */}
//       </div>
//     </section>
//   );
// }


import { Car, Users, MapPin } from "lucide-react";
import { Card, CardContent } from "../../utils/Card";

export default function AboutPage() {
  const stats = [
    { icon: Users, number: "50K+", label: "Happy Customers" },
    { icon: Car, number: "200K+", label: "Services Completed" },
    { icon: MapPin, number: "500+", label: "Cities Covered" }
  ];

  return (
    <section id="about" className="py-20 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-yellow-500">Elisoft Assist</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side text */}
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Founded in 2020,Elisoft Assist has revolutionized roadside assistance by connecting drivers with verified professionals through our innovative platform. We understand that being stranded on the road can be stressful, which is why we've made it our mission to provide fast, reliable, and affordable help when you need it most.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Our network of certified technicians spans across all cities, ensuring that help is always just minutes away. We're committed to transparency, safety, and exceptional customer service in everything we do.
              </p>
              
              {/* Mission Statement */}
              <div className="bg-yellow-500/5 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <p className="text-foreground text-sm font-medium italic">
                  "Our mission is simple: to be there for drivers when they need us most, providing reliable roadside assistance that gets them back on the road safely and quickly."
                </p>
              </div>
            </div>

            {/* Right side stats */}
            <div className="space-y-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="bg-background border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-500">{stat.number}</div>
                          <div className="text-muted-foreground">{stat.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
