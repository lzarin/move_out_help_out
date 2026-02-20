import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { AREAS } from "@/types";

const updateSchema = z.object({
  area: z.enum(AREAS).nullable(),
});

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.organizationId) {
    return NextResponse.json({ error: "No organization" }, { status: 400 });
  }

  const body = await request.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(parsed.error.flatten(), { status: 400 });
  }

  await prisma.organization.update({
    where: { id: session.user.organizationId },
    data: { area: parsed.data.area ?? null },
  });
  return NextResponse.json({ ok: true });
}
