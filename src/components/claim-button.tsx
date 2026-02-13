"use client";

import { useState } from "react";

export function ClaimButton({
  itemId,
  maxQuantity,
}: {
  itemId: string;
  maxQuantity: number;
}) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(Math.min(1, maxQuantity));
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to claim");
      }
      setOpen(false);
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to claim");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
      >
        Claim
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4">
          <div className="card w-full max-w-sm">
            <h3 className="font-semibold text-stone-900">Claim this item</h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700">Quantity</label>
                <input
                  type="number"
                  min={1}
                  max={maxQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
                />
                <p className="mt-1 text-xs text-stone-500">Max: {maxQuantity}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setOpen(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? "Claiming…" : "Claim"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
