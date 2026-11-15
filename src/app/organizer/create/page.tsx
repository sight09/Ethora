"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Swords,
  Trophy,
  Calendar,
  MapPin,
  Users,
  Gamepad2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Image as ImageIcon,
  FileText,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { SUPPORTED_GAMES } from "@/data/games";
import { ETHIOPIA_GEOGRAPHY } from "@/data/geography";
import { formatETB } from "@/lib/utils";

export default function CreateTournamentWizardPage() {
  const router = useRouter();
  const { createTournament, currentSession } = useEthora();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Wizard state
  const [title, setTitle] = useState("Ethiopian Cyber Arena Series 2026");
  const [description, setDescription] = useState(
    "A sanctioned championship gathering the top esports rosters in Addis Ababa for cash prizes and national ranking points."
  );
  const [gameId, setGameId] = useState("game-valorant");
  const [format, setFormat] = useState<"Single Elimination" | "Double Elimination" | "Round Robin" | "Group Stage">(
    "Double Elimination"
  );
  const [startsAt, setStartsAt] = useState("2026-12-10");
  const [endsAt, setEndsAt] = useState("2026-12-18");
  const [registrationDeadline, setRegistrationDeadline] = useState("2026-12-05");
  const [venueType, setVenueType] = useState<"LAN / Arena" | "Online" | "Hybrid (Online + Finals LAN)">(
    "Hybrid (Online + Finals LAN)"
  );
  const [regionName, setRegionName] = useState("Addis Ababa");
  const [venueName, setVenueName] = useState("Millennium Hall Arena • Main Stage");
  const [address, setAddress] = useState("Bole Medhanialem, Addis Ababa, Ethiopia");
  const [rules, setRules] = useState<string[]>([
    "All competitors must possess a verified ETHORA Passport.",
    "Official tournament server ping capped at 75ms max.",
    "Anti-cheat verification and video recording required for all finalists.",
  ]);
  const [newRule, setNewRule] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(16);
  const [prizePoolETB, setPrizePoolETB] = useState(150000);
  const [entryFeeETB, setEntryFeeETB] = useState(0);
  const [bannerUrl, setBannerUrl] = useState(
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
  );

  const selectedGame = SUPPORTED_GAMES.find((g) => g.id === gameId) || SUPPORTED_GAMES[0];

  const stepsList = [
    { num: 1, title: "Basic Info" },
    { num: 2, title: "Game Title" },
    { num: 3, title: "Format" },
    { num: 4, title: "Schedule" },
    { num: 5, title: "Venue & Geo" },
    { num: 6, title: "Rules" },
    { num: 7, title: "Prize & Slots" },
    { num: 8, title: "Branding" },
    { num: 9, title: "Review & Publish" },
  ];

  const handleNext = () => {
    if (currentStep < 9) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setRules([...rules, newRule.trim()]);
      setNewRule("");
    }
  };

  const handlePublish = () => {
    const newTournId = createTournament({
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      gameId: selectedGame.id,
      gameName: selectedGame.name,
      bannerUrl,
      organizer: {
        id: currentSession.organizationId || "org-addis-esports",
        name: currentSession.name || "Lion City Esports",
        tag: "LCE",
        logo: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=150&auto=format&fit=crop",
        verified: true,
      },
      description,
      prizePoolETB: Number(prizePoolETB),
      prizePoolUSD: Math.round(Number(prizePoolETB) / 120),
      format,
      status: "registration_open",
      dates: {
        registrationDeadline,
        startsAt,
        endsAt,
      },
      venueType,
      location: {
        regionName,
        venueName,
        address,
      },
      entryFeeETB: Number(entryFeeETB),
      maxParticipants: Number(maxParticipants),
      rules,
      schedule: [
        { phase: "Qualifiers", time: startsAt, format: "Best of 1" },
        { phase: "Championship Playoffs", time: endsAt, format: "Best of 3 / Best of 5" },
      ],
      brackets: [
        {
          id: `match-init-1`,
          round: 1,
          matchNumber: 1,
          participant1: {
            id: "tbd-1",
            name: "Roster Seed #1",
            tag: "S1",
            avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop",
          },
          participant2: {
            id: "tbd-2",
            name: "Roster Seed #8",
            tag: "S8",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
          },
          status: "scheduled",
          scheduledTime: startsAt,
        },
      ],
    });

    router.push(`/tournaments/${newTournId}`);
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. WIZARD HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/organizer"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Organizer Hub</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
            TOURNAMENT CREATION WIZARD
          </h1>
          <p className="text-xs text-slate-400">
            Step {currentStep} of 9: {stepsList[currentStep - 1].title}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-violet-950 text-violet-300 border border-violet-700">
          9-Step Protocol
        </span>
      </div>

      {/* Progress Bar & Indicators */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-[700px]">
          {stepsList.map((st) => (
            <div
              key={st.num}
              className={`flex-1 p-2 rounded-xl border text-center transition ${
                currentStep === st.num
                  ? "border-violet-500 bg-violet-600/20 text-white font-bold"
                  : currentStep > st.num
                  ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-400"
                  : "border-[#232A42] bg-[#0E111A] text-slate-500"
              }`}
            >
              <span className="text-[10px] uppercase font-mono block">Step {st.num}</span>
              <span className="text-xs truncate block">{st.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. STEP CONTAINER */}
      <div className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* STEP 1: BASIC INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-mono">Step 1: Tournament Identification</h3>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Tournament Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
                placeholder="e.g. Ethiopian National Valorant Masters 2026"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Description & Mission
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
                placeholder="Provide competition background, regional qualifications, and expectations..."
              />
            </div>
          </div>
        )}

        {/* STEP 2: SELECT GAME */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-mono">Step 2: Esports Title</h3>
            <p className="text-xs text-slate-400">Select the game being competed in.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SUPPORTED_GAMES.map((game) => (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => setGameId(game.id)}
                  className={`p-4 rounded-xl border text-left transition flex flex-col items-center text-center gap-2 ${
                    gameId === game.id
                      ? "border-violet-500 bg-violet-950/40 shadow-glow-violet"
                      : "border-[#232A42] bg-[#141826] hover:bg-[#1C2237]"
                  }`}
                >
                  <Gamepad2 className="w-6 h-6 text-violet-400" />
                  <span className="text-sm font-bold text-white">{game.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{game.competitiveFormat}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: COMPETITION FORMAT */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-mono">Step 3: Tournament Bracket Format</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: "Double Elimination",
                  label: "Double Elimination",
                  desc: "Upper and Lower bracket with redemption path. The esports gold standard for premier championships.",
                },
                {
                  id: "Single Elimination",
                  label: "Single Elimination",
                  desc: "Fast-paced sudden death knockouts. High stakes for weekend sprint cups.",
                },
                {
                  id: "Group Stage",
                  label: "Group Stage + Playoffs",
                  desc: "Round robin group pools advancing top 2 into playoff brackets.",
                },
                {
                  id: "Round Robin",
                  label: "Pure Round Robin",
                  desc: "Every team plays every other roster. Ideal for league circuits and points.",
                },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setFormat(fmt.id as any)}
                  className={`p-4 rounded-xl border text-left transition ${
                    format === fmt.id
                      ? "border-violet-500 bg-violet-950/40 shadow-glow-violet"
                      : "border-[#232A42] bg-[#141826] hover:bg-[#1C2237]"
                  }`}
                >
                  <span className="text-sm font-bold text-white block">{fmt.label}</span>
                  <span className="text-xs text-slate-400 block mt-1 leading-relaxed">{fmt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: DATES */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-mono">Step 4: Timeline & Deadlines</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                  Registration Deadline
                </label>
                <input
                  type="date"
                  value={registrationDeadline}
                  onChange={(e) => setRegistrationDeadline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                  Tournament Starts At
                </label>
                <input
                  type="date"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                  Tournament Ends At
                </label>
                <input
                  type="date"
                  value={endsAt}
                  onChange={(e) => setEndsAt(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: VENUE & GEOGRAPHY */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-mono">Step 5: Venue & Geographical Area</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {["Hybrid (Online + Finals LAN)", "LAN / Arena", "Online"].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVenueType(v as any)}
                  className={`p-3 rounded-xl border text-center font-bold text-xs uppercase transition ${
                    venueType === v
                      ? "border-violet-500 bg-violet-600 text-white shadow-glow-violet"
                      : "border-[#232A42] bg-[#141826] text-slate-400 hover:text-white"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Region</label>
                <select
                  value={regionName}
                  onChange={(e) => setRegionName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
                >
                  {ETHIOPIA_GEOGRAPHY.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Venue Name</label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
                  placeholder="e.g. Millennium Hall Arena or Online Server"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Full Physical Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
                placeholder="e.g. Bole Medhanialem, Addis Ababa"
              />
            </div>
          </div>
        )}

        {/* STEP 6: RULES */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-mono">Step 6: Rules & Eligibility Guidelines</h3>
            <div className="space-y-2">
              {rules.map((r, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#141826] border border-[#232A42] text-xs text-slate-200">
                  {i + 1}. {r}
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Add rule or eligibility clause..."
                className="flex-1 px-4 py-2 rounded-xl border border-[#232A42] bg-[#141826] text-white text-xs"
              />
              <button
                type="button"
                onClick={handleAddRule}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold uppercase"
              >
                Add Rule
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: PARTICIPANT CAPACITY & PRIZE */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-mono">Step 7: Roster Capacity & Prize Purses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                  Participant Capacity (Teams)
                </label>
                <select
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm font-mono"
                >
                  <option value={8}>8 Rosters</option>
                  <option value={16}>16 Rosters</option>
                  <option value={32}>32 Rosters</option>
                  <option value={64}>64 Rosters</option>
                  <option value={128}>128 Rosters</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                  Total Prize Pool (ETB)
                </label>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={prizePoolETB}
                  onChange={(e) => setPrizePoolETB(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                  Entry Fee per Team (ETB)
                </label>
                <input
                  type="number"
                  min="0"
                  value={entryFeeETB}
                  onChange={(e) => setEntryFeeETB(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm font-mono"
                  placeholder="0 for Free Entry"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: BANNER & BRANDING */}
        {currentStep === 8 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-mono">Step 8: Tournament Presentation</h3>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Banner Image URL</label>
              <input
                type="text"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-xs font-mono"
              />
            </div>

            <div className="relative h-44 rounded-xl overflow-hidden border border-[#232A42]">
              <img src={bannerUrl} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="font-mono text-sm font-bold text-white">{title}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 9: REVIEW & PUBLISH */}
        {currentStep === 9 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white font-mono">Step 9: Final Review & Sanctioning</h3>
            </div>

            <div className="p-4 rounded-xl border border-[#232A42] bg-[#141826] space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#232A42]">
                <div>
                  <span className="text-slate-400 block">Tournament Title:</span>
                  <span className="font-bold text-white">{title}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Esports Title:</span>
                  <span className="font-bold text-violet-300">{selectedGame.name}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#232A42]">
                <div>
                  <span className="text-slate-400 block">Format:</span>
                  <span className="font-mono font-bold text-white">{format}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Prize Pool:</span>
                  <span className="font-mono font-bold text-amber-400">{formatETB(prizePoolETB)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block">Starts:</span>
                  <span className="font-mono text-slate-200">{startsAt}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Location:</span>
                  <span className="text-slate-200">
                    {venueName}, {regionName}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300">
              Upon publishing, this competition will be listed publicly on the tournament discovery portal and open for
              roster registrations immediately.
            </div>
          </div>
        )}

        {/* 3. NAVIGATION CONTROLS */}
        <div className="pt-4 border-t border-[#232A42] flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] hover:bg-[#1C2237] text-slate-300 text-xs font-bold uppercase transition flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 9 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold uppercase tracking-wider shadow-glow-violet transition flex items-center gap-2"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider shadow-lg transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish & Launch Tournament</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

