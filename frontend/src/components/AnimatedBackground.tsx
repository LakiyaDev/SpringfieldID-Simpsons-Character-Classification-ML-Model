"use client";

import Image from "next/image";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src="/springfield-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center scale-105"
        sizes="100vw"
      />
      <div className="bg-scene-overlay absolute inset-0 backdrop-blur-[6px]" />
      <div className="bg-scene-gradient absolute inset-0" />
    </div>
  );
}
