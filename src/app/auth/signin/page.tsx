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
import { OAuthModal } from "@/components/auth/OAuthModal";

export default function SignInPage() {
  const router = useRouter();
  const { login, signUpUser } = useEthora();

  // Social OAuth Simulation state
  const [oauthProvider, setOauthProvider] = useState<"discord" | "google" | "twitch" | null>(null);

  // Mode: "login" or "register"
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Login inputs
  const [email, setEmail] = useState("yared.viper@ethora.et");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register inputs
  const [regName, setRegName] = useState("");
  const [regTag, setRegTag] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regRole, setRegRole] = useState<RoleType>("gamer");
  const [regPassword, setRegPassword] = useState("");

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

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);

      if (result.success) {
        if (result.session.role === "organizer" || result.session.role === "organization") {
          router.push("/organizer");
        } else if (result.session.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    }, 350);
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

      if (session.role === "organizer" || session.role === "organization") {
        router.push("/organizer");
      } else if (session.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }, 350);
  };

  return (
    <div className="auth-entry-page relative min-h-screen w-full bg-[#05030d] text-slate-100 flex flex-col justify-between overflow-x-hidden overflow-y-auto lg:h-screen lg:max-h-screen lg:overflow-hidden select-none">

      {/* ======================================================== */}
      {/* 1. CRISP HD FULL-SCREEN BACKGROUND (Locked to Viewport)   */}
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
      {/* 2. TOP NAVBAR (Links deleted as requested)                */}
      {/* ======================================================== */}
      <header className="auth-entry-header relative z-20 w-full px-3.5 sm:px-6 lg:px-12 py-2.5 sm:py-4 flex items-center justify-between shrink-0">
        {/* Left: ETHORA Brand with Hooded Assassin Icon */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform flex items-center justify-center bg-[#0d0722] p-0.5">
            <img
              src="/ethora-logo.png"
              alt="ETHORA Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]"
            />
          </div>
          <span className="font-sans font-black text-lg sm:text-2xl tracking-wider text-white">
            ETHORA
          </span>
        </Link>

        {/* Right: Language Selector & Get Started Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="hidden xs:flex items-center gap-1.5 text-xs text-slate-300 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg border border-purple-500/30 bg-black/40 hover:border-purple-400/50 transition cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-bold text-[11px]">EN</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl border border-purple-500/70 bg-gradient-to-r from-purple-700/70 to-violet-700/70 hover:from-purple-600 hover:to-violet-600 text-white font-semibold text-xs tracking-wide transition shadow-[0_0_18px_rgba(168,85,247,0.35)] active:scale-95"
          >
            <Rocket className="w-3.5 h-3.5 text-purple-300" />
            <span>Get Started</span>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. MAIN SECTION: NATIVE ARTWORK + COMPACT LOGIN CARD     */}
      {/* ======================================================== */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 flex flex-col justify-center py-3 sm:py-4 lg:py-2 min-h-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-center">

          {/* ==================================================== */}
          {/* LEFT AREA: Native artwork visible, 4 bottom features */}
          {/* ==================================================== */}
          <div className="auth-entry-left hidden lg:flex lg:col-span-6 flex-col justify-between self-stretch py-2 min-h-0">
            {/* Interactive moving ETHORA Mascot Emblem */}
            <InteractiveAuthMascot />

            {/* Bottom 4 Feature Items (Exact Reference Match: Direct on Background, Vibrant Purple Icons) */}
            <div className="w-full relative mb-3">
              <svg className="sr-only" aria-hidden="true">
                <defs>
                  <linearGradient id="auth-purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C084FC" />
                    <stop offset="60%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#9333EA" />
                  </linearGradient>
                  <linearGradient id="auth-purple-grad-soft" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C084FC" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#A855F7" stopOpacity="0.75" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="w-full grid grid-cols-4 items-center divide-x divide-purple-500/25 py-2">
                {/* Feature 1: Tournaments & Events */}
                <Link
                  href="/tournaments"
                  className="flex flex-col items-center text-center px-1.5 py-1 group transition-all duration-200"
                >
                  <div className="relative">
                    <svg
                      className="w-8 h-8 text-[#C084FC] filter drop-shadow-[0_0_12px_rgba(168,85,247,0.95)] group-hover:scale-110 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
                      <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" fill="url(#auth-purple-grad-soft)" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-bold text-white tracking-wide leading-tight mt-2.5 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    Tournaments
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#D8B4FE] leading-tight block drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    &amp; Events
                  </span>
                </Link>

                {/* Feature 2: Rankings & Leaderboards */}
                <Link
                  href="/rankings"
                  className="flex flex-col items-center text-center px-1.5 py-1 group transition-all duration-200"
                >
                  <div className="relative">
                    <svg
                      className="w-8 h-8 text-[#A855F7] filter drop-shadow-[0_0_14px_rgba(168,85,247,0.95)] group-hover:scale-110 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="url(#auth-purple-grad)"
                    >
                      <path d="M7 6h10a6 6 0 0 1 5.92 7.02l-1.33 6.64A2.5 2.5 0 0 1 19.14 21.5a2.49 2.49 0 0 1-2.45-1.92l-.66-3.3a1 1 0 0 0-.98-.78H8.95a1 1 0 0 0-.98.78l-.66 3.3A2.49 2.49 0 0 1 4.86 21.5a2.5 2.5 0 0 1-2.45-1.84l-1.33-6.64A6 6 0 0 1 7 6Zm-1 5a1 1 0 0 0-1 1v1H4a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2H7v-1a1 1 0 0 0-1-1Zm11.5 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-2 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-bold text-white tracking-wide leading-tight mt-2.5 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    Rankings &amp;
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#D8B4FE] leading-tight block drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    Leaderboards
                  </span>
                </Link>

                {/* Feature 3: Gaming Community */}
                <Link
                  href="/gamers"
                  className="flex flex-col items-center text-center px-1.5 py-1 group transition-all duration-200"
                >
                  <div className="relative">
                    <svg
                      className="w-8 h-8 text-[#A855F7] filter drop-shadow-[0_0_14px_rgba(168,85,247,0.95)] group-hover:scale-110 transition-transform duration-200"
                      viewBox="0 0 24 24"
                    >
                      {/* Center person */}
                      <circle cx="12" cy="7" r="3" fill="url(#auth-purple-grad)" />
                      <path d="M12 11.5c-3 0-5.5 1.6-5.5 3.8v2.2h11v-2.2c0-2.2-2.5-3.8-5.5-3.8z" fill="url(#auth-purple-grad)" />
                      {/* Left person */}
                      <circle cx="5" cy="8.5" r="2.3" fill="url(#auth-purple-grad)" opacity="0.9" />
                      <path d="M5 12.2c-1.8 0-3.8 1-3.8 2.6v1.7h3.8v-1.5c0-1 .35-1.9 1-2.5-.35-.2-.65-.3-1-.3z" fill="url(#auth-purple-grad)" opacity="0.9" />
                      {/* Right person */}
                      <circle cx="19" cy="8.5" r="2.3" fill="url(#auth-purple-grad)" opacity="0.9" />
                      <path d="M19 12.2c.35 0 .65.1 1 .3.65.6 1 1.5 1 2.5v1.5h-3.8v-1.7c0-1.6-2-2.6-3.8-2.6z" fill="url(#auth-purple-grad)" opacity="0.9" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-bold text-white tracking-wide leading-tight mt-2.5 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    Gaming
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#D8B4FE] leading-tight block drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    Community
                  </span>
                </Link>

                {/* Feature 4: AI Gaming Assistant */}
                <Link
                  href="/assistant"
                  className="flex flex-col items-center text-center px-1.5 py-1 group transition-all duration-200"
                >
                  <div className="relative">
                    <svg
                      className="w-8 h-8 text-[#A855F7] filter drop-shadow-[0_0_14px_rgba(168,85,247,0.95)] group-hover:scale-110 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="url(#auth-purple-grad)"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-bold text-white tracking-wide leading-tight mt-2.5 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    AI Gaming
                  </span>
                  <span className="text-[11.5px] font-semibold text-[#D8B4FE] leading-tight block drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    Assistant
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* RIGHT AREA: THE GLOWING VIOLET LOGIN CARD (Image 2) */}
          {/* ==================================================== */}
          <div className="auth-entry-card lg:col-span-6 flex flex-col items-center lg:items-end w-full">
            <div className="w-full max-w-[460px] rounded-2xl border border-[rgba(168,85,247,0.35)] bg-[#14111F] px-4 py-5 sm:px-8 sm:py-7 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden font-sans">

              {/* Soft purple ambient back-glow inside card */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#A855F7]/15 rounded-full blur-[70px] pointer-events-none" />

              {/* Card Header */}
              <div className="text-center mb-4 sm:mb-5">
                <h1 className="text-[26px] sm:text-[32px] font-[800] text-[#F4F1FF] uppercase tracking-tight leading-none">
                  {activeTab === "login" ? "Welcome Back" : "Join ETHORA"}
                </h1>
                <p className="text-[12.5px] sm:text-[13px] font-[400] text-[#7D7896] mt-1.5 sm:mt-2">
                  {activeTab === "login"
                    ? "Sign in to your ETHORA account"
                    : "Create your account and enter the arena"}
                </p>
              </div>

              {/* Dual Tab Switcher: [ 👤 Login ]  [ + Register ] */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-[#0A0A12] border border-[rgba(168,85,247,0.25)] mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-[600] transition ${activeTab === "login"
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
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-[600] transition ${activeTab === "register"
                    ? "bg-[#A855F7] text-[#F4F1FF] shadow-[0_0_14px_rgba(168,85,247,0.4)]"
                    : "text-[#B8B3CC] hover:text-[#F4F1FF]"
                    }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>

              {/* COMPACT SLEEK QUICK-FILL DEMO BAR (NON-INTRUSIVE) */}
              {activeTab === "login" && (
                <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-[#0A0A12] border border-[rgba(168,85,247,0.25)] flex items-center justify-between gap-1.5">
                  <span className="text-[11px] font-[600] text-[#7D7896] flex items-center gap-1 shrink-0 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#A855F7]" />
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
                          className={`px-2 py-0.5 rounded text-[11px] font-[600] transition whitespace-nowrap ${isSelected
                            ? "bg-[#A855F7] text-[#F4F1FF] shadow-sm"
                            : "bg-[#14111F] border border-[rgba(168,85,247,0.25)] text-[#B8B3CC] hover:text-[#F4F1FF]"
                            }`}
                          title={`Auto-fill ${account.name} (${account.roleLabel})`}
                        >
                          {account.tag}
                        </button>
                      );
                    })}
                  </div>

                  {statusNotice && (
                    <span className="text-[10px] font-mono text-[#22C55E] shrink-0">
                      ✓
                    </span>
                  )}
                </div>
              )}

              {/* ================================================= */}
              {/* LOGIN TAB FORM                                    */}
              {/* ================================================= */}
              {activeTab === "login" && (
                <form onSubmit={handleSignIn} className="space-y-3.5">
                  {/* Email Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7D7896]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#0A0A12] border border-[rgba(168,85,247,0.25)] focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] text-[16px] font-[400] text-[#F4F1FF] placeholder-[#7D7896] transition outline-none"
                    />
                  </div>

                  {/* Password Input with eye toggle */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7D7896]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0A0A12] border border-[rgba(168,85,247,0.25)] focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] text-[16px] font-[400] text-[#F4F1FF] placeholder-[#7D7896] transition outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#7D7896] hover:text-[#F4F1FF] transition cursor-pointer"
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
                  <div className="flex items-center justify-between text-[12.5px] pt-0.5">
                    <label className="flex items-center gap-1.5 text-[#B8B3CC] cursor-pointer select-none font-[400]">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-3.5 h-3.5 rounded border-[rgba(168,85,247,0.4)] bg-[#0A0A12] text-[#A855F7] focus:ring-[#A855F7] cursor-pointer"
                      />
                      <span>Remember me</span>
                    </label>

                    <Link
                      href="/auth/forgot-password"
                      className="text-[#A855F7] hover:text-[#C084FC] font-[500] transition"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Primary Action Button: [ Sign In > ] */}
                  <div className="pt-1.5">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-[#A855F7] hover:bg-[#9333EA] text-[#F4F1FF] font-[700] text-[15px] uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.45)] transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <>
                          <span>SIGN IN</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

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
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {/* Google */}
                    <button
                      type="button"
                      onClick={() => setOauthProvider("google")}
                      className="py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl border border-purple-900/60 bg-[#060411] hover:bg-[#120b29] hover:border-purple-500/70 text-slate-200 hover:text-white transition flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold cursor-pointer"
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

                    {/* Discord */}
                    <button
                      type="button"
                      onClick={() => setOauthProvider("discord")}
                      className="py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl border border-purple-900/60 bg-[#060411] hover:bg-[#120b29] hover:border-[#5865F2]/70 text-slate-200 hover:text-white transition flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 fill-[#5865F2]" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                      <span>Discord</span>
                    </button>

                    {/* Twitch */}
                    <button
                      type="button"
                      onClick={() => setOauthProvider("twitch")}
                      className="py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl border border-purple-900/60 bg-[#060411] hover:bg-[#120b29] hover:border-[#9146FF]/70 text-slate-200 hover:text-white transition flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 fill-[#9146FF]" viewBox="0 0 24 24">
                        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                      </svg>
                      <span>Twitch</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ================================================= */}
              {/* REGISTER TAB FORM                                 */}
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
                        className={`py-2 px-3 rounded-xl text-[13px] font-[600] border transition ${regRole === "gamer"
                          ? "bg-[#A855F7] border-[#A855F7] text-[#F4F1FF] shadow-[0_0_12px_rgba(168,85,247,0.35)]"
                          : "bg-[#0A0A12] border-[rgba(168,85,247,0.25)] text-[#7D7896] hover:text-[#B8B3CC]"
                          }`}
                      >
                        Gamer
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegRole("organizer")}
                        className={`py-2 px-3 rounded-xl text-[13px] font-[600] border transition ${regRole === "organizer"
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
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Create password"
                      className="w-full px-3 py-2.5 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#0A0A12] text-[16px] font-[400] text-[#F4F1FF] placeholder-[#7D7896] focus:outline-none focus:border-[#A855F7]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-[#A855F7] hover:bg-[#9333EA] text-[#F4F1FF] font-[700] text-[15px] uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.45)] transition"
                    >
                      {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT →"}
                    </button>
                  </div>
                </form>
              )}

              {/* Bottom Community Footer Note */}
              <div className="mt-4 pt-3 border-t border-[rgba(168,85,247,0.2)] text-center">
                <p className="text-[12.5px] font-[400] text-[#7D7896]">
                  Join <span className="text-[#A855F7] font-[600]">ETHORA</span> today and be
                  part of the ultimate gaming community!
                </p>
              </div>
            </div>

            {/* Mobile Feature Strip (Ensures mobile users also see the 4 purple features) */}
            <div className="lg:hidden w-full max-w-[460px] mt-4 pt-3 border-t border-purple-500/25">
              <div className="w-full grid grid-cols-4 items-center divide-x divide-purple-500/25 py-1">
                <Link href="/tournaments" className="flex flex-col items-center text-center px-0.5 sm:px-1 py-1">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#C084FC] filter drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-white mt-1 block leading-tight">Tournaments</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-[#D8B4FE] block leading-tight">&amp; Events</span>
                </Link>
                <Link href="/rankings" className="flex flex-col items-center text-center px-0.5 sm:px-1 py-1">
                  <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#A855F7] filter drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-white mt-1 block leading-tight">Rankings &amp;</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-[#D8B4FE] block leading-tight">Boards</span>
                </Link>
                <Link href="/gamers" className="flex flex-col items-center text-center px-0.5 sm:px-1 py-1">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#A855F7] filter drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-white mt-1 block leading-tight">Gaming</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-[#D8B4FE] block leading-tight">Community</span>
                </Link>
                <Link href="/assistant" className="flex flex-col items-center text-center px-0.5 sm:px-1 py-1">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#A855F7] filter drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-white mt-1 block leading-tight">AI Gaming</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-[#D8B4FE] block leading-tight">Assistant</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Bottom subtle edge */}
      <div className="h-2 pointer-events-none" />

      {/* Simulated Interactive Social OAuth Modal */}
      <OAuthModal
        isOpen={!!oauthProvider}
        provider={oauthProvider || "discord"}
        onClose={() => setOauthProvider(null)}
      />
    </div>
  );
}
