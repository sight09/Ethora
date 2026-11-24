import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/tournaments/[id]/register - Record paid/free registration in SQLite
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tournamentId = params.id;
    const body = await req.json();

    const regId = body.id || `reg-${Date.now()}`;
    const isPaid = body.paymentStatus === "paid";

    const registration = await prisma.tournamentRegistration.create({
      data: {
        id: regId,
        tournamentId,
        gamerId: body.gamerId || "gamer-viper",
        gamerTag: body.gamerTag || "ViperX",
        realName: body.realName || "Yared Tadesse",
        avatar: body.avatar || "/images/avatars/avatar-viper.svg",
        ethoraId: body.ethoraId || "ET-VIPER01",
        inGameName: body.inGameName,
        rankTier: body.rankTier || "Diamond",
        location: body.location || "Addis Ababa",
        registeredAt: new Date().toISOString().split("T")[0],
        status: isPaid ? "approved" : "pending",
        checkInStatus: isPaid,
        paymentStatus: body.paymentStatus || "free",
        paymentMethod: body.paymentMethod || "Telebirr",
        transactionRef: body.transactionRef || `ET-TX-${Math.floor(100000 + Math.random() * 900000)}`,
        amountETB: Number(body.amountETB || 0),
        paidAt: isPaid ? new Date().toISOString() : null,
      },
    });

    // Increment registered count
    await prisma.tournament.update({
      where: { id: tournamentId },
      data: {
        registeredCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error("Failed to register in SQLite:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
