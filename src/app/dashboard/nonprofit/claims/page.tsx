import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { InventoryList } from "@/components/inventory-list";

export default async function NonprofitClaimsPage() {
  const session = await getServerSession(authOptions);
  const orgId = session?.user?.organizationId ?? null;
  const claims = orgId
    ? await prisma.claim.findMany({
        where: { nonprofitId: orgId },
        include: { item: { include: { donor: { select: { name: true } } } } },
        orderBy: { requestedAt: "desc" },
      })
    : [];

  const items = claims.map((c) => ({
    ...c.item,
    donor: c.item.donor,
    _claimQuantity: c.quantity,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-teal-900">My claims</h2>
      {claims.length === 0 ? (
        <div className="card text-center text-teal-600">
          <p>You haven’t claimed any items yet.</p>
          <p className="mt-1 text-sm">
            <a href="/dashboard/nonprofit/available" className="text-teal-600 underline">
              Browse available items
            </a>
          </p>
        </div>
      ) : (
        <InventoryList items={items} showDonor />
      )}
    </div>
  );
}
