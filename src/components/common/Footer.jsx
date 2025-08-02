import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">Elisoft</h3>
          <p className="text-sm text-gray-400">
            Connecting car owners with trusted mechanics nearby. Fast. Reliable. Hassle-free.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-yellow-500 transition">Home</a></li>
            <li><a href="#about" className="hover:text-yellow-500 transition">About</a></li>
            <li><a href="#services" className="hover:text-yellow-500 transition">Services</a></li>
            <li><a href="#testimonials" className="hover:text-yellow-500 transition">Testimonials</a></li>
            <li><a href="#contact" className="hover:text-yellow-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Connect with Us</h4>
          <div className="flex gap-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow-500 transition">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-yellow-500 transition">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-yellow-500 transition">
              <Instagram size={20} />
            </a>
            <a href="mailto:support@fixitnow.com" className="hover:text-yellow-500 transition">
              <Mail size={20} />
            </a>
          </div>
          <p className="text-sm text-gray-400">Email: support@elisoft.com</p>
          <p className="text-sm text-gray-400">Phone: +234 916 666 4149</p>
          <p className="text-sm text-gray-400">Phone: +234 805 591 9755</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Elisoft. All rights reserved.
      </div>
    </footer>
  );
}
