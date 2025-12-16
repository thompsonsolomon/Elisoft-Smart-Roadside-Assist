import { Link } from "react-router-dom";
import { User, CreditCard, MapPin, Home } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function ResponsiveHeader() {
    const { user, isAuthenticated } = useAuth()
    const path = window.location.pathname
    console.log(path);
    
    return (
        // fixed bottom bar only on small screens
        <header className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-gray-800 md:hidden z-50">
            <nav className="flex justify-around items-center py-2">
                <Link
                    to={`/${user?.role}`}
                    className={`flex flex-col items-center text-${path == "/Mechanic" ? "yellow" : "gray"}-400 hover:text-yellow-500 transition`}
                >
                    <Home className="w-6 h-6" />
                    <span className="text-xs mt-1">Home</span>
                </Link>

                <Link
                    to="/payment"
                    className={`flex flex-col items-center text-${path == "/payment" ? "yellow" : "gray"}-400 hover:text-yellow-500 transition`}
                >
                    <CreditCard className="w-6 h-6" />
                    <span className="text-xs mt-1">Payment</span>
                </Link>

                <Link
                    to="/map"
                    className={`flex flex-col items-center text-${path == "/map" ? "yellow" : "gray"}-400 hover:text-yellow-500 transition`}
                >
                    <MapPin className="w-6 h-6" />
                    <span className="text-xs mt-1">Map</span >
                </Link>

                <Link
                    to="/profile"
                    className={`flex flex-col items-center text-${path == "/profile" ? "yellow" : "gray"}-400 hover:text-yellow-500 transition`}
                >
                    <User className="w-6 h-6" />
                    <span className="text-xs mt-1">Profile</span>
                </Link>
            </nav>
        </header>
    );
}

export default ResponsiveHeader;
