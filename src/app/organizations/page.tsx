"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Trophy,
  MapPin,
  Calendar,
  Layers,
  Swords,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";

export default function OrganizationsPage() {
  const { organizations } = useEthora();

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. HERO */}
      <div className="relative rounded-2xl border border-[#232A42] bg-gradient-to-r from-[#0E111A] via-[#141826] to-[#0E111A] p-8 overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Certified Esports Franchises & Federations
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
            ORGANIZATIONS
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            The professional institutions powering competitive esports in Ethiopia. Sponsoring championship rosters,
            funding LAN infrastructure, and scouting the next generation of Ethiopian esports legends.
          </p>
        </div>
      </div>

      {/* 2. ORGS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="rounded-2xl border border-[#232A42] bg-[#0E111A] overflow-hidden hover:border-[#3A456B] transition shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src={org.banner}
                  alt={org.name}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E111A] via-[#0E111A]/40 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Organization
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 -mt-10 relative z-10">
                <div className="flex items-center gap-4">
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0E111A] shadow-xl shrink-0"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white font-mono">{org.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {org.headquarters} • Est. {org.foundedYear}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{org.bio}</p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#141826] border border-[#232A42] text-center">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Tournaments Hosted
                    </span>
                    <span className="text-xl font-black text-violet-400 font-mono">
                      {org.hostedTournaments}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#141826] border border-[#232A42] text-center">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Championship Trophies
                    </span>
                    <span className="text-xl font-black text-amber-400 font-mono">
                      {org.trophiesWon}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                    Sponsored Competitive Teams
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {org.sponsoredTeams.map((teamName) => (
                      <span
                        key={teamName}
                        className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#141826] text-slate-200 border border-[#232A42]"
                      >
                        {teamName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href="/tournaments"
                className="w-full py-2.5 rounded-xl border border-violet-500/40 bg-violet-600/10 hover:bg-violet-600 text-violet-300 hover:text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5"
              >
                <span>View Hosted Competitions</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

