import { prisma } from "@/lib/db";
import { LogisticsPanel } from "@/components/logistics-panel";

export default async function CoordinatorLogisticsPage() {
  const [assignments, windows, nonprofits] = await Promise.all([
    prisma.logisticsAssignment.findMany({
      include: {
        donor: { select: { name: true, address: true } },
        nonprofit: { select: { name: true, id: true } },
        pickupWindow: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.pickupWindow.findMany({
      where: { status: "SCHEDULED" },
      include: { donor: { select: { name: true } }, assignment: true },
      orderBy: { startsAt: "asc" },
    }),
    prisma.organization.findMany({
      where: { type: "NONPROFIT" },
      select: { id: true, name: true },
    }),
  ]);

  const unassignedWindows = windows.filter((w) => !w.assignment);

  return (
    <div className="space-y-8">
      <LogisticsPanel
        assignments={assignments}
        unassignedWindows={unassignedWindows}
        nonprofits={nonprofits}
      />
    </div>
  );
}
