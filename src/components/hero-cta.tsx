"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
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

export function HeroCta() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="mt-10 h-14 w-48 animate-pulse rounded-xl bg-teal-200/50" />
    );
  }

  if (session?.user) {
    return (
      <div className="mt-10">
        <Link
          href={dashboardPath(session.user.role as Role)}
          className="inline-block rounded-xl bg-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-900/25 transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Link
        href="/login"
        className="inline-block rounded-xl bg-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-900/25 transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        Get started
      </Link>
    </div>
  );
}
