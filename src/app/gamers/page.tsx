"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  MapPin,
  ShieldCheck,
  Trophy,
  Gamepad2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { SUPPORTED_GAMES } from "@/data/games";
import { ETHIOPIA_GEOGRAPHY } from "@/data/geography";
import { getRankTier } from "@/lib/utils";

export default function GamersDirectoryPage() {
  const { gamers } = useEthora();

  const [search, setSearch] = useState("");
  const [selectedGameId, setSelectedGameId] = useState("all");
  const [selectedRegionId, setSelectedRegionId] = useState("all");

  const filteredGamers = gamers.filter((g) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matches =
        g.gamerTag.toLowerCase().includes(q) ||
        g.realName.toLowerCase().includes(q) ||
        g.ethoraId.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (selectedRegionId !== "all" && g.location.regionId !== selectedRegionId) {
      return false;
    }

    if (selectedGameId !== "all") {
      const plays = g.connectedGames.some((cg) => cg.gameId === selectedGameId);
      if (!plays) return false;
    }

    return true;
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. HERO */}
      <div className="relative rounded-2xl border border-[#232A42] bg-gradient-to-r from-[#0E111A] via-[#141826] to-[#0E111A] p-8 overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            Verified Athlete Talent Pool
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
            GAMER DISCOVERY
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Search, filter, and scout Ethiopia's premier esports athletes. Discover rising talent across local gaming
            cafes, sub-cities, and national divisions.
          </p>
        </div>
      </div>

      {/* 2. FILTER CONTROLS */}
      <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by gamer tag, athlete name, or ETHORA ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="sm:col-span-3">
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

          <div className="sm:col-span-3">
            <select
              value={selectedRegionId}
              onChange={(e) => setSelectedRegionId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white focus:outline-none focus:border-violet-500"
            >
              <option value="all">All Ethiopian Regions</option>
              {ETHIOPIA_GEOGRAPHY.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3. GAMER CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGamers.map((gamer) => {
          const rankTier = getRankTier(gamer.ratingPoints);
          const primaryGame = gamer.connectedGames[0];

          return (
            <div
              key={gamer.id}
              className="group rounded-2xl border border-[#232A42] bg-[#0E111A] p-5 space-y-4 hover:border-violet-500/50 hover:shadow-2xl transition duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative shrink-0">
                    <img
                      src={gamer.avatar}
                      alt={gamer.gamerTag}
                      className="w-14 h-14 rounded-xl object-cover border border-[#232A42]"
                    />
                    {gamer.verified && (
                      <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white shadow">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/profile/${gamer.id}`}
                        className="font-bold text-white text-base font-mono hover:text-violet-300 transition truncate"
                      >
                        {gamer.gamerTag}
                      </Link>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{gamer.realName}</p>
                    <span className="text-[10px] font-mono text-cyan-300 truncate block">
                      {gamer.ethoraId}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-amber-400 font-mono block">
                      #{gamer.nationalRank}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-slate-500 block">
                      National
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#141826] border border-[#232A42] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Primary Title:</span>
                    <span className="font-bold text-white font-mono">
                      {primaryGame ? primaryGame.gameName : "Multi-title"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Rating Points:</span>
                    <span className="font-bold text-violet-400 font-mono">
                      {gamer.ratingPoints} ({rankTier.tier})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Win Rate:</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {gamer.stats.winRate}% ({gamer.stats.matchesWon}W)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">
                    {gamer.location.communityName || gamer.location.woredaName},{" "}
                    {gamer.location.regionName}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#232A42]">
                <Link
                  href={`/profile/${gamer.id}`}
                  className="w-full py-2 rounded-xl border border-violet-500/40 bg-violet-600/10 hover:bg-violet-600 text-violet-300 hover:text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5"
                >
                  <span>Scout Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

