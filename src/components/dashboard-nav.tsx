"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Package,
  Calendar,
  LayoutDashboard,
  Heart,
  Truck,
  ClipboardList,
  LogOut,
} from "lucide-react";
import type { Role } from "@/types";
import { clsx } from "clsx";

const DONOR_LINKS = [
  { href: "/dashboard/donor", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/donor/inventory", label: "Inventory", icon: Package },
  { href: "/dashboard/donor/schedule", label: "Pickup schedule", icon: Calendar },
];

const NONPROFIT_LINKS = [
  { href: "/dashboard/nonprofit", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/nonprofit/available", label: "Available items", icon: Package },
  { href: "/dashboard/nonprofit/claims", label: "My claims", icon: Heart },
  { href: "/dashboard/nonprofit/pickups", label: "Pickups", icon: Truck },
];

const COORDINATOR_LINKS = [
  { href: "/dashboard/coordinator", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/coordinator/logistics", label: "Logistics", icon: Truck },
  { href: "/dashboard/coordinator/schedule", label: "Schedule", icon: Calendar },
  { href: "/dashboard/coordinator/inventory", label: "Inventory", icon: ClipboardList },
];

function navForRole(role: Role) {
  switch (role) {
    case "DONOR":
      return DONOR_LINKS;
    case "NONPROFIT":
      return NONPROFIT_LINKS;
    case "COORDINATOR":
      return COORDINATOR_LINKS;
    default:
      return DONOR_LINKS;
  }
}

export function DashboardNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const links = navForRole(role);

  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={clsx(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
            pathname === href
              ? "bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-200"
              : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
          )}
        >
          <Icon className="h-5 w-5 shrink-0" />
          {label}
        </Link>
      ))}
      <div className="my-2 border-t border-stone-200 dark:border-stone-700" />
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200"
      >
        <LogOut className="h-5 w-5 shrink-0" />
        Sign out
      </button>
    </nav>
  );
}
