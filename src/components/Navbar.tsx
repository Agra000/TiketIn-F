export default function Navbar() {
  return (
    <nav className="w-full flex py-4 justify-between items-center px-10 shadow-md bg-white">
      
      {/* Logo */}
      <h1 className="text-3xl font-bold text-[#0A2A8C]">TIKETIN</h1>

      {/* Menu */}
      <ul className="hidden md:flex gap-4 text-lg font-medium">
        <li className="hover:text-blue-600 cursor-pointer">Home</li>
        <li className="hover:text-blue-600 cursor-pointer">Now Showing</li>
        <li className="hover:text-blue-600 cursor-pointer">Events</li>
        <li className="hover:text-blue-600 cursor-pointer">Careers</li>
      </ul>

      {/* Button */}
      <button className="px-5 py-2 bg-yellow-400 font-semibold rounded-full">
        Login
      </button>
    </nav>
  );
}