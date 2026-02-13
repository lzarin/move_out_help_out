import Link from "next/link";
import { Package } from "lucide-react";

export function DashboardHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="border-b border-stone-200 bg-white/80 dark:border-stone-700 dark:bg-stone-900/50">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-stone-800 dark:text-stone-200"
          >
            <span className="rounded-lg bg-brand-500 p-1.5 text-white">
              <Package className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline">Move Out Help Out</span>
          </Link>
        </div>
      </div>
      {(title || description) && (
        <div className="border-t border-stone-100 px-4 py-4 dark:border-stone-800 lg:px-6">
          <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              {description}
            </p>
          )}
        </div>
      )}
    </header>
  );
}
