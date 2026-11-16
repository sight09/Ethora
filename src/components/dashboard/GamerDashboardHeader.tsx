"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  MapPin,
  Calendar,
  Crown,
  TrendingUp,
  Coins,
  Check,
  Copy,
  Sparkles,
} from "lucide-react";
import { Gamer } from "@/types";

interface GamerDashboardHeaderProps {
  currentUser: Gamer;
}

export const GamerDashboardHeader: React.FC<GamerDashboardHeaderProps> = ({
  currentUser,
}) => {
  const [copiedId, setCopiedId] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard?.writeText(currentUser.ethoraId || "#ETH-7729");
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="relative w-full rounded-[24px] border border-[rgba(168,85,247,0.35)] bg-[#14111F] p-6 lg:p-8 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] font-sans">
      {/* Background Stadium Arena Banner + Assassin Character Artwork */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/ethora-stadium-banner.jpg"
          alt="Stadium Arena"
          className="w-full h-full object-cover object-center opacity-40 lg:opacity-50 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14111F] via-[#14111F]/60 to-[#14111F] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14111F] via-transparent to-[#14111F]/70 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-15">
          <img
            src="/images/dashboard-assassin-clean.png"
            alt="Assassin Hero"
            className="h-full w-auto max-h-[340px] object-contain opacity-35 lg:opacity-50 mix-blend-screen scale-110 translate-y-2 pointer-events-none"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>
        {/* Atmospheric purple glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[220px] bg-[#A855F7]/25 rounded-full blur-[90px] pointer-events-none z-10" />
      </div>

      <div className="relative z-20 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        {/* LEFT: Athlete Avatar & Identity */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
          {/* Avatar Ring */}
          <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28">
            <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-[#A855F7] via-[#6366F1] to-[#38BDF8] shadow-[0_0_24px_rgba(168,85,247,0.6)] flex items-center justify-center">
              <img
                src={currentUser.avatar || "/images/amanuel-avatar.jpg"}
                alt={currentUser.realName || currentUser.gamerTag}
                className="w-full h-full rounded-full object-cover bg-[#0A0A12]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/amanuel-avatar.jpg";
                }}
              />
            </div>
            {/* Verified check badge */}
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#0A0A12] p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#38BDF8] flex items-center justify-center text-[#0A0A12]">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
          </div>

          {/* Identity details */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-[28px] sm:text-[34px] font-[800] text-[#F4F1FF] tracking-tight leading-none">
                {currentUser.realName || "Amanuel Alemu"}
              </h1>
              <ShieldCheck className="w-5 h-5 text-[#A855F7]" />
            </div>

            <div className="flex items-center gap-2 text-[13px] font-[500] text-[#7D7896]">
              <span>ETHORA ID:</span>
              <button
                type="button"
                onClick={handleCopyId}
                className="inline-flex items-center gap-1 font-mono text-[#F4F1FF] hover:text-[#A855F7] transition"
                title="Click to copy ID"
              >
                <span>{currentUser.ethoraId || "#ETH-7729"}</span>
                {copiedId ? (
                  <Check className="w-3 h-3 text-[#22C55E]" />
                ) : (
                  <Copy className="w-3 h-3 text-[#7D7896] hover:text-[#F4F1FF]" />
                )}
              </button>
            </div>

            {/* Pro Gamer Tag Badge */}
            <div className="pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-[600] text-[#F4F1FF] bg-[#A855F7]/15 border border-[#A855F7]/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]">
                <Crown className="w-3.5 h-3.5 text-[#F5B82E]" />
                <span>Pro Gamer</span>
              </span>
            </div>

            {/* Location & Join Date */}
            <div className="flex items-center gap-4 text-[13px] font-[400] text-[#7D7896] pt-1 flex-wrap">
              <span className="flex items-center gap-1.5 text-[#B8B3CC]">
                <MapPin className="w-3.5 h-3.5 text-[#A855F7]" />
                <span>
                  {currentUser.location?.communityName || "Addis Ababa"}, Ethiopia
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-[#7D7896]">
                <Calendar className="w-3.5 h-3.5 text-[#7D7896]" />
                <span>Joined Mar 2025</span>
              </span>
            </div>

            {/* Quote */}
            <p className="text-[13px] italic font-[400] text-[#B8B3CC] pt-1">
              &quot;Where Gamers Become Legend&quot; 🚀
            </p>
          </div>
        </div>

        {/* CENTER / RIGHT: STATS BOX & NATIONAL RANK SHIELD */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 xl:gap-6 self-start xl:self-center">
          {/* Stats Glass Panel */}
          <div className="px-5 py-4 rounded-2xl border border-[rgba(168,85,247,0.25)] bg-[#0A0A12]/80 backdrop-blur-md flex items-center divide-x divide-[rgba(168,85,247,0.2)] shadow-lg">
            {/* 1. Total Matches */}
            <div className="pr-5 space-y-0.5">
              <span className="text-[13px] font-[500] text-[#7D7896] block">
                Total Matches
              </span>
              <span className="text-[26px] sm:text-[30px] font-[700] text-[#F4F1FF] tabular-nums block leading-none">
                {currentUser.stats?.matchesPlayed || 342}
              </span>
            </div>

            {/* 2. Win Rate */}
            <div className="px-5 space-y-0.5">
              <span className="text-[13px] font-[500] text-[#7D7896] block">
                Win Rate
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[26px] sm:text-[30px] font-[700] text-[#F4F1FF] tabular-nums leading-none">
                  {currentUser.stats?.winRate || 77}%
                </span>
                <span className="text-[12px] font-[600] text-[#22C55E] tabular-nums inline-flex items-center">
                  ↑ +2%
                </span>
              </div>
            </div>

            {/* 3. Total Earnings */}
            <div className="pl-5 space-y-0.5">
              <span className="text-[13px] font-[500] text-[#7D7896] block">
                Total Earnings
              </span>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#F5B82E] text-[#0A0A12] flex items-center justify-center font-[800] text-[11px] shadow">
                  ETB
                </div>
                <span className="text-[22px] sm:text-[26px] font-[700] text-[#F5B82E] tabular-nums leading-none">
                  ETB 385,000
                </span>
              </div>
            </div>
          </div>

          {/* National Rank Shield Badge (Image 3) */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="relative w-[130px] sm:w-[145px] p-4 rounded-2xl border-2 border-[#A855F7]/60 bg-gradient-to-b from-[#1E1730] to-[#0A0A12] text-center shadow-[0_0_30px_rgba(168,85,247,0.35)] flex flex-col items-center justify-center group hover:scale-105 transition-transform">
              {/* Crown top decoration */}
              <div className="absolute -top-4 w-9 h-9 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#C084FC] p-1.5 shadow-lg flex items-center justify-center border border-[#F4F1FF]/30">
                <Crown className="w-5 h-5 text-[#F5B82E] fill-[#F5B82E]" />
              </div>

              <span className="text-[12px] font-[600] uppercase tracking-[0.05em] text-[#B8B3CC] block mt-2">
                National Rank
              </span>
              <span className="text-[40px] font-[800] text-[#F5B82E] tabular-nums leading-none my-1 drop-shadow-[0_2px_10px_rgba(245,184,46,0.5)]">
                #1
              </span>
              <div className="flex items-center gap-1.5 text-[12px] font-[500] text-[#F4F1FF] mt-0.5">
                <span className="text-sm">🇪🇹</span>
                <span>Addis Ababa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
