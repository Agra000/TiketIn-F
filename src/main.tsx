import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Cinema from "./pages/Cinema";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/cinema" element={<Cinema />} />
      <Route path="/seat" element={<SeatSelection />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  </BrowserRouter>,
);
