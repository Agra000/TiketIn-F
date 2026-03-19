import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface LocationState {
  cinema: string;
}

export default function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const cinemaName = state?.cinema || "Cinema";

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const seats = [
    "F1","F2","F3","F4","F5","F6",
    "E1","E2","E3","E4","E5","E6",
    "D1","D2","D3","D4","D5","D6",
    "C1","C2","C3","C4","C5","C6",
    "B1","B2","B3","B4","B5","B6",
    "A1","A2","A3","A4","A5","A6",
  ];

  const pricePerSeat = 50000;
  const totalPrice = selectedSeats.length * pricePerSeat;

  const toggleSeat = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10 relative">

      {/* BACK BUTTON */}
      <button
        className="absolute top-5 left-5 bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg font-semibold"
        onClick={() => navigate("/")}
      >
        Back
      </button>

      <h2 className="text-3xl font-bold mb-6">{cinemaName}</h2>

      {/* SCREEN */}
      <div className="w-full max-w-3xl bg-gray-800 text-white py-3 text-center rounded-lg mb-12">
        LAYAR
      </div>

      {/* SEAT GRID */}
      <div className="grid grid-cols-6 gap-4 w-full max-w-3xl px-4 mb-6">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            className={`py-3 rounded-lg font-semibold border 
              ${selectedSeats.includes(seat)
                ? "bg-blue-600 text-white"
                : "bg-white text-black"}`}
          >
            {seat}
          </button>
        ))}
      </div>

      {/* TOTAL HARGA */}
      {selectedSeats.length > 0 && (
        <div className="mb-4 text-lg font-semibold">
          Total Harga: Rp {totalPrice.toLocaleString()}
        </div>
      )}

      {/* LANJUT PEMBAYARAN */}
      <button
        className="mt-2 bg-blue-700 text-white py-3 px-7 rounded-xl text-lg font-semibold"
        onClick={() =>
          navigate("/payment", { state: { seats: selectedSeats, cinema: cinemaName, totalPrice } })
        }
        disabled={selectedSeats.length === 0}
      >
        Lanjut ke Pembayaran
      </button>
    </div>
  );
}