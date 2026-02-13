import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    const login = new URL("/login", request.url);
    login.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login);
  }

  const role = token.role as string;
  const segment = pathname.split("/")[2];
  const allowed: Record<string, string[]> = {
    donor: ["DONOR"],
    nonprofit: ["NONPROFIT"],
    coordinator: ["COORDINATOR"],
  };
  if (segment && allowed[segment] && !allowed[segment].includes(role)) {
    const redirect =
      role === "DONOR"
        ? "/dashboard/donor"
        : role === "NONPROFIT"
          ? "/dashboard/nonprofit"
          : "/dashboard/coordinator";
    return NextResponse.redirect(new URL(redirect, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
