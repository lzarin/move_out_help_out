import Link from "next/link";
import { Package, Calendar, ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AreaSetting } from "@/components/area-setting";
import { AREAS, type Area } from "@/types";

export default async function DonorDashboardPage() {
  const session = await getServerSession(authOptions);
  const orgId = session?.user?.organizationId ?? null;

  const [org, itemCount, pickupCount] = await Promise.all([
    orgId ? prisma.organization.findUnique({ where: { id: orgId }, select: { area: true } }) : null,
    orgId ? prisma.inventoryItem.count({ where: { donorId: orgId } }) : 0,
    orgId ? prisma.pickupWindow.count({ where: { donorId: orgId } }) : 0,
  ]);

  const area = org?.area && AREAS.includes(org.area as Area) ? (org.area as Area) : null;

  return (
    <div className="space-y-8">
      <AreaSetting initialArea={area} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/donor/inventory"
          className="card flex items-center justify-between transition hover:border-teal-300 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-teal-100 p-3 text-teal-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-teal-900">Inventory</p>
              <p className="text-2xl font-semibold text-teal-700">{itemCount} items</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-teal-400" />
        </Link>
        <Link
          href="/dashboard/donor/schedule"
          className="card flex items-center justify-between transition hover:border-teal-300 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-coral-100 p-3 text-coral-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-teal-900">Pickup schedule</p>
              <p className="text-2xl font-semibold text-teal-700">{pickupCount} windows</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-teal-400" />
        </Link>
      </div>

      <div className="card">
        <h2 className="font-semibold text-teal-900">Quick start</h2>
        <p className="mt-2 text-sm text-teal-600">
          Add items you’re leaving behind at move-out. Then create a pickup window so
          nonprofits can schedule a time to collect them. Your donations go straight
          to families in crisis.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/dashboard/donor/inventory?add=1" className="btn-primary">
            Add items
          </Link>
          <Link href="/dashboard/donor/schedule?new=1" className="btn-secondary">
            Create pickup window
          </Link>
        </div>
      </div>
    </div>
  );
}
