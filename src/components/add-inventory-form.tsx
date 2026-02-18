"use client";

import { useState, useRef } from "react";
import { INVENTORY_CATEGORIES, type InventoryCategory } from "@/types";
import { ImagePlus, X } from "lucide-react";

export function AddInventoryForm({ donorId }: { donorId: string | null }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<InventoryCategory>(INVENTORY_CATEGORIES[0]);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!donorId) return null;

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < Math.min(files.length, 10 - imageUrls.length); i++) {
        const formData = new FormData();
        formData.set("file", files[i]);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Upload failed");
        }
        const data = await res.json();
        if (data.url) urls.push(data.url);
      }
      setImageUrls((prev) => [...prev, ...urls].slice(0, 10));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(url: string) {
    setImageUrls((prev) => prev.filter((u) => u !== url));
  }

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
          imageUrls: imageUrls.length ? imageUrls : undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to add");
      setTitle("");
      setQuantity(1);
      setDescription("");
      setImageUrls([]);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-teal-950/50 p-4">
          <div className="card w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="font-semibold text-teal-900">Add inventory item</h3>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-teal-800">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-teal-200 px-3 py-2 text-teal-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-teal-800">Photos (optional)</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                  disabled={uploading || imageUrls.length >= 10}
                />
                <div className="mt-1 flex flex-wrap gap-2">
                  {imageUrls.map((url) => (
                    <div key={url} className="relative">
                      <img
                        src={url}
                        alt=""
                        className="h-20 w-20 rounded-lg object-cover border border-teal-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(url)}
                        className="absolute -right-1 -top-1 rounded-full bg-teal-700 p-0.5 text-white hover:bg-teal-800"
                        aria-label="Remove photo"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {imageUrls.length < 10 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-teal-300 text-teal-600 hover:border-teal-400 hover:bg-teal-50 disabled:opacity-50"
                    >
                      {uploading ? (
                        <span className="text-xs">Uploading…</span>
                      ) : (
                        <ImagePlus className="h-8 w-8" />
                      )}
                    </button>
                  )}
                </div>
                <p className="mt-1 text-xs text-teal-600">Up to 10 photos, 5MB each. JPEG, PNG, WebP, GIF.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-teal-800">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as InventoryCategory)}
                  className="mt-1 w-full rounded-xl border border-teal-200 px-3 py-2 text-teal-900"
                >
                  {INVENTORY_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-teal-800">Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-teal-200 px-3 py-2 text-teal-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-teal-800">Description (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-xl border border-teal-200 px-3 py-2 text-teal-900"
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
