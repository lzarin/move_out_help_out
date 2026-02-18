import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { InventoryList } from "@/components/inventory-list";
import { AddInventoryForm } from "@/components/add-inventory-form";

export default async function DonorInventoryPage() {
  const session = await getServerSession(authOptions);
  const donorId = session?.user?.organizationId ?? null;
  const items = donorId
    ? await prisma.inventoryItem.findMany({
        where: { donorId },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-teal-900">Your inventory</h2>
        <AddInventoryForm donorId={donorId} />
      </div>
      {items.length === 0 ? (
        <div className="card text-center text-teal-600">
          <p>No items listed yet.</p>
          <p className="mt-1 text-sm">
            {donorId
              ? "Add items you’re leaving behind so nonprofits can claim them."
              : "Link your account to an organization to add inventory (or run db:seed for demo)."}
          </p>
        </div>
      ) : (
        <InventoryList items={items} showDonor={false} />
      )}
    </div>
  );
}
