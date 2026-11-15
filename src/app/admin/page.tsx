"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  Swords,
  CheckCircle2,
  XCircle,
  FileText,
  Activity,
  Layers,
  Award,
  Search,
  AlertCircle,
  Lock,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { SUPPORTED_GAMES } from "@/data/games";

export default function AdminConsolePage() {
  const { currentSession, gamers, tournaments } = useEthora();

  const [activeTab, setActiveTab] = useState<"overview" | "verifications" | "audit">("overview");

  const [verificationQueue, setVerificationQueue] = useState([
    {
      id: "v-1",
      gamerTag: "KiroSmoke",
      realName: "Kirubel Sisay",
      gameTitle: "Valorant",
      submittedProof: "Radiant 382 RR Screenshot + VCT East Africa ID",
      submittedDate: "2026-11-12",
      status: "pending",
    },
    {
      id: "v-2",
      gamerTag: "AbebeClutch",
      realName: "Abebe Kassaye",
      gameTitle: "Counter-Strike 2",
      submittedProof: "Premier 22,400 Rating Steam Profile Link",
      submittedDate: "2026-11-11",
      status: "pending",
    },
  ]);

  const handleApproveVerification = (id: string) => {
    setVerificationQueue((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "approved" } : v))
    );
  };

  const handleRejectVerification = (id: string) => {
    setVerificationQueue((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "rejected" } : v))
    );
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. ADMIN HEADER */}
      <div className="relative rounded-2xl border border-rose-900/40 bg-gradient-to-r from-rose-950/20 via-[#0E111A] to-[#0E111A] p-6 lg:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" />
              ETHORA Root Administration & Integrity
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight">
              PLATFORM ADMINISTRATOR CONSOLE
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              System governance, national athlete verification, tournament sanctioning, anti-cheat enforcement, and
              audit logging.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-950/40 text-rose-300 text-xs font-mono font-bold">
              Root Level Access
            </span>
          </div>
        </div>
      </div>

      {/* 2. ADMIN METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[#232A42] bg-[#0E111A] space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Athletes</span>
          <p className="text-2xl font-black text-white font-mono">{gamers.length * 1000 + 420}</p>
          <span className="text-[10px] text-emerald-400">99.8% System Uptime</span>
        </div>

        <div className="p-4 rounded-xl border border-[#232A42] bg-[#0E111A] space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Sanctioned Cups</span>
          <p className="text-2xl font-black text-violet-400 font-mono">{tournaments.length}</p>
          <span className="text-[10px] text-violet-300">All Regions Active</span>
        </div>

        <div className="p-4 rounded-xl border border-[#232A42] bg-[#0E111A] space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Pending Verifications</span>
          <p className="text-2xl font-black text-amber-400 font-mono">
            {verificationQueue.filter((v) => v.status === "pending").length}
          </p>
          <span className="text-[10px] text-amber-300">Manual review queue</span>
        </div>

        <div className="p-4 rounded-xl border border-[#232A42] bg-[#0E111A] space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Active Titles</span>
          <p className="text-2xl font-black text-cyan-400 font-mono">{SUPPORTED_GAMES.length}</p>
          <span className="text-[10px] text-slate-400">FPS, Sports, MOBA</span>
        </div>
      </div>

      {/* 3. TABS */}
      <div className="flex items-center gap-2 border-b border-[#232A42] pb-1">
        {[
          { id: "overview", label: "System Health & Games" },
          { id: "verifications", label: `Athlete Verifications (${verificationQueue.filter(v => v.status === "pending").length})` },
          { id: "audit", label: "Security & Audit Logs" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition ${
              activeTab === t.id
                ? "bg-rose-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-[#141826]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 4. VERIFICATIONS TAB */}
      {activeTab === "verifications" && (
        <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-5">
          <div>
            <h3 className="text-base font-bold text-white font-mono">
              ATHLETE VERIFICATION QUEUE
            </h3>
            <p className="text-xs text-slate-400">
              Review submitted proofs of high rank and national tournament history before awarding official badges.
            </p>
          </div>

          <div className="space-y-3">
            {verificationQueue.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-[#232A42] bg-[#141826] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-mono">{item.gamerTag}</span>
                    <span className="text-xs text-slate-400">({item.realName})</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-950 text-violet-300">
                      {item.gameTitle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 font-mono">Proof: {item.submittedProof}</p>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Submitted: {item.submittedDate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleApproveVerification(item.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify</span>
                      </button>
                      <button
                        onClick={() => handleRejectVerification(item.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-bold transition flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase font-mono ${
                        item.status === "approved"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SYSTEM HEALTH TAB */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-mono">SUPPORTED COMPETITIVE TITLES</h3>
            <div className="space-y-2.5">
              {SUPPORTED_GAMES.map((g) => (
                <div
                  key={g.id}
                  className="p-3 rounded-xl bg-[#141826] border border-[#232A42] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{g.name}</span>
                    <span className="text-slate-400 text-[11px]">{g.competitiveFormat}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                    Active Circuit
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-mono">INFRASTRUCTURE & ANTI-CHEAT</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-[#141826] border border-[#232A42] flex justify-between">
                <span>Ethiopian Ping Optimization:</span>
                <span className="font-mono text-emerald-400 font-bold">Bahrain & Frankfurt (Sub-70ms)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#141826] border border-[#232A42] flex justify-between">
                <span>Anti-Cheat Integrity Service:</span>
                <span className="font-mono text-emerald-400 font-bold">Active & Enforced</span>
              </div>
              <div className="p-3 rounded-xl bg-[#141826] border border-[#232A42] flex justify-between">
                <span>ETB Escrow Payout Engine:</span>
                <span className="font-mono text-cyan-400 font-bold">Operational</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. AUDIT LOGS */}
      {activeTab === "audit" && (
        <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 space-y-4">
          <h3 className="text-base font-bold text-white font-mono">AUDIT TRAIL & SYSTEM EVENTS</h3>
          <div className="space-y-2 text-xs font-mono">
            {[
              { time: "18:42:10 EAT", event: "Grand Finals match score updated for Ethiopian National Masters (2-1)." },
              { time: "17:15:02 EAT", event: "New roster registration approved for Sarbet Vanguard Arena." },
              { time: "15:09:44 EAT", event: "Rating recalculation completed for 48,200 ranked profiles." },
              { time: "12:30:19 EAT", event: "Tournament created: Ethiopian Cyber Arena Series 2026." },
            ].map((log, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#141826] border border-[#232A42] flex items-center justify-between text-slate-300">
                <span>{log.event}</span>
                <span className="text-slate-500 text-[11px] shrink-0">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

