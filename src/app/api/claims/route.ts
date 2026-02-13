import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  itemId: z.string().cuid(),
  quantity: z.number().int().min(1).max(1000),
  notes: z.string().max(500).optional(),
});

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (session.user.role !== "NONPROFIT" || !session.user.organizationId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const claims = await prisma.claim.findMany({
    where: { nonprofitId: session.user.organizationId },
    include: { item: true, nonprofit: { select: { name: true } } },
    orderBy: { requestedAt: "desc" },
  });
  return NextResponse.json(claims);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "NONPROFIT") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const nonprofitId = session.user.organizationId;
  if (!nonprofitId) {
    return NextResponse.json({ error: "No organization linked." }, { status: 400 });
  }

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  const item = await prisma.inventoryItem.findUnique({
    where: { id: parsed.data.itemId },
  });
  if (!item || item.status !== "LISTED") {
    return NextResponse.json({ error: "Item not available" }, { status: 400 });
  }
  if (parsed.data.quantity > item.quantity) {
    return NextResponse.json({ error: "Quantity exceeds available" }, { status: 400 });
  }

  const claim = await prisma.claim.upsert({
    where: {
      nonprofitId_itemId: { nonprofitId, itemId: parsed.data.itemId },
    },
    update: { quantity: parsed.data.quantity, notes: parsed.data.notes ?? undefined },
    create: {
      nonprofitId,
      itemId: parsed.data.itemId,
      quantity: parsed.data.quantity,
      notes: parsed.data.notes,
    },
    include: { item: true },
  });

  await prisma.inventoryItem.update({
    where: { id: parsed.data.itemId },
    data: { status: "CLAIMED" },
  });

  return NextResponse.json(claim);
}
