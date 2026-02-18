"use client";

import { useState, Suspense } from "react";
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

function LoginForm() {
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-offwhite via-surface to-teal-50/40 px-4">
      <Link
        href="/"
        className="mb-10 flex items-center gap-2.5 font-bold text-teal-900 text-lg"
      >
        <span className="rounded-xl bg-teal-600 p-2 text-white shadow-md shadow-teal-900/20">
          <Package className="h-5 w-5" />
        </span>
        Move Out Help Out
      </Link>

      <div className="w-full max-w-md">
        <div className="card shadow-lg shadow-teal-950/10">
          <h1 className="text-2xl font-bold text-teal-900">Sign in</h1>
          <p className="mt-2 text-sm font-medium text-teal-700">
            Use any email and password <strong className="text-coral-600">demo</strong> to try the app.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-teal-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border-2 border-teal-200 px-3 py-2.5 text-teal-900 placeholder:text-teal-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-teal-800">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="demo"
                className="mt-1.5 w-full rounded-xl border-2 border-teal-200 px-3 py-2.5 text-teal-900 placeholder:text-teal-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-teal-800">
                Sign in as
              </label>
              <div className="mt-2 space-y-2">
                {ROLE_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="role"
                      value={opt.value}
                      checked={role === opt.value}
                      onChange={() => setRole(opt.value)}
                      className="h-4 w-4 border-teal-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm font-medium text-teal-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {error && (
              <p className="text-sm font-medium text-coral-600">{error}</p>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
        <p className="mt-5 text-center text-sm font-medium text-teal-600">
          <Link href="/" className="underline hover:text-teal-900 transition">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-offwhite via-surface to-teal-50/40 px-4">
          <Link href="/" className="mb-10 flex items-center gap-2.5 font-bold text-teal-900 text-lg">
            <span className="rounded-xl bg-teal-600 p-2 text-white shadow-md shadow-teal-900/20">
              <Package className="h-5 w-5" />
            </span>
            Move Out Help Out
          </Link>
          <div className="w-full max-w-md rounded-2xl border border-teal-200/60 bg-white p-8 shadow-lg">
            <p className="text-center font-medium text-teal-600">Loading…</p>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
