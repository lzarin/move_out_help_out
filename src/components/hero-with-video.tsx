"use client";

import { useRef, useEffect } from "react";
import { HeroCta } from "./hero-cta";

  const HERO_VIDEO_SOURCES = [
    "/hero-bg.mp4",
    "/hero-bg-2.mp4",
    "/hero-bg-3.mp4",
  ];

export function HeroWithVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.75; // slightly slower for a calm, slow-motion feel
    video.play().catch(() => {});
  }, []);

  return (
    <section className="relative min-h-[420px] overflow-hidden bg-offwhite md:min-h-[480px]">
      {/* Background video: muted, loop, slow-motion feel via playbackRate */}
      <video
        ref={videoRef}
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      {/* Overlay to mute vibrance and keep text readable */}
      <div
        className="absolute inset-0 bg-offwhite/85"
        aria-hidden
      />
      {/* Content on top */}
      <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center px-4 py-16 text-center md:min-h-[480px] md:py-24">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-display-lg md:text-4xl lg:text-display-lg font-bold tracking-tight text-teal-900">
            Turn move-out surplus into{" "}
            <span className="text-coral-600">help for families</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-teal-700/90 md:text-xl">
            We connect college move-out donations to local nonprofits serving
            families in crisis. Schedule pickups, manage inventory, and
            coordinate logistics—all in one place.
          </p>
          <HeroCta />
        </div>
      </div>
    </section>
  );
}
