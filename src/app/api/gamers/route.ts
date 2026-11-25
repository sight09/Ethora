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
          const parsedAch = JSON.parse((g as { achievements?: string }).achievements || "[]");
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

    // Helper to format JSON fields whether passed as object/array or string
    const formatJsonField = (val: unknown) => {
      if (val === undefined || val === null) return undefined;
      return typeof val === "string" ? val : JSON.stringify(val);
    };

    const updateData: Record<string, unknown> = {};
    if (body.gamerTag !== undefined) updateData.gamerTag = body.gamerTag;
    if (body.realName !== undefined) updateData.realName = body.realName;
    if (body.avatar !== undefined) updateData.avatar = body.avatar;
    if (body.banner !== undefined) updateData.banner = body.banner;
    if (body.bio !== undefined) updateData.bio = body.bio;
    if (body.rankTier !== undefined) updateData.rankTier = body.rankTier;
    if (body.ratingPoints !== undefined) updateData.ratingPoints = Number(body.ratingPoints);
    if (body.verified !== undefined) updateData.verified = Boolean(body.verified);

    // Location fields
    if (body.location?.regionId || body.regionId) updateData.regionId = body.location?.regionId || body.regionId;
    if (body.location?.regionName || body.regionName) updateData.regionName = body.location?.regionName || body.regionName;
    if (body.location?.zoneId || body.zoneId) updateData.zoneId = body.location?.zoneId || body.zoneId;
    if (body.location?.zoneName || body.zoneName) updateData.zoneName = body.location?.zoneName || body.zoneName;
    if (body.location?.woredaId || body.woredaId) updateData.woredaId = body.location?.woredaId || body.woredaId;
    if (body.location?.woredaName || body.woredaName) updateData.woredaName = body.location?.woredaName || body.woredaName;
    if (body.location?.communityName !== undefined || body.communityName !== undefined) {
      updateData.communityName = body.location?.communityName ?? body.communityName;
    }

    // Stats
    if (body.stats?.matchesPlayed !== undefined) updateData.matchesPlayed = Number(body.stats.matchesPlayed);
    if (body.stats?.matchesWon !== undefined) updateData.matchesWon = Number(body.stats.matchesWon);
    if (body.stats?.winRate !== undefined) updateData.winRate = Number(body.stats.winRate);

    // Complex JSON fields
    if (body.connectedGames !== undefined) {
      updateData.connectedGames = formatJsonField(body.connectedGames);
    }
    if (body.matchHistory !== undefined) {
      updateData.matchHistory = formatJsonField(body.matchHistory);
    }
    if (body.achievements !== undefined) {
      updateData.achievements = formatJsonField(body.achievements);
    }

    const upserted = await prisma.gamerProfile.upsert({
      where: { id },
      update: updateData,
      create: {
        id,
        gamerTag: body.gamerTag || `Gamer_${id.slice(-4)}`,
        realName: body.realName || "Ethiopian Competitor",
        ethoraId: body.ethoraId || `ET-${Date.now().toString().slice(-4)}`,
        avatar: body.avatar || "/images/avatars/avatar-viper.svg",
        banner: body.banner || "/images/ethora-stadium-banner.jpg",
        bio: body.bio || "",
        rankTier: body.rankTier || "Diamond",
        ratingPoints: Number(body.ratingPoints || 1200),
        regionId: body.location?.regionId || body.regionId || "reg-aa",
        regionName: body.location?.regionName || body.regionName || "Addis Ababa",
        zoneId: body.location?.zoneId || body.zoneId || "zone-aa-central",
        zoneName: body.location?.zoneName || body.zoneName || "Central Addis",
        woredaId: body.location?.woredaId || body.woredaId || "wor-bole",
        woredaName: body.location?.woredaName || body.woredaName || "Bole Sub-City",
        communityName: body.location?.communityName ?? body.communityName ?? "Bole Lounge",
        matchesPlayed: Number(body.stats?.matchesPlayed || 0),
        matchesWon: Number(body.stats?.matchesWon || 0),
        winRate: Number(body.stats?.winRate || 0),
        verified: body.verified !== undefined ? Boolean(body.verified) : true,
        connectedGames: formatJsonField(body.connectedGames || []) || "[]",
        matchHistory: formatJsonField(body.matchHistory || []) || "[]",
        achievements: formatJsonField(body.achievements || []) || "[]",
      },
    });

    return NextResponse.json({ success: true, gamer: upserted });
  } catch (error) {
    console.error("Failed to upsert gamer in SQLite:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
