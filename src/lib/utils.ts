import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatETB(amount: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toLocaleString();
}

export function getRankTier(points: number): {
  tier: string;
  division: string;
  color: string;
  badgeBg: string;
  iconName: string;
} {
  if (points >= 3000) {
    return {
      tier: "Grandmaster",
      division: "National Apex",
      color: "text-amber-400",
      badgeBg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
      iconName: "Crown",
    };
  }
  if (points >= 2500) {
    return {
      tier: "Master",
      division: "Division I",
      color: "text-purple-400",
      badgeBg: "bg-purple-500/10 border-purple-500/30 text-purple-300",
      iconName: "ShieldAlert",
    };
  }
  if (points >= 2000) {
    return {
      tier: "Diamond",
      division: "Division II",
      color: "text-cyan-400",
      badgeBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
      iconName: "Gem",
    };
  }
  if (points >= 1500) {
    return {
      tier: "Platinum",
      division: "Division III",
      color: "text-emerald-400",
      badgeBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      iconName: "Shield",
    };
  }
  if (points >= 1000) {
    return {
      tier: "Gold",
      division: "Regional Star",
      color: "text-yellow-400",
      badgeBg: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
      iconName: "Award",
    };
  }
  return {
    tier: "Silver",
    division: "Challenger",
    color: "text-slate-400",
    badgeBg: "bg-slate-500/10 border-slate-500/30 text-slate-300",
    iconName: "Target",
  };
}

