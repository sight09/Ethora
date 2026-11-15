"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  ShieldCheck,
  Search,
  Filter,
  MapPin,
  TrendingUp,
  Flame,
  Award,
  Gamepad2,
  ChevronRight,
  Sparkles,
  ArrowUpDown,
  Crown,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { ETHIOPIA_GEOGRAPHY } from "@/data/geography";
import { SUPPORTED_GAMES } from "@/data/games";
import { getRankTier } from "@/lib/utils";

export default function RankingsPage() {
  const { gamers } = useEthora();

  const [selectedGameId, setSelectedGameId] = useState<string>("all");
  const [selectedRegionId, setSelectedRegionId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"points" | "winRate">("points");

  // Filter gamers
  const filteredGamers = gamers
    .filter((gamer) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTag = gamer.gamerTag.toLowerCase().includes(q);
        const matchesReal = gamer.realName.toLowerCase().includes(q);
        const matchesId = gamer.ethoraId.toLowerCase().includes(q);
        const matchesLoc =
          gamer.location.regionName.toLowerCase().includes(q) ||
          gamer.location.communityName.toLowerCase().includes(q);
        if (!matchesTag && !matchesReal && !matchesId && !matchesLoc) return false;
      }

      // Region filter
      if (selectedRegionId !== "all" && gamer.location.regionId !== selectedRegionId) {
        return false;
      }

      // Game filter
      if (selectedGameId !== "all") {
        const playsGame = gamer.connectedGames.some((cg) => cg.gameId === selectedGameId);
        if (!playsGame) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "winRate") {
        return b.stats.winRate - a.stats.winRate;
      }
      return b.ratingPoints - a.ratingPoints;
    });

  // Top 3 Podium
  const top1 = filteredGamers[0];
  const top2 = filteredGamers[1];
  const top3 = filteredGamers[2];

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. HEADER */}
      <div className="relative rounded-2xl border border-[#232A42] bg-gradient-to-r from-violet-950/40 via-[#0E111A] to-purple-950/30 p-8 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              Official Ethiopian National Circuit
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              NATIONAL LEADERBOARDS
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Transparent, verified competitive rankings across all Ethiopian regions, zones, and local gaming hubs.
              Points are calculated through sanctioned tournament results and official match records.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-4 rounded-xl border border-[#232A42] bg-[#0E111A]/90 text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Active Ranked Athletes
              </span>
              <span className="text-2xl font-black text-violet-400 font-mono">48,200+</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP 3 PODIUM */}
      {filteredGamers.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-4">
          {/* #2 Silver */}
          <div className="rounded-2xl border border-slate-600/40 bg-[#0E111A] p-6 text-center flex flex-col items-center hover:border-slate-400 transition relative">
            <div className="relative mb-3">
              <img
                src={top2.avatar}
                alt={top2.gamerTag}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-300"
              />
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center shadow">
                #2
              </span>
            </div>
            <Link
              href={`/profile/${top2.id}`}
              className="text-lg font-bold text-white font-mono hover:text-violet-300 transition"
            >
              {top2.gamerTag}
            </Link>
            <p className="text-xs text-slate-400">{top2.realName}</p>
            <div className="mt-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-200">
              {top2.ratingPoints} Points
            </div>
            <p className="text-[11px] text-slate-500 mt-2">{top2.location.regionName}</p>
          </div>

          {/* #1 Gold - Elevated */}
          <div className="rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-[#181D2E] to-[#0E111A] p-8 text-center flex flex-col items-center shadow-glow-gold relative -translate-y-4">
            <div className="absolute -top-3 px-4 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow">
              <Crown className="w-3 h-3" />
              National Apex Leader
            </div>
            <div className="relative mb-4 mt-2">
              <img
                src={top1.avatar}
                alt={top1.gamerTag}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-amber-400 shadow-2xl"
              />
              <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg">
                #1
              </span>
            </div>
            <Link
              href={`/profile/${top1.id}`}
              className="text-2xl font-black text-white font-mono hover:text-amber-300 transition"
            >
              {top1.gamerTag}
            </Link>
            <p className="text-xs text-slate-300">{top1.realName}</p>
            <div className="mt-3 px-4 py-1.5 rounded-full text-sm font-mono font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {top1.ratingPoints} Points
            </div>
            <p className="text-xs text-amber-200/80 mt-2">{top1.location.communityName}</p>
          </div>

          {/* #3 Bronze */}
          <div className="rounded-2xl border border-amber-800/40 bg-[#0E111A] p-6 text-center flex flex-col items-center hover:border-amber-700 transition relative">
            <div className="relative mb-3">
              <img
                src={top3.avatar}
                alt={top3.gamerTag}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-700"
              />
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow">
                #3
              </span>
            </div>
            <Link
              href={`/profile/${top3.id}`}
              className="text-lg font-bold text-white font-mono hover:text-violet-300 transition"
            >
              {top3.gamerTag}
            </Link>
            <p className="text-xs text-slate-400">{top3.realName}</p>
            <div className="mt-3 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950/40 text-amber-400 border border-amber-800/40">
              {top3.ratingPoints} Points
            </div>
            <p className="text-[11px] text-slate-500 mt-2">{top3.location.regionName}</p>
          </div>
        </div>
      )}

      {/* 3. FILTER & SEARCH CONTROLS */}
      <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search */}
          <div className="md:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Gamer Tag, Real Name, ETHORA ID, or City..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Game Title Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedGameId}
              onChange={(e) => setSelectedGameId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white focus:outline-none focus:border-violet-500"
            >
              <option value="all">All Esports Titles</option>
              {SUPPORTED_GAMES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedRegionId}
              onChange={(e) => setSelectedRegionId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white focus:outline-none focus:border-violet-500"
            >
              <option value="all">National (All Regions)</option>
              {ETHIOPIA_GEOGRAPHY.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <button
              onClick={() => setSortBy(sortBy === "points" ? "winRate" : "points")}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] hover:bg-[#1C2237] text-slate-300 text-xs font-bold uppercase flex items-center justify-center gap-1.5 transition"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-violet-400" />
              <span>Sort: {sortBy === "points" ? "Rating" : "Win Rate"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. LEADERBOARD TABLE (MInT Spec: Table header 12px 500 sentence case, cell text 14px 400) */}
      <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead className="bg-[#141826] border-b border-[#232A42] text-[12px] font-medium text-slate-400">
              <tr>
                <th className="py-3.5 px-4 sm:px-6 w-16 text-center">Rank</th>
                <th className="py-3.5 px-4">Athlete / gamer tag</th>
                <th className="py-3.5 px-4">Primary title</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4 text-center">Win rate</th>
                <th className="py-3.5 px-4 text-right">Rating points</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#232A42]/50 text-slate-200">
              {filteredGamers.map((gamer, idx) => {
                const rankNum = idx + 1;
                const rankTier = getRankTier(gamer.ratingPoints);
                const primaryGame = gamer.connectedGames[0];

                return (
                  <tr
                    key={gamer.id}
                    className="hover:bg-[#141826]/60 transition-colors group"
                  >
                    {/* Rank Number with movement indicator */}
                    <td className="py-4 px-4 sm:px-6 text-center font-sans">
                      <div className="flex items-center justify-center gap-1">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-semibold text-[13px] ${
                            rankNum === 1
                              ? "bg-amber-500 text-slate-950 shadow-glow-gold"
                              : rankNum === 2
                              ? "bg-slate-300 text-slate-950"
                              : rankNum === 3
                              ? "bg-amber-700 text-white"
                              : "bg-[#141826] text-slate-400 border border-[#232A42]"
                          }`}
                        >
                          {rankNum}
                        </span>
                      </div>
                    </td>

                    {/* Athlete Info */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={gamer.avatar}
                          alt={gamer.gamerTag}
                          className="w-10 h-10 rounded-xl object-cover border border-[#232A42] shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <Link
                              href={`/profile/${gamer.id}`}
                              className="font-semibold text-white group-hover:text-violet-300 transition text-[14px] truncate"
                            >
                              {gamer.gamerTag}
                            </Link>
                            {gamer.verified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            )}
                          </div>
                          <span className="text-[12px] text-slate-400 truncate block">
                            {gamer.realName} • <span className="font-mono text-slate-500">{gamer.ethoraId}</span>
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Primary Title */}
                    <td className="py-4 px-4">
                      {primaryGame ? (
                        <div>
                          <span className="font-medium text-white text-[14px] block">
                            {primaryGame.gameName}
                          </span>
                          <span className="text-[12px] text-violet-400 font-mono">
                            {primaryGame.rankTier}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[13px]">Multi-title</span>
                      )}
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-[13px] text-slate-300">
                        <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate max-w-[160px]">
                          {gamer.location.communityName || gamer.location.woredaName}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        {gamer.location.regionName}
                      </span>
                    </td>

                    {/* Win Rate */}
                    <td className="py-4 px-4 text-center font-sans">
                      <span className="font-semibold text-emerald-400 text-[14px]">{gamer.stats.winRate}%</span>
                      <span className="text-[11px] text-slate-500 block">
                        {gamer.stats.matchesWon}W - {gamer.stats.matchesPlayed - gamer.stats.matchesWon}L
                      </span>
                    </td>

                    {/* Rating Points (MInT: 16px weight 600) */}
                    <td className="py-4 px-4 text-right font-sans">
                      <span className="text-[16px] font-semibold text-violet-400 block">
                        {gamer.ratingPoints}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 capitalize">
                        {rankTier.tier}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-center">
                      <Link
                        href={`/profile/${gamer.id}`}
                        className="px-3 py-1.5 rounded-lg border border-[#232A42] bg-[#141826] hover:bg-violet-600 hover:text-white text-slate-300 text-[12px] font-medium transition inline-flex items-center gap-1"
                      >
                        <span>Profile</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

