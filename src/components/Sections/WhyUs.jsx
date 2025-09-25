import { Clock, Shield, DollarSign, Users, Award, Headphones } from "lucide-react";
import { Card, CardContent } from "../../utils/Card";
import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/animations";

export function WhyUs() {
  const features = [
    { icon: Clock, title: "Fast Response", description: "Average response time of 15-30 minutes. We get to you quickly when every minute matters." },
    { icon: Shield, title: "Safe & Verified", description: "All technicians are licensed, insured, and background-checked for your safety and peace of mind." },
    { icon: DollarSign, title: "Transparent Pricing", description: "No hidden fees or surprise charges. You'll know the exact cost before any work begins." },
    { icon: Users, title: "Trusted by Thousands", description: "Over 50,000 satisfied customers trust DrRoads for their roadside assistance needs." },
    { icon: Award, title: "Quality Guaranteed", description: "100% satisfaction guarantee on all services. If you're not happy, we'll make it right." },
    { icon: Headphones, title: "24/7 Support", description: "Round-the-clock customer support available every day of the year, whenever you need us." }
  ];

  return (
    <section id="whyus" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-yellow-500">Elisoft?</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We're not just another roadside assistance company. Here's what makes us different and why thousands of drivers trust us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                 key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="group hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300 bg-card border-border/50">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
                        <Icon className="h-7 w-7 text-yellow-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
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
