"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trophy,
  Gamepad2,
  Users,
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Plus,
  ChevronDown,
  ChevronRight,
  Globe,
  Rocket,
  Sparkles,
} from "lucide-react";
import { useEthora, DEMO_ACCOUNTS, DemoAccount, RoleType } from "@/context/EthoraContext";
import { InteractiveAuthMascot } from "@/components/auth/InteractiveAuthMascot";

export default function SignUpPage() {
  const router = useRouter();
  const { login, signUpUser } = useEthora();

  // Mode: defaults to "register" on the signup page
  const [activeTab, setActiveTab] = useState<"login" | "register">("register");

  // Registration inputs
  const [regName, setRegName] = useState("");
  const [regTag, setRegTag] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regRole, setRegRole] = useState<RoleType>("gamer");
  const [regPassword, setRegPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Login inputs (if user switches to Login tab)
  const [email, setEmail] = useState("yared.viper@ethora.et");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(true);

  // UI state
  const [loading, setLoading] = useState(false);
  const [selectedDemoId, setSelectedDemoId] = useState<string>("demo-viper");
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // Quick-fill helper for simulation mode
  const handleSelectDemoAccount = (account: DemoAccount) => {
    setSelectedDemoId(account.id);
    setEmail(account.email);
    setPassword(account.password);
    setStatusNotice(`Auto-filled: ${account.tag}`);
    setTimeout(() => {
      setStatusNotice(null);
    }, 2500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const session = signUpUser({
        name: regName || "New Competitor",
        tag: regTag || "ProGamer",
        email: regEmail || "gamer@ethora.et",
        role: regRole,
      });
      setLoading(false);

      if (session.role === "organizer") {
        router.push("/organizer");
      } else if (session.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }, 350);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);

      if (result.success) {
        if (result.session.role === "organizer") {
          router.push("/organizer");
        } else if (result.session.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    }, 350);
  };

  return (
    <div className="auth-entry-page relative h-screen max-h-screen w-full bg-[#05030d] text-slate-100 flex flex-col justify-between overflow-hidden select-none">
      
      {/* ======================================================== */}
      {/* 1. CRISP HD FULL-SCREEN BACKGROUND (Matching Sign In)    */}
      {/* ======================================================== */}
      <div className="auth-entry-bg fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src="/images/login-arena-clean.jpg"
          alt="ETHORA Arena Background"
          className="w-full h-full object-cover object-center"
          style={{ imageRendering: "auto" }}
        />
        {/* Subtle dark tint to maintain contrast */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      </div>

      {/* ======================================================== */}
      {/* 2. TOP NAVBAR (Identical Header UI)                      */}
      {/* ======================================================== */}
      <header className="auth-entry-header relative z-20 w-full px-6 lg:px-12 py-3 sm:py-4 flex items-center justify-between">
        {/* Left: ETHORA Brand with Hooded Assassin Icon */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform flex items-center justify-center bg-[#0d0722]">
            <img
              src="/images/ethora-logo.jpg"
              alt="ETHORA Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-sans font-black text-xl sm:text-2xl tracking-wider text-white">
            ETHORA
          </span>
        </Link>

        {/* Right: Language Selector & Sign In Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs text-slate-300 px-2.5 py-1.5 rounded-lg border border-purple-500/30 bg-black/40 hover:border-purple-400/50 transition cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-bold text-[11px]">EN</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <Link
            href="/auth/signin"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-purple-500/70 bg-gradient-to-r from-purple-700/70 to-violet-700/70 hover:from-purple-600 hover:to-violet-600 text-white font-semibold text-xs tracking-wide transition shadow-[0_0_18px_rgba(168,85,247,0.35)] active:scale-95"
          >
            <User className="w-3.5 h-3.5 text-purple-300" />
            <span>Sign In</span>
          </Link>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. MAIN SECTION: NATIVE ARTWORK + GLOWING VIOLET CARD    */}
      {/* ======================================================== */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center min-h-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* ==================================================== */}
          {/* LEFT AREA: Native artwork visible, 4 bottom features */}
          {/* ==================================================== */}
          <div className="auth-entry-left auth-mascot-col hidden lg:flex lg:col-span-6 flex-col justify-between self-stretch py-2 min-h-0">
            {/* Interactive moving ETHORA Mascot Emblem */}
            <InteractiveAuthMascot />

            {/* Bottom 4 Feature Items with vertical dividers */}
            <div className="w-full grid grid-cols-4 items-center mb-2">
              {/* Feature 1: Tournaments & Events */}
              <Link
                href="/tournaments"
                className="flex flex-col items-center text-center px-1.5 py-1.5 group border-r border-purple-500/25 hover:bg-purple-950/20 rounded-xl transition"
              >
                <div className="w-7 h-7 mb-1 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform">
                  <Trophy className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <span className="text-[11px] font-semibold text-white leading-tight">
                  Tournaments
                </span>
                <span className="text-[10px] font-medium text-purple-300/80 leading-tight">
                  & Events
                </span>
              </Link>

              {/* Feature 2: Rankings & Leaderboards */}
              <Link
                href="/rankings"
                className="flex flex-col items-center text-center px-1.5 py-1.5 group border-r border-purple-500/25 hover:bg-purple-950/20 rounded-xl transition"
              >
                <div className="w-7 h-7 mb-1 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <span className="text-[11px] font-semibold text-white leading-tight">
                  Rankings &
                </span>
                <span className="text-[10px] font-medium text-purple-300/80 leading-tight">
                  Leaderboards
                </span>
              </Link>

              {/* Feature 3: Gaming Community */}
              <Link
                href="/gamers"
                className="flex flex-col items-center text-center px-1.5 py-1.5 group border-r border-purple-500/25 hover:bg-purple-950/20 rounded-xl transition"
              >
                <div className="w-7 h-7 mb-1 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <span className="text-[11px] font-semibold text-white leading-tight">
                  Gaming
                </span>
                <span className="text-[10px] font-medium text-purple-300/80 leading-tight">
                  Community
                </span>
              </Link>

              {/* Feature 4: AI Gaming Assistant */}
              <Link
                href="/assistant"
                className="flex flex-col items-center text-center px-1.5 py-1.5 group hover:bg-purple-950/20 rounded-xl transition"
              >
                <div className="w-7 h-7 mb-1 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform">
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <span className="text-[11px] font-semibold text-white leading-tight">
                  AI Gaming
                </span>
                <span className="text-[10px] font-medium text-purple-300/80 leading-tight">
                  Assistant
                </span>
              </Link>
            </div>
          </div>

          {/* ==================================================== */}
          {/* RIGHT AREA: THE GLOWING VIOLET SIGN UP CARD          */}
          {/* ==================================================== */}
          <div className="auth-entry-card auth-card-col lg:col-span-6 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[460px] rounded-2xl border border-[rgba(168,85,247,0.35)] bg-[#14111F] px-6 py-6 sm:px-8 sm:py-7 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden font-sans">
              
              {/* Soft purple ambient back-glow inside card */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#A855F7]/15 rounded-full blur-[70px] pointer-events-none" />

              {/* Card Header */}
              <div className="text-center mb-5">
                <h1 className="text-[32px] font-[800] text-[#F4F1FF] uppercase tracking-tight leading-none">
                  {activeTab === "register" ? "Join ETHORA" : "Welcome Back"}
                </h1>
                <p className="text-[13px] font-[400] text-[#7D7896] mt-2">
                  {activeTab === "register"
                    ? "Create your account and enter the arena"
                    : "Sign in to your ETHORA account"}
                </p>
              </div>

              {/* Dual Tab Switcher: [ 👤 Login ]  [ + Register ] */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-[#0A0A12] border border-[rgba(168,85,247,0.25)] mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-[600] transition ${
                    activeTab === "login"
                      ? "bg-[#A855F7] text-[#F4F1FF] shadow-[0_0_14px_rgba(168,85,247,0.4)]"
                      : "text-[#B8B3CC] hover:text-[#F4F1FF]"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-[600] transition ${
                    activeTab === "register"
                      ? "bg-[#A855F7] text-[#F4F1FF] shadow-[0_0_14px_rgba(168,85,247,0.4)]"
                      : "text-[#B8B3CC] hover:text-[#F4F1FF]"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>

              {/* ================================================= */}
              {/* REGISTER TAB FORM (DEFAULT ON SIGNUP)             */}
              {/* ================================================= */}
              {activeTab === "register" && (
                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[13px] font-[600] text-[#B8B3CC] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Dawit Alemu"
                        className="w-full px-3 py-2.5 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#0A0A12] text-[16px] font-[400] text-[#F4F1FF] placeholder-[#7D7896] focus:outline-none focus:border-[#A855F7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-[600] text-[#B8B3CC] mb-1">
                        Gamer Tag
                      </label>
                      <input
                        type="text"
                        required
                        value={regTag}
                        onChange={(e) => setRegTag(e.target.value)}
                        placeholder="ShadowStrike"
                        className="w-full px-3 py-2.5 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#0A0A12] text-[16px] font-[400] text-[#F4F1FF] placeholder-[#7D7896] focus:outline-none focus:border-[#A855F7]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-[600] text-[#B8B3CC] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="player@ethora.et"
                      className="w-full px-3 py-2.5 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#0A0A12] text-[16px] font-[400] text-[#F4F1FF] placeholder-[#7D7896] focus:outline-none focus:border-[#A855F7]"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-[600] text-[#B8B3CC] mb-1">
                      Role in Esports
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRegRole("gamer")}
                        className={`py-2 px-3 rounded-xl text-[13px] font-[600] border transition ${
                          regRole === "gamer"
                            ? "bg-[#A855F7] border-[#A855F7] text-[#F4F1FF] shadow-[0_0_12px_rgba(168,85,247,0.35)]"
                            : "bg-[#0A0A12] border-[rgba(168,85,247,0.25)] text-[#7D7896] hover:text-[#B8B3CC]"
                        }`}
                      >
                        Gamer
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegRole("organizer")}
                        className={`py-2 px-3 rounded-xl text-[13px] font-[600] border transition ${
                          regRole === "organizer"
                            ? "bg-[#A855F7] border-[#A855F7] text-[#F4F1FF] shadow-[0_0_12px_rgba(168,85,247,0.35)]"
                            : "bg-[#0A0A12] border-[rgba(168,85,247,0.25)] text-[#7D7896] hover:text-[#B8B3CC]"
                        }`}
                      >
                        Organizer
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-[600] text-[#B8B3CC] mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Create password"
                        className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#0A0A12] text-[16px] font-[400] text-[#F4F1FF] placeholder-[#7D7896] focus:outline-none focus:border-[#A855F7]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7D7896] hover:text-[#F4F1FF] transition"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-[#A855F7] hover:bg-[#9333EA] text-[#F4F1FF] font-[700] text-[15px] uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.45)] transition cursor-pointer"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Creating Account...</span>
                        </div>
                      ) : (
                        "CREATE ACCOUNT →"
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* ================================================= */}
              {/* LOGIN TAB FORM (WHEN USER SWITCHES TO LOGIN)     */}
              {/* ================================================= */}
              {activeTab === "login" && (
                <form onSubmit={handleSignIn} className="space-y-3">
                  {/* Compact Demo account quick-fill bar */}
                  <div className="px-2 py-1.5 rounded-lg bg-purple-950/30 border border-purple-900/40 flex items-center justify-between gap-1.5">
                    <span className="text-[10px] font-mono text-purple-300/90 font-bold flex items-center gap-1 shrink-0">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      <span className="hidden sm:inline">Demo:</span>
                    </span>
                    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full justify-end">
                      {DEMO_ACCOUNTS.map((account) => {
                        const isSelected = selectedDemoId === account.id;
                        return (
                          <button
                            key={account.id}
                            type="button"
                            onClick={() => handleSelectDemoAccount(account)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition whitespace-nowrap ${
                              isSelected
                                ? "bg-purple-600/40 border border-purple-400 text-white ring-1 ring-purple-400/40 shadow-sm"
                                : "bg-[#060410] border border-purple-900/50 hover:border-purple-500/60 text-purple-300/70 hover:text-white"
                            }`}
                          >
                            {account.tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#060411]/90 border border-purple-900/60 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs sm:text-sm text-white placeholder-purple-300/40 transition outline-none"
                    />
                  </div>

                  {/* Password Input with eye toggle */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#060411]/90 border border-purple-900/60 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs sm:text-sm text-white placeholder-purple-300/40 transition outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-purple-400 hover:text-white transition cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Remember Me & Forgot Password Row */}
                  <div className="flex items-center justify-between text-[11px] pt-0.5">
                    <label className="flex items-center gap-1.5 text-purple-200/80 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-purple-800 bg-[#060411] text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>Remember me</span>
                    </label>

                    <Link
                      href="/auth/forgot-password"
                      className="text-purple-400 hover:text-purple-300 font-medium transition"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Sign In Primary Action Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(147,51,234,0.45)] transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <>
                          <span>Sign In</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Social Divider: "or continue with" */}
              <div className="relative my-2.5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-purple-900/50" />
                </div>
                <span className="relative px-2.5 bg-[#090616] text-[10px] sm:text-[11px] lowercase text-purple-300/60 font-mono">
                  or continue with
                </span>
              </div>

              {/* Social Login Buttons: Google, Discord, Twitch */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRegEmail("newgamer@ethora.et");
                    setRegTag("ChampionX");
                    setRegName("Abebe Bikila");
                    setRegPassword("password123");
                  }}
                  className="py-1.5 sm:py-2 px-2 rounded-xl border border-purple-900/60 bg-[#060411] hover:bg-[#120b29] hover:border-purple-500/70 text-slate-200 hover:text-white transition flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRegEmail("newgamer@ethora.et");
                    setRegTag("ChampionX");
                    setRegName("Abebe Bikila");
                    setRegPassword("password123");
                  }}
                  className="py-1.5 sm:py-2 px-2 rounded-xl border border-purple-900/60 bg-[#060411] hover:bg-[#120b29] hover:border-[#5865F2]/70 text-slate-200 hover:text-white transition flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-[#5865F2]" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  <span>Discord</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRegEmail("newgamer@ethora.et");
                    setRegTag("ChampionX");
                    setRegName("Abebe Bikila");
                    setRegPassword("password123");
                  }}
                  className="py-1.5 sm:py-2 px-2 rounded-xl border border-purple-900/60 bg-[#060411] hover:bg-[#120b29] hover:border-[#9146FF]/70 text-slate-200 hover:text-white transition flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-[#9146FF]" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                  </svg>
                  <span>Twitch</span>
                </button>
              </div>

              {/* Bottom Community Footer Note */}
              <div className="mt-3.5 pt-2.5 border-t border-purple-900/40 text-center">
                <p className="text-[11px] text-purple-300/80">
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="text-purple-400 font-bold hover:text-purple-300 transition underline underline-offset-2 ml-1"
                  >
                    Sign In here
                  </button>
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Bottom subtle edge */}
      <div className="h-2 pointer-events-none" />

      {/* Smooth Page Entrance Animations */}
      <style jsx>{`
        @keyframes authPageEntrance {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.985);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px);
          }
        }

        @keyframes mascotSlideIn {
          0% {
            opacity: 0;
            transform: translateX(-26px);
          }
          100% {
            opacity: 1;
            transform: translateX(0px);
          }
        }

        @keyframes cardSlideIn {
          0% {
            opacity: 0;
            transform: translateX(26px);
          }
          100% {
            opacity: 1;
            transform: translateX(0px);
          }
        }

        .auth-page-smooth {
          animation: authPageEntrance 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: opacity, transform, filter;
        }

        .auth-mascot-col {
          animation: mascotSlideIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.04s both;
        }

        .auth-card-col {
          animation: cardSlideIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
        }
      `}</style>
    </div>
  );
}
