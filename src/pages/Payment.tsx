import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  seats: string[];
  cinema: string;
  totalPrice: number;
}

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const selectedSeats = state?.seats || [];
  const cinemaName = state?.cinema || "Cinema";
  const totalPrice = state?.totalPrice || 0;

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold mb-6">Pembayaran</h2>

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Struk Pemesanan</h3>
        
        <div className="mb-2">
          <span className="font-semibold">Cinema:</span> {cinemaName}
        </div>

        <div className="mb-2">
          <span className="font-semibold">Kursi Dipilih:</span>
          <p>{selectedSeats.join(", ") || "Belum ada kursi dipilih"}</p>
        </div>

        <div className="mt-4 border-t pt-3 text-lg font-bold">
          Total: Rp {totalPrice.toLocaleString()}
        </div>
      </div>

      <button
        className="bg-green-600 text-white py-3 px-7 rounded-xl text-lg font-semibold mb-4"
        onClick={() => alert("Pembayaran Berhasil!")}
        disabled={selectedSeats.length === 0}
      >
        Bayar Sekarang
      </button>

      <button
        className="bg-gray-500 text-white py-2 px-5 rounded-lg"
        onClick={() => navigate(-1)}
      >
        Kembali
      </button>
    </div>
  );
}