"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  User,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { EthoraEmblem } from "@/components/brand/EthoraLogo";

// Clean message formatter that eliminates raw asterisks and creates clean esports typography
const formatChatMessage = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
    const isNumbered = /^\d+\.\s/.test(line.trim());

    // Clean text by parsing any **bold** markers without showing raw asterisks
    const cleanLine = line.replace(/^\s*[•\-]\s*/, "");
    const parts = cleanLine.split(/(\*\*[^*]+\*\*)/g);

    const formattedContent = parts.map((part, partIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
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
            <span className="text-[#A855F7] font-bold text-[11px] leading-none mt-0.5 font-exo">{match[1]}</span>
            <span className="flex-1 text-[#B8B3CC]">
              {numParts.map((p, idx) =>
                p.startsWith("**") && p.endsWith("**") ? (
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

interface FloatingAIChatProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const FloatingAIChat: React.FC<FloatingAIChatProps> = ({
  isOpen: externalIsOpen,
  onToggle: externalOnToggle,
}) => {
  const { currentUser } = useEthora();

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const toggleOpen = externalOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const initialWelcomeText = `Hello ${
    currentUser ? currentUser.gamerTag : "Competitor"
  }! I am ETHORA AI, your dedicated esports copilot. Ask me about upcoming tournaments, ranking points, local gaming hubs in Addis Ababa, or team recruitment!`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      sender: "ai",
      text: initialWelcomeText,
      time: "Just now",
      suggestions: [
        "What tournaments are open right now?",
        "How do I level up my national rank?",
        "Find gaming lounges in Bole",
        "How do double elimination brackets work?",
      ],
      links: [
        { label: "View Tournaments", href: "/tournaments" },
        { label: "Check Leaderboards", href: "/rankings" },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing, isOpen, isMinimized]);

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

    setTimeout(() => {
      let replyText = "";
      let suggestions: string[] = [];
      let links: { label: string; href: string }[] = [];

      const lower = text.toLowerCase();

      if (
        lower.includes("tournament") ||
        lower.includes("register") ||
        lower.includes("open") ||
        lower.includes("compete")
      ) {
        replyText = `Found verified tournaments ready for entry:
• Ethiopian National Valorant Masters 2026 (Double Elim, 250,000 ETB Prize, Millennium Hall LAN Finals).
• Ethiopia EA SPORTS FC 24 National Championship (128 slots, 180,000 ETB Prize Pool, Sarbet Vanguard Arena).
• Horn of Africa PUBG Mobile Battlegrounds (32 squads, 120,000 ETB Prize Pool).

You can register directly from the tournament details page with your verified in-game tag!`;
        links = [{ label: "Browse Tournaments", href: "/tournaments" }];
        suggestions = ["How do brackets work?", "Who is Rank #1 right now?"];
      } else if (
        lower.includes("rank") ||
        lower.includes("points") ||
        lower.includes("calculate") ||
        lower.includes("ladder")
      ) {
        replyText = `ETHORA National Ranking points are calculated through:
1. Match Victories: Win matches in official events (+25 to +40 rating points per victory).
2. Placement Multipliers: Finishing in top 3 of regional or national finals grants large bonuses (+150 to +300 pts).
3. Geographic Progression: Community -> Woreda/City -> Zone -> Regional -> National Apex.`;
        links = [{ label: "View Leaderboards", href: "/rankings" }];
        suggestions = ["How to climb from Bole to National?", "Show top 3 gamers"];
      } else if (
        lower.includes("hub") ||
        lower.includes("addis") ||
        lower.includes("lounge") ||
        lower.includes("bole") ||
        lower.includes("sarbet") ||
        lower.includes("piassa")
      ) {
        replyText = `Top certified gaming hubs in Addis Ababa:
• Bole Medhanialem Cyber Lounge (Bole Sub-City): Ultra-low latency fiber routes, 240Hz monitors.
• Sarbet Vanguard Gaming Arena (Nifas Silk-Lafto): Console home of EA FC 24 and Tekken 8 weekend LANs.
• Piassa Historic Gamers Club (Arada Sub-City): Classic PC Counter-Strike and fighting game arena.
• Megenagna Cyber Apex (Yeka Sub-City): Tactical FPS 5v5 team scrim facilities.`;
        suggestions = ["Find tournaments in Addis Ababa", "Recommend teams in Bole"];
      } else if (
        lower.includes("bracket") ||
        lower.includes("elimination") ||
        lower.includes("format")
      ) {
        replyText = `Tournament formats on ETHORA:
• Double Elimination: Two losses before elimination. Upper and Lower brackets ensure the best teams reach the finals.
• Single Elimination: Sudden death knockouts. Perfect for 1-day sprint cups.
• Group Stage: Round-robin pools where top 2 teams advance to the championship bracket.`;
        suggestions = ["Create a tournament", "What tournaments are live?"];
      } else {
        replyText = `I analyzed your inquiry against the ETHORA competitive network. You can explore open tournaments, view your ranking progression on the leaderboards, or check match brackets. What title or city would you like to know more about?`;
        suggestions = [
          "Recommend tournaments for me",
          "How is my national rank calculated?",
          "Find gaming lounges in Addis",
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
    }, 700);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "msg-reset",
        sender: "ai",
        text: initialWelcomeText,
        time: "Just now",
        suggestions: [
          "What tournaments are open right now?",
          "How do I level up my national rank?",
          "Find gaming lounges in Bole",
        ],
      },
    ]);
  };

  return (
    <>
      {/* ETHORA LOGO FLOATING BUTTON IN THE BOTTOM-RIGHT CORNER */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
          <button
            onClick={toggleOpen}
            className="group relative flex items-center gap-2.5 p-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-[#14111F] hover:bg-[#1A1629] text-white shadow-2xl shadow-purple-950/60 border border-[rgba(168,85,247,0.35)] hover:border-[#A855F7] hover:scale-105 active:scale-95 transition-all"
            aria-label="Open ETHORA AI Copilot"
            title="Chat with ETHORA AI Copilot"
          >
            {/* Ambient outer glow */}
            <div className="absolute inset-0 rounded-2xl bg-[#A855F7]/25 blur-xl -z-10 group-hover:blur-2xl transition-all" />

            {/* ETHORA Logo Icon with Live Status Dot */}
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-[rgba(168,85,247,0.5)] bg-[#0A0A12] flex items-center justify-center p-0.5 shadow-md">
                <img
                  src="/ethora-logo.png"
                  alt="ETHORA AI"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]"
                />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-[#14111F] animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-[#14111F]" />
            </div>

            <div className="hidden sm:block text-left pr-1">
              <div className="flex items-center gap-1.5">
                <span className="font-exo font-bold text-xs text-[#F4F1FF] leading-none">ETHORA AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
              </div>
              <span className="text-[10px] text-[#B8B3CC] font-normal block mt-0.5">
                Esports Copilot
              </span>
            </div>
          </button>
        </div>
      )}

      {/* EXPANDED AI CHAT WINDOW IN THE BOTTOM-RIGHT CORNER */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] rounded-3xl border border-[rgba(168,85,247,0.35)] bg-[#0A0A12]/98 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
            isMinimized ? "h-16" : "h-[540px] max-h-[85vh]"
          }`}
        >
          {/* 1. CHAT HEADER */}
          <div className="p-3.5 bg-gradient-to-r from-[#14111F] via-[#1A1629] to-[#0A0A12] border-b border-[rgba(168,85,247,0.25)] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-xl overflow-hidden border border-[rgba(168,85,247,0.5)] bg-[#0A0A12] flex items-center justify-center p-0.5 shadow-md">
                  <img
                    src="/ethora-logo.png"
                    alt="ETHORA AI"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-[#14111F]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-exo font-extrabold text-sm text-[#F4F1FF]">ETHORA AI</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30">
                    Copilot
                  </span>
                </div>
                <span className="text-[10px] text-[#7D7896] block">
                  Online • Ethiopian Esports Intelligence
                </span>
              </div>
            </div>

            {/* Header controls: Reset, Minimize, Close */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-[#7D7896] hover:text-[#F4F1FF] hover:bg-[#14111F] transition"
                title="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-[#7D7896] hover:text-[#F4F1FF] hover:bg-[#14111F] transition"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={toggleOpen}
                className="p-1.5 rounded-lg text-[#7D7896] hover:text-[#F4F1FF] hover:bg-[#14111F] transition"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. CHAT STREAM (WHEN NOT MINIMIZED) */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0A0A12]/80 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    {msg.sender === "user" ? (
                      <div className="w-7 h-7 rounded-lg bg-[#A855F7] flex items-center justify-center text-[#F4F1FF] shrink-0 text-xs">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg overflow-hidden border border-[rgba(168,85,247,0.5)] bg-[#0A0A12] flex items-center justify-center p-0.5 shrink-0 shadow">
                        <img
                          src="/ethora-logo.png"
                          alt="ETHORA AI"
                          className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(168,85,247,0.6)]"
                        />
                      </div>
                    )}

                    {/* Bubble */}
                    <div
                      className={`max-w-[85%] space-y-2.5 ${
                        msg.sender === "user"
                          ? "bg-[#A855F7] text-[#F4F1FF] rounded-2xl rounded-tr-none px-3.5 py-2.5 shadow-md"
                          : "bg-[#14111F] border border-[rgba(168,85,247,0.25)] text-[#B8B3CC] rounded-2xl rounded-tl-none p-3.5 shadow-md"
                      }`}
                    >
                      <div className="text-xs leading-relaxed font-sans space-y-1">
                        {formatChatMessage(msg.text)}
                      </div>

                      {/* Links */}
                      {msg.links && msg.links.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-[#232A42]">
                          {msg.links.map((link, idx) => (
                            <Link
                              key={idx}
                              href={link.href}
                              className="px-2.5 py-1 rounded-md bg-violet-600/30 hover:bg-violet-600 text-violet-300 hover:text-white text-[10px] font-bold transition flex items-center gap-1 border border-violet-500/30"
                            >
                              <span>{link.label}</span>
                              <ChevronRight className="w-3 h-3" />
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Prompt chips */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="space-y-1 pt-1.5 border-t border-[#232A42]">
                          <span className="text-[9px] font-bold uppercase text-slate-400 block font-mono">
                            Suggested Queries:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {msg.suggestions.map((sugg, i) => (
                              <button
                                key={i}
                                onClick={() => handleSend(sugg)}
                                className="px-2 py-0.5 rounded-md bg-[#0E111A] hover:bg-[#1E253A] border border-[#232A42] text-slate-300 hover:text-white text-[10px] transition text-left"
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
                  <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-spin" />
                    <span>ETHORA AI is searching tournaments & rankings...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* 3. INPUT BAR */}
              <div className="p-3 bg-[#0E111A] border-t border-[#232A42] shrink-0">
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
                    placeholder="Ask about tournaments, rankings, Addis hubs..."
                    className="w-full pl-3.5 pr-16 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-bold text-[10px] uppercase tracking-wider transition flex items-center gap-1"
                  >
                    <span>Send</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingAIChat;
