import { format } from "date-fns";
import { Calendar, Truck } from "lucide-react";

type Window = {
  id: string;
  startsAt: Date;
  endsAt: Date;
  status: string;
  notes: string | null;
  assignment?: { nonprofit: { name: string } } | null;
};

export function PickupScheduleList({ windows }: { windows: Window[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {windows.map((w) => (
        <li key={w.id} className="card">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-coral-100 p-2 text-coral-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-teal-900">
                {format(new Date(w.startsAt), "EEE, MMM d, yyyy")}
              </p>
              <p className="text-sm text-teal-600">
                {format(new Date(w.startsAt), "h:mm a")} –{" "}
                {format(new Date(w.endsAt), "h:mm a")}
              </p>
              {w.assignment && (
                <p className="mt-2 flex items-center gap-1 text-sm text-teal-600">
                  <Truck className="h-4 w-4" />
                  Assigned to {w.assignment.nonprofit.name}
                </p>
              )}
              {w.notes && (
                <p className="mt-1 text-xs text-teal-600">{w.notes}</p>
              )}
              <span
                className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                  w.status === "SCHEDULED"
                    ? "bg-teal-100 text-teal-800"
                    : w.status === "COMPLETED"
                      ? "bg-teal-100 text-teal-600"
                      : "bg-coral-100 text-coral-800"
                }`}
              >
                {w.status.replace("_", " ")}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
