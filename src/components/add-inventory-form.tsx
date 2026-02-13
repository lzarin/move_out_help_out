"use client";

import { useState } from "react";
import { INVENTORY_CATEGORIES } from "@/types";

export function AddInventoryForm({ donorId }: { donorId: string | null }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(INVENTORY_CATEGORIES[0]);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  if (!donorId) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          quantity,
          description: description || undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to add");
      setTitle("");
      setQuantity(1);
      setDescription("");
      setOpen(false);
      window.location.reload();
    } catch {
      setLoading(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-primary">
        Add item
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4">
          <div className="card w-full max-w-md">
            <h3 className="font-semibold text-stone-900">Add inventory item</h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
                >
                  {INVENTORY_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">Description (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900"
                />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setOpen(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? "Adding…" : "Add item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
