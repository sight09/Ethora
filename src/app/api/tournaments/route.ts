import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/tournaments - Fetch all tournaments from SQLite
export async function GET() {
  try {
    const tournaments = await prisma.tournament.findMany({
      include: {
        registrations: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const parsed = tournaments.map((t) => ({
      ...t,
      registrations: t.registrations || [],
      rules: JSON.parse(t.rules || "[]"),
      schedule: JSON.parse(t.schedule || "[]"),
      brackets: JSON.parse(t.brackets || "[]"),
      organizer: {
        tag: t.organizerTag,
        name: t.organizerName,
        logo: t.organizerLogo,
        verified: t.organizerVerified,
      },
      location: {
        regionName: t.regionName,
        venueName: t.venueName,
        address: t.address,
      },
      dates: {
        registrationDeadline: t.registrationDeadline,
        startsAt: t.startsAt,
        endsAt: t.endsAt,
      },
    }));

    return NextResponse.json({ success: true, tournaments: parsed });
  } catch (error) {
    console.error("Failed to fetch tournaments from SQLite:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

// POST /api/tournaments - Create a new tournament in SQLite
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = body.id || `tournament-${Date.now()}`;
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const created = await prisma.tournament.create({
      data: {
        id,
        slug,
        title: body.title,
        description: body.description || "",
        gameId: body.gameId,
        gameName: body.gameName,
        bannerUrl: body.bannerUrl || "/images/ethora-stadium-banner.jpg",
        organizerTag: body.organizer?.tag || "LCE",
        organizerName: body.organizer?.name || "Lion City Esports",
        organizerLogo: body.organizer?.logo || "/images/avatars/avatar-lion.svg",
        organizerVerified: body.organizer?.verified ?? true,
        prizePoolETB: Number(body.prizePoolETB || 0),
        prizePoolUSD: Number(body.prizePoolUSD || 0),
        format: body.format || "Double Elimination",
        status: body.status || "registration_open",
        registrationDeadline: body.dates?.registrationDeadline || body.registrationDeadline,
        startsAt: body.dates?.startsAt || body.startsAt,
        endsAt: body.dates?.endsAt || body.endsAt,
        venueType: body.venueType || "LAN / Arena",
        regionName: body.location?.regionName || body.regionName || "Addis Ababa",
        venueName: body.location?.venueName || body.venueName || "Millennium Hall Arena",
        address: body.location?.address || body.address || "Addis Ababa",
        entryFeeETB: Number(body.entryFeeETB || 0),
        maxParticipants: Number(body.maxParticipants || 16),
        registeredCount: 0,
        rules: JSON.stringify(body.rules || []),
        schedule: JSON.stringify(body.schedule || []),
        brackets: JSON.stringify(body.brackets || []),
      },
    });

    return NextResponse.json({ success: true, tournament: created });
  } catch (error) {
    console.error("Failed to create tournament in SQLite:", error);
    return NextResponse.json({ success: false, error: "Database create failed" }, { status: 500 });
  }
}
