"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Swords,
  Trophy,
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Share2,
  Sparkles,
  Layers,
  Flame,
  Award,
  ChevronRight,
  AlertCircle,
  FileText,
  UserCheck,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { formatETB } from "@/lib/utils";

export default function TournamentDetailPage() {
  const params = useParams();
  const tournamentId = params?.id as string;
  const {
    tournaments,
    currentUser,
    currentSession,
    registerForTournament,
    cancelRegistration,
    updateBracketMatch,
  } = useEthora();

  const [activeTab, setActiveTab] = useState<"overview" | "bracket" | "teams" | "rules">("bracket");
  const [inGameName, setInGameName] = useState("");
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [scoreModalMatch, setScoreModalMatch] = useState<any | null>(null);
  const [score1, setScore1] = useState(2);
  const [score2, setScore2] = useState(1);

  const tournament = tournaments.find((t) => t.id === tournamentId) || tournaments[0];

  const userRegistration = currentUser
    ? tournament.registrations.find((r) => r.gamerId === currentUser.id)
    : null;

  const isOrganizer =
    currentSession.role === "organizer" || currentSession.role === "admin";

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inGameName.trim()) return;
    registerForTournament(tournament.id, inGameName);
    setRegisterModalOpen(false);
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scoreModalMatch) return;
    const winnerId =
      score1 > score2
        ? scoreModalMatch.participant1.id
        : scoreModalMatch.participant2.id;
    updateBracketMatch(
      tournament.id,
      scoreModalMatch.id,
      Number(score1),
      Number(score2),
      winnerId
    );
    setScoreModalMatch(null);
  };

  // Group bracket matches by round
  const round1Matches = tournament.brackets?.filter((m) => m.round === 1) || [];
  const round2Matches = tournament.brackets?.filter((m) => m.round === 2) || [];
  const round3Matches = tournament.brackets?.filter((m) => m.round === 3) || [];

  return (
    <div className="flex-1 w-full pb-16">
      {/* 1. TOURNAMENT HERO BANNER */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900 border-b border-[#232A42]">
        <img
          src={tournament.bannerUrl}
          alt={tournament.title}
          className="w-full h-full object-cover opacity-60 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090E] via-[#08090E]/60 to-transparent" />

        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <Link
            href="/tournaments"
            className="px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/90 text-white text-xs font-bold border border-white/20 backdrop-blur-md flex items-center gap-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Tournaments</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 space-y-8">
        {/* 2. TOURNAMENT HEADER CARD */}
        <div className="rounded-2xl border border-[#232A42] bg-[#0E111A]/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-violet-950 text-violet-300 border border-violet-600/40 font-mono">
                {tournament.gameName}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                {tournament.format}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {tournament.venueType}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white font-mono leading-tight">
              {tournament.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap pt-1">
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {tournament.location.venueName} • {tournament.location.regionName}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Starts: {tournament.dates.startsAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                Organizer: <strong className="text-white">{tournament.organizer.name}</strong>
              </span>
            </div>
          </div>

          {/* Prize Pool and Registration Callout */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-center sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                Total Prize Pool
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {formatETB(tournament.prizePoolETB)}
              </span>
              <span className="text-[10px] text-amber-200/70 font-mono block">≈ ${tournament.prizePoolUSD} USD</span>
            </div>

            {/* Registration Action */}
            {userRegistration ? (
              <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold uppercase font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Application: {userRegistration.status}</span>
                </div>
                <p className="text-[11px] text-slate-300">IGN: {userRegistration.inGameName}</p>
                {userRegistration.status === "pending" && (
                  <button
                    onClick={() => cancelRegistration(tournament.id)}
                    className="text-[10px] text-rose-400 hover:text-rose-300 underline pt-1"
                  >
                    Cancel Registration
                  </button>
                )}
              </div>
            ) : tournament.status === "completed" ? (
              <div className="px-5 py-3 rounded-xl border border-[#232A42] bg-[#141826] text-slate-400 text-xs font-bold uppercase text-center">
                Tournament Concluded
              </div>
            ) : (
              <button
                onClick={() => {
                  if (currentUser) {
                    setInGameName(currentUser.connectedGames[0]?.inGameName || "");
                    setRegisterModalOpen(true);
                  } else {
                    alert("Please sign in or select a Gamer persona to register for tournaments.");
                  }
                }}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider shadow-glow-violet transition flex items-center justify-center gap-2"
              >
                <Swords className="w-4 h-4" />
                <span>Register Roster / Enter</span>
              </button>
            )}
          </div>
        </div>

        {/* 3. NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-b border-[#232A42] pb-1 overflow-x-auto">
          {[
            { id: "bracket", label: "Interactive Brackets", icon: Swords },
            { id: "overview", label: "Competition Overview", icon: Trophy },
            { id: "teams", label: `Participants (${tournament.registeredCount})`, icon: Users },
            { id: "rules", label: "Official Rules & Schedule", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition whitespace-nowrap ${
                  isActive
                    ? "bg-violet-600 text-white shadow-glow-violet"
                    : "text-slate-400 hover:text-white hover:bg-[#141826]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT: INTERACTIVE BRACKETS */}
        {activeTab === "bracket" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#232A42] bg-[#0E111A]">
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  CHAMPIONSHIP PLAYOFF BRACKET
                </h3>
                <p className="text-xs text-slate-400">
                  Live scores update dynamically as matches conclude. Organizers can record scores directly.
                </p>
              </div>

              {isOrganizer && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Organizer Mode: Click matches to update scores
                </span>
              )}
            </div>

            {/* Bracket Visualizer (3 Rounds) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4">
              {/* Round 1: Quarterfinals */}
              <div className="space-y-4">
                <div className="p-2.5 rounded-lg bg-[#141826] border border-[#232A42] text-center font-mono font-bold text-xs uppercase text-slate-300">
                  Round 1 • Quarterfinals (BO3)
                </div>

                <div className="space-y-4">
                  {round1Matches.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => isOrganizer && setScoreModalMatch(m)}
                      className={`rounded-xl border border-[#232A42] bg-[#0E111A] p-3.5 space-y-2 transition shadow-lg ${
                        isOrganizer ? "cursor-pointer hover:border-violet-500" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-[#232A42]">
                        <span>Match #{m.matchNumber}</span>
                        <span className="font-mono text-cyan-300">{m.status.toUpperCase()}</span>
                      </div>

                      {/* Participant 1 */}
                      <div
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          m.participant1.isWinner
                            ? "bg-emerald-950/30 border border-emerald-500/40 text-white font-bold"
                            : "bg-[#141826] text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={m.participant1.avatar}
                            alt=""
                            className="w-6 h-6 rounded-md object-cover"
                          />
                          <span className="text-xs truncate">{m.participant1.name}</span>
                        </div>
                        <span className="font-mono text-xs font-black">{m.participant1.score ?? 0}</span>
                      </div>

                      {/* Participant 2 */}
                      <div
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          m.participant2.isWinner
                            ? "bg-emerald-950/30 border border-emerald-500/40 text-white font-bold"
                            : "bg-[#141826] text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={m.participant2.avatar}
                            alt=""
                            className="w-6 h-6 rounded-md object-cover"
                          />
                          <span className="text-xs truncate">{m.participant2.name}</span>
                        </div>
                        <span className="font-mono text-xs font-black">{m.participant2.score ?? 0}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Round 2: Semifinals */}
              <div className="space-y-4">
                <div className="p-2.5 rounded-lg bg-violet-950/40 border border-violet-700/40 text-center font-mono font-bold text-xs uppercase text-violet-300">
                  Round 2 • Semifinals (BO3)
                </div>

                <div className="space-y-4 pt-8">
                  {round2Matches.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => isOrganizer && setScoreModalMatch(m)}
                      className={`rounded-xl border border-[#232A42] bg-[#0E111A] p-3.5 space-y-2 transition shadow-lg ${
                        isOrganizer ? "cursor-pointer hover:border-violet-500" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-[#232A42]">
                        <span>Match #{m.matchNumber}</span>
                        <span className="font-mono text-cyan-300">{m.status.toUpperCase()}</span>
                      </div>

                      <div
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          m.participant1.isWinner
                            ? "bg-emerald-950/30 border border-emerald-500/40 text-white font-bold"
                            : "bg-[#141826] text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={m.participant1.avatar}
                            alt=""
                            className="w-6 h-6 rounded-md object-cover"
                          />
                          <span className="text-xs truncate">{m.participant1.name}</span>
                        </div>
                        <span className="font-mono text-xs font-black">{m.participant1.score ?? 0}</span>
                      </div>

                      <div
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          m.participant2.isWinner
                            ? "bg-emerald-950/30 border border-emerald-500/40 text-white font-bold"
                            : "bg-[#141826] text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={m.participant2.avatar}
                            alt=""
                            className="w-6 h-6 rounded-md object-cover"
                          />
                          <span className="text-xs truncate">{m.participant2.name}</span>
                        </div>
                        <span className="font-mono text-xs font-black">{m.participant2.score ?? 0}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Round 3: Grand Finals */}
              <div className="space-y-4">
                <div className="p-2.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-center font-mono font-bold text-xs uppercase text-amber-300">
                  Grand Finals • Millennium Hall Arena (BO5)
                </div>

                <div className="space-y-4 pt-16">
                  {round3Matches.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => isOrganizer && setScoreModalMatch(m)}
                      className={`rounded-2xl border-2 border-amber-500/60 bg-[#0E111A] p-5 space-y-3 shadow-glow-gold transition ${
                        isOrganizer ? "cursor-pointer hover:border-amber-400" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] pb-2 border-b border-[#232A42]">
                        <span className="font-bold text-amber-400 flex items-center gap-1">
                          <Trophy className="w-3.5 h-3.5" />
                          CHAMPIONSHIP MATCH
                        </span>
                        <span className="font-mono text-xs text-emerald-400 font-bold">
                          {m.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl bg-[#141826]">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={m.participant1.avatar}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <span className="text-sm font-bold text-white">{m.participant1.name}</span>
                        </div>
                        <span className="font-mono text-base font-black text-white">
                          {m.participant1.score ?? 0}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl bg-[#141826]">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={m.participant2.avatar}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <span className="text-sm font-bold text-white">{m.participant2.name}</span>
                        </div>
                        <span className="font-mono text-base font-black text-white">
                          {m.participant2.score ?? 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: PARTICIPATING TEAMS */}
        {activeTab === "teams" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-mono">
                  REGISTERED ROSTERS & APPLICANTS ({tournament.registrations.length})
                </h3>
                <p className="text-xs text-slate-400">Verified participant list with regional representation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tournament.registrations.map((reg) => (
                <div
                  key={reg.id}
                  className="p-4 rounded-xl border border-[#232A42] bg-[#0E111A] flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={reg.avatar}
                      alt={reg.gamerTag}
                      className="w-12 h-12 rounded-xl object-cover border border-[#232A42]"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white font-mono truncate">
                          {reg.gamerTag}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{reg.ethoraId}</span>
                      </div>
                      <span className="text-xs text-slate-400 block truncate">
                        IGN: <strong className="text-violet-300">{reg.inGameName}</strong>
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate">{reg.location}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase block ${
                        reg.status === "approved"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : reg.status === "pending"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {reg.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block mt-1">
                      {reg.rankTier}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT: RULES & SCHEDULE */}
        {activeTab === "rules" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-4">
              <h3 className="text-base font-bold text-white font-mono">OFFICIAL TOURNAMENT RULES</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed list-disc pl-5">
                {tournament.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-4">
              <h3 className="text-base font-bold text-white font-mono">BROADCAST & MATCH SCHEDULE</h3>
              <div className="space-y-3">
                {tournament.schedule.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#141826] border border-[#232A42] text-xs">
                    <span className="font-bold text-white block">{item.phase}</span>
                    <span className="text-violet-400 font-mono block">{item.time}</span>
                    <span className="text-slate-400 text-[11px]">{item.format}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-4">
              <h3 className="text-base font-bold text-white font-mono">ABOUT THIS COMPETITION</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{tournament.description}</p>
            </div>
            <div className="lg:col-span-4 rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-3 text-xs">
              <h3 className="text-sm font-bold text-white font-mono uppercase">COMPETITION SPECS</h3>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between py-1.5 border-b border-[#232A42]">
                  <span className="text-slate-400">Entry Fee</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {tournament.entryFeeETB === 0 ? "FREE ENTRY" : `${tournament.entryFeeETB} ETB`}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#232A42]">
                  <span className="text-slate-400">Venue Address</span>
                  <span className="text-white text-right">{tournament.location.address}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#232A42]">
                  <span className="text-slate-400">Registration Closes</span>
                  <span className="font-mono text-amber-300">{tournament.dates.registrationDeadline}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* REGISTRATION MODAL */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <Swords className="w-5 h-5 text-violet-400" />
                Tournament Registration
              </h3>
              <button
                onClick={() => setRegisterModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                  Confirm In-Game Name (IGN) for {tournament.gameName}
                </label>
                <input
                  type="text"
                  required
                  value={inGameName}
                  onChange={(e) => setInGameName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm font-mono"
                  placeholder="e.g. ViperX#ET01"
                />
              </div>

              <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-500/30 text-xs text-slate-300 leading-relaxed">
                By submitting your registration, your team will be entered into the organizer review queue. You will
                receive check-in notifications before matches begin.
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRegisterModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase"
                >
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCORE RECORDING MODAL (FOR ORGANIZERS) */}
      {scoreModalMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Record Match Score & Advance
              </h3>
              <button
                onClick={() => setScoreModalMatch(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveScore} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-[#141826] border border-[#232A42] text-center space-y-2">
                  <span className="text-xs font-bold text-white truncate block">
                    {scoreModalMatch.participant1.name}
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={score1}
                    onChange={(e) => setScore1(Number(e.target.value))}
                    className="w-16 mx-auto text-center py-2 rounded-lg bg-[#0E111A] border border-[#232A42] text-xl font-bold font-mono text-white"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#141826] border border-[#232A42] text-center space-y-2">
                  <span className="text-xs font-bold text-white truncate block">
                    {scoreModalMatch.participant2.name}
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={score2}
                    onChange={(e) => setScore2(Number(e.target.value))}
                    className="w-16 mx-auto text-center py-2 rounded-lg bg-[#0E111A] border border-[#232A42] text-xl font-bold font-mono text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setScoreModalMatch(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase"
                >
                  Save Score & Advance Bracket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

