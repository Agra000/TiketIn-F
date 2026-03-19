import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  ChevronLeft, 
  Ticket, 
  MapPin, 
  Armchair, 
  Loader2, 
  CheckCircle, 
  Lock, 
  Wallet, 
  Landmark, 
  Copy, 
  Monitor, 
  Clock 
} from "lucide-react";

interface LocationState {
  selectedSeats: string[];
  cinema: string;
  totalPrice: number;
  movieTitle?: string;
  studio?: string;
  time?: string;
  date?: string;
}

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Data dari state (dengan fallback)
  const seats = state?.selectedSeats || [];
  const cinemaName = state?.cinema || "Cinema TIKETIN";
  const totalPrice = state?.totalPrice || 0;
  const movieTitle = state?.movieTitle || "Movie Title";
  const studioName = state?.studio || "Studio 1";
  
  // Format Gabungan: Monday, 12 March 2026, 14:25
  const fullSchedule = `${state?.date || "Monday, 19 March 2026"}, ${state?.time || "00:00"}`;

  const bookingCode = "TIK8291X";

  const paymentOptions = [
    { id: "gopay", name: "GoPay", icon: <Wallet className="text-blue-500" /> },
    { id: "dana", name: "DANA", icon: <Wallet className="text-blue-400" /> },
    { id: "bca", name: "BCA VA", icon: <Landmark className="text-blue-900" /> },
  ];

  const handlePayment = () => {
    if (!paymentMethod) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] flex flex-col items-center py-10 px-6 relative overflow-y-auto font-sans">
      
      {!isPaid && (
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-6 p-3 bg-white rounded-xl shadow-sm z-20 active:scale-90 transition-transform border border-gray-50"
        >
          <ChevronLeft size={20} className="text-gray-800" />
        </button>
      )}

      <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6 text-center">
        {isPaid ? "Your Digital Ticket" : "Checkout Details"}
      </h2>

      {/* --- TICKET CARD --- */}
      <div className="w-full max-w-sm mb-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-t-[2.5rem] p-8 shadow-sm border-x border-t border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div className={`p-3 rounded-xl rotate-3 shadow-lg transition-all duration-500 ${isPaid ? "bg-green-600" : "bg-green-800"}`}>
              <Ticket className="text-white" size={20} />
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Order ID</p>
              <p className="text-xs font-bold text-gray-900">#TKT-2026-X91</p>
            </div>
          </div>

          <h3 className="text-2xl font-black italic uppercase leading-tight mb-8 tracking-tighter text-gray-900 border-b border-gray-50 pb-4">
            {movieTitle}
          </h3>

          <div className="flex flex-col gap-6">
            {/* Cinema */}
            <div className="flex items-start gap-3 w-full">
              <div className="w-9 h-9 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center text-green-800 border border-gray-100 shadow-sm">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Cinema</p>
                <p className="text-sm font-bold text-gray-800 leading-tight">{cinemaName}</p>
              </div>
            </div>

            {/* Date & Time (Gabungan) */}
            <div className="flex items-start gap-3 w-full">
              <div className="w-9 h-9 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center text-green-800 border border-gray-100 shadow-sm">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Schedule</p>
                <p className="text-sm font-bold text-gray-800 leading-tight">{fullSchedule}</p>
              </div>
            </div>

            {/* Studio & Seats Row */}
            <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center text-green-800 border border-gray-100">
                  <Monitor size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Studio</p>
                  <p className="text-sm font-bold text-gray-800">{studioName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-l border-gray-50 pl-2">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center text-green-800 border border-gray-100">
                  <Armchair size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Seats</p>
                  <p className="text-sm font-bold text-gray-800 leading-tight">
                    {seats.length > 0 ? seats.sort().join(", ") : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isPaid && (
            <div className="mt-8 p-4 bg-green-50 rounded-2xl border border-green-100 flex justify-between items-center animate-in slide-in-from-top-4 duration-700">
              <div>
                <p className="text-[9px] font-black text-green-700 uppercase tracking-widest">Booking Code</p>
                <p className="text-xl font-black text-green-900 tracking-wider">{bookingCode}</p>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(bookingCode)}
                className="p-2 text-green-700 hover:bg-green-100 rounded-lg active:scale-90"
              >
                <Copy size={18} />
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-dashed border-gray-200 flex justify-between items-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Price</p>
            <p className="text-xl font-black text-green-800">Rp {totalPrice.toLocaleString("id-ID")}</p>
          </div>
        </div>

        {/* PEMBATAS SOBEKAN */}
        <div className="relative flex justify-center items-center bg-white border-x border-gray-100 h-8">
          <div className="absolute -left-4 w-8 h-8 bg-[#F8F9FA] rounded-full border-r border-gray-100 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.02)]"></div>
          <div className="w-full border-t-2 border-dashed border-gray-100 mx-4"></div>
          <div className="absolute -right-4 w-8 h-8 bg-[#F8F9FA] rounded-full border-l border-gray-100 shadow-[inset_2px_0_4px_rgba(0,0,0,0.02)]"></div>
        </div>

        {/* AREA BARCODE */}
        <div className="bg-white rounded-b-[2.5rem] p-8 pt-4 shadow-xl border-x border-b border-gray-100 flex flex-col items-center">
          {isPaid ? (
            <div className="w-full animate-in zoom-in duration-1000 text-center">
              <div className="bg-white p-6 rounded-3xl flex flex-col items-center border-2 border-gray-50 shadow-inner">
                <div className="flex items-end h-24 gap-[3px] mb-4 w-full justify-center">
                  {[3, 1, 4, 2, 2, 5, 1, 3, 4, 1, 2, 4, 2, 1, 5, 1, 3, 2, 1, 4, 2].map((w, i) => (
                    <div key={i} className="bg-gray-900 rounded-full" style={{ width: `${w}px`, height: '100%' }}></div>
                  ))}
                </div>
                <p className="text-xs font-mono font-bold text-gray-400 tracking-[0.6em]">1928374655</p>
              </div>
              <p className="text-[10px] font-black uppercase text-green-700 bg-green-100 px-5 py-2.5 rounded-full mt-6 inline-block tracking-widest">
                Valid Ticket • Ready to Scan
              </p>
            </div>
          ) : (
            <div className="w-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50">
              <Lock size={32} className="text-gray-300 mb-3" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Barcode Locked</p>
              <p className="text-[8px] text-gray-300 uppercase mt-1 tracking-widest font-bold">Pay to reveal ticket</p>
            </div>
          )}
        </div>
      </div>

      {/* --- PAYMENT OPTIONS --- */}
      {!isPaid && (
        <div className="w-full max-w-sm space-y-3 mb-10 animate-in fade-in duration-500">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Payment Method</p>
          <div className="grid grid-cols-1 gap-3">
            {paymentOptions.map((option) => (
              <label 
                key={option.id}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer active:scale-[0.98] ${
                  paymentMethod === option.id 
                  ? "border-green-800 bg-green-50 shadow-md" 
                  : "border-gray-50 bg-white hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-50 flex items-center justify-center">{option.icon}</div>
                  <span className="text-sm font-bold text-gray-800">{option.name}</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === option.id ? "border-green-800 bg-green-800" : "border-gray-200"}`}>
                    {paymentMethod === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <input type="radio" name="payMethod" className="hidden" onChange={() => setPaymentMethod(option.id)} />
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-sm pb-10">
        {!isPaid ? (
          <button
            onClick={handlePayment}
            disabled={isProcessing || !paymentMethod}
            className="w-full bg-green-800 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-green-900 transition-all flex items-center justify-center gap-3 disabled:bg-gray-200 disabled:text-gray-400 shadow-xl shadow-green-900/10 active:scale-[0.98]"
          >
            {isProcessing ? <Loader2 className="animate-spin" size={20} /> : `Process Payment Rp ${totalPrice.toLocaleString("id-ID")}`}
          </button>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl active:scale-[0.98] transition-transform"
          >
            Back to Home
          </button>
        )}
      </div>
    </div>
  );
}