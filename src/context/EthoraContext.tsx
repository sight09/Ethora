"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  GamerProfile,
  Tournament,
  Team,
  Organization,
  TournamentRegistration,
  BracketMatch,
  INITIAL_GAMERS,
  INITIAL_TOURNAMENTS,
  INITIAL_TEAMS,
  INITIAL_ORGANIZATIONS,
} from "@/data/mockData";

export type RoleType = "gamer" | "organizer" | "organization" | "admin" | "guest";

export interface UserSession {
  role: RoleType;
  gamerId?: string;
  name: string;
  tag: string;
  avatar: string;
  email: string;
  organizationId?: string;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "tournament" | "rank" | "system" | "invite";
  read: boolean;
}

interface EthoraContextType {
  currentSession: UserSession;
  setRole: (role: RoleType) => void;
  login: (email: string, password?: string) => { success: boolean; session: UserSession };
  logout: () => void;
  signUpUser: (data: { name: string; tag: string; email: string; role: RoleType }) => UserSession;
  currentUser: GamerProfile | null;
  tournaments: Tournament[];
  gamers: GamerProfile[];
  teams: Team[];
  organizations: Organization[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markAllNotificationsRead: () => void;
  // Tournament Actions
  registerForTournament: (tournamentId: string, inGameName: string) => boolean;
  cancelRegistration: (tournamentId: string) => void;
  updateRegistrationStatus: (
    tournamentId: string,
    registrationId: string,
    newStatus: "approved" | "rejected" | "waitlisted"
  ) => void;
  createTournament: (newTournament: Omit<Tournament, "id" | "registeredCount" | "registrations">) => string;
  updateBracketMatch: (
    tournamentId: string,
    matchId: string,
    score1: number,
    score2: number,
    winnerParticipantId: string
  ) => void;
  // Gamer Actions
  updateGamerProfile: (gamerId: string, updates: Partial<GamerProfile>) => void;
  connectGameAccount: (
    gamerId: string,
    gameId: string,
    gameName: string,
    inGameName: string,
    platform: "PC" | "Mobile" | "Console",
    platformId: string
  ) => void;
  // Team Actions
  createTeam: (name: string, tag: string, gameId: string, gameName: string) => string;
}

const EthoraContext = createContext<EthoraContextType | undefined>(undefined);

export const PRESET_SESSIONS: Record<RoleType, UserSession> = {
  gamer: {
    role: "gamer",
    gamerId: "gamer-1",
    name: "Yared Tadesse",
    tag: "ViperX",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=300&auto=format&fit=crop",
    email: "yared.viper@ethora.et",
  },
  organizer: {
    role: "organizer",
    organizationId: "org-addis-esports",
    name: "Amanuel Kebede",
    tag: "LionCityOps",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop",
    email: "organizer@lioncity.et",
  },
  organization: {
    role: "organization",
    organizationId: "org-rift-gaming",
    name: "Great Rift Syndicate Director",
    tag: "RiftAdmin",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=300&auto=format&fit=crop",
    email: "management@greatriftesports.com",
  },
  admin: {
    role: "admin",
    name: "ETHORA System Lead",
    tag: "ETHORA_ROOT",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
    email: "security@ethora.et",
  },
  guest: {
    role: "guest",
    name: "Guest Visitor",
    tag: "Guest",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop",
    email: "",
  },
};

export interface DemoAccount {
  id: string;
  name: string;
  tag: string;
  role: RoleType;
  roleLabel: string;
  email: string;
  password: string;
  avatar: string;
  badge: string;
  accent: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "demo-viper",
    name: "Yared Tadesse",
    tag: "ViperX",
    role: "gamer",
    roleLabel: "Rank #1 Pro Gamer",
    email: "yared.viper@ethora.et",
    password: "password123",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=300&auto=format&fit=crop",
    badge: "3,420 ELO • Grandmaster",
    accent: "violet",
  },
  {
    id: "demo-organizer",
    name: "Amanuel Kebede",
    tag: "LionCityOps",
    role: "organizer",
    roleLabel: "Tournament Organizer",
    email: "organizer@lioncity.et",
    password: "password123",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop",
    badge: "Certified TO • Addis",
    accent: "cyan",
  },
  {
    id: "demo-org",
    name: "Great Rift Syndicate",
    tag: "RiftAdmin",
    role: "organization",
    roleLabel: "Org Director",
    email: "management@greatriftesports.com",
    password: "password123",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=300&auto=format&fit=crop",
    badge: "Tier 1 Org • 14 Athletes",
    accent: "amber",
  },
  {
    id: "demo-admin",
    name: "ETHORA System Lead",
    tag: "ETHORA_ROOT",
    role: "admin",
    roleLabel: "Platform Admin",
    email: "security@ethora.et",
    password: "password123",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
    badge: "Root Console Access",
    accent: "emerald",
  },
];

export const EthoraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSession, setCurrentSession] = useState<UserSession>(PRESET_SESSIONS.gamer);
  const [tournaments, setTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);
  const [gamers, setGamers] = useState<GamerProfile[]>(INITIAL_GAMERS);
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [organizations] = useState<Organization[]>(INITIAL_ORGANIZATIONS);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "notif-1",
      title: "Tournament Match Ready",
      message: "Your Grand Finals match against Tana Titans is scheduled for Millennium Hall Arena.",
      time: "10m ago",
      type: "tournament",
      read: false,
    },
    {
      id: "notif-2",
      title: "National Rank Movement",
      message: "Congratulations! You held Rank #1 in Ethiopia with 3,420 Rating Points.",
      time: "2h ago",
      type: "rank",
      read: false,
    },
    {
      id: "notif-3",
      title: "New Team Invitation",
      message: "Great Rift Syndicate invited you for the East Africa LAN exhibition.",
      time: "1d ago",
      type: "invite",
      read: true,
    },
  ]);

  // Load state from local storage on mount
  useEffect(() => {
    try {
      const savedTournaments = localStorage.getItem("ethora_tournaments");
      if (savedTournaments) {
        setTournaments(JSON.parse(savedTournaments));
      }
      const savedGamers = localStorage.getItem("ethora_gamers");
      if (savedGamers) {
        setGamers(JSON.parse(savedGamers));
      }
      const savedRole = localStorage.getItem("ethora_active_role") as RoleType;
      if (savedRole && PRESET_SESSIONS[savedRole]) {
        setCurrentSession(PRESET_SESSIONS[savedRole]);
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const saveTournamentsState = (updated: Tournament[]) => {
    setTournaments(updated);
    try {
      localStorage.setItem("ethora_tournaments", JSON.stringify(updated));
    } catch {}
  };

  const saveGamersState = (updated: GamerProfile[]) => {
    setGamers(updated);
    try {
      localStorage.setItem("ethora_gamers", JSON.stringify(updated));
    } catch {}
  };

  const setRole = (newRole: RoleType) => {
    const session = PRESET_SESSIONS[newRole];
    setCurrentSession(session);
    try {
      localStorage.setItem("ethora_active_role", newRole);
    } catch {}
  };

  const login = (email: string, password?: string): { success: boolean; session: UserSession } => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check presets
    for (const [key, s] of Object.entries(PRESET_SESSIONS)) {
      if (
        s.email.toLowerCase() === cleanEmail ||
        s.tag.toLowerCase() === cleanEmail ||
        (cleanEmail.includes("viper") && s.role === "gamer") ||
        (cleanEmail.includes("organizer") && s.role === "organizer") ||
        (cleanEmail.includes("rift") && s.role === "organization") ||
        (cleanEmail.includes("admin") && s.role === "admin")
      ) {
        setCurrentSession(s);
        try {
          localStorage.setItem("ethora_active_role", s.role);
          localStorage.setItem("ethora_user_session", JSON.stringify(s));
        } catch {}
        return { success: true, session: s };
      }
    }

    // 2. Check gamers list
    const foundGamer = gamers.find(
      (g) => g.email?.toLowerCase() === cleanEmail || g.gamerTag.toLowerCase() === cleanEmail
    );
    if (foundGamer) {
      const newSession: UserSession = {
        role: "gamer",
        gamerId: foundGamer.id,
        name: foundGamer.realName,
        tag: foundGamer.gamerTag,
        avatar: foundGamer.avatar,
        email: foundGamer.email || cleanEmail,
      };
      setCurrentSession(newSession);
      try {
        localStorage.setItem("ethora_active_role", "gamer");
        localStorage.setItem("ethora_user_session", JSON.stringify(newSession));
      } catch {}
      return { success: true, session: newSession };
    }

    // 3. Fallback to a custom gamer session
    const fallback: UserSession = {
      role: "gamer",
      gamerId: "gamer-1",
      name: email.split("@")[0] || "Competitor",
      tag: email.split("@")[0] || "Gamer",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=300&auto=format&fit=crop",
      email: email,
    };
    setCurrentSession(fallback);
    try {
      localStorage.setItem("ethora_active_role", "gamer");
      localStorage.setItem("ethora_user_session", JSON.stringify(fallback));
    } catch {}
    return { success: true, session: fallback };
  };

  const logout = () => {
    setCurrentSession(PRESET_SESSIONS.guest);
    try {
      localStorage.setItem("ethora_active_role", "guest");
      localStorage.removeItem("ethora_user_session");
    } catch {}
  };

  const signUpUser = (data: { name: string; tag: string; email: string; role: RoleType }): UserSession => {
    const newSession: UserSession = {
      role: data.role || "gamer",
      gamerId: data.role === "gamer" ? `gamer-${Date.now()}` : undefined,
      name: data.name,
      tag: data.tag,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop",
      email: data.email,
    };
    setCurrentSession(newSession);
    try {
      localStorage.setItem("ethora_active_role", newSession.role);
      localStorage.setItem("ethora_user_session", JSON.stringify(newSession));
    } catch {}
    return newSession;
  };

  const currentUser = gamers.find((g) => g.id === currentSession.gamerId) || null;

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const registerForTournament = (tournamentId: string, inGameName: string): boolean => {
    if (!currentUser) return false;

    const tournament = tournaments.find((t) => t.id === tournamentId);
    if (!tournament) return false;

    const existingReg = tournament.registrations.find((r) => r.gamerId === currentUser.id);
    if (existingReg) return false;

    const newRegistration: TournamentRegistration = {
      id: `reg-${Date.now()}`,
      tournamentId,
      gamerId: currentUser.id,
      gamerTag: currentUser.gamerTag,
      realName: currentUser.realName,
      avatar: currentUser.avatar,
      ethoraId: currentUser.ethoraId,
      inGameName,
      rankTier: currentUser.connectedGames[0]?.rankTier || "Diamond",
      location: `${currentUser.location.woredaName}, ${currentUser.location.regionName}`,
      registeredAt: new Date().toISOString().split("T")[0],
      status: "pending",
      checkInStatus: false,
    };

    const updatedTournaments = tournaments.map((t) => {
      if (t.id === tournamentId) {
        return {
          ...t,
          registeredCount: t.registeredCount + 1,
          registrations: [newRegistration, ...t.registrations],
        };
      }
      return t;
    });

    saveTournamentsState(updatedTournaments);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: "Registration Submitted",
        message: `Your registration for "${tournament.title}" was submitted and is pending review.`,
        time: "Just now",
        type: "tournament",
        read: false,
      },
      ...prev,
    ]);

    return true;
  };

  const cancelRegistration = (tournamentId: string) => {
    if (!currentUser) return;
    const updatedTournaments = tournaments.map((t) => {
      if (t.id === tournamentId) {
        const filtered = t.registrations.filter((r) => r.gamerId !== currentUser.id);
        return {
          ...t,
          registeredCount: Math.max(0, t.registeredCount - 1),
          registrations: filtered,
        };
      }
      return t;
    });
    saveTournamentsState(updatedTournaments);
  };

  const updateRegistrationStatus = (
    tournamentId: string,
    registrationId: string,
    newStatus: "approved" | "rejected" | "waitlisted"
  ) => {
    const updatedTournaments = tournaments.map((t) => {
      if (t.id === tournamentId) {
        return {
          ...t,
          registrations: t.registrations.map((r) => {
            if (r.id === registrationId) {
              return { ...r, status: newStatus };
            }
            return r;
          }),
        };
      }
      return t;
    });
    saveTournamentsState(updatedTournaments);
  };

  const createTournament = (
    newTournament: Omit<Tournament, "id" | "registeredCount" | "registrations">
  ): string => {
    const id = `tourn-${Date.now()}`;
    const created: Tournament = {
      ...newTournament,
      id,
      registeredCount: 0,
      registrations: [],
    };
    const updated = [created, ...tournaments];
    saveTournamentsState(updated);
    return id;
  };

  const updateBracketMatch = (
    tournamentId: string,
    matchId: string,
    score1: number,
    score2: number,
    winnerParticipantId: string
  ) => {
    const updatedTournaments = tournaments.map((t) => {
      if (t.id === tournamentId && t.brackets) {
        const updatedBrackets = t.brackets.map((match) => {
          if (match.id === matchId) {
            const p1Won = match.participant1.id === winnerParticipantId;
            const p2Won = match.participant2.id === winnerParticipantId;
            return {
              ...match,
              status: "completed" as const,
              participant1: {
                ...match.participant1,
                score: score1,
                isWinner: p1Won,
              },
              participant2: {
                ...match.participant2,
                score: score2,
                isWinner: p2Won,
              },
            };
          }
          return match;
        });
        return { ...t, brackets: updatedBrackets };
      }
      return t;
    });
    saveTournamentsState(updatedTournaments);
  };

  const updateGamerProfile = (gamerId: string, updates: Partial<GamerProfile>) => {
    const updatedGamers = gamers.map((g) => {
      if (g.id === gamerId) {
        return { ...g, ...updates };
      }
      return g;
    });
    saveGamersState(updatedGamers);
  };

  const connectGameAccount = (
    gamerId: string,
    gameId: string,
    gameName: string,
    inGameName: string,
    platform: "PC" | "Mobile" | "Console",
    platformId: string
  ) => {
    const updatedGamers = gamers.map((g) => {
      if (g.id === gamerId) {
        const newAccount = {
          gameId,
          gameName,
          inGameName,
          platform,
          platformId,
          rankTier: "Platinum Division",
          points: 1540,
          verified: true,
          verifiedDate: new Date().toISOString().split("T")[0],
          stats: { winRate: "62%", matches: "45" },
        };
        const existing = g.connectedGames.filter((cg) => cg.gameId !== gameId);
        return {
          ...g,
          connectedGames: [...existing, newAccount],
        };
      }
      return g;
    });
    saveGamersState(updatedGamers);
  };

  const createTeam = (name: string, tag: string, gameId: string, gameName: string): string => {
    const id = `team-${Date.now()}`;
    const newTeam: Team = {
      id,
      name,
      tag: tag.toUpperCase(),
      logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=150&auto=format&fit=crop",
      gameId,
      gameName,
      region: currentUser?.location.regionName || "Addis Ababa",
      captain: {
        id: currentUser?.id || "gamer-1",
        tag: currentUser?.gamerTag || "Captain",
        avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop",
      },
      members: [
        {
          id: currentUser?.id || "gamer-1",
          tag: currentUser?.gamerTag || "Captain",
          role: "Captain / IGL",
          avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=150&auto=format&fit=crop",
          joinedDate: new Date().toISOString().split("T")[0],
        },
      ],
      stats: {
        tournamentsWon: 0,
        matchesPlayed: 0,
        wins: 0,
        losses: 0,
        winRate: 0,
      },
    };
    setTeams([newTeam, ...teams]);
    return id;
  };

  return (
    <EthoraContext.Provider
      value={{
        currentSession,
        setRole,
        login,
        logout,
        signUpUser,
        currentUser,
        tournaments,
        gamers,
        teams,
        organizations,
        notifications,
        unreadNotificationCount,
        markAllNotificationsRead,
        registerForTournament,
        cancelRegistration,
        updateRegistrationStatus,
        createTournament,
        updateBracketMatch,
        updateGamerProfile,
        connectGameAccount,
        createTeam,
      }}
    >
      {children}
    </EthoraContext.Provider>
  );
};

export const useEthora = () => {
  const context = useContext(EthoraContext);
  if (!context) {
    throw new Error("useEthora must be used within an EthoraProvider");
  }
  return context;
};

