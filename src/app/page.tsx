"use client";

import React from "react";
import Link from "next/link";
import {
  Trophy,
  Swords,
  ShieldCheck,
  Flame,
  ArrowRight,
  Sparkles,
  MapPin,
  Users,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Globe2,
  Calendar,
  Layers,
  Gamepad2,
  CheckCircle2,
} from "lucide-react";
import { EthoraEmblem } from "@/components/brand/EthoraLogo";
import { useEthora } from "@/context/EthoraContext";
import { formatETB, formatNumber, getRankTier } from "@/lib/utils";
import { SUPPORTED_GAMES } from "@/data/games";
import GeographicProgressionSlider from "@/components/landing/GeographicProgressionSlider";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function HomePage() {
  const { tournaments, gamers, currentSession } = useEthora();

  // Get top 3 gamers for the podium
  const topGamers = [...gamers].sort((a, b) => b.ratingPoints - a.ratingPoints).slice(0, 3);
  // Get active/featured tournaments
  const featuredTournaments = tournaments.slice(0, 3);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8 bg-ethora-mesh cyber-grid-pattern">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* MInT Spec: Eyebrow tag: Public Sans, 13px, weight 500, underline (not caps) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/40 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-sans text-[13px] font-medium text-violet-200 underline decoration-violet-400/60 underline-offset-4">
                Addis Masters Finals • Millennium Hall Arena live now
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-violet-400" />
            </div>

            {/* MInT Spec: Headline: Fraunces (serif), 48–64px, weight 500 */}
            <div className="space-y-3">
              <h1 className="font-serif text-[44px] sm:text-[54px] lg:text-[62px] font-medium text-white leading-[1.08] tracking-tight">
                Where gamers <br />
                <span className="text-gradient-violet">become legends.</span>
              </h1>
              {/* MInT Spec: Subhead: Public Sans, 18–19px, weight 400 */}
              <p className="font-sans text-[18px] sm:text-[19px] font-normal text-slate-300 max-w-2xl leading-relaxed pt-1">
                Ethiopia&apos;s definitive esports ecosystem. Create your verified gamer identity, compete in regional
                circuits, rise through national leaderboards, and get scouted by premier organizations.
              </p>
            </div>

            {/* MInT Spec: Primary & Secondary CTAs: Public Sans, 15px, weight 500 */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <Link
                href="/tournaments"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-sans text-[15px] font-medium shadow-glow-violet transition-all flex items-center justify-center gap-2 group"
              >
                <Swords className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Explore Competitions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={currentSession.role === "guest" ? "/auth/signin" : "/dashboard"}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[#3A456B] bg-[#0E111A]/90 hover:bg-[#141826] hover:border-violet-500/50 text-slate-200 hover:text-white font-sans text-[15px] font-medium transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{currentSession.role === "guest" ? "Sign In / Register" : "Open Dashboard"}</span>
              </Link>
            </div>

            {/* Subtle Proof badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Anti-Cheat</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant ETB Payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Multi-Level Geographic Rankings</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: 3D-styled Gamer Identity & Live Bracket Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md w-full">
              {/* Decorative back glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 to-cyan-500/30 rounded-3xl blur-2xl transform rotate-3 scale-95" />

              {/* Main Gamer Card Preview */}
              <div className="relative rounded-2xl border border-violet-500/40 bg-[#0E111A]/95 p-6 shadow-2xl backdrop-blur-xl">
                {/* Header with Ethiopian subtle pride tag */}
                <div className="flex items-center justify-between pb-4 border-b border-[#232A42]">
                  <div className="flex items-center gap-2">
                    <EthoraEmblem size="sm" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                          ETHORA PASSPORT
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[10px] text-slate-400">National Competitor Registry</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-violet-950/80 text-violet-300 border border-violet-700/50">
                    ETH-7729-VIPER
                  </span>
                </div>

                {/* Player Profile Details */}
                <div className="pt-4 flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={gamers[0].avatar}
                      alt={gamers[0].gamerTag}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-violet-500 shadow-glow-violet"
                    />
                    <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center gap-0.5 shadow">
                      <Trophy className="w-2.5 h-2.5" />
                      #1
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-white truncate font-mono">{gamers[0].gamerTag}</h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-400 truncate">{gamers[0].realName}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>Bole Sub-City, Addis Ababa</span>
                    </div>
                  </div>
                </div>

                {/* Stat Grid */}
                <div className="grid grid-cols-3 gap-2.5 mt-5">
                  <div className="p-2.5 rounded-xl bg-[#141826] border border-[#232A42] text-center">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Rating Points</span>
                    <span className="text-lg font-black text-violet-400 font-mono">3,420</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#141826] border border-[#232A42] text-center">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Win Rate</span>
                    <span className="text-lg font-black text-emerald-400 font-mono">77.0%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#141826] border border-[#232A42] text-center">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Earned</span>
                    <span className="text-sm font-black text-amber-400 font-mono truncate mt-1 block">385K ETB</span>
                  </div>
                </div>

                {/* Floating Tournament Card Overlay */}
                <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-violet-950/60 to-purple-900/40 border border-violet-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-violet-600/40 flex items-center justify-center text-violet-300">
                      <Flame className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">VCT Africa Ascension Qualifier</p>
                      <p className="text-[10px] text-emerald-400 font-medium">Grand Finals Match • In Progress</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-white px-2 py-1 rounded bg-violet-600/60">
                    2 - 1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE COMPETITIVE STATS BAR (ANIMATED COUNT-UP NUMBERS) */}
      <section className="w-full border-y border-[#232A42] bg-[#0A0D15]/95 backdrop-blur-md py-8 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* 1. Registered Gamers: 48,200+ */}
            <div className="flex items-center gap-4 group cursor-pointer p-3 rounded-2xl hover:bg-[#141826]/60 transition-all border border-transparent hover:border-violet-500/30">
              <div className="w-12 h-12 rounded-xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0 group-hover:scale-110 group-hover:bg-violet-600/25 transition-all shadow-glow-violet">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white font-mono flex items-center">
                  <AnimatedCounter
                    target={48200}
                    suffix="+"
                    duration={2400}
                    formatComma={true}
                    className="group-hover:text-violet-300 transition-colors"
                  />
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider font-sans">
                    Registered Gamers
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Active Tournaments: 38 */}
            <div className="flex items-center gap-4 group cursor-pointer p-3 rounded-2xl hover:bg-[#141826]/60 transition-all border border-transparent hover:border-cyan-500/30">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-110 group-hover:bg-cyan-500/25 transition-all shadow-glow-cyan">
                <Swords className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white font-mono flex items-center">
                  <AnimatedCounter
                    target={38}
                    duration={1800}
                    className="group-hover:text-cyan-300 transition-colors"
                  />
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider font-sans">
                    Active Tournaments
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Verified Teams: 420+ */}
            <div className="flex items-center gap-4 group cursor-pointer p-3 rounded-2xl hover:bg-[#141826]/60 transition-all border border-transparent hover:border-amber-500/30">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 group-hover:bg-amber-500/25 transition-all">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white font-mono flex items-center">
                  <AnimatedCounter
                    target={420}
                    suffix="+"
                    duration={2000}
                    className="group-hover:text-amber-300 transition-colors"
                  />
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider font-sans">
                    Verified Teams
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Prizes Distributed: 1.8M+ ETB */}
            <div className="flex items-center gap-4 group cursor-pointer p-3 rounded-2xl hover:bg-[#141826]/60 transition-all border border-transparent hover:border-emerald-500/30">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 group-hover:bg-emerald-500/25 transition-all">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono flex items-center">
                  <AnimatedCounter
                    target={1.8}
                    decimals={1}
                    suffix="M+ ETB"
                    duration={2500}
                    className="group-hover:text-emerald-300 transition-colors"
                  />
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider font-sans">
                    Prizes Distributed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED TOURNAMENTS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-violet-400 font-mono">
                Premier Competitions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-mono">FEATURED TOURNAMENTS</h2>
          </div>

          <Link
            href="/tournaments"
            className="inline-flex items-center gap-2 text-sm font-bold text-violet-400 hover:text-violet-300 transition group"
          >
            <span>View All Tournaments ({tournaments.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTournaments.map((tourn) => {
            const isFull = tourn.registeredCount >= tourn.maxParticipants;
            const isLive = tourn.status === "live";

            return (
              <div
                key={tourn.id}
                className="group rounded-2xl border border-[#232A42] bg-[#0E111A] overflow-hidden hover:border-[#3A456B] hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* Banner & Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={tourn.bannerUrl}
                    alt={tourn.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E111A] via-[#0E111A]/40 to-transparent" />

                  {/* Status Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {isLive ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-600 text-white flex items-center gap-1.5 shadow-lg animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        LIVE MATCHES
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-violet-600/90 text-white border border-violet-400/30">
                        {tourn.status === "registration_open" ? "REGISTRATION OPEN" : "UPCOMING"}
                      </span>
                    )}
                    <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-slate-300 border border-slate-700">
                      {tourn.venueType}
                    </span>
                  </div>

                  {/* Game Title Badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-black tracking-wider uppercase bg-black/80 text-violet-300 border border-violet-500/30 font-mono">
                      {tourn.gameName}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition line-clamp-1">
                      {tourn.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {tourn.description}
                    </p>
                  </div>

                  {/* Prize & Info Bar */}
                  <div className="pt-3 border-t border-[#232A42] grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Prize Pool</span>
                      <span className="text-base font-black text-amber-400 font-mono">
                        {formatETB(tourn.prizePoolETB)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Slots Filled</span>
                      <span className="text-sm font-bold text-slate-200 font-mono">
                        {tourn.registeredCount} / {tourn.maxParticipants} Teams
                      </span>
                    </div>
                  </div>

                  {/* Action Link */}
                  <Link
                    href={`/tournaments/${tourn.id}`}
                    className="w-full py-2.5 rounded-xl border border-violet-500/40 bg-violet-600/10 hover:bg-violet-600 text-violet-300 hover:text-white font-bold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 group-hover:border-violet-500"
                  >
                    <span>View Tournament & Bracket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. TOP RANKED GAMERS PODIUM */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A0D15]/80 border-y border-[#232A42]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-3">
              <Trophy className="w-3.5 h-3.5" />
              National Esports Leaderboard
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-mono">ETHIOPIA'S APEX GAMERS</h2>
            <p className="text-sm text-slate-400 mt-2">
              The highest rated competitive athletes across all supported titles, verified through official tournament play.
            </p>
          </div>

          {/* Podium Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
            {/* Rank 2 (Left) */}
            {topGamers[1] && (
              <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 text-center flex flex-col items-center hover:border-slate-500 transition">
                <div className="relative mb-3">
                  <img
                    src={topGamers[1].avatar}
                    alt={topGamers[1].gamerTag}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-400"
                  />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-300 text-slate-900 font-black text-xs flex items-center justify-center shadow">
                    #2
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-mono">{topGamers[1].gamerTag}</h3>
                <p className="text-xs text-slate-400">{topGamers[1].realName}</p>
                <div className="mt-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-200">
                  {topGamers[1].ratingPoints} Points
                </div>
                <p className="text-[11px] text-slate-500 mt-2">{topGamers[1].location.regionName}</p>
              </div>
            )}

            {/* Rank 1 (Center - Elevated) */}
            {topGamers[0] && (
              <div className="rounded-2xl border-2 border-amber-500/50 bg-gradient-to-b from-[#141826] to-[#0E111A] p-7 text-center flex flex-col items-center shadow-glow-gold relative -translate-y-4">
                <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  National Champion
                </div>
                <div className="relative mb-4 mt-2">
                  <img
                    src={topGamers[0].avatar}
                    alt={topGamers[0].gamerTag}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-amber-400 shadow-2xl"
                  />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg">
                    #1
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white font-mono">{topGamers[0].gamerTag}</h3>
                <p className="text-xs text-slate-400">{topGamers[0].realName}</p>
                <div className="mt-3 px-4 py-1.5 rounded-full text-sm font-mono font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {topGamers[0].ratingPoints} Points
                </div>
                <p className="text-xs text-amber-200/80 mt-2">{topGamers[0].location.communityName}</p>
              </div>
            )}

            {/* Rank 3 (Right) */}
            {topGamers[2] && (
              <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 text-center flex flex-col items-center hover:border-amber-700 transition">
                <div className="relative mb-3">
                  <img
                    src={topGamers[2].avatar}
                    alt={topGamers[2].gamerTag}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-700"
                  />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow">
                    #3
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-mono">{topGamers[2].gamerTag}</h3>
                <p className="text-xs text-slate-400">{topGamers[2].realName}</p>
                <div className="mt-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/40 text-amber-400 border border-amber-800/40">
                  {topGamers[2].ratingPoints} Points
                </div>
                <p className="text-[11px] text-slate-500 mt-2">{topGamers[2].location.regionName}</p>
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/rankings"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-violet-500/40 bg-violet-600/10 hover:bg-violet-600 text-white font-bold text-xs uppercase tracking-wider transition"
            >
              <span>Explore Complete National & Regional Leaderboards</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ETHIOPIAN GEOGRAPHIC PROGRESSION SYSTEM (DYNAMIC SLIDING & MOVABLE) */}
      <GeographicProgressionSlider />

      {/* 6. ETHORA AI ASSISTANT HIGHLIGHT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-violet-950/30 via-[#0E111A] to-purple-950/30 border-y border-[#232A42]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Integrated AI Esports Intelligence
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-mono">
              MEET ETHORA AI — YOUR COMPETITIVE COPILOT
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Whether you need advice on tournament registration eligibility, analyzing your K/D trends, finding local
              teammates in Bole or Hawassa, or organizing single-elimination brackets, ETHORA AI is built into every
              interaction.
            </p>
            <div className="pt-2">
              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-violet transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>Chat with Ethora AI</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 p-5 rounded-2xl border border-violet-500/30 bg-[#0E111A]/90 shadow-2xl space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-[#232A42] text-slate-400">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="font-bold text-white">Ethora AI Query Simulation</span>
            </div>
            <div className="p-3 rounded-lg bg-[#141826] text-slate-300">
              <span className="text-violet-400 font-bold">You:</span> "What Valorant tournaments in Addis Ababa are open
              for Ascendant rank players this month?"
            </div>
            <div className="p-3 rounded-lg bg-violet-950/30 border border-violet-500/30 text-slate-200 space-y-2">
              <span className="text-cyan-400 font-bold">Ethora AI:</span>
              <p className="font-sans text-xs leading-relaxed text-slate-300">
                "Found 2 tournaments matching your profile:
                <br />
                1. <strong>Ethiopian National Valorant Masters</strong> (Double Elim, 250,000 ETB Prize).
                <br />
                2. <strong>Sarbet Arena 5v5 Scrim Series</strong> (Weekend LAN). Your rating of 3,420 meets all entry requirements!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-violet-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white font-mono">
            YOUR JOURNEY TO THE TOP STARTS HERE.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Join thousands of Ethiopian competitors. Claim your Gamer ID, discover open tournaments, and turn your gaming
            passion into recognized competitive excellence.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm tracking-wide shadow-glow-violet transition"
            >
              Register Gamer Passport
            </Link>
            <Link
              href="/tournaments"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#3A456B] bg-[#0E111A] hover:bg-[#141826] text-slate-200 font-bold text-sm tracking-wide transition"
            >
              Browse Open Brackets
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
