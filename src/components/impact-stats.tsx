"use client";

import { useEffect, useState } from "react";

const STATS = [
  { value: 1240, suffix: "+", label: "Items donated" },
  { value: 380, suffix: "+", label: "Families helped" },
  { value: 156, suffix: "", label: "Pickups completed" },
];

export function ImpactStats() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = document.getElementById("impact-stats");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="impact-stats" className="grid gap-8 py-4 sm:grid-cols-3">
      {STATS.map((stat, i) => (
        <StatRow key={stat.label} {...stat} start={inView} delay={i * 120} />
      ))}
    </div>
  );
}

function StatRow({
  value,
  suffix,
  label,
  start,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [start, delay]);

  useEffect(() => {
    if (!ready) return;
    const duration = 2000;
    let startTime: number;
    const step = (t: number) => {
      if (!startTime) startTime = t;
      const progress = Math.min((t - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [ready, value]);

  return (
    <div className="text-center">
      <p className="text-4xl font-bold tabular-nums text-white md:text-5xl">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-sm font-medium text-teal-100">{label}</p>
    </div>
  );
}
