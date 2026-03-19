import Navbar from "./components/Navbar";
import NowShowing from "./components/NowShowing";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Konten akan tumbuh & mendorong footer turun */}
      <div className="flex-grow">
        <NowShowing />
      </div>

      <Footer />
    </div>
  );
}