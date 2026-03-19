import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Loader2 } from "lucide-react";

interface LocationState {
  cinema: string;
  movieTitle: string;
  time: string;
  price: number;
}

export default function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const cinemaName = state?.cinema || "Cinema TIKETIN";
  const movieTitle = state?.movieTitle || "Movie Title";
  const sessionTime = state?.time || "00:00";
  const pricePerSeat = state?.price || 50000;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const bookedSeats = ["D3", "D10", "B2", "A5", "A12", "F7"];
  const rows = ["G", "F", "E", "D", "C", "B", "A"];
  
  const leftCols = [1, 2, 3, 4, 5, 6, 7, 8];
  const rightCols = [9, 10, 11, 12, 13, 14, 15, 16];

  const totalPrice = selectedSeats.length * pricePerSeat;

  const toggleSeat = (seat: string) => {
    if (bookedSeats.includes(seat) || isLoading) return;
    
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/payment", { 
        state: { ...state, selectedSeats, totalPrice } 
      });
    }, 800); 
  };

  // Komponen Helper untuk merender kursi agar kode lebih bersih
  const RenderSeat = (seatId: string) => {
    const isBooked = bookedSeats.includes(seatId);
    const isSelected = selectedSeats.includes(seatId);

    return (
      <button
        key={seatId}
        disabled={isBooked || isLoading}
        onClick={() => toggleSeat(seatId)}
        className={`
          relative py-2.5 rounded-lg font-bold text-[10px] transition-all duration-300 flex items-center justify-center
          ${isBooked 
            ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
            : isSelected 
              ? "bg-green-800 text-white shadow-lg shadow-green-900/30 scale-105 z-10" 
              : "bg-white text-gray-600 border border-gray-200 hover:border-green-600 hover:text-green-700"}
          ${isLoading ? "opacity-50" : ""}
        `}
      >
        {seatId}
      </button>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-8 px-4 font-sans">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate(-1)} 
          disabled={isLoading}
          className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-all active:scale-90 border border-gray-100 disabled:opacity-50"
        >
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <div className="text-center flex-1 pr-10">
          <h1 className="text-xs font-black text-gray-400 uppercase tracking-widest">{cinemaName}</h1>
          <h2 className="text-base font-bold text-gray-800 uppercase italic leading-none mt-1">{movieTitle}</h2>
          <p className="text-[9px] font-bold text-green-700 mt-1 uppercase tracking-tighter px-2 py-0.5 bg-green-50 rounded-full inline-block">
            {state?.date || "Today"} • {sessionTime}
          </p>
        </div>
      </div>

      {/* SCREEN VISUAL */}
      <div className="w-full max-w-xl mb-16 flex flex-col items-center">
        <div className="w-full h-1.5 bg-green-800 rounded-full shadow-[0_15px_40px_-2px_rgba(21,128,61,0.4)]"></div>
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mt-4">Cinema Screen</p>
      </div>

      {/* SEAT GRID DENGAN LORONG TENGAH */}
      <div className="flex flex-col gap-3 w-full max-w-2xl mb-12">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-center gap-8"> {/* gap-8 adalah lorong tengah */}
            
            {/* SISI KIRI (6 Kursi) */}
            <div className="grid grid-cols-8 gap-2 flex-1">
              {leftCols.map((col) => RenderSeat(`${row}${col}`))}
            </div>

            {/* SISI KANAN (6 Kursi) */}
            <div className="grid grid-cols-8 gap-2 flex-1">
              {rightCols.map((col) => RenderSeat(`${row}${col}`))}
            </div>

          </div>
        ))}
      </div>

      {/* LEGEND */}
      <div className="flex gap-6 mb-28 text-[9px] font-black uppercase text-gray-400 tracking-widest">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-white border border-gray-200 rounded-sm"></div> Available
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-green-800 rounded-sm shadow-md"></div> Selected
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-gray-100 rounded-sm"></div> Booked
        </div>
      </div>

      {/* STICKY ACTION BAR */}
      <div className="fixed bottom-0 w-full max-w-2xl p-5  flex flex-col gap-4">
        <div className="flex justify-between items-end px-1">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selected Seats</p>
            <p className="text-sm font-bold text-gray-800 uppercase">
              {selectedSeats.length > 0 ? selectedSeats.sort().join(", ") : "-"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Price</p>
            <p className="text-xl font-black text-green-800">
              Rp {totalPrice.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
        
        <button 
          disabled={selectedSeats.length === 0 || isLoading}
          onClick={handleCheckout}
          className={`w-full py-4 font-black text-base tracking-[0.2em] uppercase rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
            selectedSeats.length > 0 && !isLoading
              ? "bg-green-800 text-white shadow-2xl shadow-green-900/30" 
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Processing...</span>
            </>
          ) : (
            selectedSeats.length > 0 ? `Checkout (${selectedSeats.length})` : "Select Seats"
          )}
        </button>
      </div>
    </div>
  );
}