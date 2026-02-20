import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

const nextAuth = NextAuth(authOptions);

async function handler(
  req: Request,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  if (!process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET.length < 16) {
    console.error("[next-auth] NEXTAUTH_SECRET is missing or too short. Set a 32+ character secret in .env");
    return NextResponse.json(
      { error: "Server misconfiguration: NEXTAUTH_SECRET required" },
      { status: 500 }
    );
  }
  try {
    // Next.js 15: params is a Promise; resolve so NextAuth receives a plain context
    const params = await context.params;
    return await nextAuth(req, { params });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Authentication error";
    const isDev = process.env.NODE_ENV === "development";
    console.error("[next-auth] Error:", e);
    return NextResponse.json(
      { error: isDev ? message : "Authentication error" },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST };
