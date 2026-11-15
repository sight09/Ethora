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
} from "lucide-react";
import { useEthora } from "@/context/EthoraContext";
import { ETHIOPIA_GEOGRAPHY, getZonesByRegion, getWoredasByZone } from "@/data/geography";

export default function ProfileSettingsPage() {
  const { currentUser, updateGamerProfile } = useEthora();

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const currentRegion = ETHIOPIA_GEOGRAPHY.find((r) => r.id === regionId);
    const currentZone = zones.find((z) => z.id === zoneId);
    const currentWoreda = woredas.find((w) => w.id === woredaId);

    updateGamerProfile(currentUser.id, {
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
            Gamer Identity
          </h2>

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

