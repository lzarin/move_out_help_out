import { Package } from "lucide-react";

type Item = {
  id: string;
  title: string;
  category: string;
  quantity: number;
  unit: string;
  status: string;
  donor?: { name: string } | null;
};

export function InventoryList({
  items,
  showDonor = true,
}: {
  items: Item[];
  showDonor?: boolean;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="card">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-stone-100 p-2 text-stone-600">
              <Package className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-stone-900">{item.title}</p>
              <p className="text-sm text-stone-500">
                {item.category} · {item.quantity} {item.unit}
                {item.quantity !== 1 && !item.unit?.endsWith("s") ? "s" : ""}
              </p>
              {showDonor && item.donor && (
                <p className="mt-1 text-xs text-stone-500">From {item.donor.name}</p>
              )}
              <span
                className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                  item.status === "LISTED"
                    ? "bg-brand-100 text-brand-800"
                    : item.status === "CLAIMED"
                      ? "bg-warm-100 text-warm-800"
                      : "bg-stone-100 text-stone-600"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
