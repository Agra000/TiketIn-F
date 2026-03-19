import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2, User, Mail, Calendar, Lock, ArrowRight } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State Loading Baru
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.username) newErrors.username = "Username is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Birth date is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Min. 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords mismatch";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true); // Mulai loading
      
      // Simulasi API Call
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      }, 2000);
    }
  };

  const ErrorMsg = ({ msg }) => (
    msg ? (
      <div className="flex items-center gap-1 mt-1.5 ml-1 text-red-500 text-[9px] font-black animate-in fade-in slide-in-from-top-1">
        <AlertCircle size={10} strokeWidth={3} />
        <span className="uppercase tracking-[0.1em]">{msg}</span>
      </div>
    ) : null
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative overflow-hidden">
      
      {/* Dekorasi Background */}
      <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-green-50 rounded-full blur-[100px] opacity-70"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[25%] h-[25%] bg-green-100/40 rounded-full blur-[80px] opacity-60"></div>

      <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden p-8 md:p-12 border border-green-300 relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-800 rounded-2xl rotate-3 shadow-lg shadow-green-900/20">
              <img src="../TiketIn.png" className="h-10 w-auto brightness-0 invert" alt="TiketIn Logo" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">
            Create <span className="text-green-800">Account</span>
          </h2>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
            Experience the future of cinema
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-10 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-800 uppercase italic">Welcome!</h3>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-2">Registration Complete</p>
            <Link to="/login">
              <button className="mt-10 bg-green-800 text-white w-full py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-green-900 transition-all shadow-xl shadow-green-900/20">
                Sign In Now
              </button>
            </Link>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={validateForm} noValidate>
            
            {/* Full Name & Username */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-green-800 transition-colors">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-700 transition-colors" size={16} />
                  <input name="fullName" type="text" placeholder="John Doe" onChange={handleInputChange}
                    className={`w-full pl-11 pr-5 py-3.5 rounded-2xl bg-gray-50 border ${errors.fullName ? 'border-red-400' : 'border-gray-100 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-500/5'} outline-none transition-all text-sm font-medium`} />
                </div>
                <ErrorMsg msg={errors.fullName} />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-green-800 transition-colors">Username</label>
                <input name="username" type="text" placeholder="johndoe" onChange={handleInputChange}
                  className={`w-full px-5 py-3.5 rounded-2xl bg-gray-50 border ${errors.username ? 'border-red-400' : 'border-gray-100 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-500/5'} outline-none transition-all text-sm font-medium`} />
                <ErrorMsg msg={errors.username} />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-green-800 transition-colors">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-700 transition-colors" size={16} />
                <input name="email" type="email" placeholder="name@email.com" onChange={handleInputChange}
                  className={`w-full pl-11 pr-5 py-3.5 rounded-2xl bg-gray-50 border ${errors.email ? 'border-red-400' : 'border-gray-100 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-500/5'} outline-none transition-all text-sm font-medium`} />
              </div>
              <ErrorMsg msg={errors.email} />
            </div>

            {/* Gender & DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-green-800 transition-colors">Gender</label>
                <select name="gender" onChange={handleInputChange}
                  className={`w-full px-5 py-3.5 rounded-2xl bg-gray-50 border ${errors.gender ? 'border-red-400' : 'border-gray-100 focus:bg-white focus:border-green-600'} outline-none transition-all text-sm text-gray-500 font-medium cursor-pointer appearance-none`}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <ErrorMsg msg={errors.gender} />
              </div>
              <div className="group">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-green-800 transition-colors">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-700 transition-colors" size={16} />
                  <input name="dob" type="date" onChange={handleInputChange}
                    className={`w-full pl-11 pr-5 py-3.5 rounded-2xl bg-gray-50 border ${errors.dob ? 'border-red-400' : 'border-gray-100 focus:bg-white focus:border-green-600'} outline-none transition-all text-sm text-gray-400 font-medium`} />
                </div>
                <ErrorMsg msg={errors.dob} />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-green-800 transition-colors">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-700 transition-colors" size={16} />
                <input name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" onChange={handleInputChange}
                  className={`w-full pl-11 pr-14 py-3.5 rounded-2xl bg-gray-50 border ${errors.password ? 'border-red-400' : 'border-gray-100 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-500/5'} outline-none transition-all text-sm font-medium`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-700 p-1 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <ErrorMsg msg={errors.password} />
            </div>

            {/* Confirm Password */}
            <div className="group">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-green-800 transition-colors">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-700 transition-colors" size={16} />
                <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" onChange={handleInputChange}
                  className={`w-full pl-11 pr-14 py-3.5 rounded-2xl bg-gray-50 border ${errors.confirmPassword ? 'border-red-400' : 'border-gray-100 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-500/5'} outline-none transition-all text-sm font-medium`} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-700 p-1 transition-colors">
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <ErrorMsg msg={errors.confirmPassword} />
            </div>

            {/* Submit Button with Loading State */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 mt-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all ${
                isLoading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-green-800 text-white hover:bg-green-900 active:scale-[0.98] shadow-xl shadow-green-900/20"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Processing...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}

        {!isSubmitted && (
          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Member already?{" "}
              <Link to="/login" className="text-green-700 hover:text-green-900 underline underline-offset-4 decoration-2 transition-all">
                Sign In
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}