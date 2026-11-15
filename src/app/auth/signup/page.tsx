"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Swords,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Gamepad2,
  Lock,
  Mail,
  User,
  Sparkles,
} from "lucide-react";
import { EthoraEmblem } from "@/components/brand/EthoraLogo";
import { useEthora, RoleType } from "@/context/EthoraContext";
import { ETHIOPIA_GEOGRAPHY, getZonesByRegion, getWoredasByZone } from "@/data/geography";
import { SUPPORTED_GAMES } from "@/data/games";

export default function SignUpPage() {
  const router = useRouter();
  const { setRole } = useEthora();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [role, setSelectedRole] = useState<RoleType>("gamer");

  // Step 2 Form
  const [gamerTag, setGamerTag] = useState("");
  const [realName, setRealName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 3 Geographic Form
  const [regionId, setRegionId] = useState("reg-aa");
  const [zoneId, setZoneId] = useState("zone-aa-central");
  const [woredaId, setWoredaId] = useState("wor-bole");
  const [community, setCommunity] = useState("Bole Medhanialem Cyber Lounge");

  // Step 4 Game Form
  const [primaryGameId, setPrimaryGameId] = useState("game-valorant");
  const [inGameName, setInGameName] = useState("");

  const zones = getZonesByRegion(regionId);
  const woredas = getWoredasByZone(regionId, zoneId);

  const handleNext = () => {
    if (step < 4) setStep((s) => (s + 1) as any);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as any);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(role);
    if (role === "organizer") {
      router.push("/organizer");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 cyber-grid-pattern relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <EthoraEmblem size="lg" className="mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            JOIN THE ETHORA ARENA
          </h2>
          <p className="text-xs text-slate-400">
            Create your verified Ethiopian esports profile and tournament passport
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="flex items-center justify-between px-6">
          {[
            { num: 1, label: "Role" },
            { num: 2, label: "Profile" },
            { num: 3, label: "Location" },
            { num: 4, label: "Game Title" },
          ].map((item, idx) => (
            <div key={item.num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition ${
                  step === item.num
                    ? "bg-violet-600 text-white shadow-glow-violet"
                    : step > item.num
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-[#141826] text-slate-500 border border-[#232A42]"
                }`}
              >
                {step > item.num ? "✓" : item.num}
              </div>
              <span className="hidden sm:inline text-xs font-medium text-slate-400">{item.label}</span>
              {idx < 3 && <div className="hidden sm:block w-8 h-[1px] bg-[#232A42] mx-1" />}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[#232A42] bg-[#0E111A]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* STEP 1: ROLE SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="mb-2">
                <h3 className="text-lg font-bold text-white font-mono">Select Your Ecosystem Role</h3>
                <p className="text-xs text-slate-400">Choose how you plan to participate on ETHORA.</p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole("gamer")}
                  className={`w-full p-4 rounded-xl border text-left transition flex items-center gap-4 ${
                    role === "gamer"
                      ? "border-violet-500 bg-violet-950/20 shadow-glow-violet"
                      : "border-[#232A42] bg-[#141826] hover:bg-[#1C2237]"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-400 shrink-0">
                    <Swords className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold text-white block">Competitive Gamer</span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Compete in tournaments, rise through national rankings, build teams, and earn prizes.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("organizer")}
                  className={`w-full p-4 rounded-xl border text-left transition flex items-center gap-4 ${
                    role === "organizer"
                      ? "border-violet-500 bg-violet-950/20 shadow-glow-violet"
                      : "border-[#232A42] bg-[#141826] hover:bg-[#1C2237]"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-600/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold text-white block">Tournament Organizer</span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Host official competitions, manage brackets, verify participants, and publish results.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("organization")}
                  className={`w-full p-4 rounded-xl border text-left transition flex items-center gap-4 ${
                    role === "organization"
                      ? "border-violet-500 bg-violet-950/20 shadow-glow-violet"
                      : "border-[#232A42] bg-[#141826] hover:bg-[#1C2237]"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-600/20 flex items-center justify-center text-amber-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold text-white block">Esports Organization</span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      Scout top Ethiopian talent, manage sponsored team rosters, and build brand prestige.
                    </span>
                  </div>
                </button>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-violet transition flex items-center justify-center gap-2"
                >
                  <span>Continue to Profile Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CREDENTIALS & IDENTITY */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="mb-2">
                <h3 className="text-lg font-bold text-white font-mono">Gamer Credentials</h3>
                <p className="text-xs text-slate-400">Enter your competitive tag and login credentials.</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Competitive Gamer Tag / Handle
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={gamerTag}
                    onChange={(e) => setGamerTag(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition font-mono"
                    placeholder="e.g. ShadowViper, LionHeart, Kiro"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Real Full Name
                </label>
                <input
                  type="text"
                  required
                  value={realName}
                  onChange={(e) => setRealName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition"
                  placeholder="e.g. Yared Tadesse"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-3 rounded-xl border border-[#232A42] bg-[#141826] hover:bg-[#1C2237] text-slate-300 text-xs font-bold uppercase transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-violet transition flex items-center justify-center gap-2"
                >
                  <span>Select Ethiopian Region</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ETHIOPIAN GEOGRAPHIC RANKING ANCHOR */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="mb-2">
                <h3 className="text-lg font-bold text-white font-mono">Geographic Hierarchy</h3>
                <p className="text-xs text-slate-400">
                  Select your Ethiopian region and local community to seed your regional ranking ladder.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Region
                  </label>
                  <select
                    value={regionId}
                    onChange={(e) => {
                      setRegionId(e.target.value);
                      const z = getZonesByRegion(e.target.value);
                      if (z[0]) {
                        setZoneId(z[0].id);
                        if (z[0].woredas[0]) {
                          setWoredaId(z[0].woredas[0].id);
                          setCommunity(z[0].woredas[0].communities[0] || "");
                        }
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white focus:outline-none focus:border-violet-500"
                  >
                    {ETHIOPIA_GEOGRAPHY.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Zone / Sub-City
                  </label>
                  <select
                    value={zoneId}
                    onChange={(e) => {
                      setZoneId(e.target.value);
                      const w = getWoredasByZone(regionId, e.target.value);
                      if (w[0]) {
                        setWoredaId(w[0].id);
                        setCommunity(w[0].communities[0] || "");
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white focus:outline-none focus:border-violet-500"
                  >
                    {zones.map((z) => (
                      <option key={z.id} value={z.id}>
                        {z.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Woreda / City Area
                  </label>
                  <select
                    value={woredaId}
                    onChange={(e) => {
                      setWoredaId(e.target.value);
                      const currentWoreda = woredas.find((w) => w.id === e.target.value);
                      if (currentWoreda && currentWoreda.communities[0]) {
                        setCommunity(currentWoreda.communities[0]);
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white focus:outline-none focus:border-violet-500"
                  >
                    {woredas.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Local Community or Gaming Hub
                  </label>
                  <input
                    type="text"
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white focus:outline-none focus:border-violet-500"
                    placeholder="e.g. Bole Medhanialem Cyber Lounge, Sarbet Arena"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-3 rounded-xl border border-[#232A42] bg-[#141826] hover:bg-[#1C2237] text-slate-300 text-xs font-bold uppercase transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-violet transition flex items-center justify-center gap-2"
                >
                  <span>Select Competitive Title</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PRIMARY GAME SELECTION */}
          {step === 4 && (
            <form onSubmit={handleFinish} className="space-y-4">
              <div className="mb-2">
                <h3 className="text-lg font-bold text-white font-mono">Primary Esports Title</h3>
                <p className="text-xs text-slate-400">
                  Select the game you primarily compete in and connect your initial IGN.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SUPPORTED_GAMES.map((game) => (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => setPrimaryGameId(game.id)}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-2 ${
                      primaryGameId === game.id
                        ? "border-violet-500 bg-violet-950/40 shadow-glow-violet"
                        : "border-[#232A42] bg-[#141826] hover:bg-[#1C2237]"
                    }`}
                  >
                    <Gamepad2 className="w-5 h-5 text-violet-400" />
                    <span className="text-xs font-bold text-white truncate w-full">{game.name}</span>
                    <span className="text-[10px] text-slate-400">{game.genre}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  In-Game ID / Gamertag for this title
                </label>
                <input
                  type="text"
                  required
                  value={inGameName}
                  onChange={(e) => setInGameName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition font-mono"
                  placeholder="e.g. ViperX#ET01 or STEAM_0:1:4829104"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  Your initial ETHORA Passport will be issued with provisional Tier Challenger status.
                </span>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-3 rounded-xl border border-[#232A42] bg-[#141826] hover:bg-[#1C2237] text-slate-300 text-xs font-bold uppercase transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-violet transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Issue ETHORA Passport & Enter</span>
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-[#232A42] text-center text-xs text-slate-400">
            <span>Already have an account? </span>
            <Link href="/auth/signin" className="font-bold text-violet-400 hover:text-violet-300 transition">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

