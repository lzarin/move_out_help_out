import { prisma } from "@/lib/db";
import { InventoryList } from "@/components/inventory-list";
import { AreaFilterLinks } from "@/components/area-filter-links";
import { AREAS } from "@/types";

type Props = { searchParams: Promise<{ area?: string }> };

export default async function CoordinatorInventoryPage({ searchParams }: Props) {
  const { area: areaParam } = await searchParams;
  const areaFilter =
    areaParam && AREAS.includes(areaParam as (typeof AREAS)[number])
      ? { donor: { area: areaParam } }
      : {};

  const items = await prisma.inventoryItem.findMany({
    where: areaFilter,
    include: { donor: { select: { name: true, area: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-teal-900">Inventory by area</h2>
        <AreaFilterLinks basePath="/dashboard/coordinator/inventory" />
      </div>
      {items.length === 0 ? (
        <div className="card text-center text-teal-600">
          <p>
            {areaParam
              ? `No inventory in ${areaParam} yet.`
              : "No inventory listed yet."}
          </p>
        </div>
      ) : (
        <InventoryList items={items} showDonor />
      )}
    </div>
  );
}
