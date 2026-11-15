import React from "react";
import Link from "next/link";
import EthoraLogo from "@/components/brand/EthoraLogo";
import { ShieldCheck, Globe, Trophy, MessageSquare } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#232A42] bg-[#07080D] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-gradient-to-t from-violet-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <EthoraLogo size="lg" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              ETHORA is Ethiopia's premier esports infrastructure, connecting grassroots competitors, verified gamers,
              tournament directors, and organizations across the nation.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Ethiopian Esports Network
              </span>
            </div>
          </div>

          {/* Platform Columns */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Competitions</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/tournaments" className="hover:text-violet-400 transition">
                  Active Tournaments
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="hover:text-violet-400 transition">
                  National Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/tournaments?format=lan" className="hover:text-violet-400 transition">
                  LAN Arena Events
                </Link>
              </li>
              <li>
                <Link href="/organizer/create" className="hover:text-violet-400 transition">
                  Host a Tournament
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Community</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/gamers" className="hover:text-violet-400 transition">
                  Gamer Discovery
                </Link>
              </li>
              <li>
                <Link href="/teams" className="hover:text-violet-400 transition">
                  Esports Teams & Rosters
                </Link>
              </li>
              <li>
                <Link href="/rankings?level=region" className="hover:text-violet-400 transition">
                  Regional Circuits
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-violet-400 transition">
                  Ethora AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-violet-400 transition">
                  About ETHORA
                </Link>
              </li>
              <li>
                <Link href="/rules" className="hover:text-violet-400 transition">
                  Official Rulebook
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-violet-400 transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-violet-400 transition">
                  Privacy & Fair Play
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#232A42] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} ETHORA Gaming Technologies. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-400">Addis Ababa, Ethiopia</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400 font-medium">Where Gamers Become Legends.</span>
            <div className="h-2 w-6 rounded-full ethiopia-flag-stripe opacity-80" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

