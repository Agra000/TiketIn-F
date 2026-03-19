import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, Star, Ticket, Calendar, User } from "lucide-react";

// --- KOMPONEN DASAR SKELETON ---
const SkeletonBase = ({ className }) => (
  <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
  </div>
);

// Skeleton yang lebih ramping
const FilmCardSkeleton = () => (
  <div className="w-[220px] flex-shrink-0">
    <SkeletonBase className="aspect-[2/3] rounded-3xl mb-4" />
    <div className="px-2 flex flex-col items-center gap-2">
      <SkeletonBase className="h-3 w-24 rounded-full" />
      <SkeletonBase className="h-4 w-40 rounded-full" />
    </div>
  </div>
);

// --- KOMPONEN FILM CARD (VERSI RAMPING) ---
const FilmCard = ({ title, img, onClick }) => (
  <div onClick={onClick} className="w-[220px] flex-shrink-0 group cursor-pointer transition-all duration-500 hover:translate-y-[-8px]">
    <div className="relative aspect-[2/3] rounded-3xl overflow-hidden mb-4 shadow-xl shadow-gray-200/70 border border-gray-100 group-hover:shadow-green-900/20 transition-all">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
        <button className="flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-green-600 transition-all transform translate-y-4 group-hover:translate-y-0">
          <Ticket size={14} /> Buy Ticket
        </button>
      </div>
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
        <Star size={10} className="text-yellow-500 fill-yellow-500" />
        <span className="text-[10px] font-black text-gray-800 tracking-tighter">9.0</span>
      </div>
    </div>
    <div className="px-2 text-center">
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-green-700 transition-colors">Action • Sci-Fi</p>
      <h3 className="font-bold text-gray-900 text-base uppercase tracking-tight italic leading-tight line-clamp-1 group-hover:text-green-800 transition-colors">{title}</h3>
    </div>
  </div>
);

export default function MovieCatalog() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const scrollRefNow = useRef(null);
  const scrollRefSoon = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const nowShowing = [
    { title: "Fight Club", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2r4BnP3A_zNSaWjvlZmrBhmMnk2QVb7t_uYpkgNVk6_2Eib926FLwN7sMA7zRQbBkPzkEjnwj9Kq_HLCOXVKCN3CrN1v9&s&ec=121585077" },
    { title: "The Batman", img: "https://m.media-amazon.com/images/S/pv-target-images/3de84cca07fc963b66a01a5465c2638066119711e89c707ce952555783dd4b4f.jpg" },
    { title: "The Oddyssey", img: "https://m.media-amazon.com/images/M/MV5BN2MyYjk2MWMtODMyZS00MDUyLWE0OGQtOTQ3MGY0MDE0ZjVmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { title: "Inception", img: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg" },
    { title: "Interstellar", img: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" },
    { title: "Interstellar", img: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" },
    { title: "Interstellar", img: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg" },
  ];

  const comingSoon = [
    { title: "Joker: Folie à Deux", release: "Oct 04", img: "https://m.media-amazon.com/images/M/MV5BMzU4MTYxMzk3M15BMl5BanBnXkFtZTgwMDUyNTY4NjM@._V1_.jpg" },
    { title: "Gladiator II", release: "Nov 22", img: "https://m.media-amazon.com/images/M/MV5BMXNkN2Y4N2ItM2Y4Mi00M2I0LWIxY2ItZWRkZjBlY2VjMDkxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { title: "Nosferatu", release: "Dec 25", img: "https://m.media-amazon.com/images/M/MV5BMzE0NzgyMjgzM15BMl5BanBnXkFtZTgwMTYxNDYxMTE@._V1_.jpg" },
  ];

  const handleScroll = (ref, dir) => {
    ref.current.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 overflow-hidden mt-16">

      {/* HEADER & SEARCH */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-6 italic uppercase">
          Now <span className="text-green-800">Showing</span>
        </h2>
        <div className="relative max-w-lg mx-auto group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-800 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search movies..." 
            className="w-full pl-14 pr-6 py-3.5 bg-white border border-gray-100 rounded-full shadow-lg shadow-gray-200/50 focus:outline-none focus:ring-2 focus:ring-green-800/5 focus:border-green-800 transition-all text-sm" 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>

      {/* NOW SHOWING SECTION (UKURAN LEBIH KECIL) */}
      <div className="relative max-w-[1400px] mx-auto mb-20 px-12 group">
        {!isLoading && (
            <>
                <button onClick={() => handleScroll(scrollRefNow, "left")} className="absolute left-2 top-[40%] z-20 text-green-400 hover:text-green-800 transition-all opacity-0 group-hover:opacity-100">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={() => handleScroll(scrollRefNow, "right")} className="absolute right-2 top-[40%] z-20 text-green-400 hover:text-green-800 transition-all opacity-0 group-hover:opacity-100">
                    <ChevronRight size={24} />
                </button>
            </>
        )}

        <div ref={scrollRefNow} className="flex py-2 gap-6 overflow-x-hidden scroll-smooth pb-8 px-4">
          {isLoading ? (
            [...Array(6)].map((_, i) => <FilmCardSkeleton key={i} />)
          ) : (
            nowShowing
              .filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((m, i) => (
                <FilmCard key={i} img={m.img} title={m.title} onClick={() => navigate("/cinema", { state: { movieTitle: m.title } })} />
              ))
          )}
        </div>
      </div>

      {/* COMING SOON SECTION (STAY CONSISTENT) */}
      <div className="bg-gray-50/50 py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <h2 className="text-3xl font-black text-gray-900 italic uppercase">Coming <span className="text-gray-400">Soon</span></h2>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-12">
          <div ref={scrollRefSoon} className="flex gap-6 overflow-x-hidden scroll-smooth px-4">
            {isLoading ? (
              [...Array(6)].map((_, i) => <div key={i} className="w-[220px] flex-shrink-0"><SkeletonBase className="aspect-[2/3] rounded-3xl" /></div>)
            ) : (
              comingSoon.map((m, i) => (
                <div key={i} className="w-[220px] flex-shrink-0 group cursor-pointer text-center">
                  <div className="relative aspect-[2/3] rounded-3xl overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-700 shadow-md">
                    <img src={m.img} alt={m.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1.5">
                        <Calendar size={10} className="text-green-800" />
                        <span className="text-[9px] font-black text-gray-800 uppercase">{m.release}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm uppercase italic tracking-tight group-hover:text-green-800 transition-colors">{m.title}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}