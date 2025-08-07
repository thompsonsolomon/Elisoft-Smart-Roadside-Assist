import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
const {  user,isAuthenticated, loading } = useAuth()
console.log(user);

  return (
    <header className="bg-black shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-yellow-500">Elisoft</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-white font-medium">
          <a href="#home" className="hover:text-yellow-500 transition">Home</a>
          <a href="#about" className="hover:text-yellow-500 transition">About</a>
          <a href="#services" className="hover:text-yellow-500 transition">Services</a>
          <a href="#testimonials" className="hover:text-yellow-500 transition">Testimonials</a>
          <a href="#contact" className="hover:text-yellow-500 transition">Contact</a>
          {/* Conditional Links based on Authentication */}
          {
            isAuthenticated ? (
              <Link to={`/${user?.role}`} className="btn btn-primary">Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">Login</Link>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
              </>
            )
          }
        </nav>

        {/* Hamburger Icon */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black shadow-md">
          <ul className="flex flex-col gap-4 px-6 py-4 text-white font-medium">
            <li><a href="#home" onClick={toggleMenu}>Home</a></li>
            <li><a href="#about" onClick={toggleMenu}>About</a></li>
            <li><a href="#services" onClick={toggleMenu}>Services</a></li>
            <li><a href="#testimonials" onClick={toggleMenu}>Testimonials</a></li>
            <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
            <Link to="/login" className="btn btn-ghost" onClick={toggleMenu}>Login</Link>
            <Link to="/register" className="btn btn-primary" onClick={toggleMenu}>Get Started</Link>
          </ul>
        </div>
      )}
    </header>
  );
}
