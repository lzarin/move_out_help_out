"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Who can donate?",
    a: "Students and anyone moving out of campus housing can list furniture, kitchen items, bedding, and other usable goods. You set a pickup window and we connect you with local nonprofits who need those items for families in crisis.",
  },
  {
    q: "How do nonprofits get items?",
    a: "Nonprofits sign in, browse available inventory from donors in their area, and claim what they need. A coordinator matches claimed items with pickup windows and schedules the collection. You get a clear pickup time and donor details.",
  },
  {
    q: "What role do coordinators play?",
    a: "Coordinators see all donors and nonprofits on the platform. They assign nonprofits to donor pickup windows, track status (scheduled, in progress, completed), and keep logistics running smoothly so donations reach families quickly.",
  },
  {
    q: "Is there a cost to use Move Out Help Out?",
    a: "No. The platform is free for donors, nonprofits, and coordinators. Our goal is to redirect move-out surplus to people who need it—no fees, no barriers.",
  },
  {
    q: "What kinds of items can be donated?",
    a: "Furniture, small appliances, kitchenware, bedding, clothing, books, and other gently used goods that families can use. We focus on items that are in good condition and safe to reuse.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-display-sm font-bold text-teal-900 md:text-2xl">
        Frequently asked questions
      </h2>
      <ul className="mt-6 space-y-2">
        {FAQ_ITEMS.map((item, i) => (
          <li
            key={i}
            className="rounded-xl border border-teal-200/80 bg-white/80 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left font-semibold text-teal-900 hover:bg-teal-50/50 transition"
            >
              {item.q}
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-teal-600 transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="border-t border-teal-100 px-4 py-3 text-sm text-teal-700 leading-relaxed">
                {item.a}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
