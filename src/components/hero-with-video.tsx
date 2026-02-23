"use client";

import { useRef, useEffect, useState } from "react";
import { HeroCta } from "./hero-cta";

// Primary file: use hero-bg.mp4 (dash) in public/. Add more paths for a rotating sequence.
const HERO_VIDEO_SOURCES = [
  "/hero-bg.mp4",
  "/hero-bg-2.mp4",
  "/hero-bg-3.mp4",
];

export function HeroWithVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sources = HERO_VIDEO_SOURCES.length > 0 ? HERO_VIDEO_SOURCES : ["/hero-bg.mp4"];
  const currentSrc = sources[currentIndex % sources.length];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.75; // slightly slower for a calm, slow-motion feel
    video.play().catch(() => {});
  }, [currentSrc]);

  const goToNext = () => {
    setCurrentIndex((i) => i + 1);
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.75;
      video.play().catch(() => {});
    }
  };

  return (
    <section className="relative min-h-[420px] overflow-hidden bg-offwhite md:min-h-[480px]">
      {/* Background video: muted, loop/sequence, slow-motion feel via playbackRate */}
      <video
        ref={videoRef}
        key={currentSrc}
        src={currentSrc}
        autoPlay
        muted
        loop={sources.length === 1}
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onEnded={sources.length > 1 ? goToNext : undefined}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      {/* Overlay to mute vibrance and keep text readable */}
      <div
        className="absolute inset-0 bg-offwhite/75"
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
