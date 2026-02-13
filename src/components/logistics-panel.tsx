"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Truck, Calendar } from "lucide-react";

type Assignment = {
  id: string;
  status: string;
  donor: { name: string; address: string | null };
  nonprofit: { name: string };
  pickupWindow: { startsAt: Date; endsAt: Date };
};

type Window = {
  id: string;
  startsAt: Date;
  endsAt: Date;
  donor: { name: string };
};

type Nonprofit = { id: string; name: string };

export function LogisticsPanel({
  assignments,
  unassignedWindows,
  nonprofits,
}: {
  assignments: Assignment[];
  unassignedWindows: Window[];
  nonprofits: Nonprofit[];
}) {
  const [assigning, setAssigning] = useState<string | null>(null);
  const [selectedNonprofit, setSelectedNonprofit] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAssign(pickupWindowId: string) {
    if (!selectedNonprofit) return;
    setLoading(true);
    try {
      const res = await fetch("/api/logistics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "assign",
          pickupWindowId,
          nonprofitId: selectedNonprofit,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setAssigning(null);
      setSelectedNonprofit("");
      window.location.reload();
    } catch {
      setLoading(false);
    }
  }

  async function handleStatus(assignmentId: string, status: string) {
    const res = await fetch("/api/logistics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "status", assignmentId, status }),
    });
    if (res.ok) window.location.reload();
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-stone-900">Assigned pickups</h2>
        {assignments.length === 0 ? (
          <p className="mt-2 text-sm text-stone-600">No assignments yet.</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {assignments.map((a) => (
              <li key={a.id} className="card">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-stone-900">{a.donor.name} → {a.nonprofit.name}</p>
                    <p className="text-sm text-stone-500">
                      {format(new Date(a.pickupWindow.startsAt), "EEE, MMM d, h:mm a")}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-800">
                      {a.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {a.status === "SCHEDULED" && (
                      <>
                        <button
                          onClick={() => handleStatus(a.id, "IN_PROGRESS")}
                          className="rounded-lg bg-warm-100 px-2 py-1 text-xs font-medium text-warm-800 hover:bg-warm-200"
                        >
                          In progress
                        </button>
                        <button
                          onClick={() => handleStatus(a.id, "CANCELLED")}
                          className="rounded-lg bg-stone-100 px-2 py-1 text-xs text-stone-600 hover:bg-stone-200"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {a.status === "IN_PROGRESS" && (
                      <button
                        onClick={() => handleStatus(a.id, "COMPLETED")}
                        className="rounded-lg bg-brand-600 px-2 py-1 text-xs font-medium text-white hover:bg-brand-700"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-stone-900">Unassigned pickup windows</h2>
        {unassignedWindows.length === 0 ? (
          <p className="mt-2 text-sm text-stone-600">All windows are assigned.</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {unassignedWindows.map((w) => (
              <li key={w.id} className="card">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-stone-900">{w.donor.name}</p>
                    <p className="text-sm text-stone-500">
                      {format(new Date(w.startsAt), "EEE, MMM d")} ·{" "}
                      {format(new Date(w.startsAt), "h:mm a")} – {format(new Date(w.endsAt), "h:mm a")}
                    </p>
                  </div>
                  {assigning === w.id ? (
                    <div className="flex flex-col gap-2">
                      <select
                        value={selectedNonprofit}
                        onChange={(e) => setSelectedNonprofit(e.target.value)}
                        className="rounded-lg border border-stone-300 px-2 py-1 text-sm"
                      >
                        <option value="">Select nonprofit</option>
                        {nonprofits.map((n) => (
                          <option key={n.id} value={n.id}>{n.name}</option>
                        ))}
                      </select>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleAssign(w.id)}
                          disabled={!selectedNonprofit || loading}
                          className="rounded-lg bg-brand-600 px-2 py-1 text-xs text-white hover:bg-brand-700 disabled:opacity-50"
                        >
                          Assign
                        </button>
                        <button
                          onClick={() => { setAssigning(null); setSelectedNonprofit(""); }}
                          className="rounded-lg bg-stone-100 px-2 py-1 text-xs text-stone-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAssigning(w.id)}
                      className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
                    >
                      Assign
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
