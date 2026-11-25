import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/teams - List all competitive teams from SQLite
export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const parsed = teams.map((tm) => ({
      ...tm,
      gameId: tm.gameId || "game-valorant",
      gameName: tm.gameName || "Valorant",
      region: tm.regionName || "Addis Ababa",
      captain: {
        id: tm.captainId,
        tag: tm.captainTag,
        avatar: "/images/avatars/avatar-lion.svg",
      },
      members: JSON.parse(tm.members || "[]"),
      stats: JSON.parse(tm.stats || "{}"),
    }));

    return NextResponse.json({ success: true, teams: parsed });
  } catch (error) {
    console.error("Failed to fetch teams from SQLite:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}

// POST /api/teams - Create a new team in SQLite
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = body.id || `team-${Date.now()}`;
    const cleanTag = (body.tag || body.name.slice(0, 4)).toUpperCase().replace(/[^A-Z0-9]/g, "");

    const created = await prisma.team.create({
      data: {
        id,
        name: body.name,
        tag: cleanTag,
        logo: body.logo || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=150&auto=format&fit=crop",
        banner: body.banner || "/images/ethora-stadium-banner.jpg",
        gameId: body.gameId || "game-valorant",
        gameName: body.gameName || "Valorant",
        captainId: body.captain?.id || body.captainId || "gamer-viper",
        captainTag: body.captain?.tag || body.captainTag || "ViperX",
        regionId: body.regionId || "reg-aa",
        regionName: body.region || body.regionName || "Addis Ababa",
        members: typeof body.members === "string" ? body.members : JSON.stringify(body.members || [
          {
            id: body.captain?.id || "gamer-viper",
            tag: body.captain?.tag || "ViperX",
            role: "Captain / IGL",
          },
        ]),
        stats: typeof body.stats === "string" ? body.stats : JSON.stringify(body.stats || {
          tournamentsWon: 0,
          matchesPlayed: 0,
          matchesWon: 0,
          winRate: 0,
        }),
        verified: true,
      },
    });

    return NextResponse.json({ success: true, team: created });
  } catch (error) {
    console.error("Failed to create team in SQLite:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create team in database" },
      { status: 500 }
    );
  }
}
