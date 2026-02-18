import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { Truck, MapPin } from "lucide-react";

export default async function NonprofitPickupsPage() {
  const session = await getServerSession(authOptions);
  const orgId = session?.user?.organizationId ?? null;
  const assignments = orgId
    ? await prisma.logisticsAssignment.findMany({
        where: { nonprofitId: orgId },
        include: {
          donor: { select: { name: true, address: true } },
          pickupWindow: true,
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-teal-900">Your pickups</h2>
      {assignments.length === 0 ? (
        <div className="card text-center text-teal-600">
          <p>No pickups assigned yet.</p>
          <p className="mt-1 text-sm">
            A coordinator will assign you to a donor’s pickup window once you’ve claimed items.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {assignments.map((a) => (
            <li key={a.id} className="card">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-teal-100 p-2 text-teal-600">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-teal-900">{a.donor.name}</p>
                  <p className="text-sm text-teal-600">
                    {format(new Date(a.pickupWindow.startsAt), "EEE, MMM d")} ·{" "}
                    {format(new Date(a.pickupWindow.startsAt), "h:mm a")} –{" "}
                    {format(new Date(a.pickupWindow.endsAt), "h:mm a")}
                  </p>
                  {a.donor.address && (
                    <p className="mt-2 flex items-center gap-1 text-sm text-teal-600">
                      <MapPin className="h-4 w-4 shrink-0" />
                      {a.donor.address}
                    </p>
                  )}
                  <span
                    className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      a.status === "SCHEDULED"
                        ? "bg-teal-100 text-teal-800"
                        : a.status === "COMPLETED"
                          ? "bg-teal-100 text-teal-600"
                          : "bg-coral-100 text-coral-800"
                    }`}
                  >
                    {a.status.replace("_", " ")}
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
