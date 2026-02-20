import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ClaimButton } from "@/components/claim-button";
import { InventoryCategoryIcon } from "@/components/inventory-category-icon";

export default async function NonprofitAvailablePage() {
  const session = await getServerSession(authOptions);
  const orgId = session?.user?.organizationId ?? null;

  const org = orgId
    ? await prisma.organization.findUnique({
        where: { id: orgId },
        select: { area: true, name: true },
      })
    : null;

  const areaFilter = org?.area ? { donor: { area: org.area } } : {};

  const items = await prisma.inventoryItem.findMany({
    where: {
      status: "LISTED",
      ...areaFilter,
    },
    include: { donor: { select: { name: true, area: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-teal-900">Available to claim</h2>
        {org?.area && (
          <p className="text-sm font-medium text-teal-600">In your area: {org.area}</p>
        )}
      </div>
      {items.length === 0 ? (
        <div className="card text-center text-teal-600">
          <p>No listed items in your area right now.</p>
          <p className="mt-1 text-sm">
            {org?.area
              ? `Donors in ${org.area} haven't listed anything yet. Check back during move-out season.`
              : "Set your area on the dashboard to see items in your region."}
          </p>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const raw = item.imageUrls;
            const imageUrls = typeof raw === "string"
              ? (() => { try { const a = JSON.parse(raw); return Array.isArray(a) ? a : []; } catch { return []; } })()
              : Array.isArray(raw) ? raw : [];
            const firstImage = imageUrls.length ? imageUrls[0] : null;
            return (
            <li key={item.id} className="card">
              <div className="flex items-start gap-3">
                {firstImage ? (
                  <img
                    src={firstImage}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-lg object-cover border border-teal-200"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                    <InventoryCategoryIcon category={item.category} className="h-7 w-7" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-teal-900">{item.title}</p>
                  <p className="text-sm text-teal-600">
                    {item.category} · {item.quantity} {item.unit}
                  </p>
                  {item.donor && (
                    <p className="mt-1 text-xs text-teal-600">From {item.donor.name}</p>
                  )}
                  <ClaimButton itemId={item.id} maxQuantity={item.quantity} />
                </div>
              </div>
            </li>
          );
          })}
        </ul>
      )}
    </div>
  );
}
