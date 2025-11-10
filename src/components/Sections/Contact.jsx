import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "../../utils/Card";
import { motion } from "framer-motion";
import { slideInLeft, slideInRight, staggerContainer } from "../../utils/animations";
export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["02013303398", "08055006766", "09166664149"],
      description: "24/7 Emergency Hotline"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["help@elisoftassist.com", "support@elisoftassist.com"],
      description: "We'll respond within 2 hours"
    },
    {
      icon: MapPin,
      title: "Find Us",
      details: ["29 Issac John St. Off Oyebajo, Fadeyi Stop Lagos", "Elisoft Plaza 13 power line Road, Ijoka , Akure Ondo State "],
      description: "Headquarters & Training Center"
    }
  ];
  return (
    <section className="pt-24 pb-16 px-4 md:px-12 bg-[#121212] min-h-screen" id="contact">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={slideInLeft}
          >
            Contact <span className="text-yellow-500">Us</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 mt-4 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={slideInLeft}
          >
            Have a question or need help? Reach out to us and we'll respond quickly.
          </motion.p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={slideInLeft}
                    >
                      <Card className="bg-card border-border/50">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon className="h-6 w-6 text-yellow-500" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-2">{info.title}</h4>
                              {info.details.map((detail, idx) => (
                                <p key={idx} className="text-foreground text-sm mb-1">{detail}</p>
                              ))}
                              <p className="text-sm text-muted-foreground">{info.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="bg-transparent border border-white rounded-lg shadow-md p-8 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={slideInRight} // animate form in from right
          >
            <div>
              <label htmlFor="name" className="block text-yellow-500 font-medium mb-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-700 bg-transparent rounded-md px-4 py-3 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-yellow-500 font-medium mb-1">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-700 bg-transparent rounded-md px-4 py-3 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-yellow-500 font-medium mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-700 bg-transparent rounded-md px-4 py-3 text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md transition"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}