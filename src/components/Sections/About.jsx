import { Car, Users, MapPin } from "lucide-react";
import { Card, CardContent } from "../../utils/Card";
import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "../../utils/animations";
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
          {/* Heading */}
          <div className="text-center mb-12">
            <h2   className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-yellow-500">Elisoft Assist</span>
            </h2>
            <motion.div
              className="w-24 h-1 bg-yellow-500 mx-auto mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInLeft}
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Founded in 2020, Elisoft Assist has revolutionized roadside assistance by connecting drivers with verified professionals through our innovative platform. We understand that being stranded on the road can be stressful, which is why we've made it our mission to provide fast, reliable, and affordable help when you need it most.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Our network of certified technicians spans across all cities, ensuring that help is always just minutes away. We're committed to transparency, safety, and exceptional customer service in everything we do.
              </p>

              {/* Mission Statement */}
              <motion.div
                className="bg-yellow-500/5 border-l-4 border-yellow-500 p-6 rounded-r-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={slideInLeft}
              >
                <p className="text-foreground text-sm font-medium italic">
                  "Our mission is simple: to be there for drivers when they need us most, providing reliable roadside assistance that gets them back on the road safely and quickly."
                </p>
              </motion.div>
            </motion.div>

            {/* Right side stats */}
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={slideInRight} // animate from right side
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    variants={slideInRight}
                    className="bg-background border-border/50 rounded-lg overflow-hidden"
                  >
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
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
