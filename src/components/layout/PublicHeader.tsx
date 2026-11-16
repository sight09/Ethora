"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, Rocket, Trophy, Swords } from "lucide-react";

export const PublicHeader: React.FC = () => {
  const pathname = usePathname();

  const isRankings = pathname === "/rankings";
  const isTournaments = pathname?.startsWith("/tournaments");

  return (
    <header className="w-full bg-[#0A0A12]/95 backdrop-blur-md border-b border-[rgba(168,85,247,0.25)] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/ethora-logo.png"
            alt="ETHORA Logo"
            width={38}
            height={38}
            className="w-9 h-9 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] group-hover:scale-105 transition-transform"
            priority
          />
          <span className="font-sans font-extrabold text-[22px] tracking-wider text-[#F4F1FF] uppercase">
            ETH<span className="text-[#A855F7]">O</span>RA
          </span>
        </Link>

        {/* Center: Navigation for Public Visitor (Rankings & Tournaments) */}
        <nav className="flex items-center gap-6">
          <Link
            href="/rankings"
            className={`flex items-center gap-2 py-1 text-[15px] transition ${
              isRankings
                ? "font-[600] text-[#F4F1FF] border-b-2 border-[#A855F7]"
                : "font-[500] text-[#B8B3CC] hover:text-[#F4F1FF]"
            }`}
          >
            <Trophy className="w-4 h-4 text-[#F5B82E]" />
            <span>Rankings</span>
          </Link>

          <Link
            href="/tournaments"
            className={`flex items-center gap-2 py-1 text-[15px] transition ${
              isTournaments
                ? "font-[600] text-[#F4F1FF] border-b-2 border-[#A855F7]"
                : "font-[500] text-[#B8B3CC] hover:text-[#F4F1FF]"
            }`}
          >
            <Swords className="w-4 h-4 text-[#A855F7]" />
            <span>Tournaments</span>
          </Link>
        </nav>

        {/* Right: Language + Sign In Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-[14px] font-[500] text-[#B8B3CC] px-2.5 py-1.5 rounded-lg border border-[rgba(168,85,247,0.25)] bg-[#14111F]">
            <Globe className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>EN</span>
            <ChevronDown className="w-3 h-3 text-[#7D7896]" />
          </div>

          <Link
            href="/auth/signin"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#A855F7] hover:bg-[#9333EA] text-[#F4F1FF] font-[600] text-[15px] uppercase tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.45)] transition active:scale-95"
          >
            <Rocket className="w-3.5 h-3.5 text-[#F4F1FF]" />
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
