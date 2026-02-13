"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Package } from "lucide-react";
import type { Role } from "@/types";

const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "DONOR", label: "Donor (campus / student)" },
  { value: "NONPROFIT", label: "Nonprofit" },
  { value: "COORDINATOR", label: "Coordinator" },
];

export default function LoginPage() {
  const searchParams = useSearchParams();
  const roleParam = (searchParams.get("role") as Role) || "DONOR";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("demo");
  const [role, setRole] = useState<Role>(roleParam);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim() || "demo@moveouthelpout.org",
        password: password || "demo",
        role,
        redirect: false,
      });
      if (res?.error) {
        setError("Sign in failed. Use password 'demo' for demo.");
        setLoading(false);
        return;
      }
      const path =
        role === "DONOR"
          ? "/dashboard/donor"
          : role === "NONPROFIT"
            ? "/dashboard/nonprofit"
            : "/dashboard/coordinator";
      window.location.href = path;
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-stone-50 to-brand-50/30 px-4">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 font-semibold text-stone-800"
      >
        <span className="rounded-lg bg-brand-500 p-1.5 text-white">
          <Package className="h-5 w-5" />
        </span>
        Move Out Help Out
      </Link>

      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-xl font-semibold text-stone-900">Sign in</h1>
          <p className="mt-1 text-sm text-stone-600">
            Use any email and password <strong>demo</strong> to try the app.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900 placeholder:text-stone-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="demo"
                className="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-stone-900 placeholder:text-stone-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700">
                Sign in as
              </label>
              <div className="mt-2 space-y-2">
                {ROLE_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value={opt.value}
                      checked={role === opt.value}
                      onChange={() => setRole(opt.value)}
                      className="h-4 w-4 border-stone-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-sm text-stone-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-sm text-stone-500">
          <Link href="/" className="underline hover:text-stone-700">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
