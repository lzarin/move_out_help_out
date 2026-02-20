"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AREAS } from "@/types";

type Props = { basePath: string };

export function AreaFilterLinks({ basePath }: Props) {
  const searchParams = useSearchParams();
  const current = searchParams.get("area");

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-teal-700">Area:</span>
      <Link
        href={basePath}
        className={`rounded-lg px-2.5 py-1 text-sm ${
          !current
            ? "bg-teal-100 font-medium text-teal-800"
            : "text-teal-600 hover:bg-teal-50"
        }`}
      >
        All
      </Link>
      {AREAS.map((area) => (
        <Link
          key={area}
          href={`${basePath}?area=${encodeURIComponent(area)}`}
          className={`rounded-lg px-2.5 py-1 text-sm ${
            current === area
              ? "bg-teal-100 font-medium text-teal-800"
              : "text-teal-600 hover:bg-teal-50"
          }`}
        >
          {area}
        </Link>
      ))}
    </div>
  );
}
