import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const assignSchema = z.object({
  pickupWindowId: z.string().cuid(),
  nonprofitId: z.string().cuid(),
  driverNotes: z.string().max(500).optional(),
});

const statusSchema = z.object({
  assignmentId: z.string().cuid(),
  status: z.enum(["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
});

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "COORDINATOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const assignments = await prisma.logisticsAssignment.findMany({
    include: {
      donor: { select: { name: true, address: true } },
      nonprofit: { select: { name: true, contactEmail: true } },
      pickupWindow: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(assignments);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "COORDINATOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const action = body.action as string;

  if (action === "assign") {
    const parsed = assignSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(parsed.error.flatten(), { status: 400 });
    }
    const existing = await prisma.logisticsAssignment.findUnique({
      where: { pickupWindowId: parsed.data.pickupWindowId },
    });
    if (existing) {
      return NextResponse.json(
        { error: "This pickup window is already assigned" },
        { status: 400 }
      );
    }
    const assignment = await prisma.logisticsAssignment.create({
      data: {
        pickupWindowId: parsed.data.pickupWindowId,
        nonprofitId: parsed.data.nonprofitId,
        donorId: (await prisma.pickupWindow.findUnique({
          where: { id: parsed.data.pickupWindowId },
        }))!.donorId,
        driverNotes: parsed.data.driverNotes,
      },
      include: {
        donor: { select: { name: true } },
        nonprofit: { select: { name: true } },
        pickupWindow: true,
      },
    });
    return NextResponse.json(assignment);
  }

  if (action === "status") {
    const parsed = statusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(parsed.error.flatten(), { status: 400 });
    }
    const assignment = await prisma.logisticsAssignment.update({
      where: { id: parsed.data.assignmentId },
      data: {
        status: parsed.data.status as "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED",
        ...(parsed.data.status === "COMPLETED" ? { completedAt: new Date() } : {}),
      },
      include: {
        donor: { select: { name: true } },
        nonprofit: { select: { name: true } },
        pickupWindow: true,
      },
    });
    return NextResponse.json(assignment);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
