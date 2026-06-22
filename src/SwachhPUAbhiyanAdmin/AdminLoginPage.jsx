import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import gsap from "gsap";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ClipboardList,
  UserCheck,
  BarChart3,
  Leaf,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Recycle,
  TreePine,
  Building2,
  Sparkles,
} from "lucide-react";
import { saveAuthData } from "./auth";

const API_BASE_URL = "https://swachh-pu-backend.onrender.com";

// ───────────────────────────────────────────────────────────────
// TOAST COMPONENT
// ───────────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800";
  const Icon = type === "success" ? CheckCircle2 : AlertCircle;

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bgColor} animate-in`}>
      <Icon className="w-5 h-5 shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────
// LEFT PANEL COMPONENTS
// ───────────────────────────────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const cardRef = useRef(null);
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay, ease: "power2.out" });
    }
  }, [delay]);

  return (
    <div ref={cardRef} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="w-10 h-10 rounded-lg bg-[#2563EB]/20 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-[#60A5FA]" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const Illustration = () => {
  const svgRef = useRef(null);
  useEffect(() => {
    if (svgRef.current) {
      gsap.fromTo(svgRef.current.querySelectorAll(".float-anim"), { y: 0 }, { y: -8, duration: 2, repeat: -1, yoyo: true, stagger: 0.3, ease: "sine.inOut" });
    }
  }, []);

  return (
    <div ref={svgRef} className="relative w-full max-w-sm mx-auto h-48 flex items-center justify-center">
      {/* Background elements */}
      <div className="absolute inset-0 flex items-end justify-center gap-1">
        <div className="w-2 h-16 bg-emerald-700/30 rounded-t-full float-anim" />
        <div className="w-2 h-24 bg-emerald-600/30 rounded-t-full float-anim" />
        <div className="w-2 h-12 bg-emerald-700/30 rounded-t-full float-anim" />
        <div className="w-2 h-20 bg-emerald-600/30 rounded-t-full float-anim" />
        <div className="w-2 h-14 bg-emerald-700/30 rounded-t-full float-anim" />
      </div>

      {/* Skyline */}
      <div className="absolute bottom-0 flex items-end gap-0.5 float-anim">
        <Building2 className="w-8 h-16 text-slate-600/40" />
        <Building2 className="w-10 h-24 text-slate-500/40" />
        <Building2 className="w-8 h-18 text-slate-600/40" />
        <Building2 className="w-12 h-20 text-slate-500/40" />
      </div>

      {/* Main elements */}
      <div className="relative z-10 flex items-end gap-6 float-anim">
        <div className="flex flex-col items-center">
          <Recycle className="w-12 h-12 text-emerald-400" />
          <div className="w-16 h-2 bg-emerald-800/50 rounded-full mt-1" />
        </div>
        <div className="flex flex-col items-center">
          <TreePine className="w-14 h-14 text-emerald-500" />
          <div className="w-12 h-2 bg-emerald-800/50 rounded-full mt-1" />
        </div>
        <div className="flex flex-col items-center">
          <Sparkles className="w-10 h-10 text-amber-400" />
          <div className="w-14 h-2 bg-emerald-800/50 rounded-full mt-1" />
        </div>
      </div>
    </div>
  );
};

const LeftPanel = () => {
  const panelRef = useRef(null);
  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(panelRef.current.querySelectorAll(".animate-left"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" });
    }
  }, []);

  return (
    <div ref={panelRef} className="hidden lg:flex lg:w-1/2 flex-col relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dycjjaxsk/image/upload/v1782144642/WhatsApp_Image_2026-06-09_at_3.54.20_PM_1_bqyotx.jpg')" }}
      />

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-[2px]" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-[#0F172A]/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-8 xl:p-12 justify-between">

        {/* Logo on Background */}
        <div className="animate-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
              <img 
                src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1780955878/Screenshot_2026-06-09_032706-Photoroom_t59h72.png" 
                alt="Swachh PU Logo"
                className="w-9 h-9 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Swachh PU</h1>
              <p className="text-xs text-white/60 uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="animate-left space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl xl:text-4xl font-bold text-white">Swachh PU Abhiyan</h2>
            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              Sign in to your admin account to manage cleanliness reports and administrative tasks across the campus.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-4">
            <FeatureCard icon={ClipboardList} title="Manage Reports" description="View and manage all cleanliness reports" delay={0.3} />
            <FeatureCard icon={UserCheck} title="Assign Workers" description="Assign tasks to appropriate workers" delay={0.4} />
            <FeatureCard icon={BarChart3} title="Track Progress" description="Monitor progress and generate analytics" delay={0.5} />
          </div>
        </div>

        {/* Footer */}
        <div className="animate-left">
          <p className="text-xs text-white/40">© 2026 Swachh PU. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

// ───────────────────────────────────────────────────────────────
// RIGHT PANEL - LOGIN FORM
// ───────────────────────────────────────────────────────────────
const AdminLoginPage = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current.querySelectorAll(".animate-right"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" });
    }
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      showToast("Please enter both email and password", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: email.trim(),
        password,
      });

      const { access_token, refresh_token, user, message } = response.data;

      // Role validation
      if (user?.role !== "admin") {
        showToast("You are not authorized to access the admin panel.", "error");
        setLoading(false);
        return;
      }

      // Save auth data
      saveAuthData({ access_token, refresh_token, user });

      // Remember me
      if (rememberMe) {
        localStorage.setItem("remember_email", email);
      } else {
        localStorage.removeItem("remember_email");
      }

      showToast(message || "Login successful", "success");

      setTimeout(() => {
        navigate("/admin");
      }, 800);
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data?.error || "Invalid credentials";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email
  useEffect(() => {
    const remembered = localStorage.getItem("remember_email");
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <LeftPanel />

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div ref={formRef} className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="animate-right lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <img 
                src="https://res.cloudinary.com/dycjjaxsk/image/upload/v1780955878/Screenshot_2026-06-09_032706-Photoroom_t59h72.png" 
                alt="Swachh PU Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Swachh PU</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>

          {/* Login Card */}
          <div className="animate-right bg-white rounded-2xl border border-slate-200/80 shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#2563EB]/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-[#2563EB]" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Admin Login</h2>
              <p className="text-sm text-slate-500 mt-1">Enter your credentials to access the admin panel</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="animate-right space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all bg-slate-50/50"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="animate-right space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all bg-slate-50/50"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="animate-right flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]/20 cursor-pointer"
                    disabled={loading}
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm font-medium text-[#2563EB] hover:text-[#1d4ed8] transition-colors">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="animate-right w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1d4ed8] active:scale-[0.98] transition-all shadow-lg shadow-[#2563EB]/25 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Login to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* SSO Button */}
              <button
                type="button"
                disabled
                className="animate-right w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-500 hover:bg-slate-50 transition-all cursor-not-allowed opacity-60"
              >
                <Shield className="w-4 h-4" />
                Login with SSO
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md ml-1">Coming Soon</span>
              </button>
            </form>
          </div>

          {/* Mobile Footer */}
          <p className="lg:hidden text-center text-xs text-slate-400 mt-8">© 2026 Swachh PU. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;