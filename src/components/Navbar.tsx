import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Ticket, User, Menu } from "lucide-react"; // Pastikan sudah install lucide-react

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Efek transparan berubah jadi solid saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-4 flex justify-between items-center ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-xl shadow-gray-200/40 py-3" 
          : "bg-transparent py-3"
      }`}
    >
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-green-800 p-1.5 rounded-lg rotate-3 group-hover:rotate-0 transition-transform">
          <Ticket className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tighter italic">
          TIKET<span className="text-green-800">IN</span>
        </h1>
      </Link>

      {/* MENU NAVIGASI (Desktop) */}
      <ul className="hidden md:flex items-center gap-8">
        {["Home", "Now Showing", "Tickets"].map((item) => {
          const path = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
          const isActive = location.pathname === path;

          return (
            <li key={item}>
              <Link 
                to={path}
                className={`relative text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${
                  isActive ? "text-green-800" : "text-gray-400 hover:text-gray-900"
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-green-800 rounded-full animate-in slide-in-from-left-2" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Icon */}
        <button className="md:hidden p-2 text-gray-600">
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-900">Anto Rahardian</p>
            <p className="text-[10px] text-gray-400 font-medium">Anto1945@gmail.com</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-green-800/20 p-0.5 group-hover:border-green-800 transition-colors">
            <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                {/* Ganti src dengan foto Anda jika ada */}
                <img 
                    src="https://pbs.twimg.com/media/Gxa8hkeW8AA0UU3.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}