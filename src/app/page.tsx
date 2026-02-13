import Link from "next/link";
import { Package, Heart, Truck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-brand-50/30">
      <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-stone-800">
            <span className="rounded-lg bg-brand-500 p-1.5 text-white">
              <Package className="h-5 w-5" />
            </span>
            Move Out Help Out
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-stone-600 hover:text-stone-900"
            >
              Sign in
            </Link>
            <Link href="/login" className="btn-primary">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
            Turn move-out surplus into{" "}
            <span className="text-brand-600">help for families</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-600">
            We connect college move-out donations to local nonprofits serving
            families in crisis. Schedule pickups, manage inventory, and
            coordinate logistics—all in one place.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login?role=DONOR" className="btn-primary text-base">
              I have items to donate
            </Link>
            <Link
              href="/login?role=NONPROFIT"
              className="btn-secondary text-base"
            >
              We’re a nonprofit
            </Link>
          </div>
        </section>

        <section className="mt-24 grid gap-8 md:grid-cols-3">
          <div className="card text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <Package className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-stone-900">Donors</h3>
            <p className="mt-2 text-sm text-stone-600">
              Post surplus items, set pickup windows, and get them to people
              who need them.
            </p>
          </div>
          <div className="card text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-warm-100 text-warm-600">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-stone-900">Nonprofits</h3>
            <p className="mt-2 text-sm text-stone-600">
              Claim inventory for your clients and coordinate pickups with
              donors.
            </p>
          </div>
          <div className="card text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-stone-900">Coordinators</h3>
            <p className="mt-2 text-sm text-stone-600">
              Match donors and nonprofits, manage schedules, and keep logistics
              smooth.
            </p>
          </div>
        </section>

        <section className="mt-24 rounded-2xl border border-brand-200/60 bg-brand-50/50 p-8 text-center md:p-12">
          <h2 className="text-2xl font-semibold text-stone-900">
            Ready to help out?
          </h2>
          <p className="mt-2 text-stone-600">
            Sign in or create an account to get started.
          </p>
          <Link href="/login" className="mt-6 inline-block btn-primary">
            Sign in
          </Link>
        </section>
      </main>

      <footer className="mt-24 border-t border-stone-200 bg-white/50 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-stone-500">
          Move Out Help Out — connecting campus surplus to families in need.
        </div>
      </footer>
    </div>
  );
}
