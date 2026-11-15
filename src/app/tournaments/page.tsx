"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Swords,
  Trophy,
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  Flame,
  ArrowRight,
  Clock,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { formatETB } from "@/lib/utils";
import { SUPPORTED_GAMES } from "@/data/games";
import { ETHIOPIA_GEOGRAPHY } from "@/data/geography";

export default function TournamentsDiscoveryPage() {
  const { tournaments } = useEthora();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGameId, setSelectedGameId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "live" | "registration_open" | "upcoming" | "completed">("all");
  const [selectedVenueType, setSelectedVenueType] = useState<string>("all");

  const filteredTournaments = tournaments.filter((t) => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = t.title.toLowerCase().includes(q);
      const matchesGame = t.gameName.toLowerCase().includes(q);
      const matchesLoc = t.location.regionName.toLowerCase().includes(q) || t.location.venueName.toLowerCase().includes(q);
      if (!matchesTitle && !matchesGame && !matchesLoc) return false;
    }

    // Game filter
    if (selectedGameId !== "all" && t.gameId !== selectedGameId) return false;

    // Status filter
    if (selectedStatus !== "all" && t.status !== selectedStatus) return false;

    // Venue filter
    if (selectedVenueType !== "all") {
      if (selectedVenueType === "lan" && !t.venueType.includes("LAN")) return false;
      if (selectedVenueType === "online" && !t.venueType.includes("Online")) return false;
    }

    return true;
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. DISCOVERY HERO */}
      <div className="relative rounded-2xl border border-[#232A42] bg-gradient-to-r from-[#0E111A] via-[#141826] to-[#0E111A] p-8 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold">
              <Swords className="w-3.5 h-3.5" />
              Sanctioned Ethiopian Esports Circuits
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              TOURNAMENT HUB
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Discover active brackets, official national championships, LAN arena showdowns, and grassroots community
              cups across Ethiopia.
            </p>
          </div>

          <Link
            href="/organizer/create"
            className="px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-violet transition flex items-center gap-2 shrink-0"
          >
            <Swords className="w-4 h-4" />
            <span>Host a Tournament</span>
          </Link>
        </div>
      </div>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tournament name, venue, city..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Game Title Filter */}
          <div className="lg:col-span-3">
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

          {/* Status Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white focus:outline-none focus:border-violet-500"
            >
              <option value="all">All Statuses</option>
              <option value="live">Live Matches</option>
              <option value="registration_open">Registration Open</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Venue Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedVenueType}
              onChange={(e) => setSelectedVenueType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white focus:outline-none focus:border-violet-500"
            >
              <option value="all">All Formats</option>
              <option value="lan">LAN / Arena Events</option>
              <option value="online">Online Tournaments</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-400">
          <span className="font-semibold text-slate-300 shrink-0">Popular:</span>
          {SUPPORTED_GAMES.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGameId(selectedGameId === g.id ? "all" : g.id)}
              className={`px-3 py-1 rounded-lg border text-xs font-semibold whitespace-nowrap transition ${
                selectedGameId === g.id
                  ? "bg-violet-600 text-white border-violet-500"
                  : "bg-[#141826] text-slate-300 border-[#232A42] hover:bg-[#1C2237]"
              }`}
            >
              {g.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* 3. TOURNAMENT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.map((tourn) => {
          const isLive = tourn.status === "live";
          const isOpen = tourn.status === "registration_open";
          const progressPercent = Math.min(100, Math.round((tourn.registeredCount / tourn.maxParticipants) * 100));

          return (
            <div
              key={tourn.id}
              className="group rounded-2xl border border-[#232A42] bg-[#0E111A] overflow-hidden hover:border-[#3A456B] hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Banner Artwork & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={tourn.bannerUrl}
                  alt={tourn.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E111A] via-[#0E111A]/40 to-transparent" />

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  {isLive ? (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-600 text-white flex items-center gap-1.5 shadow-lg animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      LIVE MATCHES
                    </span>
                  ) : isOpen ? (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white flex items-center gap-1.5 shadow-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      OPEN FOR REGISTRATION
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-violet-950/90 text-violet-300 border border-violet-700/50">
                      {tourn.status.toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-black/80 backdrop-blur-md text-slate-300 border border-slate-700">
                    {tourn.venueType}
                  </span>
                </div>

                {/* Game Title Tag */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-black tracking-wider uppercase bg-black/80 text-violet-300 border border-violet-500/30 font-mono">
                    {tourn.gameName}
                  </span>
                </div>
              </div>

              {/* Body (MInT Spec: Card title 14px 600, subtitle 12px 400, timestamp 11px 500 tracked uppercase) */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 font-sans">
                <div>
                  <h3 className="font-sans font-semibold text-[15px] text-white group-hover:text-violet-300 transition line-clamp-1">
                    {tourn.title}
                  </h3>
                  <p className="font-sans font-normal text-[13px] text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {tourn.description}
                  </p>
                </div>

                {/* Location & Format */}
                <div className="space-y-1.5 font-sans text-[12px] text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" strokeWidth={1.75} />
                    <span className="truncate">{tourn.location.venueName}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" strokeWidth={1.75} />
                      {tourn.dates.startsAt}
                    </span>
                    <span className="font-mono text-slate-400">{tourn.format}</span>
                  </div>
                </div>

                {/* Registration Progress Bar */}
                <div className="space-y-1 pt-1 font-sans">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-slate-400">Rosters registered</span>
                    <span className="font-medium text-slate-200">
                      {tourn.registeredCount} / {tourn.maxParticipants} ({progressPercent}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#141826] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        progressPercent >= 100 ? "bg-rose-500" : "bg-gradient-to-r from-violet-600 to-cyan-400"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Prize Pool Bar */}
                <div className="pt-3 border-t border-[#232A42] flex items-center justify-between">
                  <div>
                    <span className="font-sans text-[12px] font-normal text-slate-400 block">Prize Pool</span>
                    <span className="font-sans text-[16px] font-bold text-amber-400">
                      {formatETB(tourn.prizePoolETB)}
                    </span>
                  </div>

                  <Link
                    href={`/tournaments/${tourn.id}`}
                    className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-sans font-medium text-[13px] shadow-glow-violet transition flex items-center gap-1.5"
                  >
                    <span>View & Register</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

