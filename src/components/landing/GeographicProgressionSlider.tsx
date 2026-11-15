"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Globe2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MapPin,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Flame,
  Award,
  Crown,
} from "lucide-react";

interface ProgressionStep {
  step: string;
  name: string;
  tier: string;
  tagline: string;
  description: string;
  venues: string;
  perks: string[];
  gradient: string;
  borderColor: string;
  accentText: string;
  glowColor: string;
  icon: any;
  tournamentsCount: string;
}

const PROGRESSION_STEPS: ProgressionStep[] = [
  {
    step: "01",
    name: "Community Hub",
    tier: "Tier: Grassroots",
    tagline: "Local Gaming Lounges & Cyber Cafes",
    description:
      "Play in local gaming lounges (e.g. Bole Medhanialem, Piassa Cyber, Hawassa Net Zone).",
    venues: "Bole Medhanialem, Piassa Cyber, Hawassa Net Zone, Adama Cyber Hub",
    perks: [
      "Official ETHORA Grassroots ELO points",
      "Local gaming lounge verified rankings",
      "Weekly community scrims & cash cups",
      "Discover local teammates in your neighborhood",
    ],
    gradient: "from-cyan-950/40 via-[#0E111A] to-[#141826]",
    borderColor: "border-cyan-500/40 hover:border-cyan-400",
    accentText: "text-cyan-400",
    glowColor: "bg-cyan-500/10",
    icon: MapPin,
    tournamentsCount: "24 Grassroots Tournaments Open",
  },
  {
    step: "02",
    name: "Woreda / City",
    tier: "Tier: City Contender",
    tagline: "Official Sub-City Championships",
    description:
      "Compete in official sub-city cups (e.g. Bole Sub-City, Adama City, Bahir Dar League).",
    venues: "Sub-city esports arenas, Adama City Center, Bahir Dar University Hall",
    perks: [
      "Verified Athlete Passport badge",
      "Official sub-city jersey allocation",
      "Regional bracket seed placement",
      "City championship trophy & prize pool",
    ],
    gradient: "from-emerald-950/40 via-[#0E111A] to-[#141826]",
    borderColor: "border-emerald-500/40 hover:border-emerald-400",
    accentText: "text-emerald-400",
    glowColor: "bg-emerald-500/10",
    icon: ShieldCheck,
    tournamentsCount: "12 City Cups Scheduled",
  },
  {
    step: "03",
    name: "Zone Series",
    tier: "Tier: Regional Elite",
    tagline: "Inter-Zone Competitive Clash",
    description:
      "Clash with neighboring zone teams (e.g. Central Addis, East Shewa, South Wollo).",
    venues: "Multi-Zone Arena Hubs & Online Broadcaster Lobbies",
    perks: [
      "Sanctioned prize purses: 10,000 - 50,000 ETB",
      "Professional esports team talent scouting",
      "Live streamed semifinal & final matches",
      "Official zone ranking leaderboard movement",
    ],
    gradient: "from-blue-950/40 via-[#0E111A] to-[#141826]",
    borderColor: "border-blue-500/40 hover:border-blue-400",
    accentText: "text-blue-400",
    glowColor: "bg-blue-500/10",
    icon: Flame,
    tournamentsCount: "8 Inter-Zone Qualifiers",
  },
  {
    step: "04",
    name: "Regional Finals",
    tier: "Tier: State Master",
    tagline: "Broadcasted State Championships",
    description:
      "Broadcasted state championships across Addis Ababa, Oromia, Amhara, Sidama, Tigray.",
    venues: "Regional Cultural Centers & Provincial Stadium Hubs",
    perks: [
      "Broadcasted on Ethiopian national esports streams",
      "Travel accommodation & official bootcamp support",
      "Sponsorship & professional organization contracts",
      "Gold State Master medal and 150K+ ETB purse",
    ],
    gradient: "from-violet-950/40 via-[#0E111A] to-[#141826]",
    borderColor: "border-violet-500/50 hover:border-violet-400 shadow-glow-violet",
    accentText: "text-violet-400",
    glowColor: "bg-violet-500/15",
    icon: Trophy,
    tournamentsCount: "5 Regional State Finals",
  },
  {
    step: "05",
    name: "National Apex",
    tier: "Tier: National Champion",
    tagline: "Grand Finals at Millennium Hall",
    description:
      "Grand Finals at Millennium Hall, national team selection & international VCT / IESF berths.",
    venues: "Millennium Hall Arena • Main Stage • Addis Ababa",
    perks: [
      "Compete on main stage at Millennium Hall in front of thousands",
      "Ethiopian National Esports Team roster selection",
      "Direct qualification into international VCT / IESF world championships",
      "500,000+ ETB prize purse and National Champion trophy",
    ],
    gradient: "from-amber-950/40 via-[#0E111A] to-[#141826]",
    borderColor: "border-amber-500/60 hover:border-amber-400 shadow-glow-gold",
    accentText: "text-amber-400",
    glowColor: "bg-amber-500/20",
    icon: Crown,
    tournamentsCount: "Ethiopia National Grand Finals",
  },
];

export const GeographicProgressionSlider: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const activeStage = PROGRESSION_STEPS[activeIdx];
  const StageIcon = activeStage.icon;

  // Auto-play sliding effect (slides every 6 seconds)
  useEffect(() => {
    if (!isAutoPlay || isHovered) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PROGRESSION_STEPS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % PROGRESSION_STEPS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + PROGRESSION_STEPS.length) % PROGRESSION_STEPS.length);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    if (deltaX > 50) {
      handlePrev();
    } else if (deltaX < -50) {
      handleNext();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-semibold mb-3">
          <Globe2 className="w-3.5 h-3.5" />
          Interactive Geographic Hierarchy Architecture
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
          FROM KEBELE TO NATIONAL CROWN
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed font-sans">
          ETHORA's multi-tier ranking engine allows any gamer starting in their neighborhood gaming lounge
          to build verified reputation and climb into national and continental esports arenas.
        </p>
      </div>

      {/* 2. DYNAMIC TIMELINE & PROGRESS STEPPER TRACK */}
      <div className="mb-10 max-w-5xl mx-auto px-2">
        {/* Horizontal Connecting Progress Line */}
        <div className="relative mb-6">
          <div className="h-1.5 w-full bg-[#141826] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 transition-all duration-700 ease-out"
              style={{
                width: `${(activeIdx / (PROGRESSION_STEPS.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Stepper Buttons along the line */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex items-center justify-between">
            {PROGRESSION_STEPS.map((s, idx) => {
              const isActive = idx === activeIdx;
              const isPast = idx < activeIdx;

              return (
                <button
                  key={s.step}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative flex flex-col items-center focus:outline-none transition-transform ${
                    isActive ? "scale-110" : "hover:scale-105"
                  }`}
                  title={`Jump to ${s.step}: ${s.name}`}
                >
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-mono font-bold text-xs sm:text-sm border-2 transition-all ${
                      isActive
                        ? "bg-violet-600 text-white border-white shadow-glow-violet ring-4 ring-violet-500/30"
                        : isPast
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/60"
                        : "bg-[#0E111A] text-slate-400 border-[#232A42] hover:border-slate-400"
                    }`}
                  >
                    {s.step}
                  </div>

                  <span
                    className={`hidden md:block text-[11px] font-semibold tracking-wider uppercase mt-2 whitespace-nowrap transition ${
                      isActive
                        ? "text-white font-bold"
                        : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  >
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slider Controls Bar (Prev / Next / Auto-play Toggle / Step Indicator) */}
        <div className="flex items-center justify-between pt-4 text-xs text-slate-400 font-sans">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition text-[11px] font-medium ${
                isAutoPlay
                  ? "bg-violet-600/20 border-violet-500/50 text-violet-300"
                  : "bg-[#141826] border-[#232A42] text-slate-400"
              }`}
              title={isAutoPlay ? "Pause auto-sliding" : "Start auto-sliding"}
            >
              {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoPlay ? "Auto-Sliding" : "Paused"}</span>
            </button>

            <span className="text-[11px] text-slate-500 hidden sm:inline">
              (Stage {activeIdx + 1} of 5)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl border border-[#232A42] bg-[#141826] hover:bg-[#1C2237] hover:border-violet-500/40 text-slate-300 hover:text-white transition active:scale-95"
              aria-label="Previous Progression Stage"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-xl border border-[#232A42] bg-[#141826] hover:bg-[#1C2237] hover:border-violet-500/40 text-slate-300 hover:text-white transition active:scale-95"
              aria-label="Next Progression Stage"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. FEATURED ACTIVE STAGE SHOWCASE (DYNAMIC, MOVABLE, RICH) */}
      <div
        className="relative rounded-3xl border border-[#232A42] bg-[#0E111A] overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10 transition-all duration-500"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Stage ambient glow */}
        <div
          className={`absolute top-0 right-0 w-96 h-96 ${activeStage.glowColor} rounded-full blur-[120px] pointer-events-none transition-colors duration-700`}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Stage Meta & Exact User Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-4xl sm:text-5xl font-black text-slate-700 select-none">
                {activeStage.step}
              </span>
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#141826] border ${activeStage.borderColor} ${activeStage.accentText}`}
                >
                  {activeStage.tier}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {activeStage.tagline}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {activeStage.name}
              </h3>
              <p className="font-sans text-base sm:text-lg text-slate-200 leading-relaxed">
                {activeStage.description}
              </p>
            </div>

            {/* Official Venues */}
            <div className="p-3.5 rounded-2xl bg-[#141826]/80 border border-[#232A42] flex items-center gap-3 text-xs text-slate-300">
              <MapPin className={`w-4 h-4 shrink-0 ${activeStage.accentText}`} />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono font-bold">
                  Sanctioned Venue Grounds
                </span>
                <span className="font-medium text-white">{activeStage.venues}</span>
              </div>
            </div>

            {/* CTA Link */}
            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/tournaments"
                className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-sans font-medium text-xs tracking-wider uppercase shadow-glow-violet transition flex items-center gap-2 group"
              >
                <span>Browse {activeStage.name} Tournaments</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <span className="text-xs text-emerald-400 font-medium font-mono hidden sm:inline">
                ● {activeStage.tournamentsCount}
              </span>
            </div>
          </div>

          {/* Right Column: Unlockable Perks Card & Trophy Preview */}
          <div className="lg:col-span-5">
            <div
              className={`p-6 sm:p-7 rounded-2xl bg-gradient-to-b ${activeStage.gradient} border ${activeStage.borderColor} shadow-2xl space-y-4`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#232A42]">
                <div className="flex items-center gap-2">
                  <StageIcon className={`w-5 h-5 ${activeStage.accentText}`} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    Unlockable Stage Perks
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 text-slate-300 border border-slate-700">
                  Tier {activeStage.step}
                </span>
              </div>

              <ul className="space-y-3 font-sans text-xs sm:text-sm text-slate-300">
                {activeStage.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${activeStage.accentText}`}
                    />
                    <span className="leading-snug">{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-[#232A42] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Verification Requirement:</span>
                <span className="text-white font-bold">ETHORA Gamer Passport</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. HORIZONTAL SLIDING CARD PREVIEW TRACK (CLICKABLE TO SLIDE) */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-sans">
          <span>Click any stage card to slide directly to it:</span>
          <span className="font-mono text-violet-400">Step {activeStage.step} / 05</span>
        </div>

        {/* 5 Cards Row with Dynamic Transform / Slide Indicator */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5">
          {PROGRESSION_STEPS.map((s, idx) => {
            const isSelected = idx === activeIdx;

            return (
              <button
                key={s.step}
                onClick={() => setActiveIdx(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-3 relative group overflow-hidden ${
                  isSelected
                    ? `bg-[#141826] ${s.borderColor} shadow-glow-violet scale-[1.02] ring-2 ring-violet-500/40`
                    : "bg-[#0E111A] border-[#232A42] hover:bg-[#141826] hover:border-slate-500 opacity-75 hover:opacity-100"
                }`}
              >
                {/* Active Indicator Top Stripe */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400" />
                )}

                <div className="flex items-center justify-between">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                      isSelected ? "bg-violet-600 text-white" : "bg-[#141826] text-slate-400"
                    }`}
                  >
                    {s.step}
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase ${
                      isSelected ? s.accentText : "text-slate-500"
                    }`}
                  >
                    {s.tier.replace("Tier: ", "")}
                  </span>
                </div>

                <div>
                  <h4 className="font-sans font-bold text-sm text-white group-hover:text-violet-300 transition">
                    {s.name}
                  </h4>
                  <p className="font-sans text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                    {s.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#232A42] flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{isSelected ? "● Active Stage" : "Click to view"}</span>
                  <ChevronRight
                    className={`w-3 h-3 transition-transform ${
                      isSelected ? "translate-x-1 text-violet-400" : ""
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GeographicProgressionSlider;

