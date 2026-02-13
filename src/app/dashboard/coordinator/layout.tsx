import { requireRole } from "@/lib/auth-utils";
import { DashboardHeader } from "@/components/dashboard-header";

export default async function CoordinatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["COORDINATOR"]);
  return (
    <>
      <DashboardHeader
        title="Coordinator dashboard"
        description="Manage logistics, schedules, and inventory across donors and nonprofits"
      />
      <div className="p-4 lg:p-6">{children}</div>
    </>
  );
}
