import Link from "next/link";
import { Package, Heart, Truck } from "lucide-react";
import { ImpactStats } from "@/components/impact-stats";
import { FAQSection } from "@/components/faq-section";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header: one Sign in, one Get started */}
      <header className="border-b border-teal-200/70 bg-white/90 backdrop-blur-md shadow-sm shadow-teal-950/5">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-teal-900 text-lg">
            <span className="rounded-xl bg-teal-600 p-2 text-white shadow-md shadow-teal-900/20">
              <Package className="h-5 w-5" />
            </span>
            Move Out Help Out
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-teal-700 hover:text-teal-900 transition"
            >
              Sign in
            </Link>
            <Link href="/login" className="btn-primary text-base px-5">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Block 1 — Hero (off-white): strong CTA above the fold */}
        <section className="bg-offwhite px-4 py-16 md:py-24">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="font-display text-display-lg md:text-4xl lg:text-display-lg font-bold tracking-tight text-teal-900">
              Turn move-out surplus into{" "}
              <span className="text-coral-600">help for families</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-teal-700/90 font-medium">
              We connect college move-out donations to local nonprofits serving
              families in crisis. Schedule pickups, manage inventory, and
              coordinate logistics—all in one place.
            </p>
            <div className="mt-10">
              <Link
                href="/login"
                className="inline-block rounded-xl bg-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-900/25 transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Get started
              </Link>
            </div>
          </div>
        </section>

        {/* Block 2 — Impact stats (teal) */}
        <section className="bg-teal-700 px-4 py-14 md:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-sm font-semibold uppercase tracking-wider text-teal-200">
              Our impact so far
            </p>
            <ImpactStats />
          </div>
        </section>

        {/* Block 3 — Who it's for: info only, not buttons */}
        <section className="bg-surface px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-display text-display-sm font-bold text-teal-900 md:text-2xl">
              Who uses Move Out Help Out
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-teal-700">
              Three roles work together so surplus reaches families in need.
            </p>
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              <div className="rounded-2xl border border-teal-200/60 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-teal-900">Donors</h3>
                <p className="mt-2 text-sm text-teal-700 leading-relaxed">
                  Students and others moving out list surplus items and set pickup
                  windows. Your furniture, kitchenware, and bedding go directly
                  to nonprofits serving families in crisis.
                </p>
                <p className="mt-3 text-xs font-medium text-teal-600">
                  <Link href="/login?role=DONOR" className="underline hover:text-teal-800">
                    Sign in as donor
                  </Link>
                </p>
              </div>
              <div className="rounded-2xl border border-coral-200/60 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral-100 text-coral-600">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-teal-900">Coordinators</h3>
                <p className="mt-2 text-sm text-teal-700 leading-relaxed">
                  Volunteers and staff match donors with nonprofits, assign
                  pickups to time windows, and track status so every donation
                  gets from campus to families smoothly.
                </p>
                <p className="mt-3 text-xs font-medium text-teal-600">
                  <Link href="/login?role=COORDINATOR" className="underline hover:text-teal-800">
                    Sign in as coordinator
                  </Link>
                </p>
              </div>
              <div className="rounded-2xl border border-teal-200/60 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-teal-900">Nonprofits</h3>
                <p className="mt-2 text-sm text-teal-700 leading-relaxed">
                  Local organizations browse available inventory, claim items for
                  clients, and get assigned pickup times. One place to see what’s
                  available and when you can collect it.
                </p>
                <p className="mt-3 text-xs font-medium text-teal-600">
                  <Link href="/login?role=NONPROFIT" className="underline hover:text-teal-800">
                    Sign in as nonprofit
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Block 4 — FAQ (coral tint) */}
        <section className="bg-coral-50/40 px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <FAQSection />
          </div>
        </section>

        {/* Block 5 — Minimal footer: one sign-in link, no big button */}
        <footer className="border-t border-teal-200/80 bg-white py-10">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <p className="text-sm font-medium text-teal-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-teal-700 underline hover:text-teal-900">
                Sign in
              </Link>
            </p>
            <p className="mt-2 text-sm text-teal-500">
              Move Out Help Out — connecting campus surplus to families in need.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
