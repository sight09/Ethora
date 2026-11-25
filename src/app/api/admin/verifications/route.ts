import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/verifications - Fetch all athlete verification queue items
export async function GET() {
  try {
    const queue = await prisma.verificationRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, queue });
  } catch (error) {
    console.error("Failed to fetch verification queue:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/verifications - Approve or reject an athlete verification request
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid verification id or status" },
        { status: 400 }
      );
    }

    const verification = await prisma.verificationRequest.update({
      where: { id },
      data: {
        status,
        reviewedAt: new Date(),
        reviewedBy: "ETHORA Root Admin",
      },
    });

    // If approved, automatically mark the athlete as verified in their GamerProfile
    if (status === "approved") {
      try {
        await prisma.gamerProfile.updateMany({
          where: {
            OR: [
              { gamerTag: verification.gamerTag },
              { realName: verification.realName },
            ],
          },
          data: {
            verified: true,
          },
        });
      } catch (err) {
        console.warn("Could not find matching GamerProfile to mark verified:", err);
      }
    }

    return NextResponse.json({ success: true, verification });
  } catch (error) {
    console.error("Failed to update verification request:", error);
    return NextResponse.json(
      { success: false, error: "Database update failed" },
      { status: 500 }
    );
  }
}
