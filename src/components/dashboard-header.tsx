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
    <header className="border-b border-teal-200/80 bg-white/90 dark:border-teal-800 dark:bg-teal-950/80 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-teal-900 dark:text-teal-100 text-base"
          >
            <span className="rounded-xl bg-teal-600 p-1.5 text-white shadow-sm">
              <Package className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline">Move Out Help Out</span>
          </Link>
        </div>
      </div>
      {(title || description) && (
        <div className="border-t border-teal-100 dark:border-teal-800 px-4 py-4 lg:px-6">
          <h1 className="text-xl md:text-2xl font-bold text-teal-900 dark:text-teal-100">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 text-sm font-medium text-teal-700 dark:text-teal-300">
              {description}
            </p>
          )}
        </div>
      )}
    </header>
  );
}
