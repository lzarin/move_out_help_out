import Link from "next/link";
import { Package, Calendar, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";

export default async function DonorDashboardPage() {
  const itemCount = await prisma.inventoryItem.count();
  const pickupCount = await prisma.pickupWindow.count();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/donor/inventory"
          className="card flex items-center justify-between transition hover:border-brand-300 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-brand-100 p-3 text-brand-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-stone-900">Inventory</p>
              <p className="text-2xl font-semibold text-stone-700">{itemCount} items</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-stone-400" />
        </Link>
        <Link
          href="/dashboard/donor/schedule"
          className="card flex items-center justify-between transition hover:border-brand-300 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-warm-100 p-3 text-warm-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-stone-900">Pickup schedule</p>
              <p className="text-2xl font-semibold text-stone-700">{pickupCount} windows</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-stone-400" />
        </Link>
      </div>

      <div className="card">
        <h2 className="font-semibold text-stone-900">Quick start</h2>
        <p className="mt-2 text-sm text-stone-600">
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
