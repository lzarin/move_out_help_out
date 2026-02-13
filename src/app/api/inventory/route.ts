import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { INVENTORY_CATEGORIES } from "@/types";

const createSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  category: z.enum(INVENTORY_CATEGORIES as unknown as [string, ...string[]]),
  quantity: z.number().int().min(1).max(1000),
  unit: z.string().max(20).optional(),
});

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const donorId = searchParams.get("donorId");
  const status = searchParams.get("status");
  const listedOnly = searchParams.get("listedOnly") === "true";

  const where: Record<string, unknown> = {};
  if (session.user.role === "DONOR" && session.user.organizationId) {
    where.donorId = session.user.organizationId;
  } else if (donorId) {
    where.donorId = donorId;
  }
  if (status) where.status = status;
  if (listedOnly) where.status = "LISTED";

  const items = await prisma.inventoryItem.findMany({
    where,
    include: { donor: { select: { name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "DONOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const donorId = session.user.organizationId;
  if (!donorId) {
    return NextResponse.json(
      { error: "No organization linked. Complete profile or contact support." },
      { status: 400 }
    );
  }

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  const item = await prisma.inventoryItem.create({
    data: {
      donorId,
      title: parsed.data.title,
      description: parsed.data.description,
      category: parsed.data.category,
      quantity: parsed.data.quantity,
      unit: parsed.data.unit ?? "item",
    },
    include: { donor: { select: { name: true } } },
  });
  return NextResponse.json(item);
}
