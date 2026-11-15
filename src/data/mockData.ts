export interface ConnectedGameAccount {
  gameId: string;
  gameName: string;
  inGameName: string;
  platform: "PC" | "Mobile" | "Console";
  platformId: string; // e.g. Steam ID, Riot ID
  rankTier: string;
  points: number;
  verified: boolean;
  verifiedDate: string;
  stats: Record<string, string | number>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: "bronze" | "silver" | "gold" | "apex";
  category: "tournament" | "skill" | "community" | "progression";
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface GamerProfile {
  id: string;
  ethoraId: string;
  username: string;
  gamerTag: string;
  realName: string;
  email: string;
  avatar: string;
  banner: string;
  role: "gamer" | "organizer" | "organization" | "admin";
  bio: string;
  verified: boolean;
  nationalRank: number;
  regionalRank: number;
  communityRank: number;
  ratingPoints: number;
  location: {
    regionId: string;
    regionName: string;
    zoneId: string;
    zoneName: string;
    woredaId: string;
    woredaName: string;
    communityName: string;
  };
  connectedGames: ConnectedGameAccount[];
  achievements: Achievement[];
  team?: {
    id: string;
    name: string;
    tag: string;
    role: "Captain" | "Starter" | "Substitute";
  };
  stats: {
    tournamentsPlayed: number;
    tournamentsWon: number;
    matchesPlayed: number;
    matchesWon: number;
    winRate: number; // percentage
    earningsETB: number;
  };
  matchHistory: {
    id: string;
    tournamentName: string;
    gameName: string;
    date: string;
    opponentName: string;
    opponentAvatar: string;
    score: string;
    result: "win" | "loss";
    ratingChange: number;
  }[];
}

export interface BracketMatch {
  id: string;
  round: number; // 1 = Quarterfinals, 2 = Semifinals, 3 = Finals
  matchNumber: number;
  participant1: {
    id: string;
    name: string;
    tag: string;
    avatar: string;
    score?: number;
    isWinner?: boolean;
  };
  participant2: {
    id: string;
    name: string;
    tag: string;
    avatar: string;
    score?: number;
    isWinner?: boolean;
  };
  status: "scheduled" | "in_progress" | "completed";
  scheduledTime: string;
  scheduledVenue?: string;
}

export interface TournamentRegistration {
  id: string;
  tournamentId: string;
  gamerId: string;
  gamerTag: string;
  realName: string;
  avatar: string;
  ethoraId: string;
  inGameName: string;
  rankTier: string;
  location: string;
  registeredAt: string;
  status: "pending" | "approved" | "rejected" | "waitlisted";
  checkInStatus: boolean;
}

export interface Tournament {
  id: string;
  slug: string;
  title: string;
  gameId: string;
  gameName: string;
  bannerUrl: string;
  organizer: {
    id: string;
    name: string;
    tag: string;
    logo: string;
    verified: boolean;
  };
  description: string;
  prizePoolETB: number;
  prizePoolUSD: number;
  format: "Single Elimination" | "Double Elimination" | "Round Robin" | "Group Stage";
  status: "registration_open" | "live" | "upcoming" | "completed";
  dates: {
    registrationDeadline: string;
    startsAt: string;
    endsAt: string;
  };
  venueType: "LAN / Arena" | "Online" | "Hybrid (Online + Finals LAN)";
  location: {
    regionName: string;
    venueName: string;
    address: string;
  };
  entryFeeETB: number;
  maxParticipants: number;
  registeredCount: number;
  rules: string[];
  schedule: {
    phase: string;
    time: string;
    format: string;
  }[];
  brackets?: BracketMatch[];
  registrations: TournamentRegistration[];
}

export interface Team {
  id: string;
  name: string;
  tag: string;
  logo: string;
  gameId: string;
  gameName: string;
  region: string;
  captain: {
    id: string;
    tag: string;
    avatar: string;
  };
  members: {
    id: string;
    tag: string;
    role: string;
    avatar: string;
    joinedDate: string;
  }[];
  stats: {
    tournamentsWon: number;
    matchesPlayed: number;
    wins: number;
    losses: number;
    winRate: number;
  };
}

export interface Organization {
  id: string;
  name: string;
  tag: string;
  logo: string;
  banner: string;
  headquarters: string;
  foundedYear: number;
  verified: boolean;
  bio: string;
  sponsoredTeams: string[];
  hostedTournaments: number;
  trophiesWon: number;
}

// Initial Mock Gamers
export const INITIAL_GAMERS: GamerProfile[] = [
  {
    id: "gamer-1",
    ethoraId: "ETH-7729-VIPER",
    username: "yared_viper",
    gamerTag: "ViperX",
    realName: "Yared Tadesse",
    email: "yared.viper@ethora.et",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=300&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    role: "gamer",
    bio: "Rank #1 Valorant Duelist in Ethiopia. Captain of Apex Legion. Represented Ethiopia in the Red Bull Campus Clutch East Africa qualifiers. Aspiring international VCT contender.",
    verified: true,
    nationalRank: 1,
    regionalRank: 1,
    communityRank: 1,
    ratingPoints: 3420,
    location: {
      regionId: "reg-aa",
      regionName: "Addis Ababa",
      zoneId: "zone-aa-central",
      zoneName: "Central Addis",
      woredaId: "wor-bole",
      woredaName: "Bole Sub-City",
      communityName: "Bole Medhanialem Cyber Lounge",
    },
    team: {
      id: "team-apex-legion",
      name: "Apex Legion",
      tag: "APX",
      role: "Captain",
    },
    stats: {
      tournamentsPlayed: 26,
      tournamentsWon: 11,
      matchesPlayed: 148,
      matchesWon: 114,
      winRate: 77.0,
      earningsETB: 385000,
    },
    connectedGames: [
      {
        gameId: "game-valorant",
        gameName: "Valorant",
        inGameName: "ViperX#ET01",
        platform: "PC",
        platformId: "RiotID-8921470",
        rankTier: "Radiant",
        points: 3420,
        verified: true,
        verifiedDate: "2026-02-14",
        stats: {
          kda: "1.46",
          headshotRate: "34.2",
          winRate: "76.4",
          acs: "284",
        },
      },
      {
        gameId: "game-cs2",
        gameName: "Counter-Strike 2",
        inGameName: "ViperX_ET",
        platform: "PC",
        platformId: "STEAM_0:1:4829104",
        rankTier: "Global Elite (Premier 25K+)",
        points: 2750,
        verified: true,
        verifiedDate: "2026-03-01",
        stats: {
          rating: "1.32",
          adr: "92.4",
          headshotRate: "58.1",
          clutchWinRate: "38.5",
        },
      },
    ],
    achievements: [
      {
        id: "ach-1",
        title: "National Champion",
        description: "Crown winner of the Ethiopian National Esports Championship",
        icon: "Trophy",
        tier: "apex",
        category: "tournament",
        unlockedAt: "2026-08-20",
      },
      {
        id: "ach-2",
        title: "Century of Victories",
        description: "Surpassed 100 official match victories in ETHORA verified competitions",
        icon: "Flame",
        tier: "gold",
        category: "skill",
        unlockedAt: "2026-09-10",
      },
      {
        id: "ach-3",
        title: "Flawless Radiant",
        description: "Achieved Radiant rank with a 75%+ win rate in national qualifiers",
        icon: "Crown",
        tier: "gold",
        category: "skill",
        unlockedAt: "2026-05-12",
      },
      {
        id: "ach-4",
        title: "Bole Community Icon",
        description: "Rank #1 for 6 consecutive months in Bole Sub-City local leaderboards",
        icon: "MapPin",
        tier: "silver",
        category: "community",
        unlockedAt: "2026-07-04",
      },
    ],
    matchHistory: [
      {
        id: "m-101",
        tournamentName: "Addis Masters Valorant Invitational",
        gameName: "Valorant",
        date: "2026-11-02",
        opponentName: "Great Rift Phoenix",
        opponentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
        score: "2 - 1",
        result: "win",
        ratingChange: 32,
      },
      {
        id: "m-102",
        tournamentName: "National Premier Valorant Cup",
        gameName: "Valorant",
        date: "2026-10-24",
        opponentName: "Habesha Vanguards",
        opponentAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop",
        score: "2 - 0",
        result: "win",
        ratingChange: 28,
      },
      {
        id: "m-103",
        tournamentName: "East Africa Clash Series",
        gameName: "Valorant",
        date: "2026-10-15",
        opponentName: "Nairobi Cyber Lions",
        opponentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        score: "1 - 2",
        result: "loss",
        ratingChange: -14,
      },
    ],
  },
  {
    id: "gamer-2",
    ethoraId: "ETH-3104-SELAM",
    username: "selam_phantom",
    gamerTag: "PhantomQueen",
    realName: "Selamawit Haile",
    email: "selam.phantom@ethora.et",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
    role: "gamer",
    bio: "Ethiopia's highest ranked CS2 AWPer & Valorant Controller. Playing with Rift Valley Valkyries. Advancing female representation in African competitive gaming.",
    verified: true,
    nationalRank: 2,
    regionalRank: 2,
    communityRank: 1,
    ratingPoints: 3280,
    location: {
      regionId: "reg-aa",
      regionName: "Addis Ababa",
      zoneId: "zone-aa-east",
      zoneName: "East Addis",
      woredaId: "wor-yeka",
      woredaName: "Yeka Sub-City",
      communityName: "Megenagna Cyber Apex",
    },
    team: {
      id: "team-valkyries",
      name: "Rift Valley Valkyries",
      tag: "RVV",
      role: "Captain",
    },
    stats: {
      tournamentsPlayed: 21,
      tournamentsWon: 8,
      matchesPlayed: 122,
      matchesWon: 91,
      winRate: 74.6,
      earningsETB: 295000,
    },
    connectedGames: [
      {
        gameId: "game-cs2",
        gameName: "Counter-Strike 2",
        inGameName: "PhantomSelam",
        platform: "PC",
        platformId: "STEAM_0:0:982341",
        rankTier: "Global Elite (Premier 25K+)",
        points: 3280,
        verified: true,
        verifiedDate: "2026-01-20",
        stats: {
          rating: "1.38",
          adr: "89.6",
          headshotRate: "62.4",
          clutchWinRate: "42.0",
        },
      },
    ],
    achievements: [
      {
        id: "ach-10",
        title: "Sniper Extraordinaire",
        description: "Recorded over 1000 confirmed AWP sniper eliminations in tournament play",
        icon: "Crosshair",
        tier: "apex",
        category: "skill",
        unlockedAt: "2026-09-18",
      },
    ],
    matchHistory: [],
  },
  {
    id: "gamer-3",
    ethoraId: "ETH-9921-BEREKET",
    username: "bereket_king",
    gamerTag: "Bekila",
    realName: "Bereket Tilahun",
    email: "bereket.fc@ethora.et",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
    role: "gamer",
    bio: "Undisputed King of EA SPORTS FC in Addis Ababa. 3-time Bole FIFA Cup Champion. Represented Hawassa and Addis Ababa in national console clashes.",
    verified: true,
    nationalRank: 3,
    regionalRank: 1,
    communityRank: 1,
    ratingPoints: 3190,
    location: {
      regionId: "reg-sidama",
      regionName: "Sidama",
      zoneId: "zone-hawassa",
      zoneName: "Hawassa City Zone",
      woredaId: "wor-hawassa-city",
      woredaName: "Hawassa City",
      communityName: "Lake Hawassa Esports Resort",
    },
    team: {
      id: "team-hawassa-dynasty",
      name: "Hawassa Esports Club",
      tag: "HEC",
      role: "Starter",
    },
    stats: {
      tournamentsPlayed: 34,
      tournamentsWon: 16,
      matchesPlayed: 194,
      matchesWon: 153,
      winRate: 78.8,
      earningsETB: 420000,
    },
    connectedGames: [
      {
        gameId: "game-eafc",
        gameName: "EA SPORTS FC 24",
        inGameName: "Bekila_ETH",
        platform: "Console",
        platformId: "PSN-BekilaFC99",
        rankTier: "Elite Division (Top 100)",
        points: 3190,
        verified: true,
        verifiedDate: "2026-01-11",
        stats: {
          winLoss: "210 - 42",
          goalsPerMatch: "3.8",
          cleanSheets: "54",
          division: "Elite #12 Global",
        },
      },
    ],
    achievements: [
      {
        id: "ach-21",
        title: "Golden Boot Maestro",
        description: "Scored 50+ tournament goals with zero losses in knockout stages",
        icon: "ShieldAlert",
        tier: "apex",
        category: "tournament",
        unlockedAt: "2026-07-28",
      },
    ],
    matchHistory: [],
  },
  {
    id: "gamer-4",
    ethoraId: "ETH-4819-NATHAN",
    username: "nathan_apex",
    gamerTag: "RedGhost",
    realName: "Nathan Worku",
    email: "nathan.ghost@ethora.et",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop",
    role: "gamer",
    bio: "PUBG Mobile Conqueror & IGL for Oromia Red Strikers. 4x Adama Champion. Master of tactical rotations and high-pressure squad clutches.",
    verified: true,
    nationalRank: 4,
    regionalRank: 1,
    communityRank: 1,
    ratingPoints: 3050,
    location: {
      regionId: "reg-oromia",
      regionName: "Oromia",
      zoneId: "zone-east-shewa",
      zoneName: "East Shewa Zone",
      woredaId: "wor-adama",
      woredaName: "Adama City",
      communityName: "Adama University Esports",
    },
    connectedGames: [
      {
        gameId: "game-pubgm",
        gameName: "PUBG Mobile",
        inGameName: "RedGhostET",
        platform: "Mobile",
        platformId: "PUBG-5192841029",
        rankTier: "Conqueror",
        points: 3050,
        verified: true,
        verifiedDate: "2026-02-18",
        stats: {
          kda: "6.8",
          avgDamage: "1140",
          chickenDinners: "182",
          topTenRate: "89%",
        },
      },
    ],
    achievements: [],
    stats: {
      tournamentsPlayed: 19,
      tournamentsWon: 7,
      matchesPlayed: 98,
      matchesWon: 71,
      winRate: 72.4,
      earningsETB: 210000,
    },
    matchHistory: [],
  },
  {
    id: "gamer-5",
    ethoraId: "ETH-6120-BETSY",
    username: "betselot_dota",
    gamerTag: "InvokerGod",
    realName: "Betselot Alemu",
    email: "betselot@ethora.et",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    role: "gamer",
    bio: "Top Dota 2 Midlaner in Ethiopia. Immortal 9.4k MMR on Europe East server. Pioneer of the Bahir Dar Tana esports scene.",
    verified: true,
    nationalRank: 5,
    regionalRank: 1,
    communityRank: 1,
    ratingPoints: 2980,
    location: {
      regionId: "reg-amhara",
      regionName: "Amhara",
      zoneId: "zone-bahirdar",
      zoneName: "Bahir Dar Special Zone",
      woredaId: "wor-bahirdar-city",
      woredaName: "Bahir Dar City",
      communityName: "Tana Waterfront Gaming Lounge",
    },
    connectedGames: [
      {
        gameId: "game-dota2",
        gameName: "Dota 2",
        inGameName: "AmanInvoker",
        platform: "PC",
        platformId: "STEAM_0:1:294819",
        rankTier: "Immortal Leaderboard",
        points: 2980,
        verified: true,
        verifiedDate: "2026-03-12",
        stats: {
          mmr: "9,420",
          winRate: "68.4%",
          gpm: "720",
          xpm: "790",
        },
      },
    ],
    achievements: [],
    stats: {
      tournamentsPlayed: 15,
      tournamentsWon: 5,
      matchesPlayed: 80,
      matchesWon: 56,
      winRate: 70.0,
      earningsETB: 180000,
    },
    matchHistory: [],
  },
  {
    id: "gamer-6",
    ethoraId: "ETH-8812-DANI",
    username: "daniel_mishima",
    gamerTag: "ElectricGod",
    realName: "Daniel Mengistu",
    email: "dani.mishima@ethora.et",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop",
    role: "gamer",
    bio: "Tekken 8 God of Destruction rank. Reigning champion of the Piassa Fight Night Series. Specializes in Kazuya Mishima and Reina electric wind god fists.",
    verified: true,
    nationalRank: 6,
    regionalRank: 3,
    communityRank: 1,
    ratingPoints: 2910,
    location: {
      regionId: "reg-aa",
      regionName: "Addis Ababa",
      zoneId: "zone-aa-central",
      zoneName: "Central Addis",
      woredaId: "wor-arada",
      woredaName: "Arada Sub-City",
      communityName: "Piassa Historic Gamers Club",
    },
    connectedGames: [
      {
        gameId: "game-tekken8",
        gameName: "Tekken 8",
        inGameName: "ElectricDani",
        platform: "Console",
        platformId: "TEKKEN-ID-882194",
        rankTier: "God of Destruction",
        points: 2910,
        verified: true,
        verifiedDate: "2026-02-04",
        stats: {
          danRank: "God of Destruction",
          winRate: "79.2%",
          mainChar: "Kazuya Mishima",
        },
      },
    ],
    achievements: [],
    stats: {
      tournamentsPlayed: 28,
      tournamentsWon: 14,
      matchesPlayed: 142,
      matchesWon: 112,
      winRate: 78.8,
      earningsETB: 245000,
    },
    matchHistory: [],
  },
  {
    id: "gamer-7",
    ethoraId: "ETH-1024-SHADOW",
    username: "shadow_king",
    gamerTag: "ShadowKing",
    realName: "Dawit Bekele",
    email: "dawit.shadow@ethora.et",
    avatar: "/images/avatar-shadowking.png",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    role: "gamer",
    bio: "Rank #1 Free Fire Rusher in Ethiopia. Captain of Addis Wolves. Known for fast-paced aggressive flanks and clutch squad wipes in national tournaments.",
    verified: true,
    nationalRank: 1,
    regionalRank: 1,
    communityRank: 1,
    ratingPoints: 12450,
    location: {
      regionId: "reg-aa",
      regionName: "Addis Ababa",
      zoneId: "zone-aa-central",
      zoneName: "Central Addis",
      woredaId: "wor-bole",
      woredaName: "Bole Sub-City",
      communityName: "Addis Wolves Gaming Lounge",
    },
    team: {
      id: "team-addis-wolves",
      name: "ADDIS WOLVES",
      tag: "AW",
      role: "Captain",
    },
    stats: {
      tournamentsPlayed: 32,
      tournamentsWon: 18,
      matchesPlayed: 180,
      matchesWon: 142,
      winRate: 78.9,
      earningsETB: 480000,
    },
    connectedGames: [
      {
        gameId: "game-freefire",
        gameName: "Free Fire",
        inGameName: "ShadowKing_ET",
        platform: "Mobile",
        platformId: "FF-90218412",
        rankTier: "Grandmaster",
        points: 12450,
        verified: true,
        verifiedDate: "2026-01-15",
        stats: {
          kda: "5.8",
          headshotRate: "42.1%",
          winRate: "78.9%",
          mvpRate: "64%",
        },
      },
    ],
    achievements: [],
    matchHistory: [],
  },
  {
    id: "gamer-8",
    ethoraId: "ETH-2048-ZEN",
    username: "zen_master",
    gamerTag: "ZenMaster",
    realName: "Kidus Tesfaye",
    email: "kidus.zen@ethora.et",
    avatar: "/images/avatar-zenmaster.png",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
    role: "gamer",
    bio: "Jimma Titans Sniper & In-Game Leader. Free Fire Ethiopian Circuit Rank #2 with unmatched long-range precision and strategic shot-calling.",
    verified: true,
    nationalRank: 2,
    regionalRank: 1,
    communityRank: 1,
    ratingPoints: 11230,
    location: {
      regionId: "reg-oromia",
      regionName: "Oromia",
      zoneId: "zone-jimma",
      zoneName: "Jimma Zone",
      woredaId: "wor-jimma-city",
      woredaName: "Jimma City",
      communityName: "Jimma Titans Cyber Hub",
    },
    team: {
      id: "team-jimma-titans",
      name: "JIMMA TITANS",
      tag: "JT",
      role: "Captain",
    },
    stats: {
      tournamentsPlayed: 27,
      tournamentsWon: 12,
      matchesPlayed: 156,
      matchesWon: 118,
      winRate: 75.6,
      earningsETB: 360000,
    },
    connectedGames: [
      {
        gameId: "game-freefire",
        gameName: "Free Fire",
        inGameName: "ZenMaster_JT",
        platform: "Mobile",
        platformId: "FF-81920311",
        rankTier: "Master",
        points: 11230,
        verified: true,
        verifiedDate: "2026-01-20",
        stats: {
          kda: "4.9",
          headshotRate: "58.3%",
          winRate: "75.6%",
          mvpRate: "52%",
        },
      },
    ],
    achievements: [],
    matchHistory: [],
  },
  {
    id: "gamer-9",
    ethoraId: "ETH-3072-RIFT",
    username: "gamer_rift",
    gamerTag: "GameRift",
    realName: "Nahom Girma",
    email: "nahom.rift@ethora.et",
    avatar: "/images/avatar-gamerift.png",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    role: "gamer",
    bio: "Entry fragger for Rift Squad. Dominating Great Rift Valley LAN qualifiers and national Battle Royale showdowns.",
    verified: true,
    nationalRank: 3,
    regionalRank: 2,
    communityRank: 1,
    ratingPoints: 10980,
    location: {
      regionId: "reg-sidama",
      regionName: "Sidama",
      zoneId: "zone-hawassa",
      zoneName: "Hawassa City Zone",
      woredaId: "wor-hawassa-city",
      woredaName: "Hawassa City",
      communityName: "Rift Valley Gamers Haven",
    },
    team: {
      id: "team-rift-squad",
      name: "RIFT SQUAD",
      tag: "RS",
      role: "Starter",
    },
    stats: {
      tournamentsPlayed: 24,
      tournamentsWon: 9,
      matchesPlayed: 138,
      matchesWon: 99,
      winRate: 71.7,
      earningsETB: 285000,
    },
    connectedGames: [
      {
        gameId: "game-freefire",
        gameName: "Free Fire",
        inGameName: "RiftNahom",
        platform: "Mobile",
        platformId: "FF-77291044",
        rankTier: "Master",
        points: 10980,
        verified: true,
        verifiedDate: "2026-02-01",
        stats: {
          kda: "4.5",
          headshotRate: "46.0%",
          winRate: "71.7%",
          mvpRate: "44%",
        },
      },
    ],
    achievements: [],
    matchHistory: [],
  },
];

// Initial Mock Tournaments with interactive brackets and applicant registrations
export const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: "tourn-addis-masters-2026",
    slug: "ethiopian-national-valorant-masters-2026",
    title: "Ethiopian National Valorant Masters 2026",
    gameId: "game-valorant",
    gameName: "Valorant",
    bannerUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    organizer: {
      id: "org-addis-esports",
      name: "Lion City Esports Federation",
      tag: "LCE",
      logo: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=150&auto=format&fit=crop",
      verified: true,
    },
    description:
      "The premier national championship for tactical FPS competitors in Ethiopia. 16 elite 5v5 rosters battle through double elimination playoffs for a 250,000 ETB prize pool, sponsored gaming rigs, and direct qualification to the VCT Africa Ascension qualifiers.",
    prizePoolETB: 250000,
    prizePoolUSD: 2100,
    format: "Double Elimination",
    status: "live",
    dates: {
      registrationDeadline: "2026-10-30",
      startsAt: "2026-11-10",
      endsAt: "2026-11-20",
    },
    venueType: "Hybrid (Online + Finals LAN)",
    location: {
      regionName: "Addis Ababa",
      venueName: "Millennium Hall Arena • Main Stage",
      address: "Bole Medhanialem, Addis Ababa, Ethiopia",
    },
    entryFeeETB: 0,
    maxParticipants: 16,
    registeredCount: 16,
    rules: [
      "All team members must have an active, verified ETHORA Gamer ID with at least Ascendant rank in Valorant.",
      "Matches are played on Bahrain or Frankfurt servers with sub-70ms ping enforcement.",
      "Standard VCT 2026 competitive map pool and overtime rules apply (win by 2).",
      "Grand Finals will be hosted live on stage at Millennium Hall Arena with fiber optic LAN connection.",
    ],
    schedule: [
      { phase: "Round of 16", time: "Nov 10-12", format: "Best of 1" },
      { phase: "Quarterfinals", time: "Nov 13-14", format: "Best of 3" },
      { phase: "Semifinals & Lower Final", time: "Nov 16-17", format: "Best of 3" },
      { phase: "Grand Finals (LAN Stage)", time: "Nov 20 (6:00 PM EAT)", format: "Best of 5" },
    ],
    brackets: [
      {
        id: "m-qf-1",
        round: 1,
        matchNumber: 1,
        participant1: {
          id: "gamer-1",
          name: "Apex Legion",
          tag: "APX",
          avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop",
          score: 2,
          isWinner: true,
        },
        participant2: {
          id: "team-rift-valk",
          name: "Rift Valley Valkyries",
          tag: "RVV",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
          score: 1,
          isWinner: false,
        },
        status: "completed",
        scheduledTime: "Nov 13 • 7:00 PM EAT",
      },
      {
        id: "m-qf-2",
        round: 1,
        matchNumber: 2,
        participant1: {
          id: "team-habesha-vanguards",
          name: "Habesha Vanguards",
          tag: "HVG",
          avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop",
          score: 2,
          isWinner: true,
        },
        participant2: {
          id: "team-adama-strikers",
          name: "Adama Cyber Force",
          tag: "ACF",
          avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop",
          score: 0,
          isWinner: false,
        },
        status: "completed",
        scheduledTime: "Nov 13 • 9:00 PM EAT",
      },
      {
        id: "m-sf-1",
        round: 2,
        matchNumber: 3,
        participant1: {
          id: "gamer-1",
          name: "Apex Legion",
          tag: "APX",
          avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop",
          score: 2,
          isWinner: true,
        },
        participant2: {
          id: "team-habesha-vanguards",
          name: "Habesha Vanguards",
          tag: "HVG",
          avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop",
          score: 1,
          isWinner: false,
        },
        status: "completed",
        scheduledTime: "Nov 16 • 8:00 PM EAT",
      },
      {
        id: "m-fn-1",
        round: 3,
        matchNumber: 4,
        participant1: {
          id: "gamer-1",
          name: "Apex Legion",
          tag: "APX",
          avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop",
          score: 1,
        },
        participant2: {
          id: "team-tana-titans",
          name: "Tana Titans",
          tag: "TNT",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
          score: 0,
        },
        status: "in_progress",
        scheduledTime: "Nov 20 • 6:00 PM EAT",
        scheduledVenue: "Millennium Hall Arena • Main Stage",
      },
    ],
    registrations: [
      {
        id: "reg-1",
        tournamentId: "tourn-addis-masters-2026",
        gamerId: "gamer-1",
        gamerTag: "ViperX",
        realName: "Yared Tadesse",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop",
        ethoraId: "ETH-7729-VIPER",
        inGameName: "ViperX#ET01",
        rankTier: "Radiant",
        location: "Bole Sub-City, Addis Ababa",
        registeredAt: "2026-10-22",
        status: "approved",
        checkInStatus: true,
      },
      {
        id: "reg-2",
        tournamentId: "tourn-addis-masters-2026",
        gamerId: "gamer-2",
        gamerTag: "PhantomQueen",
        realName: "Selamawit Haile",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
        ethoraId: "ETH-3104-SELAM",
        inGameName: "PhantomSelam#VAL",
        rankTier: "Ascendant",
        location: "Yeka Sub-City, Addis Ababa",
        registeredAt: "2026-10-23",
        status: "approved",
        checkInStatus: true,
      },
      {
        id: "reg-3",
        tournamentId: "tourn-addis-masters-2026",
        gamerId: "gamer-newbie-1",
        gamerTag: "ShadowStriker",
        realName: "Abel Girma",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
        ethoraId: "ETH-1049-ABEL",
        inGameName: "ShadowAbe#4412",
        rankTier: "Diamond",
        location: "Kirkos Sub-City, Addis Ababa",
        registeredAt: "2026-10-28",
        status: "pending",
        checkInStatus: false,
      },
      {
        id: "reg-4",
        tournamentId: "tourn-addis-masters-2026",
        gamerId: "gamer-newbie-2",
        gamerTag: "ZeusHawassa",
        realName: "Dawit Fikru",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop",
        ethoraId: "ETH-8821-DAWIT",
        inGameName: "Zeus#ET99",
        rankTier: "Platinum",
        location: "Hawassa City, Sidama",
        registeredAt: "2026-10-29",
        status: "waitlisted",
        checkInStatus: false,
      },
    ],
  },
  {
    id: "tourn-ea-fc-national-cup",
    slug: "ethiopia-ea-fc-24-national-championship",
    title: "Ethiopia EA SPORTS FC 24 National Championship",
    gameId: "game-eafc",
    gameName: "EA SPORTS FC 24",
    bannerUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
    organizer: {
      id: "org-bole-console",
      name: "Ethiopian Console & Gaming Lounge Alliance",
      tag: "ECGLA",
      logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=150&auto=format&fit=crop",
      verified: true,
    },
    description:
      "Ethiopia's largest individual console tournament featuring 128 top football gamers competing across 8 regional zones. Streamed live to thousands with national bragging rights and a 180,000 ETB cash prize pool.",
    prizePoolETB: 180000,
    prizePoolUSD: 1500,
    format: "Group Stage",
    status: "registration_open",
    dates: {
      registrationDeadline: "2026-11-28",
      startsAt: "2026-12-05",
      endsAt: "2026-12-12",
    },
    venueType: "LAN / Arena",
    location: {
      regionName: "Addis Ababa",
      venueName: "Sarbet Vanguard Esports Arena",
      address: "Sarbet, Nifas Silk-Lafto, Addis Ababa",
    },
    entryFeeETB: 200,
    maxParticipants: 128,
    registeredCount: 94,
    rules: [
      "PS5 tournament consoles provided with official DualSense wireless controllers or player-brought wired controllers.",
      "Game mode: Standard 95-rated squad or Ultimate Team (capped squad rating 88 max).",
      "Match duration: 6 minutes halves, tactical defending mandatory.",
      "Fair play code enforced by certified ETHORA ref team.",
    ],
    schedule: [
      { phase: "Regional Qualifiers", time: "Dec 05-06", format: "Round Robin Pools" },
      { phase: "Top 32 Knockouts", time: "Dec 08", format: "Single Elim" },
      { phase: "Championship Finals", time: "Dec 12", format: "Best of 3 Series" },
    ],
    registrations: [
      {
        id: "reg-fc-1",
        tournamentId: "tourn-ea-fc-national-cup",
        gamerId: "gamer-3",
        gamerTag: "Bekila",
        realName: "Bereket Tilahun",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        ethoraId: "ETH-9921-BEREKET",
        inGameName: "Bekila_ETH",
        rankTier: "Elite Division (Top 100)",
        location: "Hawassa City, Sidama",
        registeredAt: "2026-11-01",
        status: "approved",
        checkInStatus: true,
      },
    ],
  },
  {
    id: "tourn-pubg-horn-clash",
    slug: "horn-of-africa-pubg-mobile-scrims",
    title: "Horn of Africa PUBG Mobile Battlegrounds",
    gameId: "game-pubgm",
    gameName: "PUBG Mobile",
    bannerUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop",
    organizer: {
      id: "org-rift-gaming",
      name: "Rift Valley Esports Org",
      tag: "RVO",
      logo: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=150&auto=format&fit=crop",
      verified: true,
    },
    description:
      "32 elite squads dropping into Erangel and Miramar. 10 matches over two intense weekends. Mobile gaming at the highest tactical tier across Ethiopia, Kenya, and Djibouti.",
    prizePoolETB: 120000,
    prizePoolUSD: 1000,
    format: "Round Robin",
    status: "upcoming",
    dates: {
      registrationDeadline: "2026-12-01",
      startsAt: "2026-12-15",
      endsAt: "2026-12-22",
    },
    venueType: "Online",
    location: {
      regionName: "National / Horn of Africa",
      venueName: "Online Custom Room • Dedicated Server",
      address: "Online",
    },
    entryFeeETB: 0,
    maxParticipants: 32,
    registeredCount: 22,
    rules: [
      "Mobile devices only (iPads and tablets permitted if approved; Emulators strictly forbidden and detected).",
      "Official point scoring system: 10 pts for WWCD, 1 pt per kill.",
      "Proof of ping and device recording required for top 3 winners.",
    ],
    schedule: [
      { phase: "Erangel Day 1", time: "Dec 15 (8:00 PM)", format: "3 Matches" },
      { phase: "Miramar Day 2", time: "Dec 16 (8:00 PM)", format: "3 Matches" },
      { phase: "Super Weekend Finals", time: "Dec 22 (7:00 PM)", format: "4 Matches" },
    ],
    registrations: [],
  },
  {
    id: "tourn-cs2-piassa-invitational",
    slug: "piassa-cs2-classic-invitational",
    title: "Piassa CS2 Classic Invitational",
    gameId: "game-cs2",
    gameName: "Counter-Strike 2",
    bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
    organizer: {
      id: "org-addis-esports",
      name: "Lion City Esports Federation",
      tag: "LCE",
      logo: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=150&auto=format&fit=crop",
      verified: true,
    },
    description:
      "A celebration of Addis Ababa's legendary PC cyber cafe heritage. 8 invited veteran CS2 rosters clash on Mirage, Inferno, and Nuke for 100,000 ETB and eternal bragging rights.",
    prizePoolETB: 100000,
    prizePoolUSD: 850,
    format: "Single Elimination",
    status: "completed",
    dates: {
      registrationDeadline: "2026-09-15",
      startsAt: "2026-09-20",
      endsAt: "2026-09-23",
    },
    venueType: "LAN / Arena",
    location: {
      regionName: "Addis Ababa",
      venueName: "Piassa Historic Gamers Club",
      address: "Piassa, Arada Sub-City, Addis Ababa",
    },
    entryFeeETB: 150,
    maxParticipants: 8,
    registeredCount: 8,
    rules: [
      "Standard MR12 regulation with MR3 overtime rules.",
      "Knife round determines side selection.",
      "Strict zero-tolerance anti-cheat policy with hardware logs.",
    ],
    schedule: [
      { phase: "Quarterfinals", time: "Sep 20", format: "Best of 1" },
      { phase: "Semifinals & Finals", time: "Sep 23", format: "Best of 3" },
    ],
    registrations: [],
  },
];

// Initial Teams
export const INITIAL_TEAMS: Team[] = [
  {
    id: "team-apex-legion",
    name: "Apex Legion",
    tag: "APX",
    logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=150&auto=format&fit=crop",
    gameId: "game-valorant",
    gameName: "Valorant",
    region: "Addis Ababa",
    captain: {
      id: "gamer-1",
      tag: "ViperX",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop",
    },
    members: [
      { id: "gamer-1", tag: "ViperX", role: "Duelist (Captain)", avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop", joinedDate: "2025-06-01" },
      { id: "gamer-m1", tag: "KiroSmoke", role: "Controller", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop", joinedDate: "2025-07-15" },
      { id: "gamer-m2", tag: "SovaBole", role: "Initiator", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&auto=format&fit=crop", joinedDate: "2025-08-01" },
      { id: "gamer-m3", tag: "SentinelDan", role: "Sentinel", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop", joinedDate: "2025-09-10" },
      { id: "gamer-m4", tag: "FlashDawit", role: "Flex", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop", joinedDate: "2026-01-05" },
    ],
    stats: {
      tournamentsWon: 8,
      matchesPlayed: 74,
      wins: 58,
      losses: 16,
      winRate: 78.4,
    },
  },
  {
    id: "team-valkyries",
    name: "Rift Valley Valkyries",
    tag: "RVV",
    logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=150&auto=format&fit=crop",
    gameId: "game-cs2",
    gameName: "Counter-Strike 2",
    region: "Addis Ababa",
    captain: {
      id: "gamer-2",
      tag: "PhantomQueen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    },
    members: [
      { id: "gamer-2", tag: "PhantomQueen", role: "Primary AWP (Captain)", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop", joinedDate: "2025-04-10" },
      { id: "gamer-v2", tag: "Asterix", role: "Entry Fragger", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop", joinedDate: "2025-06-20" },
      { id: "gamer-v3", tag: "LunaNova", role: "Support", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop", joinedDate: "2025-08-14" },
    ],
    stats: {
      tournamentsWon: 5,
      matchesPlayed: 52,
      wins: 39,
      losses: 13,
      winRate: 75.0,
    },
  },
];

// Initial Organizations
export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: "org-addis-esports",
    name: "Lion City Esports Federation",
    tag: "LCE",
    logo: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=150&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
    headquarters: "Addis Ababa, Ethiopia",
    foundedYear: 2023,
    verified: true,
    bio: "Ethiopia's pioneer esports organizer and tournament directorate. Building professional infrastructure, LAN circuits, and certified referee standards across East Africa.",
    sponsoredTeams: ["Apex Legion", "Habesha Vanguards"],
    hostedTournaments: 48,
    trophiesWon: 14,
  },
  {
    id: "org-rift-gaming",
    name: "Great Rift Gaming Syndicate",
    tag: "GRS",
    logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=150&auto=format&fit=crop",
    banner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop",
    headquarters: "Adama & Addis Ababa",
    foundedYear: 2024,
    verified: true,
    bio: "Multi-title esports conglomerate fielding top-tier rosters in Valorant, PUBG Mobile, and EA Sports FC. Dedicated to discovering grassroots talent across Ethiopian universities.",
    sponsoredTeams: ["Rift Valley Valkyries", "Adama Cyber Force"],
    hostedTournaments: 18,
    trophiesWon: 9,
  },
];

