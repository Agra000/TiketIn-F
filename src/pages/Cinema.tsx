import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cinema() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("19 Mar");

  const dates = [
    { date: "19 Mar", day: "TODAY" },
    { date: "20 Mar", day: "FRI" },
    { date: "21 Mar", day: "SAT" },
    { date: "22 Mar", day: "SUN" },
    { date: "23 Mar", day: "MON" },
  ];

  const scheduleData = [
    {
      name: "AGORA MALL PREMIERE",
      type: "2D",
      price: "Rp150.000",
      times: [
        { time: "12:30", available: false },
        { time: "14:25", available: true },
        { time: "16:20", available: true },
      ],
    },
    {
      name: "BAYWALK PLUIT PREMIERE",
      type: "2D",
      price: "Rp100.000",
      times: [
        { time: "14:40", available: true },
        { time: "18:35", available: true },
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full max-w-2xl px-6 py-6">
        <h1 className="text-xl font-extrabold text-gray-800 uppercase tracking-tight">
          PANDA PLAN: THE MAGICAL TRIBE SCHEDULE IN CINEMAS
        </h1>

        {/* Date Selector */}
        <div className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
          {dates.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDate(item.date)}
              className={`flex flex-col items-center justify-center min-w-[75px] py-3 rounded-md border transition-all ${
                selectedDate === item.date
                  ? "bg-[#1D2D50] border-[#1D2D50] text-white"
                  : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
            >
              <span className="text-lg font-bold">{item.date}</span>
              <span className="text-[10px] font-bold uppercase">{item.day}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mt-6">
          <span className="absolute inset-y-0 left-4 flex items-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search cinema"
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-full text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
          />
        </div>
      </div>

      <hr className="w-full border-gray-100 border-t-8" />

      {/* Cinema List */}
      <div className="w-full max-w-2xl flex flex-col">
        {scheduleData.map((cinema, idx) => (
          <div key={idx} className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold text-gray-800 tracking-wide uppercase">
                {cinema.name}
              </h2>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 font-bold text-sm">{cinema.type}</span>
              <span className="text-gray-400 text-sm font-medium">{cinema.price}</span>
            </div>

            <div className="flex gap-4">
              {cinema.times.map((slot, sIdx) => (
                <button
                  key={sIdx}
                  disabled={!slot.available}
                  onClick={() => navigate("/seat", { state: { cinema: cinema.name, time: slot.time } })}
                  className={`px-8 py-3 rounded-md border text-lg font-bold transition-all ${
                    slot.available
                      ? "border-gray-200 text-gray-800 hover:bg-blue-50"
                      : "bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Button */}
      <div className="mt-auto w-full max-w-2xl p-4">
        <button className="w-full bg-[#E5E7EB] text-gray-500 py-4 font-bold text-lg tracking-widest uppercase">
          BUY TICKET
        </button>
      </div>
    </div>
  );
}