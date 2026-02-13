import { requireRole } from "@/lib/auth-utils";
import { DashboardHeader } from "@/components/dashboard-header";

export default async function DonorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["DONOR"]);
  return (
    <>
      <DashboardHeader
        title="Donor dashboard"
        description="Manage your surplus inventory and pickup schedule"
      />
      <div className="p-4 lg:p-6">{children}</div>
    </>
  );
}
