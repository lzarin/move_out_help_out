import { prisma } from "@/lib/db";
import { InventoryList } from "@/components/inventory-list";
import { ClaimButton } from "@/components/claim-button";

export default async function NonprofitAvailablePage() {
  const items = await prisma.inventoryItem.findMany({
    where: { status: "LISTED" },
    include: { donor: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-teal-900">Available to claim</h2>
      {items.length === 0 ? (
        <div className="card text-center text-teal-600">
          <p>No listed items right now.</p>
          <p className="mt-1 text-sm">Check back during move-out season.</p>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id} className="card">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-teal-100 p-2 text-teal-600">
                  <span className="text-lg font-semibold text-teal-600">
                    {item.category.slice(0, 1)}
                  </span>
                </div>
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
          ))}
        </ul>
      )}
    </div>
  );
}
