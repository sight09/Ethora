"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Swords,
  Trophy,
  Flame,
  Radio,
  Users,
  MapPin,
  Zap,
  ChevronRight,
  Sparkles,
  Clock,
  Target,
  BarChart3,
  Coins,
  Search,
  CheckCircle2,
  Gamepad2,
  ArrowRight,
  Shield,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { SUPPORTED_GAMES } from "@/data/games";
import { formatETB } from "@/lib/utils";

interface MatchFeed {
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  map: string;
  venue: string;
  round: string;
  spectators: number;
  prizeETB: number;
}

const GAME_FEEDS: Record<string, MatchFeed> = {
  "game-valorant": {
    teamA: "Bole Lions",
    teamB: "Hawassa Vortex",
    scoreA: 2,
    scoreB: 1,
    map: "Ascent (Decider)",
    venue: "Millennium Hall Arena • Addis Ababa",
    round: "Round 19 / 24 • Spike Planted",
    spectators: 3840,
    prizeETB: 250000,
  },
  "game-eafc": {
    teamA: "Addis FC Elite",
    teamB: "Oromia Apex Gaming",
    scoreA: 3,
    scoreB: 2,
    map: "Santiago Bernabéu",
    venue: "Bole Medhanialem Cyber Lounge",
    round: "88th Minute • Extra Time",
    spectators: 5210,
    prizeETB: 350000,
  },
  "game-cs2": {
    teamA: "Piassa Cyber Clan",
    teamB: "Adama Titans",
    scoreA: 11,
    scoreB: 9,
    map: "Mirage • Half 2",
    venue: "Sarbet LAN Dome",
    round: "Round 21 • Retake Active",
    spectators: 2190,
    prizeETB: 180000,
  },
  "game-pubgm": {
    teamA: "Red Terror Squad",
    teamB: "Abyssinia Reapers",
    scoreA: 14,
    scoreB: 12,
    map: "Erangel • Final Circle",
    venue: "National Mobile Esports Hub",
    round: "Zone 6 • 4 Squads Alive",
    spectators: 8940,
    prizeETB: 200000,
  },
  "game-dota2": {
    teamA: "Rift Guardians",
    teamB: "Simien Wolves",
    scoreA: 28,
    scoreB: 24,
    map: "Ancient Siege (Game 3)",
    venue: "Bahir Dar Arena",
    round: "Roshan Contested • 42 mins",
    spectators: 1890,
    prizeETB: 150000,
  },
};

const REGIONS = [
  { id: "bole", name: "Bole Sub-City, Addis", ping: "7ms", rival: "Bole Medhanialem Sentinels" },
  { id: "arada", name: "Piassa / Arada Cyber, Addis", ping: "9ms", rival: "Piassa Net Phantoms" },
  { id: "adama", name: "Adama Cyber Dome, Oromia", ping: "14ms", rival: "Great Rift Strikers" },
  { id: "hawassa", name: "Hawassa Net Zone, Sidama", ping: "16ms", rival: "Lake Awassa Vipers" },
  { id: "bahirdar", name: "Bahir Dar Lake Hub, Amhara", ping: "18ms", rival: "Blue Nile Warriors" },
];

export default function InteractiveHeroArena() {
  const [selectedGameId, setSelectedGameId] = useState<string>("game-valorant");
  const [activeTab, setActiveTab] = useState<"live" | "prizes" | "scrim">("live");
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [isSearchingScrim, setIsSearchingScrim] = useState(false);
  const [scrimFound, setScrimFound] = useState<boolean>(false);
  const [tacticalStatsOpen, setTacticalStatsOpen] = useState(false);

  // Live real-time countdown timer
  const [secondsRemaining, setSecondsRemaining] = useState(6425);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 7200));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentGame = SUPPORTED_GAMES.find((g) => g.id === selectedGameId) || SUPPORTED_GAMES[0];
  const feed = GAME_FEEDS[selectedGameId] || GAME_FEEDS["game-valorant"];

  const handleStartScrimSearch = () => {
    setIsSearchingScrim(true);
    setScrimFound(false);
    setTimeout(() => {
      setIsSearchingScrim(false);
      setScrimFound(true);
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      {/* 1. DYNAMIC GAME SWITCHER PILLS (CLICKABLE) */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-5">
        {SUPPORTED_GAMES.map((game) => {
          const isSelected = game.id === selectedGameId;
          return (
            <button
              key={game.id}
              type="button"
              onClick={() => {
                setSelectedGameId(game.id);
                setScrimFound(false);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold font-mono flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#161B2E] text-white border-2 shadow-lg scale-105"
                  : "bg-[#0E111A]/80 border border-[#232A42] text-slate-400 hover:text-white hover:border-[#3A456B]"
              }`}
              style={{
                borderColor: isSelected ? game.accentColor : undefined,
                boxShadow: isSelected ? `0 0 20px ${game.accentColor}40` : undefined,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: game.accentColor }}
              />
              <span>{game.shortName}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-300">
                {game.activeTournaments} Tournaments
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. THE INTERACTIVE LIVE ARENA CONSOLE */}
      <div className="relative rounded-3xl border border-[#232A42] bg-[#0E111A]/95 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-500">
        {/* Dynamic game ambient backlight */}
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-[100px] opacity-25 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: currentGame.accentColor }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: currentGame.accentColor }}
        />

        {/* Top Control Bar: Mode Switcher + Live Countdown */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#232A42] relative z-10">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#090C15] border border-[#1C2237] w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab("live")}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                activeTab === "live"
                  ? "bg-violet-600 text-white shadow-glow-violet"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Live Arena Match</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("prizes")}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                activeTab === "prizes"
                  ? "bg-violet-600 text-white shadow-glow-violet"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Prize Radar</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("scrim")}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                activeTab === "scrim"
                  ? "bg-violet-600 text-white shadow-glow-violet"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Local Scrim Matcher</span>
            </button>
          </div>

          {/* Live Countdown & Spectators Badge */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-400 bg-[#090C15] px-3 py-1 rounded-lg border border-[#1C2237]">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-white font-bold">{feed.spectators.toLocaleString()}</span>
              <span className="hidden sm:inline">watching</span>
            </div>

            <div className="flex items-center gap-1.5 text-violet-300 bg-violet-950/40 px-3 py-1 rounded-lg border border-violet-500/40">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
              <span className="text-slate-400">Next Clash:</span>
              <span className="font-bold text-white">{formatCountdown(secondsRemaining)}</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: LIVE ARENA MATCH BROADCAST SIMULATOR              */}
        {/* ======================================================== */}
        {activeTab === "live" && (
          <div className="pt-5 space-y-5 relative z-10">
            {/* Header / Venue Info */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-400 font-bold border border-rose-500/30 flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  BROADCAST LIVE
                </span>
                <span className="text-slate-400 font-mono">• {feed.venue}</span>
              </div>
              <span className="text-amber-400 font-bold font-mono">
                Prize Pool: {formatETB(feed.prizeETB)}
              </span>
            </div>

            {/* Scoreboard Display */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#090C15] border border-[#1C2237] flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Team 1 */}
              <div className="flex items-center gap-4 w-full sm:w-2/5 justify-start">
                <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-300 font-black text-lg shadow-glow-violet shrink-0">
                  {feed.teamA.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-white text-base sm:text-lg tracking-wide font-mono">
                    {feed.teamA}
                  </h4>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Contender</span>
                  </p>
                </div>
              </div>

              {/* Center Live Score */}
              <div className="flex flex-col items-center justify-center shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono px-3 py-1 rounded-xl bg-[#141826] border border-[#2A3352]">
                    {feed.scoreA}
                  </span>
                  <span className="text-slate-500 font-black text-xl">:</span>
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono px-3 py-1 rounded-xl bg-[#141826] border border-[#2A3352]">
                    {feed.scoreB}
                  </span>
                </div>
                <span className="mt-2 text-[11px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">
                  {feed.round}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Map: {feed.map}
                </span>
              </div>

              {/* Team 2 */}
              <div className="flex items-center gap-4 w-full sm:w-2/5 justify-end text-right">
                <div>
                  <h4 className="font-black text-white text-base sm:text-lg tracking-wide font-mono">
                    {feed.teamB}
                  </h4>
                  <p className="text-xs text-cyan-400 flex items-center gap-1 justify-end">
                    <span>Sub-City Challenger</span>
                    <Shield className="w-3 h-3" />
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-black text-lg shadow-glow-cyan shrink-0">
                  {feed.teamB.charAt(0)}
                </div>
              </div>
            </div>

            {/* Tactical Breakdown Expandable Toggle */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setTacticalStatsOpen(!tacticalStatsOpen)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-[#232A42] bg-[#141826] hover:border-violet-500/40 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition"
              >
                <BarChart3 className="w-3.5 h-3.5 text-violet-400" />
                <span>{tacticalStatsOpen ? "Hide Tactical Feed" : "Inspect Live Tactical Metrics"}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${tacticalStatsOpen ? "rotate-90" : ""}`} />
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/tournaments"
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs tracking-wider uppercase shadow-glow-violet transition flex items-center justify-center gap-1.5"
                >
                  <span>Explore Tournament Bracket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Tactical Stats Drawer */}
            {tacticalStatsOpen && (
              <div className="p-4 rounded-xl bg-[#090C15] border border-violet-500/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono animate-fadeIn">
                <div className="p-2.5 rounded-lg bg-[#141826]">
                  <span className="text-[10px] text-slate-400 block uppercase">Format</span>
                  <span className="font-bold text-white text-xs">{currentGame.competitiveFormat}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#141826]">
                  <span className="text-[10px] text-slate-400 block uppercase">Active Ethiopian Players</span>
                  <span className="font-bold text-emerald-400 text-xs">{currentGame.activePlayersEth.toLocaleString()}+</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#141826]">
                  <span className="text-[10px] text-slate-400 block uppercase">Broadcast Server</span>
                  <span className="font-bold text-cyan-400 text-xs">Addis Ababa IXP (Direct)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#141826]">
                  <span className="text-[10px] text-slate-400 block uppercase">Average Ping</span>
                  <span className="font-bold text-amber-400 text-xs">11ms - 19ms</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: REGIONAL PRIZE RADAR                              */}
        {/* ======================================================== */}
        {activeTab === "prizes" && (
          <div className="pt-5 space-y-4 relative z-10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-300">
                Live Open Prize Pools for <strong className="text-white">{currentGame.name}</strong> across Ethiopia:
              </span>
              <span className="text-emerald-400 font-mono font-bold">100% Guaranteed Escrow</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#090C15] border border-amber-500/40 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 font-bold border border-amber-500/30">
                    Grand Finals
                  </span>
                  <Coins className="w-4 h-4 text-amber-400" />
                </div>
                <h5 className="font-bold text-white text-sm">Addis Masters Cup</h5>
                <p className="text-xs text-slate-400 mt-0.5">Millennium Hall Stage</p>
                <p className="text-xl font-black text-amber-400 font-mono mt-3">250,000 ETB</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090C15] border border-violet-500/40 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950/60 text-violet-300 font-bold border border-violet-500/30">
                    Regional Open
                  </span>
                  <Coins className="w-4 h-4 text-violet-400" />
                </div>
                <h5 className="font-bold text-white text-sm">Oromia & Rift Series</h5>
                <p className="text-xs text-slate-400 mt-0.5">Adama & Bishoftu Hubs</p>
                <p className="text-xl font-black text-violet-300 font-mono mt-3">120,000 ETB</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090C15] border border-cyan-500/40 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 font-bold border border-cyan-500/30">
                    City Series
                  </span>
                  <Coins className="w-4 h-4 text-cyan-400" />
                </div>
                <h5 className="font-bold text-white text-sm">Southern Circuit</h5>
                <p className="text-xs text-slate-400 mt-0.5">Hawassa Net Zone Arena</p>
                <p className="text-xl font-black text-cyan-300 font-mono mt-3">75,000 ETB</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-500/30 flex items-center justify-between">
              <span className="text-xs text-slate-300">
                Want to host or sponsor a competition in your city?
              </span>
              <Link
                href="/organizer/create"
                className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs font-mono transition"
              >
                Create Tournament & Escrow &gt;
              </Link>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: LOCAL SCRIM MATCHER (INTERACTIVE FINDER)          */}
        {/* ======================================================== */}
        {activeTab === "scrim" && (
          <div className="pt-5 space-y-4 relative z-10">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-mono">
                Select your Ethiopian city/sub-city to find an active rival team in <strong className="text-white">{currentGame.shortName}</strong>:
              </span>
              <span className="text-cyan-400 font-mono text-[11px] flex items-center gap-1">
                <Activity className="w-3 h-3 animate-spin" />
                <span>LAN Scrim Matchmaking Active</span>
              </span>
            </div>

            {/* Region Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {REGIONS.map((region) => {
                const isSelected = selectedRegion.id === region.id;
                return (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => {
                      setSelectedRegion(region);
                      setScrimFound(false);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? "bg-violet-600/30 border-violet-400 text-white ring-1 ring-violet-400/50"
                        : "bg-[#090C15] border-[#1C2237] text-slate-400 hover:border-slate-500 hover:text-white"
                    }`}
                  >
                    <span className="text-xs font-bold truncate block">{region.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 mt-1 block">
                      Ping: {region.ping}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Action / Result */}
            <div className="p-4 rounded-2xl bg-[#090C15] border border-[#1C2237] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-400 shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="font-bold text-white text-xs sm:text-sm">
                    {scrimFound ? `Matched with ${selectedRegion.rival}` : "Ready to Find Custom Match?"}
                  </h6>
                  <p className="text-[11px] text-slate-400">
                    {scrimFound
                      ? `Lobby ready on ${selectedRegion.name} • 5v5 Best of 3 • Ping: ${selectedRegion.ping}`
                      : `Matching against verified squads in ${selectedRegion.name}`}
                  </p>
                </div>
              </div>

              <div>
                {scrimFound ? (
                  <Link
                    href="/teams"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition shadow-lg flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accept Scrim Match</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartScrimSearch}
                    disabled={isSearchingScrim}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-xs font-mono uppercase tracking-wider shadow-glow-violet transition flex items-center gap-2"
                  >
                    {isSearchingScrim ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Scanning Hubs...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-3.5 h-3.5" />
                        <span>Search Active Scrims</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
