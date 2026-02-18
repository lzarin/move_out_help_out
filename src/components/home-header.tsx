"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Package } from "lucide-react";
import type { Role } from "@/types";

function dashboardPath(role: Role): string {
  switch (role) {
    case "DONOR":
      return "/dashboard/donor";
    case "NONPROFIT":
      return "/dashboard/nonprofit";
    case "COORDINATOR":
      return "/dashboard/coordinator";
    default:
      return "/dashboard/donor";
  }
}

export function HomeHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-teal-200/70 bg-white/90 backdrop-blur-md shadow-sm shadow-teal-950/5">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-teal-900 text-lg">
          <span className="rounded-xl bg-teal-600 p-2 text-white shadow-md shadow-teal-900/20">
            <Package className="h-5 w-5" />
          </span>
          Move Out Help Out
        </Link>
        <nav className="flex items-center gap-4">
          {status === "loading" ? (
            <span className="text-sm text-teal-600">Loading…</span>
          ) : session?.user ? (
            <>
              <Link
                href={dashboardPath(session.user.role as Role)}
                className="text-sm font-semibold text-teal-700 hover:text-teal-900 transition"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="btn-secondary text-base px-5"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-teal-700 hover:text-teal-900 transition"
              >
                Sign in
              </Link>
              <Link href="/login" className="btn-primary text-base px-5">
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
