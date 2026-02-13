import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  notes: z.string().max(500).optional(),
});

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const donorId = searchParams.get("donorId");
  const status = searchParams.get("status");

  const where: Record<string, unknown> = {};
  if (session.user.role === "DONOR" && session.user.organizationId) {
    where.donorId = session.user.organizationId;
  } else if (donorId) where.donorId = donorId;
  if (status) where.status = status;

  const windows = await prisma.pickupWindow.findMany({
    where,
    include: {
      donor: { select: { name: true, slug: true, address: true } },
      assignment: { include: { nonprofit: { select: { name: true } } } },
    },
    orderBy: { startsAt: "asc" },
  });
  return NextResponse.json(windows);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "DONOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const donorId = session.user.organizationId;
  if (!donorId) {
    return NextResponse.json(
      { error: "No organization linked." },
      { status: 400 }
    );
  }

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  const window = await prisma.pickupWindow.create({
    data: {
      donorId,
      startsAt: new Date(parsed.data.startsAt),
      endsAt: new Date(parsed.data.endsAt),
      notes: parsed.data.notes,
    },
    include: { donor: { select: { name: true } } },
  });
  return NextResponse.json(window);
}
