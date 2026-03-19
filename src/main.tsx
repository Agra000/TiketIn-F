import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Cinema from "./pages/Cinema";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import Login from "./pages/Login"; // Impor halaman Login
import Register from "./pages/Register"; // Impor halaman Register

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/cinema" element={<Cinema />} />
      <Route path="/seat" element={<SeatSelection />} />
      <Route path="/payment" element={<Payment />} />
      
      {/* Tambahkan rute baru di sini */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>,
);