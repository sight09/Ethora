import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/gamers - Fetch all gamers from SQLite ordered by rating
export async function GET() {
  try {
    const gamers = await prisma.gamerProfile.findMany({
      orderBy: {
        ratingPoints: "desc",
      },
    });

    const parsed = gamers.map((g, index) => ({
      ...g,
      username: g.gamerTag.toLowerCase(),
      email: `${g.gamerTag.toLowerCase()}@ethora.et`,
      role: "gamer" as const,
      banner: g.banner || "/images/ethora-stadium-banner.jpg",
      nationalRank: index + 1,
      regionalRank: index + 1,
      communityRank: index + 1,
      location: {
        regionId: g.regionId,
        regionName: g.regionName,
        zoneId: g.zoneId,
        zoneName: g.zoneName,
        woredaId: g.woredaId,
        woredaName: g.woredaName,
        communityName: g.communityName || "",
      },
      stats: {
        tournamentsPlayed: Math.max(1, Math.floor(g.matchesPlayed / 10)),
        tournamentsWon: Math.max(0, Math.floor(g.matchesWon / 12)),
        matchesPlayed: g.matchesPlayed,
        matchesWon: g.matchesWon,
        winRate: g.winRate,
        earningsETB: g.matchesWon * 1250,
        rankTier: g.rankTier,
        ratingPoints: g.ratingPoints,
      },
      connectedGames: JSON.parse(g.connectedGames || "[]"),
      matchHistory: JSON.parse(g.matchHistory || "[]"),
      achievements: (() => {
        try {
          const parsedAch = JSON.parse((g as any).achievements || "[]");
          if (Array.isArray(parsedAch) && parsedAch.length > 0) return parsedAch;
        } catch {}
        return [
          {
            id: `ach-nat-${g.id}`,
            title: "National Contender",
            description: "Registered athlete in the official Ethiopian Esports Circuit",
            icon: "Trophy",
            tier: "gold",
            category: "tournament",
            unlockedAt: "2026-01-15",
          },
        ];
      })(),
    }));

    return NextResponse.json({ success: true, gamers: parsed });
  } catch (error) {
    console.error("Failed to fetch gamers from SQLite:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

// POST /api/gamers - Upsert a gamer profile in SQLite
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = body.id || `gamer-${Date.now()}`;

    const upserted = await prisma.gamerProfile.upsert({
      where: { id },
      update: {
        gamerTag: body.gamerTag,
        realName: body.realName,
        avatar: body.avatar,
        banner: body.banner,
        bio: body.bio,
        rankTier: body.rankTier || "Diamond",
        ratingPoints: Number(body.ratingPoints || 1200),
        regionId: body.location?.regionId || body.regionId || "reg-aa",
        regionName: body.location?.regionName || body.regionName || "Addis Ababa",
        zoneId: body.location?.zoneId || body.zoneId || "zone-aa-central",
        zoneName: body.location?.zoneName || body.zoneName || "Central Addis",
        woredaId: body.location?.woredaId || body.woredaId || "wor-bole",
        woredaName: body.location?.woredaName || body.woredaName || "Bole Sub-City",
        communityName: body.location?.communityName || body.communityName,
      },
      create: {
        id,
        gamerTag: body.gamerTag,
        realName: body.realName,
        ethoraId: body.ethoraId || `ET-${Date.now().toString().slice(-4)}`,
        avatar: body.avatar || "/images/avatars/avatar-viper.svg",
        banner: body.banner,
        bio: body.bio || "",
        rankTier: body.rankTier || "Diamond",
        ratingPoints: Number(body.ratingPoints || 1200),
        regionId: body.location?.regionId || body.regionId || "reg-aa",
        regionName: body.location?.regionName || body.regionName || "Addis Ababa",
        zoneId: body.location?.zoneId || body.zoneId || "zone-aa-central",
        zoneName: body.location?.zoneName || body.zoneName || "Central Addis",
        woredaId: body.location?.woredaId || body.woredaId || "wor-bole",
        woredaName: body.location?.woredaName || body.woredaName || "Bole Sub-City",
        communityName: body.location?.communityName || body.communityName,
        matchesPlayed: body.stats?.matchesPlayed || 0,
        matchesWon: body.stats?.matchesWon || 0,
        winRate: body.stats?.winRate || 0,
        verified: true,
      },
    });

    return NextResponse.json({ success: true, gamer: upserted });
  } catch (error) {
    console.error("Failed to upsert gamer in SQLite:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
