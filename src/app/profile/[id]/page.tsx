"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  ArrowLeft,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { formatETB, getRankTier } from "@/lib/utils";

export default function DynamicGamerProfilePage() {
  const params = useParams();
  const { gamers } = useEthora();
  const [copied, setCopied] = useState(false);

  const gamerId = params?.id as string;
  const profile = gamers.find((g) => g.id === gamerId) || gamers[0];
  const rank = getRankTier(profile.ratingPoints);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 w-full pb-16">
      {/* 1. COVER BANNER */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900 border-b border-[#232A42]">
        <img
          src={profile.banner}
          alt={profile.gamerTag}
          className="w-full h-full object-cover opacity-75 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090E] via-[#08090E]/50 to-transparent" />
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <Link
            href="/rankings"
            className="px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/90 text-white text-xs font-bold border border-white/20 backdrop-blur-md flex items-center gap-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Rankings</span>
          </Link>
        </div>
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
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
        {/* 2. ATHLETE HEADER CARD */}
        <div className="rounded-2xl border border-[#232A42] bg-[#0E111A]/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.gamerTag}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-[#0E111A] shadow-2xl"
              />
              {profile.verified && (
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-emerald-500 text-white shadow-lg border-2 border-[#0E111A]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  {profile.gamerTag}
                </h1>
                <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-violet-950 text-violet-300 border border-violet-600/40">
                  {profile.ethoraId}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified Athlete
                </span>
              </div>

              <p className="text-base text-slate-300 font-medium">{profile.realName}</p>

              <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap pt-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {profile.location.communityName} • {profile.location.woredaName}, {profile.location.regionName}
                </span>
                <span className="inline-block w-4 h-2 rounded-sm ethiopia-flag-stripe" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">National Ranking</span>
              <span className="text-2xl font-black text-amber-400 font-mono">#{profile.nationalRank}</span>
              <span className="text-[10px] text-amber-200/70 block">Apex Category</span>
            </div>

            <div className="p-3.5 rounded-xl border border-violet-500/40 bg-violet-500/10 text-center">
              <span className="text-[10px] uppercase font-bold text-violet-300 block">Rating Points</span>
              <span className="text-2xl font-black text-violet-400 font-mono">{profile.ratingPoints}</span>
              <span className="text-[10px] text-violet-300/70 block">{rank.tier}</span>
            </div>
          </div>
        </div>

        {/* 3. BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
                COMPETITOR BIOGRAPHY
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">{profile.bio}</p>
            </div>

            <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-5">
              <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-violet-400" />
                VERIFIED ESPORTS TITLES & BENCHMARKS
              </h2>

              <div className="space-y-4">
                {profile.connectedGames.map((gameAcc) => (
                  <div
                    key={gameAcc.gameId}
                    className="p-5 rounded-xl border border-[#232A42] bg-[#141826] space-y-4"
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
                        <div key={k} className="p-2.5 rounded-lg bg-[#0E111A] border border-[#232A42]">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">{k}</span>
                          <span className="text-sm font-black text-white font-mono">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                CAREER TOURNAMENT RECORD
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#232A42]">
                  <span className="text-slate-400">Total Matches Played</span>
                  <span className="font-mono font-bold text-white">{profile.stats.matchesPlayed}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#232A42]">
                  <span className="text-slate-400">Official Match Wins</span>
                  <span className="font-mono font-bold text-emerald-400">{profile.stats.matchesWon}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#232A42]">
                  <span className="text-slate-400">Overall Win Rate</span>
                  <span className="font-mono font-bold text-violet-400">{profile.stats.winRate}%</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-[#232A42]">
                  <span className="text-slate-400">Tournament Trophies</span>
                  <span className="font-mono font-bold text-amber-400">{profile.stats.tournamentsWon}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Official Earnings</span>
                  <span className="font-mono font-black text-emerald-400">{formatETB(profile.stats.earningsETB)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

