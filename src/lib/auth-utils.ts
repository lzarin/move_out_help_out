import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import type { Role } from "@/types";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  return session;
}

export async function requireRole(allowedRoles: Role[]) {
  const session = await requireAuth();
  if (!allowedRoles.includes(session.user.role)) {
    redirect(dashboardPath(session.user.role));
  }
  return session;
}

export function dashboardPath(role: Role): string {
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
