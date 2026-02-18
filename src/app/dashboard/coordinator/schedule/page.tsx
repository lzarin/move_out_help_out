import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { Calendar, Truck } from "lucide-react";

export default async function CoordinatorSchedulePage() {
  const windows = await prisma.pickupWindow.findMany({
    include: {
      donor: { select: { name: true, address: true } },
      assignment: { include: { nonprofit: { select: { name: true } } } },
    },
    orderBy: { startsAt: "asc" },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-teal-900">All pickup windows</h2>
      {windows.length === 0 ? (
        <div className="card text-center text-teal-600">
          <p>No pickup windows yet.</p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {windows.map((w) => (
            <li key={w.id} className="card">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-coral-100 p-2 text-coral-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-teal-900">{w.donor.name}</p>
                  <p className="text-sm text-teal-600">
                    {format(new Date(w.startsAt), "EEE, MMM d, yyyy")} ·{" "}
                    {format(new Date(w.startsAt), "h:mm a")} – {format(new Date(w.endsAt), "h:mm a")}
                  </p>
                  {w.donor.address && (
                    <p className="mt-1 text-xs text-teal-600">{w.donor.address}</p>
                  )}
                  {w.assignment ? (
                    <p className="mt-2 flex items-center gap-1 text-sm text-teal-700">
                      <Truck className="h-4 w-4" />
                      {w.assignment.nonprofit.name}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-teal-600">Unassigned</p>
                  )}
                  <span className="mt-2 inline-block rounded-full bg-teal-100 px-2 py-0.5 text-xs text-teal-600">
                    {w.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
