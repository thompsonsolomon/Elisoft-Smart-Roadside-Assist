import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="pt-24 pb-16 px-4 md:px-12 bg-gray-900/50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            Contact <span className="text-yellow-500">Us</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a question or need help? Reach out to us and we'll respond quickly.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6 text-gray-400">
            <div className="flex items-start gap-4">
              <MapPin className="text-yellow-500" />
              <div>
                <h4 className="font-semibold text-lg">Our Office</h4>
                <p>123 Mechanic Street, Lagos, Nigeria</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-yellow-500" />
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p>+234 800 000 0000</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-yellow-500" />
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p>support@fixitnow.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full border text-black border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border text-black border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message..."
                className="w-full border text-black border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
