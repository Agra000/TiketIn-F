import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2, Ticket, Sparkles } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi proses autentikasi selama 2 detik
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4 py-12 relative overflow-hidden font-sans">
      
      {/* --- Dinamis Background Ornaments --- */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] bg-green-800/10 rounded-full blur-[100px]"></div>
      <div className="absolute top-[20%] left-[10%] w-[100px] h-[100px] bg-yellow-200/20 rounded-full blur-[60px]"></div>

      {/* --- Card Container --- */}
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden p-10 border border-white relative z-10 transition-all hover:shadow-green-900/5">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6 relative">
            <div className="bg-green-800 p-4 rounded-3xl rotate-6 shadow-xl shadow-green-900/30 group-hover:rotate-0 transition-all duration-500">
              <Ticket className="text-white" size={32} />
            </div>
          </div>
          
          <h2 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-3">
            Tiket<span className="text-green-800">in</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-4 bg-gray-200"></div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
              Premium Access
            </p>
            <div className="h-[1px] w-4 bg-gray-200"></div>
          </div>
        </div>

        {/* --- Form Section --- */}
        <form className="space-y-5" onSubmit={handleLogin}>
          
          {/* Email Input */}
          <div className="group">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2.5 ml-2 group-focus-within:text-green-800 transition-colors">
              User Identity
            </label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-700 transition-colors">
                <Mail size={18} strokeWidth={2.5} />
              </div>
              <input
                type="email"
                required
                disabled={isLoading}
                className="w-full pl-14 pr-6 py-3 rounded-[2rem] bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-green-600/5 focus:border-green-600 outline-none transition-all placeholder:text-gray-300 font-bold text-sm disabled:opacity-50 shadow-inner"
                placeholder="EMAIL ADDRESS"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="group">
            <div className="flex justify-between items-center mb-2.5 ml-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] group-focus-within:text-green-800 transition-colors">
                Security Key
              </label>
              <Link to="#" className="text-[10px] font-black text-green-700 hover:underline underline-offset-4 uppercase tracking-widest transition-colors">
                Lost Key?
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-700 transition-colors">
                <Lock size={18} strokeWidth={2.5} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={isLoading}
                className="w-full pl-14 pr-14 py-4 rounded-[2rem] bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-green-600/5 focus:border-green-600 outline-none transition-all placeholder:text-gray-300 font-bold text-sm disabled:opacity-50 shadow-inner"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-green-700 transition-colors p-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-800 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.25em] text-[11px] hover:bg-green-900 hover:shadow-2xl hover:shadow-green-900/40 active:scale-[0.97] transition-all flex items-center justify-center gap-3 group disabled:bg-gray-300 disabled:shadow-none mt-4 relative overflow-hidden"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Sign In Securely</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </>
            )}
            
            {/* Subtle Gradient Overlay on Button */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </form>

        {/* --- Divider --- */}
        <div className="flex items-center gap-4 my-10">
          <div className="h-[1px] flex-1 bg-gray-100"></div>
          <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">Status</span>
          <div className="h-[1px] flex-1 bg-gray-100"></div>
        </div>

        {/* --- Footer Section --- */}
        <div className="text-center space-y-4">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-800 hover:text-green-900 underline underline-offset-4 decoration-2 transition-colors">
              Join Tiketin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}