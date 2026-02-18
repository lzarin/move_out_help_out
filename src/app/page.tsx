import Link from "next/link";
import { Package, Heart, Truck } from "lucide-react";
import { HomeHeader } from "@/components/home-header";
import { HeroCta } from "@/components/hero-cta";
import { HomeFooter } from "@/components/home-footer";
import { ImpactStats } from "@/components/impact-stats";
import { FAQSection } from "@/components/faq-section";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HomeHeader />

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
            <HeroCta />
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
                <h3 className="mt-4 text-lg font-bold text-teal-900">Volunteers</h3>
                <p className="mt-2 text-sm text-teal-700 leading-relaxed">
                  Volunteers coordinate donors and nonprofits: they match claims to
                  pickup windows, set times and locations, and track pickups so
                  donations get from campus to families smoothly.
                </p>
                <p className="mt-3 text-xs font-medium text-teal-600">
                  <Link href="/login?role=COORDINATOR" className="underline hover:text-teal-800">
                    Sign in as volunteer
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

        <HomeFooter />
      </main>
    </div>
  );
}
