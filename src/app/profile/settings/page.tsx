"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings,
  MapPin,
  User,
  ShieldCheck,
  Save,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Sparkles,
  Camera,
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { ETHIOPIA_GEOGRAPHY, getZonesByRegion, getWoredasByZone } from "@/data/geography";
import { compressAndEncodeImage, PRESET_AVATARS } from "@/lib/imageUpload";

export default function ProfileSettingsPage() {
  const { currentUser, updateGamerProfile } = useEthora();

  const [avatar, setAvatar] = useState(currentUser?.avatar || "/images/avatars/avatar-viper.svg");
  const [isCompressing, setIsCompressing] = useState(false);
  const [gamerTag, setGamerTag] = useState(currentUser?.gamerTag || "ViperX");
  const [realName, setRealName] = useState(currentUser?.realName || "Yared Tadesse");
  const [bio, setBio] = useState(currentUser?.bio || "");

  const [regionId, setRegionId] = useState(currentUser?.location.regionId || "reg-aa");
  const [zoneId, setZoneId] = useState(currentUser?.location.zoneId || "zone-aa-central");
  const [woredaId, setWoredaId] = useState(currentUser?.location.woredaId || "wor-bole");
  const [community, setCommunity] = useState(currentUser?.location.communityName || "Bole Medhanialem Cyber Lounge");

  const [saved, setSaved] = useState(false);

  const zones = getZonesByRegion(regionId);
  const woredas = getWoredasByZone(regionId, zoneId);

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsCompressing(true);
      const compressed = await compressAndEncodeImage(file, {
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.85,
      });
      setAvatar(compressed);
    } catch (err) {
      console.error("Failed to compress avatar", err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const currentRegion = ETHIOPIA_GEOGRAPHY.find((r) => r.id === regionId);
    const currentZone = zones.find((z) => z.id === zoneId);
    const currentWoreda = woredas.find((w) => w.id === woredaId);

    updateGamerProfile(currentUser.id, {
      avatar,
      gamerTag,
      realName,
      bio,
      location: {
        regionId,
        regionName: currentRegion?.name || "Addis Ababa",
        zoneId,
        zoneName: currentZone?.name || "Central Addis",
        woredaId,
        woredaName: currentWoreda?.name || "Bole Sub-City",
        communityName: community,
      },
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link
            href="/profile"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Profile</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-mono">
            PASSPORT & LOCATION SETTINGS
          </h1>
          <p className="text-xs text-slate-400">
            Configure your Ethiopian geographic ranking anchor, handle, and competitor bio
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="rounded-2xl border border-[#232A42] bg-[#0E111A] p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">
            Gamer Identity &amp; Avatar
          </h2>

          {/* AVATAR UPLOAD & PRESET PICKER */}
          <div className="p-4 rounded-xl border border-purple-500/20 bg-[#141829]/60 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-purple-500/60 bg-[#0C0918] shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0E111A]" />
              </div>

              <div className="space-y-1.5 flex-1 text-center sm:text-left">
                <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Profile Avatar &amp; Crest
                </h3>
                <p className="text-[11px] text-slate-400">
                  Select a local Ethiopian cyberpunk preset or upload your custom logo/avatar (auto-compressed to lightweight WebP &lt;50KB).
                </p>
                <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-500/40 bg-purple-950/40 hover:bg-purple-900/40 text-purple-200 text-xs font-bold transition">
                    <Camera className="w-3.5 h-3.5 text-purple-400" />
                    <span>{isCompressing ? "Compressing..." : "Upload File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Presets Grid */}
            <div>
              <span className="text-[10px] font-bold uppercase font-mono tracking-wider text-slate-400 block mb-2">
                Offline Cyberpunk Presets
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {PRESET_AVATARS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setAvatar(p.path)}
                    className={`relative p-1 rounded-xl border flex flex-col items-center gap-1 transition ${
                      avatar === p.path
                        ? "border-purple-400 bg-purple-600/20 shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                        : "border-[#232A42] bg-[#0E111A] hover:border-slate-600"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg overflow-hidden bg-black/40">
                      <img src={p.path} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[9px] text-slate-300 truncate w-full text-center">
                      {p.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Gamer Tag / Handle
              </label>
              <input
                type="text"
                required
                value={gamerTag}
                onChange={(e) => setGamerTag(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Real Full Name
              </label>
              <input
                type="text"
                required
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
              Competitor Biography
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
            />
          </div>
        </div>

        {/* GEOGRAPHIC PROGRESSION HIERARCHY */}
        <div className="space-y-4 pt-4 border-t border-[#232A42]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">
              Ethiopian Geographic Hierarchy
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            This anchors which community, woreda, and regional leaderboards you compete within.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Region</label>
              <select
                value={regionId}
                onChange={(e) => {
                  setRegionId(e.target.value);
                  const z = getZonesByRegion(e.target.value);
                  if (z[0]) {
                    setZoneId(z[0].id);
                    if (z[0].woredas[0]) {
                      setWoredaId(z[0].woredas[0].id);
                      setCommunity(z[0].woredas[0].communities[0] || "");
                    }
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
              >
                {ETHIOPIA_GEOGRAPHY.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Zone</label>
              <select
                value={zoneId}
                onChange={(e) => {
                  setZoneId(e.target.value);
                  const w = getWoredasByZone(regionId, e.target.value);
                  if (w[0]) {
                    setWoredaId(w[0].id);
                    setCommunity(w[0].communities[0] || "");
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Woreda / City Area</label>
              <select
                value={woredaId}
                onChange={(e) => {
                  setWoredaId(e.target.value);
                  const currentWoreda = woredas.find((w) => w.id === e.target.value);
                  if (currentWoreda && currentWoreda.communities[0]) {
                    setCommunity(currentWoreda.communities[0]);
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
              >
                {woredas.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
              Local Community or Gaming Hub
            </label>
            <input
              type="text"
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#232A42] bg-[#141826] text-white text-sm"
              placeholder="e.g. Bole Medhanialem Cyber Lounge"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#232A42] flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-violet transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Location & Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}

