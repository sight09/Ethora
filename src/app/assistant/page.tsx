"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  User,
  Swords,
  Trophy,
  MapPin,
  HelpCircle,
  Flame,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { EthoraEmblem } from "@/components/brand/EthoraLogo";

// Clean message formatter that eliminates raw asterisks and creates clean esports typography
const formatChatMessage = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
    const isNumbered = /^\d+\.\s/.test(line.trim());

    const cleanLine = line.replace(/^\s*[•\-]\s*/, "");
    const parts = cleanLine.split(/(\*\*[^*]+\*\*)/g);

    const formattedContent = parts.map((part, partIdx) => {
      if (part.startsWith("")) {
        return (
          <span key={partIdx} className="font-bold text-[#F4F1FF]">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex items-start gap-2 py-0.5 pl-0.5">
          <span className="text-[#A855F7] font-black leading-none mt-1 text-sm">•</span>
          <span className="flex-1 text-[#B8B3CC]">{formattedContent}</span>
        </div>
      );
    }

    if (isNumbered) {
      const match = line.trim().match(/^(\d+\.)\s*(.*)$/);
      if (match) {
        const numParts = match[2].split(/(\*\*[^*]+\*\*)/g);
        return (
          <div key={lineIdx} className="flex items-start gap-2 py-0.5 pl-0.5">
            <span className="text-[#A855F7] font-bold text-xs leading-none mt-0.5">{match[1]}</span>
            <span className="flex-1 text-[#B8B3CC]">
              {numParts.map((p, idx) =>
                p.startsWith("") ? (
                  <span key={idx} className="font-bold text-[#F4F1FF]">
                    {p.slice(2, -2)}
                  </span>
                ) : (
                  p
                )
              )}
            </span>
          </div>
        );
      }
    }

    if (line.trim() === "") {
      return <div key={lineIdx} className="h-1.5" />;
    }

    return (
      <p key={lineIdx} className="text-[#B8B3CC]">
        {formattedContent}
      </p>
    );
  });
};

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
  suggestions?: string[];
  links?: { label: string; href: string }[];
}

export default function EthoraAIAssistantPage() {
  const { currentUser, tournaments, currentSession } = useEthora();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: `Greetings ${
        currentUser ? currentUser.gamerTag : "Competitor"
      }! I am ETHORA AI, your dedicated competitive copilot. I analyze official Ethiopian esports rankings, tournament schedules, team recruitment rosters, and competitive mechanics to help you rise to the top.`,
      time: "Just now",
      suggestions: [
        "What tournaments can I register for right now?",
        "How is the ETHORA National Ranking calculated?",
        "Where are the top gaming hubs in Addis Ababa?",
        "Explain the difference between Single & Double Elimination brackets",
      ],
      links: [
        { label: "Browse Tournaments", href: "/tournaments" },
        { label: "View National Leaderboards", href: "/rankings" },
      ],
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setTyping(true);

    // Generate contextually intelligent response
    setTimeout(() => {
      let replyText = "";
      let suggestions: string[] = [];
      let links: { label: string; href: string }[] = [];

      const lower = text.toLowerCase();

      if (lower.includes("tournament") || lower.includes("register") || lower.includes("competition")) {
        replyText = `Based on current verified listings, there are active tournaments open for registration:
1. Ethiopian National Valorant Masters 2026 (Double Elimination • 250,000 ETB Prize Pool • Millennium Hall Finals).
2. Ethiopia EA SPORTS FC 24 National Championship (128 slots • 180,000 ETB Prize Pool • Sarbet Vanguard Arena).
3. Horn of Africa PUBG Mobile Battlegrounds (32 squads • 120,000 ETB Prize Pool).

Your ETHORA Passport verifies your eligibility to submit roster applications directly from the tournament portal.`;
        links = [{ label: "Explore Tournaments", href: "/tournaments" }];
        suggestions = ["How do brackets work?", "What are the rules for Valorant Masters?"];
      } else if (lower.includes("ranking") || lower.includes("calculate") || lower.includes("points") || lower.includes("mmr")) {
        replyText = `ETHORA's ranking calculation is game-specific and transparent:
- Sanctioned Match Victories: Win matches in official events to earn +25 to +40 Rating Points based on opponent difficulty.
- Tournament Placement Multiplier: Finishing in the top 3 of regional or national finals awards large prestige boosts (e.g., +150 to +300 pts).
- Geographic Escalation: Consistent wins at the Community level qualify you for Woreda/City cups, then Zone, Regional, and the prestigious National Apex ranking.
- Inactivity Decay: High-ranking athletes must play at least 1 verified match every 30 days to avoid minor point decay.`;
        links = [{ label: "View Rankings", href: "/rankings" }];
        suggestions = ["Who is currently Rank #1 in Ethiopia?", "How do I level up my rank?"];
      } else if (lower.includes("hub") || lower.includes("addis") || lower.includes("lounge") || lower.includes("bole") || lower.includes("piassa")) {
        replyText = `Top sanctioned esports centers and gaming lounges in Addis Ababa include:
- Bole Medhanialem Cyber Lounge (Bole Sub-City): Elite high-refresh monitors and ultra-low ping fiber routes to Middle East & EU servers.
-  (Nifas Silk-Lafto): Console powerhouse hosting weekend EA FC 24 and Tekken 8 LANs.
-  (Arada Sub-City): The iconic birthplace of Ethiopian Counter-Strike and fighting games.
-  (Yeka Sub-City): Tactical FPS training grounds for rising 5v5 rosters.`;
        suggestions = ["Find teammates in Bole", "Show upcoming LAN tournaments"];
      } else if (lower.includes("bracket") || lower.includes("elimination") || lower.includes("format")) {
        replyText = `Here is how competition formats work on ETHORA:
- : Every roster gets two lives. Losing in the Upper Bracket drops you to the Lower Bracket, where you can battle back to the Grand Finals. Recommended for championships with cash prizes.
- : Sudden-death knockouts. One defeat eliminates a team. Fast and thrilling for 1-day or weekend qualifiers.
- : Rosters compete in round-robin pools (e.g., 4 groups of 4); top 2 from each group advance to elimination playoffs.`;
        suggestions = ["Create a Double Elimination tournament", "How do I report match scores?"];
      } else {
        replyText = `I analyzed your inquiry against ETHORA's competitive network database. You can manage your verified game handles in your dashboard, explore active regional circuits, or check with tournament directors. Let me know if you would like me to recommend specific tournaments or break down your ranking progression!`;
        suggestions = [
          "Recommend tournaments for me",
          "How is my national rank calculated?",
          "Browse open tournament brackets",
        ];
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: "ai",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions,
        links,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 800);
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[85vh]">
      {/* 1. ASSISTANT HEADER */}
      <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-4 sm:p-5 flex items-center justify-between shadow-xl mb-4 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-purple-500/50 bg-[#0A0718] flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <img
                src="/ai-copilot-bot.svg"
                alt="ETHORA AI"
                className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white font-mono">ETHORA AI</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-600/30 text-violet-300 border border-violet-500/30">
                Competitive Copilot
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live intelligence for Ethiopian tournaments, rules, rankings & metas
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Verified Knowledge Base</span>
        </div>
      </div>

      {/* 2. CHAT MESSAGES CONTAINER */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-[#232A42] bg-[#0B0E17] p-4 sm:p-6 space-y-6 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3.5 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            {msg.sender === "user" ? (
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white shrink-0 shadow">
                <User className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#0A0718] border border-violet-500/40 flex items-center justify-center shrink-0 p-0.5 shadow-glow-violet">
                <img
                  src="/ai-copilot-bot.svg"
                  alt="ETHORA AI"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(168,85,247,0.7)]"
                />
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-2xl space-y-3 ${
                msg.sender === "user"
                  ? "bg-violet-600 text-white rounded-2xl rounded-tr-none px-4 py-3 shadow-glow-violet"
                  : "bg-[#0E111A] border border-[#232A42] text-slate-200 rounded-2xl rounded-tl-none p-4 sm:p-5 shadow-xl"
              }`}
            >
              <div className="flex items-center justify-between gap-4 text-[10px] opacity-70 pb-1">
                <span className="font-bold uppercase tracking-wider font-mono">
                  {msg.sender === "user" ? "You" : "ETHORA AI Intelligence"}
                </span>
                <span>{msg.time}</span>
              </div>

              <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                {formatChatMessage(msg.text)}
              </div>

              {/* Action Links */}
              {msg.links && msg.links.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#232A42]">
                  {msg.links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      className="px-3 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white text-xs font-bold transition flex items-center gap-1 border border-violet-500/30"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>
              )}

              {/* Follow-up Suggestions Chips */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-[#232A42]">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">
                    Suggested Inquiries:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sugg, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sugg)}
                        className="px-2.5 py-1 rounded-lg bg-[#141826] hover:bg-[#1C2237] border border-[#232A42] hover:border-violet-500/50 text-slate-300 hover:text-white text-[11px] transition text-left"
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#141826] border border-violet-500/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-violet-400 animate-spin" />
            </div>
            <div className="p-3 rounded-xl bg-[#0E111A] border border-[#232A42] text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-bounce delay-100" />
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-bounce delay-200" />
              <span>Analyzing esports network data...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. INPUT BAR */}
      <div className="pt-4 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ETHORA AI about tournaments, ranking rules, Addis lounges, brackets..."
            className="w-full pl-5 pr-28 py-3.5 rounded-2xl border border-[#232A42] bg-[#0E111A] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 shadow-xl"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider shadow-glow-violet transition flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

