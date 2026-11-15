"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Users,
  Trophy,
  Plus,
  MapPin,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Gamepad2,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { SUPPORTED_GAMES } from "@/data/games";

export default function TeamsPage() {
  const { teams, currentUser, createTeam } = useEthora();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamTag, setTeamTag] = useState("");
  const [gameId, setGameId] = useState("game-valorant");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const game = SUPPORTED_GAMES.find((g) => g.id === gameId);
    if (!game) return;
    createTeam(teamName, teamTag, game.id, game.name);
    setCreateModalOpen(false);
    setTeamName("");
    setTeamTag("");
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. HERO */}
      <div className="relative rounded-2xl border border-[#232A42] bg-gradient-to-r from-[#0E111A] via-[#141826] to-[#0E111A] p-8 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              Ethiopian Esports Rosters & Clans
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
              TEAMS & SQUADS
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Find verified Ethiopian competitive teams, recruit free agents, join community scrim groups, and register
              rosters for national tournaments.
            </p>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-violet transition flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Team</span>
          </button>
        </div>
      </div>

      {/* 2. TEAMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-5 hover:border-[#3A456B] transition shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-[#232A42]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-white font-mono">{team.name}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-950 text-violet-300 border border-violet-700">
                      [{team.tag}]
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{team.gameName} Division</p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    {team.region}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-black text-amber-400 font-mono block">
                  {team.stats.tournamentsWon} Trophies
                </span>
                <span className="text-[10px] text-emerald-400 font-mono block">
                  {team.stats.winRate}% Win Rate
                </span>
              </div>
            </div>

            {/* Roster Members */}
            <div className="space-y-2 pt-2 border-t border-[#232A42]">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block font-mono">
                Active Starting Roster ({team.members.length} Athletes)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {team.members.map((member) => (
                  <div
                    key={member.id}
                    className="p-2 rounded-lg bg-[#141826] border border-[#232A42] flex items-center gap-2"
                  >
                    <img
                      src={member.avatar}
                      alt={member.tag}
                      className="w-7 h-7 rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white font-mono truncate block">
                        {member.tag}
                      </span>
                      <span className="text-[9px] text-slate-400 truncate block">{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE TEAM MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <Layers className="w-5 h-5 text-violet-400" />
                Register Esports Team Roster
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Team Name</label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Great Rift Phoenix"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                  Tag / Abbreviation (2-4 Letters)
                </label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={teamTag}
                  onChange={(e) => setTeamTag(e.target.value)}
                  placeholder="e.g. GRP"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Esports Title</label>
                <select
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
                >
                  {SUPPORTED_GAMES.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase"
                >
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

