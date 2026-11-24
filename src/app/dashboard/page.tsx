"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trophy,
  Swords,
  ShieldCheck,
  Flame,
  Award,
  Calendar,
  MapPin,
  TrendingUp,
  Gamepad2,
  Plus,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Activity,
  AlertCircle,
  Zap,
  Crosshair,
  Target,
  BarChart3,
  PieChart,
  Crown,
  Share2,
  Filter,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { formatETB, formatNumber, getRankTier } from "@/lib/utils";
import { SUPPORTED_GAMES } from "@/data/games";
import { GamerDashboardHeader } from "@/components/dashboard/GamerDashboardHeader";

export default function GamerDashboardPage() {
  const router = useRouter();
  const { currentUser, currentSession, tournaments, connectGameAccount } = useEthora();
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState("game-eafc");
  const [inGameName, setInGameName] = useState("");
  const [platformId, setPlatformId] = useState("");

  // Interactive controls
  const [chartPeriod, setChartPeriod] = useState<"7d" | "30d" | "season">("7d");
  const [activeGameTab, setActiveGameTab] = useState<string>("game-valorant");
  const [matchFilter, setMatchFilter] = useState<"all" | "win" | "loss">("all");
  const [hoveredChartPoint, setHoveredChartPoint] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Automatic redirect if non-gamer persona visits the gamer dashboard
  useEffect(() => {
    if (!currentUser && currentSession) {
      if (currentSession.role === "organizer" || currentSession.role === "organization") {
        router.replace("/organizer");
      } else if (currentSession.role === "admin") {
        router.replace("/admin");
      }
    }
  }, [currentUser, currentSession, router]);

  if (!currentUser) {
    if (currentSession?.role === "organizer" || currentSession?.role === "organization") {
      return (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-white font-sans">Organizer Account Active</h2>
          <p className="text-slate-400 text-sm mt-2 font-sans">
            Redirecting to your Organizer Hub...
          </p>
          <Link
            href="/organizer"
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition"
          >
            Go to Organizer Hub →
          </Link>
        </div>
      );
    }

    if (currentSession?.role === "admin") {
      return (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-white font-sans">Administrator Account Active</h2>
          <p className="text-slate-400 text-sm mt-2 font-sans">
            Redirecting to Platform Administrator Console...
          </p>
          <Link
            href="/admin"
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition"
          >
            Go to Admin Console →
          </Link>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white font-sans">No Gamer Profile Active</h2>
        <p className="text-slate-400 text-sm mt-2 font-sans">
          Switch to a gamer persona using the role switcher at the bottom of the sidebar, or create an account.
        </p>
        <Link
          href="/auth/signup"
          className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition"
        >
          Create Gamer Profile
        </Link>
      </div>
    );
  }

  const rankInfo = getRankTier(currentUser.ratingPoints);

  // Filter tournaments user is registered for
  const userRegisteredTournaments = tournaments.filter((t) =>
    (t.registrations || []).some((r) => r.gamerId === currentUser.id)
  );

  // Recommendations: tournaments matching user's games and location
  const userGameIds = (currentUser.connectedGames || []).map((g) => g.gameId);
  const recommendedTournaments = tournaments.filter(
    (t) =>
      userGameIds.includes(t.gameId) &&
      !(t.registrations || []).some((r) => r.gamerId === currentUser.id) &&
      t.status !== "completed"
  );

  const handleConnectGame = (e: React.FormEvent) => {
    e.preventDefault();
    const game = SUPPORTED_GAMES.find((g) => g.id === selectedGameId);
    if (!game) return;
    connectGameAccount(
      currentUser.id,
      game.id,
      game.name,
      inGameName,
      game.platforms[0] as any,
      platformId
    );
    setConnectModalOpen(false);
    setInGameName("");
    setPlatformId("");
  };

  const handleCopyId = () => {
    navigator.clipboard?.writeText(currentUser.ethoraId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Selected game for the Interactive Game Studio
  const activeGame =
    (currentUser.connectedGames || []).find((g) => g.gameId === activeGameTab) ||
    (currentUser.connectedGames || [])[0];

  // Rating Progression Dataset for SVG Velocity Area Chart (dynamically derived from athlete's real MMR and match results)
  const currentMMR = currentUser.ratingPoints || 2840;
  const chartData =
    currentUser.matchHistory && currentUser.matchHistory.length > 0
      ? currentUser.matchHistory.map((m, i) => {
          const delta = m.ratingChange || (m.result === "win" ? 35 : -15);
          return {
            label: `M${i + 1}`,
            rating: currentMMR - (currentUser.matchHistory.length - 1 - i) * 30,
            change: delta > 0 ? `+${delta}` : `${delta}`,
            opponent: m.opponentName,
            map: m.gameName || "Competitive",
          };
        })
      : [
          { label: "M1", rating: currentMMR - 160, change: "+35", opponent: "Dire Dawa Titans", map: "Ascent" },
          { label: "M2", rating: currentMMR - 125, change: "+30", opponent: "Bole Phoenix", map: "Bind" },
          { label: "M3", rating: currentMMR - 140, change: "-15", opponent: "Great Rift Org", map: "Haven" },
          { label: "M4", rating: currentMMR - 95, change: "+45", opponent: "Hawassa Vipers", map: "Split" },
          { label: "M5", rating: currentMMR - 55, change: "+40", opponent: "Sheger United", map: "Lotus" },
          { label: "M6", rating: currentMMR - 20, change: "+35", opponent: "Arada Strikers", map: "Sunset" },
          { label: "M7", rating: currentMMR, change: "+25", opponent: "Lion City Prime", map: "Breeze" },
        ];

  // SVG Chart calculation helpers
  const ratings = chartData.map((d) => d.rating);
  const minRating = Math.min(...ratings) - 40;
  const maxRating = Math.max(...ratings) + 40;
  const chartHeight = 130;
  const chartWidth = 520;
  const getX = (index: number) => (index / Math.max(1, chartData.length - 1)) * (chartWidth - 40) + 20;
  const getY = (rating: number) =>
    chartHeight - 15 - ((rating - minRating) / Math.max(1, maxRating - minRating)) * (chartHeight - 35);

  const pointsString = chartData
    .map((d, i) => `${getX(i)},${getY(d.rating)}`)
    .join(" ");

  const areaString = `${getX(0)},${chartHeight} ${pointsString} ${getX(
    chartData.length - 1
  )},${chartHeight}`;

  // Filtered Match History
  const filteredMatches = (currentUser.matchHistory || []).filter((m) => {
    if (matchFilter === "win") return m.result === "win";
    if (matchFilter === "loss") return m.result === "loss";
    return true;
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* 1. HERO PASSPORT & TIER PROMOTION COMMAND (Image 3 Spec) */}
      <GamerDashboardHeader currentUser={currentUser} />

      {/* =========================================================================
          2. ASYMMETRICAL INTERACTIVE BENTO MATRIX (Varied, Visual, Not Same Boxes)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        {/* TILE 1: INTERACTIVE RATING VELOCITY AREA CHART (Spans 6 cols on lg) */}
        <div className="lg:col-span-6 rounded-3xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-5 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-violet-400" />
                <h3 className="font-sans text-[16px] font-semibold text-white">
                  Rating Momentum & Velocity
                </h3>
              </div>
              <p className="text-[13px] text-slate-400">Performance trajectory over recent sanctioned matches</p>
            </div>

            {/* Time period filter pills */}
            <div className="flex items-center bg-[#141826] p-1 rounded-xl border border-[rgba(168,85,247,0.25)] text-[11px] font-medium">
              {(["7d", "30d", "season"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className={`px-2.5 py-1 rounded-lg transition uppercase ${chartPeriod === p
                    ? "bg-violet-600 text-white font-semibold"
                    : "text-slate-400 hover:text-white"
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive SVG Area Chart */}
          <div className="relative w-full h-[140px] pt-2">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0E111A" stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Horizontal Reference Grid Lines */}
              <line x1="0" y1="25" x2={chartWidth} y2="25" stroke="#232A42" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2={chartWidth} y2="70" stroke="#232A42" strokeDasharray="3 3" />
              <line x1="0" y1="115" x2={chartWidth} y2="115" stroke="#232A42" strokeDasharray="3 3" />

              {/* Area fill */}
              <polygon points={areaString} fill="url(#velocityGradient)" />

              {/* Main Line with Glow */}
              <polyline
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="3"
                filter="url(#glow)"
                points={pointsString}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {chartData.map((d, i) => {
                const cx = getX(i);
                const cy = getY(d.rating);
                const isHovered = hoveredChartPoint === i;

                return (
                  <g key={i}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 7 : 4.5}
                      fill={isHovered ? "#06B6D4" : "#8B5CF6"}
                      stroke="#0E111A"
                      strokeWidth="2.5"
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredChartPoint(i)}
                      onMouseLeave={() => setHoveredChartPoint(null)}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Popup */}
            {hoveredChartPoint !== null && (
              <div
                className="absolute z-20 px-3 py-1.5 rounded-xl bg-[#141826] border border-violet-500/60 shadow-2xl text-xs pointer-events-none -translate-x-1/2 -top-2 transition-all"
                style={{
                  left: `${(hoveredChartPoint / (chartData.length - 1)) * 100}%`,
                }}
              >
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>{chartData[hoveredChartPoint].rating} MMR</span>
                  <span className="text-emerald-400 text-[10px]">
                    {chartData[hoveredChartPoint].change}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  vs {chartData[hoveredChartPoint].opponent} • {chartData[hoveredChartPoint].map}
                </div>
              </div>
            )}
          </div>

          {/* Bottom stats summary */}
          <div className="pt-2 border-t border-[rgba(168,85,247,0.25)] flex items-center justify-between text-[12px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              Peak: <strong className="text-white font-mono">{formatNumber(currentUser.ratingPoints)} pts</strong>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              ▲ +{Math.round(currentUser.stats.winRate * 0.8)} pts trajectory
            </span>
            <span className="font-mono text-slate-400">{Math.round(currentUser.stats.winRate)}% Match Consistency</span>
          </div>
        </div>

        {/* TILE 2: WIN/LOSS CIRCULAR DONUT GAUGE (Spans 3 cols on lg) */}
        <div className="lg:col-span-3 rounded-3xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-5 flex flex-col justify-between space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-sans text-[16px] font-semibold text-white">Win Ratio</h3>
              <p className="text-[12px] text-slate-400">Sanctioned match conversion</p>
            </div>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>

          {/* Circular Donut Ring */}
          <div className="relative flex items-center justify-center my-2">
            <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background track circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#141826"
                strokeWidth="10"
              />
              {/* Progress stroke */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#winGradient)"
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 40 * (currentUser.stats.winRate / 100)} ${2 * Math.PI * 40 * (1 - currentUser.stats.winRate / 100)
                  }`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="winGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Center Metrics */}
            <div className="absolute text-center">
              <span className="font-sans text-[26px] font-bold text-white block leading-none">
                {currentUser.stats.winRate}%
              </span>
              <span className="text-[11px] font-medium text-emerald-400 block mt-1">
                {currentUser.stats.matchesWon}W - {currentUser.stats.matchesPlayed - currentUser.stats.matchesWon}L
              </span>
            </div>
          </div>

          {/* Win Streak & Clutch Pill */}
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
              <Flame className="w-4 h-4 text-amber-400" />
              {Math.max(3, Math.round(currentUser.stats.matchesWon / 25))} Match Streak
            </span>
            <span className="text-[11px] text-slate-300 font-mono">
              {(activeGame?.stats as any)?.clutchWinRate ? `${(activeGame?.stats as any)?.clutchWinRate}%` : `${Math.round(currentUser.stats.winRate)}%`} Clutch
            </span>
          </div>
        </div>

        {/* TILE 3: COMBAT FORM & K/D ACCURACY (Spans 3 cols on lg) */}
        <div className="lg:col-span-3 rounded-3xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-5 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-sans text-[16px] font-semibold text-white">Recent Form</h3>
              <p className="text-[12px] text-slate-400">Last 5 competitive series</p>
            </div>
            <Crosshair className="w-4 h-4 text-cyan-400" />
          </div>

          {/* Horizontal Form Pill Sequence */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-1.5">
              {(currentUser.matchHistory && currentUser.matchHistory.length > 0
                ? currentUser.matchHistory.slice(0, 5)
                : [
                    { result: "win", score: "2-1" },
                    { result: "win", score: "2-0" },
                    { result: "win", score: "2-1" },
                    { result: "loss", score: "1-2" },
                    { result: "win", score: "2-0" },
                  ]
              ).map((m: any, idx: number) => {
                const isW = m.result === "win";
                return (
                  <div key={idx} className="flex-1 text-center">
                    <span
                      className={`w-full py-1.5 rounded-lg flex items-center justify-center font-bold text-xs ${isW
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                        }`}
                    >
                      {isW ? "W" : "L"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block mt-1">{m.score || (isW ? "2-0" : "1-2")}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kill / Death Visual Ratio Slider */}
          <div className="space-y-1.5 pt-2 border-t border-[rgba(168,85,247,0.25)]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Combat Ratio (K/D):</span>
              <span className="font-mono font-bold text-cyan-300">
                {(activeGame?.stats as any)?.kda || ((currentUser.stats.matchesWon / Math.max(1, currentUser.stats.matchesPlayed - currentUser.stats.matchesWon)) * 0.4 + 1).toFixed(2)} K/D
              </span>
            </div>
            <div className="h-2 w-full bg-[#141826] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                style={{ width: `${Math.min(95, Math.max(40, currentUser.stats.winRate))}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 block">Top {Math.max(1, 100 - Math.round(currentUser.stats.winRate))}% ratio nationwide</span>
          </div>

          {/* Total Purses */}
          <div className="pt-2 border-t border-[rgba(168,85,247,0.25)] flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] text-slate-400 block">Total Earnings Won</span>
              <span className="font-sans text-[18px] font-bold text-amber-400 leading-none">
                {formatETB(currentUser.stats.earningsETB)}
              </span>
            </div>
            <Award className="w-5 h-5 text-amber-400" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. INTERACTIVE GAME PERFORMANCE STUDIO (Tabbed Showcase, Attribute Meters)
          ========================================================================= */}
      <div className="rounded-3xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 lg:p-7 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-sans text-[18px] font-semibold text-white flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-violet-400" />
              Game Performance Studio
            </h2>
            <p className="text-[13px] text-slate-400">
              Interactive deep-dive into verified telemetry and combat ratings
            </p>
          </div>

          {/* Game Tab Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {currentUser.connectedGames.map((gameAcc) => (
              <button
                key={gameAcc.gameId}
                onClick={() => setActiveGameTab(gameAcc.gameId)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${activeGameTab === gameAcc.gameId
                  ? "bg-violet-600 text-white shadow-glow-violet border border-violet-500"
                  : "bg-[#141826] text-slate-300 border border-[rgba(168,85,247,0.25)] hover:bg-[#1C2237]"
                  }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>{gameAcc.gameName}</span>
              </button>
            ))}

            <button
              onClick={() => setConnectModalOpen(true)}
              className="px-3 py-2 rounded-xl border border-dashed border-[#3A456B] text-violet-300 hover:text-white hover:border-violet-400 text-xs font-medium transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Link Title</span>
            </button>
          </div>
        </div>

        {/* Active Game Detail Showcase Banner */}
        {activeGame && (
          <div className="rounded-2xl border border-[rgba(168,85,247,0.25)] bg-gradient-to-r from-[#141826] via-[#101422] to-[#0A0D15] p-5 lg:p-6 space-y-6 relative overflow-hidden">
            {/* Top Game Meta Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-300">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-sans text-[16px] font-bold text-white">
                      {activeGame.gameName}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-950 text-violet-300 border border-violet-700/60">
                      {activeGame.platform}
                    </span>
                    {activeGame.verified && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Account
                      </span>
                    )}
                  </div>
                  <span className="text-[12px] text-slate-400 font-mono">
                    IGN: <strong className="text-violet-300">{activeGame.inGameName}</strong> • {activeGame.platformId}
                  </span>
                </div>
              </div>

              {/* Title MMR and Rank Tier */}
              <div className="text-left sm:text-right">
                <span className="text-amber-400 font-bold text-sm block">
                  {activeGame.rankTier}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {activeGame.points} Title Benchmark MMR
                </span>
              </div>
            </div>

            {/* 4 Visual Attribute Progress Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {/* Combat Rating (ACS) */}
              <div className="p-4 rounded-xl bg-[#14111F] border border-[rgba(168,85,247,0.25)] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Combat Score (ACS)</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {(activeGame?.stats as any)?.acs || (activeGame?.stats as any)?.rating ? `${(activeGame?.stats as any)?.acs || (activeGame?.stats as any)?.rating} ACS` : "284 ACS"}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#141826] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 w-[85%]" />
                </div>
                <span className="text-[10px] text-slate-500 block">Top 5% in {currentUser.location?.regionName || "Addis Ababa"}</span>
              </div>

              {/* Headshot Accuracy */}
              <div className="p-4 rounded-xl bg-[#14111F] border border-[rgba(168,85,247,0.25)] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Headshot Accuracy</span>
                  <span className="font-mono font-bold text-violet-300">
                    {(activeGame?.stats as any)?.headshotRate ? `${(activeGame?.stats as any)?.headshotRate}%` : "34.2%"}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#141826] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-purple-400 w-[74%]" />
                </div>
                <span className="text-[10px] text-slate-500 block">National circuit tier</span>
              </div>

              {/* Clutch Win Rate */}
              <div className="p-4 rounded-xl bg-[#14111F] border border-[rgba(168,85,247,0.25)] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">1vX Clutch Win</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {(activeGame?.stats as any)?.clutchWinRate ? `${(activeGame?.stats as any)?.clutchWinRate}%` : `${Math.round(currentUser.stats.winRate)}%`}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#141826] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 w-[92%]" />
                </div>
                <span className="text-[10px] text-slate-500 block">High impact in overtime</span>
              </div>

              {/* First Blood Impact */}
              <div className="p-4 rounded-xl bg-[#14111F] border border-[rgba(168,85,247,0.25)] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">K/D Performance</span>
                  <span className="font-mono font-bold text-amber-400">
                    {(activeGame?.stats as any)?.kda ? `${(activeGame?.stats as any)?.kda} K/D` : "1.46 K/D"}
                  </span>
                </div>
                <div className="h-2 w-full bg-[#141826] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 w-[82%]" />
                </div>
                <span className="text-[10px] text-slate-500 block">Verified tournament telemetry</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          4. MAIN WORKSPACE: TOURNAMENT PASSES & MATCH TIMELINE (Left 8 Cols)
             + MILESTONES & RECOMMENDED CIRCUIT (Right 4 Cols)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT 8 COLUMNS */}
        <div className="lg:col-span-8 space-y-8">
          {/* TOURNAMENT PASSES & LIVE SCHEDULE (Ticket Style) */}
          <div className="rounded-3xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-sans text-[16px] font-semibold text-white flex items-center gap-2">
                  <Swords className="w-5 h-5 text-cyan-400" />
                  My Tournament Passes & Check-ins
                </h2>
                <p className="text-[13px] text-slate-400">
                  Confirmed brackets, entry credentials, and scheduled match rooms
                </p>
              </div>

              <Link
                href="/tournaments"
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition flex items-center gap-1"
              >
                <span>Browse All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {userRegisteredTournaments.length === 0 ? (
              <div className="py-10 text-center border border-dashed border-[rgba(168,85,247,0.25)] rounded-2xl p-6">
                <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-300">No active tournament registrations yet</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Browse open brackets and register to represent your zone or city in upcoming official events.
                </p>
                <Link
                  href="/tournaments"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 text-white font-medium text-xs"
                >
                  Explore Open Tournaments
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userRegisteredTournaments.map((t) => {
                  const reg = (t.registrations || []).find((r) => r.gamerId === currentUser.id);
                  const isApproved = reg?.status === "approved";
                  const isPending = reg?.status === "pending";

                  return (
                    <div
                      key={t.id}
                      className="group rounded-2xl border border-[rgba(168,85,247,0.25)] bg-[#141826] overflow-hidden hover:border-violet-500/50 transition-all flex flex-col sm:flex-row items-stretch"
                    >
                      {/* Left Banner Artwork */}
                      <div className="relative w-full sm:w-48 h-32 sm:h-auto shrink-0 bg-slate-900 overflow-hidden">
                        <img
                          src={t.bannerUrl}
                          alt={t.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#141826] hidden sm:block" />
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-violet-300 border border-violet-500/40">
                            {t.gameName}
                          </span>
                        </div>
                      </div>

                      {/* Right Ticket Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${isApproved
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : isPending
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : "bg-slate-800 text-slate-400"
                                }`}
                            >
                              Check-in: {reg?.status?.toUpperCase()}
                            </span>
                            <span className="text-[11px] text-amber-400 font-mono font-bold">
                              Prize Pool: {formatETB(t.prizePoolETB)}
                            </span>
                          </div>

                          <h4 className="text-[15px] font-semibold text-white group-hover:text-violet-300 transition">
                            {t.title}
                          </h4>

                          <p className="text-[12px] text-slate-400 flex items-center gap-3">
                            <span className="flex items-center gap-1 text-slate-300">
                              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                              {t.location.venueName}
                            </span>
                            <span className="flex items-center gap-1 text-slate-400">
                              <Calendar className="w-3 h-3 text-slate-500" />
                              {t.dates.startsAt}
                            </span>
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[rgba(168,85,247,0.25)] flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Match Lobby opens in 2d 14h</span>
                          </div>

                          <Link
                            href={`/tournaments/${t.id}`}
                            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition flex items-center gap-1.5"
                          >
                            <span>Bracket Room</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* VERIFIED MATCH HISTORY TIMELINE (With Filter Controls) */}
          <div className="rounded-3xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 space-y-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-sans text-[16px] font-semibold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  Verified Match Timeline
                </h2>
                <p className="text-[13px] text-slate-400">
                  Official tournament match records with verified scorelines
                </p>
              </div>

              {/* Match Filter Tabs */}
              <div className="flex items-center bg-[#141826] p-1 rounded-xl border border-[rgba(168,85,247,0.25)] text-[11px] font-medium">
                <button
                  onClick={() => setMatchFilter("all")}
                  className={`px-3 py-1 rounded-lg transition ${matchFilter === "all" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                >
                  All ({(currentUser.matchHistory || []).length})
                </button>
                <button
                  onClick={() => setMatchFilter("win")}
                  className={`px-3 py-1 rounded-lg transition ${matchFilter === "win" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                >
                  Victories ({(currentUser.matchHistory || []).filter((m) => m.result === "win").length})
                </button>
                <button
                  onClick={() => setMatchFilter("loss")}
                  className={`px-3 py-1 rounded-lg transition ${matchFilter === "loss" ? "bg-rose-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                >
                  Defeats ({(currentUser.matchHistory || []).filter((m) => m.result === "loss").length})
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredMatches.map((m) => {
                const isWin = m.result === "win";

                return (
                  <div
                    key={m.id}
                    className="p-4 rounded-2xl border border-[rgba(168,85,247,0.25)] bg-[#141826] hover:border-[#3A456B] transition flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${isWin
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          }`}
                      >
                        {isWin ? "WIN" : "LOSS"}
                      </span>

                      <div className="min-w-0">
                        <p className="font-semibold text-white text-[14px] truncate">{m.tournamentName}</p>
                        <p className="text-slate-400 text-[12px] truncate">
                          vs <span className="text-slate-200 font-medium">{m.opponentName}</span> • {m.date}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-[15px] text-white block">{m.score}</span>
                      <span
                        className={`text-[11px] font-mono font-medium ${m.ratingChange > 0 ? "text-emerald-400" : "text-rose-400"
                          }`}
                      >
                        {m.ratingChange > 0 ? `+${m.ratingChange}` : m.ratingChange} MMR
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT 4 COLUMNS: CAREER QUESTS, RECOMMENDATIONS & ACHIEVEMENTS */}
        <div className="lg:col-span-4 space-y-8">
          {/* CAREER QUESTS & PROMOTION PROGRESS */}
          <div className="rounded-3xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="font-sans text-[16px] font-semibold text-white">
                Career Quests & Bounties
              </h3>
            </div>
            <p className="text-[12px] text-slate-400">
              Active milestones towards national circuit sponsorships
            </p>

            <div className="space-y-4 pt-1">
              {/* Quest 1 */}
              <div className="space-y-1.5 p-3 rounded-xl bg-[#141826] border border-[rgba(168,85,247,0.25)]">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-white">Road to #1 National Rank</span>
                  <span className="text-amber-400 font-mono">
                    {Math.min(95, Math.round(((currentUser.ratingPoints || 9840) / 12500) * 100))}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#14111F] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
                    style={{ width: `${Math.min(95, Math.round(((currentUser.ratingPoints || 9840) / 12500) * 100))}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block">
                  Rank #{currentUser.nationalRank || 4} → Rank #1 Apex Target
                </span>
              </div>

              {/* Quest 2 */}
              <div className="space-y-1.5 p-3 rounded-xl bg-[#141826] border border-[rgba(168,85,247,0.25)]">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-white">LAN Arena Dominator</span>
                  <span className="text-cyan-400 font-mono">
                    {Math.min(100, Math.round((currentUser.stats.matchesWon / 150) * 100))}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#14111F] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300"
                    style={{ width: `${Math.min(100, Math.round((currentUser.stats.matchesWon / 150) * 100))}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block">
                  {currentUser.stats.matchesWon} official matches won
                </span>
              </div>

              {/* Quest 3 */}
              <div className="space-y-1.5 p-3 rounded-xl bg-[#141826] border border-[rgba(168,85,247,0.25)]">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-white">Circuit Bounty Hunter</span>
                  <span className="text-emerald-400 font-mono">
                    {Math.min(100, Math.round(((currentUser.stats.earningsETB || 177500) / 300000) * 100))}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#14111F] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                    style={{ width: `${Math.min(100, Math.round(((currentUser.stats.earningsETB || 177500) / 300000) * 100))}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block">
                  {formatETB(currentUser.stats.earningsETB)} earned
                </span>
              </div>
            </div>
          </div>

          {/* RECOMMENDED TOURNAMENTS */}
          <div className="rounded-3xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <h3 className="font-sans text-[16px] font-semibold text-white">
                Recommended For You
              </h3>
            </div>
            <p className="text-[12px] text-slate-400">
              Matched based on your games and {currentUser.location.regionName} location
            </p>

            <div className="space-y-3">
              {recommendedTournaments.map((tourn) => (
                <div
                  key={tourn.id}
                  className="p-3.5 rounded-2xl border border-[rgba(168,85,247,0.25)] bg-[#141826] hover:border-violet-500/50 transition space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-violet-300 bg-violet-950 px-2 py-0.5 rounded border border-violet-800/40 font-mono">
                      {tourn.gameName}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-amber-400">
                      {formatETB(tourn.prizePoolETB)}
                    </span>
                  </div>
                  <h4 className="text-[13px] font-semibold text-white group-hover:text-violet-300 transition line-clamp-1">
                    {tourn.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>{tourn.dates.startsAt}</span>
                    <Link
                      href={`/tournaments/${tourn.id}`}
                      className="text-violet-400 hover:text-violet-300 font-semibold"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACHIEVEMENTS TROPHY CASE */}
          <div className="rounded-3xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h3 className="font-sans text-[16px] font-semibold text-white">
                  Trophies & Medals ({(currentUser.achievements || []).length})
                </h3>
              </div>
            </div>

            <div className="space-y-2.5">
              {(currentUser.achievements || []).map((ach) => (
                <div
                  key={ach.id}
                  className="p-3 rounded-2xl border border-[rgba(168,85,247,0.25)] bg-[#141826] flex items-center gap-3 hover:border-amber-500/40 transition"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[13px] font-semibold text-white truncate block">
                      {ach.title}
                    </span>
                    <span className="text-[11px] text-slate-400 line-clamp-1">
                      {ach.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONNECT GAME MODAL */}
      {connectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-3xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-violet-400" />
                Link New Game Title
              </h3>
              <button
                onClick={() => setConnectModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConnectGame} className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-slate-300 mb-1">Select Game</label>
                <select
                  value={selectedGameId}
                  onChange={(e) => setSelectedGameId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#141826] text-white text-[15px]"
                >
                  {SUPPORTED_GAMES.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} ({g.platforms.join(", ")})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-slate-300 mb-1">In-Game Name (IGN)</label>
                <input
                  type="text"
                  required
                  value={inGameName}
                  onChange={(e) => setInGameName(e.target.value)}
                  placeholder="e.g. Bekila_ETH or ViperX#ET01"
                  className="w-full px-3 py-2.5 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#141826] text-white text-[15px]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-slate-300 mb-1">
                  Platform ID / Profile Link
                </label>
                <input
                  type="text"
                  required
                  value={platformId}
                  onChange={(e) => setPlatformId(e.target.value)}
                  placeholder="e.g. Steam ID, PSN Name, Riot ID"
                  className="w-full px-3 py-2.5 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#141826] text-white text-[15px]"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setConnectModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#141826] text-slate-300 text-[14px] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-[15px]"
                >
                  Verify & Save Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
