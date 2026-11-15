"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { EthoraEmblem } from "@/components/brand/EthoraLogo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 cyber-grid-pattern relative">
      <div className="max-w-md w-full relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <EthoraEmblem size="lg" className="mx-auto" />
          <h2 className="text-2xl font-black text-white font-mono tracking-tight">
            RESET ETHORA PASSWORD
          </h2>
          <p className="text-xs text-slate-400">
            Enter your registered email to receive secure recovery credentials
          </p>
        </div>

        <div className="rounded-2xl border border-[#232A42] bg-[#0E111A]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-mono">Reset Link Dispatched</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If an account exists for <span className="text-violet-400 font-semibold">{email}</span>, a secure password
                reset link has been sent. Check your inbox and spam folder.
              </p>
              <div className="pt-4">
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center gap-2 text-xs font-bold text-violet-400 hover:text-violet-300 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Account Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition"
                    placeholder="e.g. yared.viper@ethora.et"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-violet transition flex items-center justify-center gap-2"
                >
                  <span>Send Recovery Email</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 text-center">
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

