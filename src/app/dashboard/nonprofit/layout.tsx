import { requireRole } from "@/lib/auth-utils";
import { DashboardHeader } from "@/components/dashboard-header";

export default async function NonprofitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["NONPROFIT"]);
  return (
    <>
      <DashboardHeader
        title="Nonprofit dashboard"
        description="Browse available items and manage your claims and pickups"
      />
      <div className="p-4 lg:p-6">{children}</div>
    </>
  );
}
