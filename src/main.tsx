<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
=======
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
  </BrowserRouter>
);
>>>>>>> 11b45e11c81a702ce600808818a7f4f6dfd1db9d
