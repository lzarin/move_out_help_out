"use client";

import { MapPin } from "lucide-react";
import { AREAS, type Area } from "@/types";

const COOKIE_NAME = "moho_area";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function setAreaCookie(area: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(area)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function getAreaFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^| )${COOKIE_NAME}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function AreaSelector({
  value,
  onChange,
  label = "Your area",
  className = "",
}: {
  value: string | null;
  onChange: (area: string) => void;
  label?: string;
  className?: string;
}) {
  function handleChange(area: string) {
    setAreaCookie(area);
    onChange(area);
  }

  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-teal-800 mb-1.5">
        <MapPin className="inline h-4 w-4 mr-1 -mt-0.5" />
        {label}
      </label>
      <select
        value={value ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full rounded-xl border-2 border-teal-200 bg-white px-3 py-2.5 text-teal-900 font-medium focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
      >
        <option value="">Select your area</option>
        {AREAS.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>
    </div>
  );
}
