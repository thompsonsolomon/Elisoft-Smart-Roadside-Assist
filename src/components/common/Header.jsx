import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, PersonStanding, PersonStandingIcon, User, UserCheck, UserPlus, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const { user, isAuthenticated } = useAuth()
  return (
    <header className="bg-black shadow-md fixed w-full z-50  ">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center ">
        {/* Logo */}
        <div className="text-2xl font-bold text-yellow-500">Elisoft Assist</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-white font-medium">
          <a href="#home" className="hover:text-yellow-500 transition">Home</a>
          <a href="#howitworks" className="hover:text-yellow-500 transition">How It Works</a>
          <a href="#whyus" className="hover:text-yellow-500 transition">Why Us</a>
          <a href="#about" className="hover:text-yellow-500 transition">About Us</a>
          <a href="#contact" className="hover:text-yellow-500 transition">Contact Us</a>
          {/* Conditional Links based on Authentication */}
          {
            isAuthenticated ? (
              <Link to={`/${user?.role}`} className="btn btn-primary">
                <User className="inline mr-2" />
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">      <UserPlus className="inline mr-2" /> </Link>

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
            <li><a href="#howitworks" onClick={toggleMenu}>How It Works</a></li>
            <li><a href="#whyus" onClick={toggleMenu}>Why Us</a></li>
            <li><a href="#about" onClick={toggleMenu}>About</a></li>
            <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>

            {/* Conditional Links based on Authentication */}
            {
              isAuthenticated ? (
                <Link to={`/${user?.role}`} className="btn btn-primary">    <User className="inline mr-2" /></Link>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost flex justify-start" onClick={toggleMenu}><UserPlus className="inline mr-2" /></Link>
                </>
              )
            }


          </ul>
        </div>
      )}
    </header>
  );
}
