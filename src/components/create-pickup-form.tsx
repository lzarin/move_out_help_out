"use client";

import { useState } from "react";

export function CreatePickupForm({ donorId }: { donorId: string | null }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [notes, setNotes] = useState("");

  if (!donorId) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!startsAt || !endsAt) return;
    setLoading(true);
    try {
      const res = await fetch("/api/pickup-windows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startsAt: new Date(startsAt).toISOString(),
          endsAt: new Date(endsAt).toISOString(),
          notes: notes || undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to create");
      setStartsAt("");
      setEndsAt("");
      setNotes("");
      setOpen(false);
      window.location.reload();
    } catch {
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-primary">
        Create pickup window
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4">
          <div className="card w-full max-w-md">
            <h3 className="font-semibold text-stone-900">New pickup window</h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700">Start</label>
                <input
                  type="datetime-local"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">End</label>
                <input
                  type="datetime-local"
                  value={endsAt}
                  onChange={(e) => setEndsAt(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
                />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setOpen(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? "Creating…" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
