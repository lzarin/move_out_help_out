import Link from "next/link";
import { Truck, Calendar, ClipboardList, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";

export default async function CoordinatorDashboardPage() {
  const [pendingPickups, upcomingWindows, totalItems] = await Promise.all([
    prisma.logisticsAssignment.count({
      where: { status: "SCHEDULED" },
    }),
    prisma.pickupWindow.count({
      where: { status: "SCHEDULED" },
    }),
    prisma.inventoryItem.count({ where: { status: "LISTED" } }),
  ]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/coordinator/logistics"
          className="card flex items-center justify-between transition hover:border-teal-300 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-teal-100 p-3 text-teal-600">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-teal-900">Logistics</p>
              <p className="text-2xl font-semibold text-teal-700">{pendingPickups} assigned</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-teal-400" />
        </Link>
        <Link
          href="/dashboard/coordinator/schedule"
          className="card flex items-center justify-between transition hover:border-coral-200 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-coral-100 p-3 text-coral-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-teal-900">Pickup windows</p>
              <p className="text-2xl font-semibold text-teal-700">{upcomingWindows}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-teal-400" />
        </Link>
        <Link
          href="/dashboard/coordinator/inventory"
          className="card flex items-center justify-between transition hover:border-teal-300 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-teal-100 p-3 text-teal-600">
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-teal-900">Listed items</p>
              <p className="text-2xl font-semibold text-teal-700">{totalItems}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-teal-400" />
        </Link>
      </div>

      <div className="card">
        <h2 className="font-semibold text-teal-900">Your role</h2>
        <p className="mt-2 text-sm text-teal-600">
          Match donors’ pickup windows with nonprofits, update assignment status, and
          keep inventory and schedules in sync so donations reach families smoothly.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard/coordinator/logistics" className="btn-primary">
            Manage logistics
          </Link>
          <Link href="/dashboard/coordinator/schedule" className="btn-secondary">
            View schedule
          </Link>
        </div>
      </div>
    </div>
  );
}
