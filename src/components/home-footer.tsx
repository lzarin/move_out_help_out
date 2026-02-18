"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function HomeFooter() {
  const { data: session, status } = useSession();

  return (
    <footer className="border-t border-teal-200/80 bg-white py-10">
      <div className="mx-auto max-w-6xl px-4 text-center">
        {status !== "loading" && session?.user ? (
          <p className="text-sm font-medium text-teal-600">
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="font-semibold text-teal-700 underline hover:text-teal-900"
            >
              Sign out
            </button>
          </p>
        ) : (
          <p className="text-sm font-medium text-teal-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-teal-700 underline hover:text-teal-900">
              Sign in
            </Link>
          </p>
        )}
        <p className="mt-2 text-sm text-teal-500">
          Move Out Help Out — connecting campus surplus to families in need.
        </p>
      </div>
    </footer>
  );
}
