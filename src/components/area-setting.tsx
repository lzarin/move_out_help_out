"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { AREAS, type Area } from "@/types";

type Props = { initialArea: Area | null };

export function AreaSetting({ initialArea }: Props) {
  const [area, setArea] = useState<Area | null>(initialArea);
  const [saving, setSaving] = useState(false);

  async function handleChange(value: string) {
    const next = (value === "" ? null : value) as Area | null;
    setSaving(true);
    try {
      const res = await fetch("/api/organization", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area: next }),
      });
      if (res.ok) setArea(next);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <MapPin className="h-4 w-4 text-teal-600" />
      <span className="text-sm font-medium text-teal-700">Your area:</span>
      <select
        value={area ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        disabled={saving}
        className="rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-sm text-teal-900 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-60"
      >
        <option value="">Select area…</option>
        {AREAS.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      {saving && <span className="text-xs text-teal-600">Saving…</span>}
    </div>
  );
}
