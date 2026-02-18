import Link from "next/link";
import { Package, Heart, Truck, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";

export default async function NonprofitDashboardPage() {
  const availableCount = await prisma.inventoryItem.count({
    where: { status: "LISTED" },
  });
  const claimsCount = await prisma.claim.count();
  const pickupsCount = await prisma.logisticsAssignment.count({
    where: { status: { in: ["SCHEDULED", "IN_PROGRESS"] } },
  });

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/dashboard/nonprofit/available"
          className="card flex items-center justify-between transition hover:border-teal-300 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-teal-100 p-3 text-teal-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-teal-900">Available items</p>
              <p className="text-2xl font-semibold text-teal-700">{availableCount}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-teal-400" />
        </Link>
        <Link
          href="/dashboard/nonprofit/claims"
          className="card flex items-center justify-between transition hover:border-coral-200 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-coral-100 p-3 text-coral-600">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-teal-900">My claims</p>
              <p className="text-2xl font-semibold text-teal-700">{claimsCount}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-teal-400" />
        </Link>
        <Link
          href="/dashboard/nonprofit/pickups"
          className="card flex items-center justify-between transition hover:border-teal-300 hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-teal-100 p-3 text-teal-600">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium text-teal-900">Pickups</p>
              <p className="text-2xl font-semibold text-teal-700">{pickupsCount}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-teal-400" />
        </Link>
      </div>

      <div className="card">
        <h2 className="font-semibold text-teal-900">How it works</h2>
        <p className="mt-2 text-sm text-teal-600">
          Browse items donated by campuses and students. Claim what your clients need,
          then coordinate pickups once a volunteer has assigned you to a donor’s
          pickup window.
        </p>
        <Link href="/dashboard/nonprofit/available" className="mt-4 inline-block btn-primary">
          Browse available items
        </Link>
      </div>
    </div>
  );
}
