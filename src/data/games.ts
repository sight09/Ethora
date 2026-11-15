export interface GameData {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  genre: "Tactical FPS" | "Sports / Football" | "Battle Royale" | "MOBA" | "Fighting";
  platforms: ("PC" | "Mobile" | "Console")[];
  bannerUrl: string;
  iconUrl: string;
  accentColor: string;
  activePlayersEth: number;
  activeTournaments: number;
  competitiveFormat: string;
  statFields: {
    key: string;
    label: string;
    unit?: string;
  }[];
  ranks: {
    tier: string;
    pointsReq: number;
    color: string;
  }[];
}

export const SUPPORTED_GAMES: GameData[] = [
  {
    id: "game-valorant",
    name: "Valorant",
    shortName: "VALORANT",
    slug: "valorant",
    genre: "Tactical FPS",
    platforms: ["PC"],
    bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    iconUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=100&auto=format&fit=crop",
    accentColor: "#FF4655",
    activePlayersEth: 18400,
    activeTournaments: 8,
    competitiveFormat: "5v5 Bomb Defusal",
    statFields: [
      { key: "kda", label: "K/D Ratio" },
      { key: "headshotRate", label: "HS Rate", unit: "%" },
      { key: "winRate", label: "Win Rate", unit: "%" },
      { key: "acs", label: "Avg Combat Score" },
    ],
    ranks: [
      { tier: "Radiant", pointsReq: 2800, color: "#FFF8D6" },
      { tier: "Immortal 3", pointsReq: 2400, color: "#BD3944" },
      { tier: "Ascendant", pointsReq: 1900, color: "#168B60" },
      { tier: "Diamond", pointsReq: 1500, color: "#9564CE" },
      { tier: "Platinum", pointsReq: 1100, color: "#369CA7" },
      { tier: "Gold", pointsReq: 700, color: "#E09C3D" },
    ],
  },
  {
    id: "game-cs2",
    name: "Counter-Strike 2",
    shortName: "CS2",
    slug: "cs2",
    genre: "Tactical FPS",
    platforms: ["PC"],
    bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
    iconUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=100&auto=format&fit=crop",
    accentColor: "#DE9B35",
    activePlayersEth: 12500,
    activeTournaments: 6,
    competitiveFormat: "5v5 Competitive MR12",
    statFields: [
      { key: "rating", label: "HLTV 2.0 Rating" },
      { key: "adr", label: "ADR" },
      { key: "headshotRate", label: "HS %", unit: "%" },
      { key: "clutchWinRate", label: "Clutch %", unit: "%" },
    ],
    ranks: [
      { tier: "Global Elite (Premier 25K+)", pointsReq: 2700, color: "#EF4444" },
      { tier: "Supreme (Premier 20K+)", pointsReq: 2200, color: "#EC4899" },
      { tier: "Eagle (Premier 15K+)", pointsReq: 1700, color: "#8B5CF6" },
      { tier: "Master Guardian", pointsReq: 1200, color: "#3B82F6" },
    ],
  },
  {
    id: "game-eafc",
    name: "EA SPORTS FC 24",
    shortName: "EA FC 24",
    slug: "ea-fc-24",
    genre: "Sports / Football",
    platforms: ["Console", "PC"],
    bannerUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
    iconUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=100&auto=format&fit=crop",
    accentColor: "#10B981",
    activePlayersEth: 28900,
    activeTournaments: 14,
    competitiveFormat: "1v1 Competitive Ultimate Team / H2H",
    statFields: [
      { key: "winLoss", label: "W / L Record" },
      { key: "goalsPerMatch", label: "Goals/Game" },
      { key: "cleanSheets", label: "Clean Sheets" },
      { key: "division", label: "Rivals Division" },
    ],
    ranks: [
      { tier: "Elite Division (Top 100)", pointsReq: 2900, color: "#F59E0B" },
      { tier: "Division 1", pointsReq: 2300, color: "#8B5CF6" },
      { tier: "Division 2", pointsReq: 1800, color: "#06B6D4" },
      { tier: "Division 3", pointsReq: 1300, color: "#10B981" },
    ],
  },
  {
    id: "game-pubgm",
    name: "PUBG Mobile",
    shortName: "PUBG-M",
    slug: "pubg-mobile",
    genre: "Battle Royale",
    platforms: ["Mobile"],
    bannerUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop",
    iconUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=100&auto=format&fit=crop",
    accentColor: "#F59E0B",
    activePlayersEth: 34000,
    activeTournaments: 12,
    competitiveFormat: "Squad 4v4 Erangel / Miramar",
    statFields: [
      { key: "kda", label: "K/D Ratio" },
      { key: "avgDamage", label: "Avg Damage" },
      { key: "chickenDinners", label: "WWCDs" },
      { key: "topTenRate", label: "Top 10 %", unit: "%" },
    ],
    ranks: [
      { tier: "Conqueror", pointsReq: 2900, color: "#F59E0B" },
      { tier: "Ace Dominator", pointsReq: 2400, color: "#EC4899" },
      { tier: "Ace Master", pointsReq: 1900, color: "#8B5CF6" },
      { tier: "Crown", pointsReq: 1400, color: "#3B82F6" },
    ],
  },
  {
    id: "game-dota2",
    name: "Dota 2",
    shortName: "DOTA 2",
    slug: "dota-2",
    genre: "MOBA",
    platforms: ["PC"],
    bannerUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    iconUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=100&auto=format&fit=crop",
    accentColor: "#EF4444",
    activePlayersEth: 8700,
    activeTournaments: 4,
    competitiveFormat: "5v5 Captains Mode",
    statFields: [
      { key: "mmr", label: "MMR" },
      { key: "winRate", label: "Win Rate", unit: "%" },
      { key: "gpm", label: "GPM" },
      { key: "xpm", label: "XPM" },
    ],
    ranks: [
      { tier: "Immortal Leaderboard", pointsReq: 2800, color: "#E09C3D" },
      { tier: "Divine", pointsReq: 2200, color: "#06B6D4" },
      { tier: "Ancient", pointsReq: 1700, color: "#8B5CF6" },
      { tier: "Legend", pointsReq: 1200, color: "#10B981" },
    ],
  },
  {
    id: "game-tekken8",
    name: "Tekken 8",
    shortName: "TEKKEN 8",
    slug: "tekken-8",
    genre: "Fighting",
    platforms: ["Console", "PC"],
    bannerUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop",
    iconUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=100&auto=format&fit=crop",
    accentColor: "#8B5CF6",
    activePlayersEth: 6400,
    activeTournaments: 5,
    competitiveFormat: "1v1 Best of 3 / 5 Double Elim",
    statFields: [
      { key: "danRank", label: "Prowess / Dan" },
      { key: "winRate", label: "Win Rate", unit: "%" },
      { key: "mainChar", label: "Main Fighter" },
    ],
    ranks: [
      { tier: "God of Destruction", pointsReq: 2900, color: "#F59E0B" },
      { tier: "Tekken King", pointsReq: 2300, color: "#8B5CF6" },
      { tier: "Bushin", pointsReq: 1800, color: "#06B6D4" },
      { tier: "Fujin", pointsReq: 1300, color: "#10B981" },
    ],
  },
];

