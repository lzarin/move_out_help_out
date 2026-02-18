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
    return await nextAuth(req, context);
  } catch (e) {
    console.error("[next-auth] Error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Authentication error" },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST };
