"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Building2,
  Lock,
  ArrowRight,
  Download,
  Printer,
  Sparkles,
  Trophy,
  Swords,
  QrCode,
  Radio,
  FileCheck,
} from "lucide-react";
import { Tournament } from "@/data/mockData";
import { formatETB } from "@/lib/utils";

export interface EthiopianCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournament: Tournament;
  gamerTag: string;
  initialInGameName?: string;
  onConfirmRegistration: (paymentDetails: {
    paymentStatus: "free" | "paid";
    paymentMethod: string;
    transactionRef: string;
    amountETB: number;
    inGameName: string;
  }) => void;
}

export const EthiopianCheckoutModal: React.FC<EthiopianCheckoutModalProps> = ({
  isOpen,
  onClose,
  tournament,
  gamerTag,
  initialInGameName = "",
  onConfirmRegistration,
}) => {
  const isFree = tournament.entryFeeETB === 0;

  // Checkout Steps: 1: Info, 2: Payment (if entry fee > 0), 3: Digital Stamped Receipt
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [inGameName, setInGameName] = useState(initialInGameName || gamerTag);
  const [paymentProvider, setPaymentProvider] = useState<"telebirr" | "cbe">("telebirr");
  const [phoneNumber, setPhoneNumber] = useState("0911234567");
  const [pin, setPin] = useState("");
  const [isProcessingUSSD, setIsProcessingUSSD] = useState(false);
  const [ussdPromptVisible, setUssdPromptVisible] = useState(false);
  const [txRef, setTxRef] = useState<string>("");
  const [assignedSeed, setAssignedSeed] = useState<number>(tournament.registeredCount + 1);

  if (!isOpen) return null;

  // Trigger USSD prompt simulation
  const handleRequestUSSD = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsProcessingUSSD(true);

    setTimeout(() => {
      setIsProcessingUSSD(false);
      setUssdPromptVisible(true);
    }, 600);
  };

  // Complete USSD PIN authorization
  const handleAuthorizePayment = () => {
    setIsProcessingUSSD(true);
    const generatedRef = `ET-TX-${Math.floor(100000 + Math.random() * 900000)}`;
    setTxRef(generatedRef);

    setTimeout(() => {
      setIsProcessingUSSD(false);
      setUssdPromptVisible(false);
      setStep(3); // Advance to verified stamped digital pass
    }, 900);
  };

  // Skip directly to pass if free tournament
  const handleFreeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `ET-FREE-${Math.floor(100000 + Math.random() * 900000)}`;
    setTxRef(generatedRef);
    setStep(3);
  };

  // Final confirmation to save into tournament registrations
  const handleFinalizeEntry = () => {
    onConfirmRegistration({
      paymentStatus: isFree ? "free" : "paid",
      paymentMethod: isFree
        ? "Sponsored / Free"
        : paymentProvider === "telebirr"
        ? "Telebirr (Ethio Telecom)"
        : "CBE Birr (Commercial Bank)",
      transactionRef: txRef || `ET-TX-${Math.floor(100000 + Math.random() * 900000)}`,
      amountETB: tournament.entryFeeETB,
      inGameName,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-lg rounded-3xl border border-purple-500/30 bg-[#0E101B] shadow-2xl overflow-hidden flex flex-col font-sans">
        
        {/* Top Header Bar */}
        <div className="px-5 py-4 border-b border-[#232A42] bg-[#141628] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              {step === 3 ? <FileCheck className="w-4 h-4 text-emerald-400" /> : <Swords className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {step === 3 ? "Sanctioned Entry Pass" : "Tournament Registration & Checkout"}
              </h3>
              <p className="text-[11px] text-slate-400">
                {tournament.title} • {tournament.gameName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg border border-purple-500/20 bg-purple-950/20 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Pills */}
        <div className="px-5 pt-3 pb-1 flex items-center gap-2 border-b border-[#1f243a] bg-[#0c0d17]">
          <div
            className={`flex-1 py-1 rounded-full text-center text-[10px] font-bold font-mono tracking-wider transition ${
              step >= 1 ? "bg-purple-600 text-white" : "bg-[#181a29] text-slate-500"
            }`}
          >
            1. Roster Info
          </div>
          <div
            className={`flex-1 py-1 rounded-full text-center text-[10px] font-bold font-mono tracking-wider transition ${
              step >= 2 ? "bg-purple-600 text-white" : "bg-[#181a29] text-slate-500"
            }`}
          >
            2. {isFree ? "Free Entry" : "Telebirr / CBE"}
          </div>
          <div
            className={`flex-1 py-1 rounded-full text-center text-[10px] font-bold font-mono tracking-wider transition ${
              step === 3 ? "bg-emerald-600 text-white" : "bg-[#181a29] text-slate-500"
            }`}
          >
            3. Entry Pass
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto max-h-[75vh]">
          {/* ======================================================== */}
          {/* STEP 1: ROSTER & IN-GAME TAG CONFIRMATION                */}
          {/* ======================================================== */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-purple-500/20 bg-[#141829]/60 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Gamer Profile Handle:</span>
                  <span className="font-bold text-white font-mono">{gamerTag}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Tournament Format:</span>
                  <span className="font-bold text-cyan-400">{tournament.format}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Prize Pool:</span>
                  <span className="font-bold text-amber-400 font-mono">{formatETB(tournament.prizePoolETB)}</span>
                </div>
                <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Registration Entry Fee:</span>
                  <span className="text-sm font-black text-purple-300 font-mono">
                    {isFree ? "FREE ENTRY (0 ETB)" : formatETB(tournament.entryFeeETB)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Confirm In-Game Name (IGN) / Roster Tag
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={inGameName}
                    onChange={(e) => setInGameName(e.target.value)}
                    placeholder="e.g. ViperX#ET01"
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-500/30 bg-[#161a2e] text-white text-sm font-mono focus:outline-none focus:border-purple-400"
                  />
                  <div className="absolute right-3 top-2.5 text-xs text-purple-400 font-mono font-bold">
                    VERIFIED
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  This identifier will be broadcast on tournament bracket streams and match lobbies.
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    if (isFree) {
                      setStep(3);
                      setTxRef(`ET-FREE-${Math.floor(100000 + Math.random() * 900000)}`);
                    } else {
                      setStep(2);
                    }
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition"
                >
                  <span>{isFree ? "Confirm Free Registration" : "Proceed to Ethiopian Checkout"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: ETHIOPIAN TELEBIRR & CBE BIRR PAYMENT SIMULATOR  */}
          {/* ======================================================== */}
          {step === 2 && !ussdPromptVisible && (
            <form onSubmit={handleRequestUSSD} className="space-y-4">
              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Select Mobile Money Provider
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {/* Telebirr */}
                  <button
                    type="button"
                    onClick={() => setPaymentProvider("telebirr")}
                    className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-center transition ${
                      paymentProvider === "telebirr"
                        ? "border-[#22D3EE] bg-[#0c2438] text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                        : "border-[#232A42] bg-[#141628] text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold font-mono">telebirr</span>
                    <span className="text-[10px] text-cyan-300">Ethio Telecom</span>
                  </button>

                  {/* CBE Birr */}
                  <button
                    type="button"
                    onClick={() => setPaymentProvider("cbe")}
                    className={`p-3.5 rounded-2xl border flex flex-col items-center gap-2 text-center transition ${
                      paymentProvider === "cbe"
                        ? "border-amber-400 bg-[#281e0c] text-white shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                        : "border-[#232A42] bg-[#141628] text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold font-mono">CBE Birr</span>
                    <span className="text-[10px] text-amber-300">Commercial Bank</span>
                  </button>
                </div>
              </div>

              {/* Amount Display */}
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Due</span>
                  <span className="text-sm font-black text-white font-mono">
                    {formatETB(tournament.entryFeeETB)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">Recipient</span>
                  <span className="text-xs font-bold text-purple-300">Ethora Esports Hub</span>
                </div>
              </div>

              {/* Phone input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  {paymentProvider === "telebirr" ? "Telebirr Mobile Number" : "CBE Birr Account Phone"}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-mono font-bold">
                    +251
                  </span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0911234567"
                    className="w-full pl-16 pr-4 py-2.5 rounded-xl border border-purple-500/30 bg-[#161a2e] text-white text-sm font-mono focus:outline-none focus:border-purple-400"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  We will dispatch an interactive USSD prompt directly to your phone screen.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-slate-300 text-xs font-bold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessingUSSD}
                  className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition"
                >
                  {isProcessingUSSD ? (
                    <span className="flex items-center gap-1.5">
                      <Radio className="w-4 h-4 animate-spin text-purple-300" />
                      Sending USSD Push...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4" />
                      Send USSD PIN Prompt
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* STEP 2 (POPUP): INTERACTIVE USSD / PIN SIMULATOR DIALOG  */}
          {/* ======================================================== */}
          {step === 2 && ussdPromptVisible && (
            <div className="p-4 rounded-2xl border-2 border-cyan-400/50 bg-[#091522] space-y-4 animate-scale-up">
              <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-bold font-mono text-cyan-300 uppercase tracking-wider">
                    {paymentProvider === "telebirr" ? "Telebirr USSD Push Notification" : "CBE Birr USSD Prompt"}
                  </span>
                </div>
                <span className="text-[11px] text-cyan-400 font-mono">Session #882</span>
              </div>

              <div className="bg-[#050B12] rounded-xl p-3 border border-cyan-500/20 text-xs text-slate-300 space-y-1.5">
                <p className="font-mono text-white">
                  You are authorizing payment of <strong className="text-cyan-400">{formatETB(tournament.entryFeeETB)}</strong> to <span className="text-purple-300 font-semibold">ETHORA ESPORTS NETWORK</span>.
                </p>
                <p className="text-[11px] text-slate-400">
                  Roster: <strong>{inGameName}</strong> • Phone: <strong>+251 {phoneNumber}</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-cyan-300 mb-1.5">
                  Enter 4-Digit Security PIN
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    maxLength={4}
                    autoFocus
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••"
                    className="w-32 tracking-[0.5em] text-center px-4 py-2 rounded-xl border border-cyan-500/40 bg-[#060D17] text-cyan-300 font-black text-lg focus:outline-none focus:border-cyan-400"
                  />
                  <span className="text-[11px] text-slate-400">
                    (Enter any 4-digit PIN for simulation e.g. 1234)
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setUssdPromptVisible(false)}
                  className="px-3.5 py-2 rounded-xl border border-slate-700 bg-black/40 text-slate-300 text-xs font-bold hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAuthorizePayment}
                  disabled={pin.length < 4 || isProcessingUSSD}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                >
                  {isProcessingUSSD ? (
                    <span className="flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 animate-spin" /> Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" /> Confirm &amp; Authorize
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 3: SANCTIONED DIGITAL PASS & STAMPED RECEIPT        */}
          {/* ======================================================== */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Official Stamped Pass Card */}
              <div className="relative rounded-3xl border-2 border-purple-500/40 bg-gradient-to-br from-[#120E24] via-[#0D0B1B] to-[#18112E] p-5 shadow-2xl overflow-hidden">
                {/* Background Stamped Watermark */}
                <div className="absolute right-4 top-4 opacity-10 pointer-events-none text-right">
                  <div className="text-6xl font-black font-mono">ETHORA</div>
                  <div className="text-xs uppercase tracking-[0.3em]">OFFICIAL SANCTION</div>
                </div>

                {/* Stamped Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>PAYMENT STAMPED &amp; VERIFIED</span>
                </div>

                <h4 className="text-lg font-black text-white font-mono uppercase tracking-wide">
                  {tournament.title}
                </h4>
                <p className="text-xs text-purple-300 font-semibold mt-0.5">
                  Official Sanctioned Tournament Pass
                </p>

                <div className="my-3.5 grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-black/40 border border-purple-500/20 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Competitor Tag</span>
                    <span className="font-bold text-white font-mono">{gamerTag} ({inGameName})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Allocated Bracket Seed</span>
                    <span className="font-black text-amber-400 font-mono">SEED #{assignedSeed}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Official Receipt TX</span>
                    <span className="font-bold text-cyan-400 font-mono">{txRef}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Amount Paid</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {isFree ? "0 ETB (Free Entry)" : formatETB(tournament.entryFeeETB)}
                    </span>
                  </div>
                </div>

                {/* Ethiopian Flag / Venue Accent */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-purple-500/20">
                  <span>Venue: {tournament.location?.venueName || "Addis Ababa"} ({tournament.venueType || "Online"})</span>
                  <span className="font-mono text-purple-300 font-bold">ETHIOPIA ESPORTS NETWORK</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Digital Receipt ${txRef} saved to local clipboard / downloads!`)}
                  className="flex-1 py-2.5 rounded-xl border border-purple-500/30 bg-[#161a2e] hover:bg-[#1f2440] text-slate-200 text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5 text-purple-400" />
                  <span>Download Pass (.PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinalizeEntry}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enter Tournament</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
