import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { PickupScheduleList } from "@/components/pickup-schedule-list";
import { CreatePickupForm } from "@/components/create-pickup-form";

export default async function DonorSchedulePage() {
  const session = await getServerSession(authOptions);
  const donorId = session?.user?.organizationId ?? null;
  const windows = donorId
    ? await prisma.pickupWindow.findMany({
        where: { donorId },
        include: { assignment: { include: { nonprofit: { select: { name: true } } } } },
        orderBy: { startsAt: "asc" },
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-teal-900">Pickup windows</h2>
        <CreatePickupForm donorId={donorId} />
      </div>
      {windows.length === 0 ? (
        <div className="card text-center text-teal-600">
          <p>No pickup windows yet.</p>
          <p className="mt-1 text-sm">
            {donorId
              ? "Create a time window when nonprofits can collect donated items."
              : "Link your account to an organization to create pickups (or run db:seed for demo)."}
          </p>
        </div>
      ) : (
        <PickupScheduleList windows={windows} />
      )}
    </div>
  );
}
