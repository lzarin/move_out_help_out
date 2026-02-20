"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { AreaSelector, getAreaFromCookie } from "@/components/area-selector";
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

export function HeroWithArea() {
  const { data: session, status } = useSession();
  const [area, setArea] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setArea(getAreaFromCookie());
    setMounted(true);
  }, []);

  if (status === "loading" || !mounted) {
    return (
      <div className="mt-10 h-14 w-48 animate-pulse rounded-xl bg-teal-200/50 mx-auto" />
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

  const loginHref = area ? `/login?area=${encodeURIComponent(area)}` : "/login";

  return (
    <>
      <div className="mt-8 mx-auto max-w-sm">
        <AreaSelector
          value={area}
          onChange={setArea}
          label="Choose your area"
        />
      </div>
      <div className="mt-8">
        <Link
          href={loginHref}
          className="inline-block rounded-xl bg-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-900/25 transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Get started
        </Link>
      </div>
    </>
  );
}
