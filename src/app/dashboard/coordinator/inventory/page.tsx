import { prisma } from "@/lib/db";
import { InventoryList } from "@/components/inventory-list";

export default async function CoordinatorInventoryPage() {
  const items = await prisma.inventoryItem.findMany({
    include: { donor: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-teal-900">All inventory</h2>
      {items.length === 0 ? (
        <div className="card text-center text-teal-600">
          <p>No inventory listed yet.</p>
        </div>
      ) : (
        <InventoryList items={items} showDonor />
      )}
    </div>
  );
}
