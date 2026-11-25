import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/tournaments/[id]/brackets - Fetch live tournament bracket matches
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tournament = await prisma.tournament.findUnique({
      where: { id: params.id },
      select: { id: true, brackets: true },
    });

    if (!tournament) {
      return NextResponse.json(
        { success: false, error: "Tournament not found" },
        { status: 404 }
      );
    }

    const brackets = JSON.parse(tournament.brackets || "[]");
    return NextResponse.json({ success: true, brackets });
  } catch (error) {
    console.error("Failed to fetch tournament brackets:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}

// PATCH /api/tournaments/[id]/brackets - Update tournament bracket tree and scores
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tournamentId = params.id;
    const body = await req.json();

    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
    });

    if (!tournament) {
      return NextResponse.json(
        { success: false, error: "Tournament not found" },
        { status: 404 }
      );
    }

    let finalBrackets = [];

    // Option A: Full bracket array provided directly
    if (Array.isArray(body.brackets)) {
      finalBrackets = body.brackets;
    }
    // Option B: Single match score update payload { matchId, score1, score2, winnerParticipantId }
    else if (body.matchId) {
      interface MatchParticipant {
        id: string;
        name?: string;
        score?: number;
        isWinner?: boolean;
        avatar?: string;
      }
      interface BracketItem {
        id: string;
        status?: string;
        participant1?: MatchParticipant;
        participant2?: MatchParticipant;
        [key: string]: unknown;
      }

      const currentBrackets: BracketItem[] = JSON.parse(tournament.brackets || "[]");
      finalBrackets = currentBrackets.map((m) => {
        if (m.id === body.matchId) {
          const p1Won = m.participant1?.id === body.winnerParticipantId;
          const p2Won = m.participant2?.id === body.winnerParticipantId;
          return {
            ...m,
            status: "completed",
            participant1: {
              ...m.participant1,
              score: Number(body.score1 ?? m.participant1?.score ?? 0),
              isWinner: p1Won,
            },
            participant2: {
              ...m.participant2,
              score: Number(body.score2 ?? m.participant2?.score ?? 0),
              isWinner: p2Won,
            },
          };
        }
        return m;
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Missing brackets or matchId in payload" },
        { status: 400 }
      );
    }

    const updated = await prisma.tournament.update({
      where: { id: tournamentId },
      data: {
        brackets: JSON.stringify(finalBrackets),
      },
    });

    return NextResponse.json({
      success: true,
      tournamentId: updated.id,
      brackets: finalBrackets,
    });
  } catch (error) {
    console.error("Failed to update tournament brackets:", error);
    return NextResponse.json(
      { success: false, error: "Database update failed" },
      { status: 500 }
    );
  }
}
