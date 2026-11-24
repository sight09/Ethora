"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  PlusCircle,
  Swords,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Trophy,
  MapPin,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Search,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { formatETB } from "@/lib/utils";

export default function OrganizerDashboardPage() {
  const {
    currentSession,
    tournaments,
    updateRegistrationStatus,
  } = useEthora();

  const [selectedTournamentId, setSelectedTournamentId] = useState<string>(
    tournaments[0]?.id || ""
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const currentTournament =
    tournaments.find((t) => t.id === selectedTournamentId) || tournaments[0];

  const totalRegisteredAthletes = tournaments.reduce(
    (acc, t) => acc + (t.registrations?.length || 0),
    0
  );

  const pendingApplications = (currentTournament?.registrations || []).filter(
    (r) => r.status === "pending"
  ).length || 0;

  const filteredRegistrations = (currentTournament?.registrations || []).filter((r) => {
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. HEADER (EPIC STADIUM ARENA OPERATIONS BANNER) */}
      <div className="relative rounded-2xl border border-[rgba(168,85,247,0.35)] bg-[#14111F] p-6 lg:p-8 overflow-hidden shadow-2xl">
        {/* Background Stadium Arena Banner */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/images/ethora-stadium-banner.jpg"
            alt="Esports Arena"
            className="w-full h-full object-cover object-center opacity-40 filter contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14111F] via-[#14111F]/80 to-[#14111F]/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14111F] via-transparent to-[#14111F]/50 z-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#A855F7]/20 rounded-full blur-3xl pointer-events-none z-10" />
        </div>

        <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#A855F7]/30 bg-[#A855F7]/10 text-[#C084FC] text-xs font-semibold">
              <LayoutDashboard className="w-3.5 h-3.5" />
              Directorate Operations Hub
            </div>
            <h1 className="text-2xl sm:text-4xl font-[800] text-[#F4F1FF] font-sans tracking-tight">
              ORGANIZER DASHBOARD
            </h1>
            <p className="text-xs sm:text-sm text-[#B8B3CC] max-w-2xl leading-relaxed font-sans">
              Manage sanctioned esports events, review competitor applications, coordinate interactive brackets, and
              publish official match results.
            </p>
          </div>

          <Link
            href="/organizer/create"
            className="px-6 py-3.5 rounded-xl bg-[#A855F7] hover:bg-[#9333EA] text-[#F4F1FF] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.45)] transition flex items-center gap-2 shrink-0 font-sans"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Tournament</span>
          </Link>
        </div>
      </div>

      {/* 2. OPERATIONAL METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[#232A42] bg-[#0E111A] space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Hosted Tournaments
          </span>
          <p className="text-2xl font-black text-white font-mono">{tournaments.length}</p>
          <span className="text-[10px] text-violet-400 font-semibold">Active & Historical</span>
        </div>

        <div className="p-4 rounded-xl border border-[#232A42] bg-[#0E111A] space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Pending Applications
          </span>
          <p className="text-2xl font-black text-amber-400 font-mono">{pendingApplications}</p>
          <span className="text-[10px] text-amber-300">Requires review</span>
        </div>

        <div className="p-4 rounded-xl border border-[#232A42] bg-[#0E111A] space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Applicants
          </span>
          <p className="text-2xl font-black text-cyan-400 font-mono">{totalRegisteredAthletes}</p>
          <span className="text-[10px] text-slate-400">Across all circuits</span>
        </div>

        <div className="p-4 rounded-xl border border-[#232A42] bg-[#0E111A] space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Prize Purses
          </span>
          <p className="text-2xl font-black text-emerald-400 font-mono">
            {formatETB(tournaments.reduce((acc, t) => acc + t.prizePoolETB, 0))}
          </p>
          <span className="text-[10px] text-slate-400">Distributed & Active</span>
        </div>
      </div>

      {/* 3. TOURNAMENT SELECTOR TABS */}
      <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase font-mono">Select Tournament to Manage</h3>
            <p className="text-xs text-slate-400">Switch between your active and past competitions</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {tournaments.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTournamentId(t.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition whitespace-nowrap ${
                  selectedTournamentId === t.id
                    ? "bg-violet-600 text-white shadow-glow-violet"
                    : "bg-[#141826] text-slate-400 hover:text-white"
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. REGISTRATION & APPLICANT MANAGEMENT TABLE */}
      {currentTournament && (
        <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-violet-950 text-violet-300 border border-violet-700">
                  {currentTournament.gameName}
                </span>
                <h2 className="text-lg font-bold text-white font-mono">{currentTournament.title}</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Participant Capacity: {currentTournament.registeredCount} / {currentTournament.maxParticipants} Teams
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/tournaments/${currentTournament.id}`}
                className="px-3.5 py-2 rounded-lg border border-[#232A42] bg-[#141826] hover:bg-[#1C2237] text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>View Public Page & Brackets</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Filter Status Pills */}
          <div className="flex items-center gap-2 text-xs">
            {["all", "pending", "approved", "waitlisted", "rejected"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg uppercase font-bold text-[10px] transition ${
                  filterStatus === st
                    ? "bg-violet-600 text-white"
                    : "bg-[#141826] text-slate-400 hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Applicants Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#141826] border-b border-[#232A42] text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Gamer / Athlete</th>
                  <th className="py-3 px-4">ETHORA ID</th>
                  <th className="py-3 px-4">In-Game Name</th>
                  <th className="py-3 px-4">Rank Tier</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#232A42]/50 text-slate-200">
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-[#141826]/40 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={reg.avatar}
                          alt=""
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <span className="font-bold text-white block">{reg.gamerTag}</span>
                          <span className="text-[10px] text-slate-400">{reg.realName}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-cyan-300">{reg.ethoraId}</td>
                    <td className="py-3 px-4 font-mono text-violet-300">{reg.inGameName}</td>
                    <td className="py-3 px-4 font-mono text-amber-300">{reg.rankTier}</td>
                    <td className="py-3 px-4 text-slate-400 truncate max-w-[150px]">{reg.location}</td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          reg.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : reg.status === "pending"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : reg.status === "waitlisted"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        }`}
                      >
                        {reg.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {reg.status !== "approved" && (
                          <button
                            onClick={() =>
                              updateRegistrationStatus(
                                currentTournament.id,
                                reg.id,
                                "approved"
                              )
                            }
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition"
                            title="Approve applicant"
                          >
                            Approve
                          </button>
                        )}

                        {reg.status !== "waitlisted" && (
                          <button
                            onClick={() =>
                              updateRegistrationStatus(
                                currentTournament.id,
                                reg.id,
                                "waitlisted"
                              )
                            }
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px] transition"
                            title="Waitlist applicant"
                          >
                            Waitlist
                          </button>
                        )}

                        {reg.status !== "rejected" && (
                          <button
                            onClick={() =>
                              updateRegistrationStatus(
                                currentTournament.id,
                                reg.id,
                                "rejected"
                              )
                            }
                            className="px-2.5 py-1 rounded bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-[10px] transition"
                            title="Reject applicant"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

