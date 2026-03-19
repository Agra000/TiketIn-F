import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, Clock, ChevronLeft } from "lucide-react"; // Pastikan lucide-react terinstall

export default function Cinema() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- DATA FILM (Ambil dari State atau Fallback) ---
  // Pastikan data ini dikirim dari halaman catalog saat navigate, misal:
  // navigate("/cinema", { state: { movieTitle: "Fight Club", movieImage: "...", movieRating: "9.0", ... } });
  const movie = {
    title: location.state?.movieTitle || "FIGHT CLUB",
    image: location.state?.movieImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2r4BnP3A_zNSaWjvlZmrBhmMnk2QVb7t_uYpkgNVk6_2Eib926FLwN7sMA7zRQbBkPzkEjnwj9Kq_HLCOXVKCN3CrN1v9&s&ec=121585077", // Poster Fight Club
    rating: location.state?.movieRating || "9.0",
    duration: location.state?.movieDuration || "139 min",
    genre: location.state?.movieGenre || "Drama, Cult",
    synopsis: location.state?.movieSynopsis || "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.",
  };

  const [selectedDate, setSelectedDate] = useState("19 Mar");
  
  // State untuk menyimpan pilihan cinema, waktu, dan harga
  const [bookingDetail, setBookingDetail] = useState(null);

  const dates = [
    { date: "19 Mar", day: "TODAY", fullDate: "Thursday, 19 March 2026" },
    { date: "20 Mar", day: "FRI", fullDate: "Friday, 20 March 2026" },
    { date: "21 Mar", day: "SAT", fullDate: "Saturday, 21 March 2026" },
    { date: "22 Mar", day: "SUN", fullDate: "Sunday, 22 March 2026" },
    { date: "23 Mar", day: "MON", fullDate: "Monday, 23 March 2026" },
  ];

  const scheduleData = [
    {
      name: "AGORA MALL XXI",
      studio: "Studio 1",
      type: "2D",
      price: 150000,
      times: [
        { time: "12:30", available: false },
        { time: "14:25", available: true },
        { time: "16:20", available: true },
      ],
    },
    {
      name: "BAYWALK PLUIT XXI",
      studio: "Studio 3",
      type: "2D",
      price: 100000,
      times: [
        { time: "14:40", available: true },
        { time: "18:35", available: true },
      ],
    },
    {
      name: "MALL OF INDONESIA XXI",
      studio: "Studio 5",
      type: "2D",
      price: 60000,
      times: [
        { time: "16:40", available: true },
        { time: "20:35", available: true },
      ],
    },
  ];

  // Fungsi saat jam diklik
  const handleTimeClick = (cinema, slot) => {
    // Mencari full date berdasarkan selectedDate
    const dateObj = dates.find(d => d.date === selectedDate);
    
    setBookingDetail({
      cinema: cinema.name,
      studio: cinema.studio, // Ambil studio dari cinema
      time: slot.time,
      price: cinema.price,
      date: dateObj?.fullDate // Monday, 12 March 2026, ...
    });
  };

  // Fungsi saat tombol "Buy Ticket" diklik
  const handleConfirmBooking = () => {
    if (bookingDetail) {
      // Kirim data lengkap ke halaman Seat
      navigate("/seat", { 
        state: { 
          ...bookingDetail,
          movieTitle: movie.title 
        } 
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center font-sans pb-32">
      
      {/* --- MOVIE INFO SECTION (TAMBAHAN BARU) --- */}
      <div className="w-full max-w-2xl px-6 pt-10 pb-6 bg-gray-50/50 border-b border-gray-100 mb-6">
        <button onClick={() => navigate(-1)} className="mb-8 p-2 bg-white rounded-xl shadow-sm border border-gray-100 active:scale-90 transition-transform">
          <ChevronLeft size={20} className="text-gray-800" />
        </button>

        <div className="flex gap-6 items-start">
          {/* Movie Poster */}
          <div className="w-28 h-40 shrink-0 rounded-2xl overflow-hidden shadow-lg shadow-gray-200/70 border border-gray-100 bg-gray-100">
            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
          </div>

          {/* Movie Details */}
          <div className="flex flex-col gap-2 flex-1">
            <h1 className="text-2xl font-black text-gray-900 uppercase leading-tight italic tracking-tight">
              {movie.title}
            </h1>
            
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-black text-gray-800">{movie.rating}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Clock size={14} />
                <span className="text-sm font-bold">{movie.duration}</span>
              </div>
            </div>

            <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mt-1">
              {movie.genre}
            </p>

            <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mt-1 font-medium italic">
              "{movie.synopsis}"
            </p>
          </div>
        </div>
      </div>

      {/* --- DATE SELECTOR (DESAIN LAMA) --- */}
      <div className="w-full max-w-2xl px-6">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {dates.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDate(item.date)}
              className={`flex flex-col items-center justify-center min-w-[75px] py-3 rounded-2xl border transition-all ${
                selectedDate === item.date
                  ? "bg-green-800 border-green-800 text-white shadow-lg shadow-green-900/20"
                  : "bg-white border-gray-200 text-gray-400"
              }`}
            >
              <span className="text-md font-bold">{item.date}</span>
              <span className="text-[10px] font-bold uppercase">{item.day}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full bg-[#F3F4F6] h-2 mt-6"></div>

      {/* --- CINEMA LIST (DESAIN LAMA) --- */}
      <div className="w-full max-w-2xl flex flex-col mb-10">
        {scheduleData.map((cinema, idx) => (
          <div key={idx} className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 tracking-wide uppercase mb-4">
              {cinema.name}
            </h2>

            <div className="flex justify-between items-center mb-4 text-sm font-bold">
              <span className="text-gray-400 bg-gray-50 px-2 py-1 rounded">{cinema.type}</span>
              <span className="text-green-800 ">Rp {cinema.price.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {cinema.times.map((slot, sIdx) => {
                const isSelected = bookingDetail?.time === slot.time && bookingDetail?.cinema === cinema.name;
                
                return (
                  <button
                    key={sIdx}
                    disabled={!slot.available}
                    onClick={() => handleTimeClick(cinema, slot)} // Kirim objek cinema dan slot
                    className={`px-6 py-3 rounded-xl border text-sm font-bold transition-all active:scale-95 ${
                      isSelected
                        ? "bg-green-800 border-green-800 text-white shadow-md"
                        : slot.available
                          ? "border-gray-200 text-gray-800 hover:border-green-600 bg-white"
                          : "bg-gray-100 border-transparent text-gray-300 cursor-not-allowed opacity-60"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* --- STICKY BOTTOM BUTTON (DESAIN LAMA) --- */}
      <div className="fixed bottom-0 w-full max-w-2xl bg-white p-5 border-t border-gray-100 flex flex-col gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50">
        {bookingDetail && (
           <div className="flex justify-between items-center px-1 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Selected Schedule</p>
                <p className="text-sm font-black text-green-800 uppercase italic mt-1 leading-none">{bookingDetail.cinema}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Time & Studio</p>
                <p className="text-sm font-black text-green-800 uppercase mt-1 leading-none">{bookingDetail.time} • {bookingDetail.studio}</p>
              </div>
           </div>
        )}
        
        <button 
          onClick={handleConfirmBooking}
          disabled={!bookingDetail}
          className={`w-full py-4 font-black text-lg tracking-[0.2em] uppercase rounded-2xl transition-all flex items-center justify-center gap-3 ${
            bookingDetail 
              ? "bg-green-800 text-white shadow-xl shadow-green-900/20 active:scale-[0.98]" 
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          {bookingDetail ? "Buy Ticket" : "Select a time"}
        </button>
      </div>
    </div>
  );
}