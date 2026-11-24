"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Check, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { useEthora } from "@/context/EthoraContext";

export interface OAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: "discord" | "google" | "twitch";
}

export const OAuthModal: React.FC<OAuthModalProps> = ({
  isOpen,
  onClose,
  provider,
}) => {
  const router = useRouter();
  const { socialLogin } = useEthora();

  // Preset realistic values according to the selected provider
  const defaultTags = {
    discord: "ViperX#4420",
    google: "Yared Tadesse",
    twitch: "ViperX_Live",
  };

  const defaultEmails = {
    discord: "viper.esports@discord.gg",
    google: "yared.gamer@gmail.com",
    twitch: "viper.stream@twitch.tv",
  };

  const [tag, setTag] = useState(defaultTags[provider] || "Competitor");
  const [email, setEmail] = useState(defaultEmails[provider] || "player@ethora.et");
  const [authorizing, setAuthorizing] = useState(false);

  if (!isOpen) return null;

  const handleAuthorize = () => {
    setAuthorizing(true);
    setTimeout(() => {
      const session = socialLogin(provider, {
        tag,
        name: tag.split("#")[0],
        email,
        avatar:
          provider === "discord"
            ? "/images/avatars/avatar-viper.svg"
            : provider === "google"
            ? "/images/avatars/avatar-lion.svg"
            : "/images/avatars/avatar-apex.svg",
      });
      setAuthorizing(false);
      onClose();
      router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-md rounded-3xl border border-[rgba(168,85,247,0.35)] bg-[#0C0918] shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* PROVIDER-SPECIFIC BRAND HEADER */}
        {provider === "discord" && (
          <div className="bg-[#5865F2] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center p-1.5 shadow">
                <svg className="w-full h-full fill-white" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Discord OAuth2</h3>
                <span className="text-[10px] text-white/80">Connecting to ETHORA Esports</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {provider === "google" && (
          <div className="bg-white p-4 text-slate-800 flex items-center justify-between border-b">
            <div className="flex items-center gap-2.5">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <div>
                <h3 className="font-bold text-sm leading-tight text-slate-900">Sign in with Google</h3>
                <span className="text-[10px] text-slate-500">to continue to ETHORA</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition text-slate-500">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {provider === "twitch" && (
          <div className="bg-[#9146FF] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
              </svg>
              <div>
                <h3 className="font-bold text-sm leading-tight">Twitch Connections</h3>
                <span className="text-[10px] text-white/80">Authorize ETHORA Streamer ID</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#141026] border border-purple-900/40">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-purple-900/30 border border-purple-500/40 p-1 flex items-center justify-center shrink-0">
              <img
                src={
                  provider === "discord"
                    ? "/images/avatars/avatar-viper.svg"
                    : provider === "google"
                    ? "/images/avatars/avatar-lion.svg"
                    : "/images/avatars/avatar-apex.svg"
                }
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs text-purple-300 font-mono block">Authenticating as</span>
              <p className="text-sm font-bold text-white truncate">{tag}</p>
              <span className="text-[11px] text-slate-400 truncate block">{email}</span>
            </div>
          </div>

          {/* PERMISSIONS GRANTED */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Permissions Requested by ETHORA:
            </span>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Access your gamer handle, profile avatar, and verified tag</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Issue an official Ethiopian National Esports Passport (ET-ID)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Enable one-click tournament brackets & team invitations</span>
              </div>
            </div>
          </div>

          {/* EDITABLE QUICK TWEAK ACCORDION */}
          <div className="pt-2 border-t border-[#232A42] space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Custom Handle</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#141826] border border-[#232A42] text-white text-xs font-mono outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#141826] border border-[#232A42] text-white text-xs outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER BUTTONS */}
        <div className="p-4 bg-[#090614] border-t border-[rgba(168,85,247,0.25)] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-purple-900/50 bg-[#141026] hover:bg-[#1C1635] text-slate-300 text-xs font-semibold transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAuthorize}
            disabled={authorizing}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.45)] transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {authorizing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authorizing...</span>
              </>
            ) : (
              <>
                <span>Authorize & Enter Arena</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OAuthModal;
