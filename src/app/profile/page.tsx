"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  ShieldCheck,
  MapPin,
  Flame,
  Award,
  Layers,
  Gamepad2,
  Calendar,
  Share2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { formatETB, getRankTier } from "@/lib/utils";

export default function ProfilePage() {
  const { currentUser, gamers } = useEthora();
  const [copied, setCopied] = useState(false);

  // If no user is logged in, show default pro gamer profile (gamer-1)
  const profile = currentUser || gamers[0];
  const rank = getRankTier(profile.ratingPoints);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 w-full pb-16">
      {/* 1. COVER BANNER (EPIC ETHORA STADIUM ARENA) */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#0A0A12] border-b border-[rgba(168,85,247,0.25)]">
        <img
          src="/images/ethora-stadium-banner.jpg"
          alt={profile.gamerTag}
          className="w-full h-full object-cover object-center opacity-85 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-[#0A0A12]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A12]/60 via-transparent to-[#0A0A12]/60" />
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-20">
          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/90 text-white text-xs font-bold border border-white/20 backdrop-blur-md flex items-center gap-2 transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Passport Copied!" : "Share Profile"}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 space-y-8">
        {/* 2. ATHLETE HEADER PROFILE CARD */}
        <div className="rounded-2xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.gamerTag}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-[#14111F] shadow-2xl"
              />
              {profile.verified && (
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#22C55E] text-[#0A0A12] shadow-lg border-2 border-[#14111F]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-sans font-[800] text-[32px] sm:text-[36px] text-[#F4F1FF] tracking-tight leading-none">
                  {profile.gamerTag}
                </h1>
                <span className="px-3 py-0.5 rounded-md font-mono text-[13px] font-[500] tabular-nums bg-[#A855F7]/20 text-[#F4F1FF] border border-[#A855F7]/40">
                  {profile.ethoraId}
                </span>
                <span className="px-2.5 py-0.5 rounded-full font-sans text-[12px] font-[600] uppercase bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                  Verified Athlete
                </span>
              </div>

              <p className="font-sans font-[400] text-[16px] text-[#B8B3CC]">{profile.realName}</p>

              <div className="flex items-center gap-2 font-sans text-[13px] font-[400] text-[#7D7896] flex-wrap pt-1">
                <span className="flex items-center gap-1.5 text-[#B8B3CC]">
                  <MapPin className="w-3.5 h-3.5 text-[#A855F7]" />
                  {profile.location.communityName} • {profile.location.woredaName}, {profile.location.regionName}
                </span>
                <span className="inline-block w-4 h-2 rounded-sm ethiopia-flag-stripe" />
              </div>
            </div>
          </div>

          {/* National Ranking Pill */}
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl border border-[#F5B82E]/40 bg-[#F5B82E]/10 text-center min-w-[120px]">
              <span className="font-sans text-[13px] font-[500] text-[#7D7896] block">National Ranking</span>
              <span className="font-sans font-[700] text-[32px] text-[#F5B82E] tabular-nums leading-none my-1 block">#{profile.nationalRank}</span>
              <span className="font-sans text-[12px] font-[500] text-[#F5B82E]/90 block uppercase">Apex Category</span>
            </div>

            <div className="p-4 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#0A0A12] text-center min-w-[120px]">
              <span className="font-sans text-[13px] font-[500] text-[#7D7896] block">Rating Points</span>
              <span className="font-sans font-[700] text-[32px] text-[#A855F7] tabular-nums leading-none my-1 block">{profile.ratingPoints}</span>
              <span className="font-sans text-[12px] font-[500] text-[#B8B3CC] block capitalize">{rank.tier}</span>
            </div>
          </div>
        </div>

        {/* 3. BIO & TEAM SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Bio */}
            <div className="rounded-2xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 space-y-3">
              {/* MInT Spec: Card title: Public Sans 16px weight 600 */}
              <h2 className="font-sans font-semibold text-[16px] text-white">
                Competitor Biography
              </h2>
              {/* MInT Spec: Bio: Public Sans 14px weight 400 line-height 1.5 */}
              <p className="font-sans font-normal text-[14px] leading-relaxed text-slate-200">{profile.bio}</p>
            </div>

            {/* Connected Games & Individual Title Stats */}
            <div className="rounded-2xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 space-y-5">
              <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-violet-400" />
                VERIFIED ESPORTS TITLES & BENCHMARKS
              </h2>

              <div className="space-y-4">
                {profile.connectedGames.map((gameAcc) => (
                  <div
                    key={gameAcc.gameId}
                    className="p-5 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#141826] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-white font-mono">{gameAcc.gameName}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-950 text-violet-300 border border-violet-700">
                            {gameAcc.platform}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          IGN: <strong className="text-violet-300">{gameAcc.inGameName}</strong> • Verified on {gameAcc.verifiedDate}
                        </span>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs font-black text-amber-400 font-mono block">
                          {gameAcc.rankTier}
                        </span>
                        <span className="text-[10px] text-slate-400">{gameAcc.points} Title MMR</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {Object.entries(gameAcc.stats).map(([k, v]) => (
                        <div key={k} className="p-2.5 rounded-lg bg-[#14111F] border border-[rgba(168,85,247,0.25)]">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">{k}</span>
                          <span className="text-sm font-black text-white font-mono">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Match History */}
            <div className="rounded-2xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 space-y-4">
              <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                OFFICIAL TOURNAMENT MATCH RECORD
              </h2>

              <div className="space-y-2.5">
                {profile.matchHistory.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#141826] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono text-xs ${
                          m.result === "win"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {m.result === "win" ? "WIN" : "LOSS"}
                      </span>
                      <div>
                        <p className="font-bold text-white text-sm">{m.tournamentName}</p>
                        <p className="text-slate-400 text-xs mt-0.5">
                          vs {m.opponentName} • {m.date}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-base text-white block">{m.score}</span>
                      <span
                        className={`text-xs font-mono font-bold ${
                          m.ratingChange > 0 ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {m.ratingChange > 0 ? `+${m.ratingChange}` : m.ratingChange} Rating
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Achievements & Team Roster info */}
          <div className="lg:col-span-4 space-y-8">
            {/* Team Affiliation */}
            {profile.team && (
              <div className="rounded-2xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-violet-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    TEAM ROSTER
                  </h3>
                </div>

                <div className="p-4 rounded-xl border border-violet-500/40 bg-gradient-to-r from-violet-950/40 to-transparent flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center font-black font-mono text-white text-lg">
                    {profile.team.tag}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{profile.team.name}</h4>
                    <p className="text-xs text-violet-300 font-medium">Role: {profile.team.role}</p>
                  </div>
                </div>

                <Link
                  href="/teams"
                  className="w-full py-2.5 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#141826] hover:bg-[#1C2237] text-slate-300 font-bold text-xs uppercase text-center block transition"
                >
                  View Team Roster
                </Link>
              </div>
            )}

            {/* Career Record Summary */}
            <div className="rounded-2xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                CAREER TOURNAMENT RECORD
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[rgba(168,85,247,0.25)]">
                  <span className="text-slate-400">Total Matches Played</span>
                  <span className="font-mono font-bold text-white">{profile.stats.matchesPlayed}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[rgba(168,85,247,0.25)]">
                  <span className="text-slate-400">Official Match Wins</span>
                  <span className="font-mono font-bold text-emerald-400">{profile.stats.matchesWon}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[rgba(168,85,247,0.25)]">
                  <span className="text-slate-400">Overall Win Rate</span>
                  <span className="font-mono font-bold text-violet-400">{profile.stats.winRate}%</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[rgba(168,85,247,0.25)]">
                  <span className="text-slate-400">Tournament Trophies</span>
                  <span className="font-mono font-bold text-amber-400">{profile.stats.tournamentsWon}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Official Earnings</span>
                  <span className="font-mono font-black text-emerald-400">{formatETB(profile.stats.earningsETB)}</span>
                </div>
              </div>
            </div>

            {/* Achievements Showcase */}
            <div className="rounded-2xl border border-[rgba(168,85,247,0.25)] bg-[#14111F] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    HONORS & BADGES ({profile.achievements.length})
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {profile.achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-3.5 rounded-xl border border-[rgba(168,85,247,0.25)] bg-[#141826] flex items-center gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">{ach.title}</span>
                      <span className="text-[11px] text-slate-400 leading-snug block mt-0.5">
                        {ach.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

