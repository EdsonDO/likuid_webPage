"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./BallpitBackground.css";

interface Blob {
  id: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: string;
  txRange: number;
  tyRange: number;
  durationX: number;
  durationY: number;
  opacity: number;
}

type BallpitVariant = "default" | "login";

interface BallpitBackgroundProps {
  variant?: BallpitVariant;
  count?: number;
}

const PALETTES: Record<BallpitVariant, string[]> = {
  default: ["#38bdf8", "#0ea5e9", "#0284c7", "#0369a1", "#075985"],
  login: ["#38bdf8", "#0ea5e9", "#0284c7", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9"],
};

function generateBlobs(
  count: number,
  width: number,
  height: number,
  palette: string[],
): Blob[] {
  const blobs: Blob[] = [];

  for (let i = 0; i < count; i++) {
    const rand = Math.random();
    let radius: number;

    if (rand < 0.35) {
      radius = Math.random() * 15 + 8;
    } else if (rand < 0.65) {
      radius = Math.random() * 20 + 25;
    } else if (rand < 0.85) {
      radius = Math.random() * 30 + 50;
    } else {
      radius = Math.random() * 70 + 85;
    }

    blobs.push({
      id: i,
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      radius,
      color: palette[i % palette.length],
      txRange: Math.random() * 40 + 20,
      tyRange: Math.random() * 50 + 20,
      durationX: Math.random() * 8 + 10,
      durationY: Math.random() * 8 + 10,
      opacity: radius > 60 ? 0.15 + Math.random() * 0.15 : 0.3 + Math.random() * 0.25,
    });
  }

  return blobs;
}

export function BallpitBackground({
  variant = "default",
  count = 160,
}: BallpitBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const blobsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const { width, height } = el.getBoundingClientRect();
    setBlobs(generateBlobs(count, width || window.innerWidth, height || window.innerHeight, PALETTES[variant]));
  }, [count, variant]);

  useEffect(() => {
    if (blobs.length === 0) return;

    const ctx = gsap.context(() => {
      blobsRef.current.forEach((blobEl, idx) => {
        if (!blobEl) return;
        const blob = blobs[idx];
        if (!blob) return;

        gsap.to(blobEl, {
          x: blob.txRange,
          duration: blob.durationX,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(blobEl, {
          y: blob.tyRange,
          duration: blob.durationY,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [blobs]);

  return (
    <div
      ref={containerRef}
      className="ballpit-background"
    >
      {blobs.map((blob, idx) => (
        <div
          key={blob.id}
          ref={(el) => {
            if (el) blobsRef.current[idx] = el;
          }}
          className="ballpit-blob"
          style={{
            width: blob.radius * 2,
            height: blob.radius * 2,
            left: blob.baseX - blob.radius,
            top: blob.baseY - blob.radius,
            backgroundColor: blob.color,
            opacity: blob.opacity,
            filter: blob.radius > 60 ? "blur(3px)" : "none",
          }}
        />
      ))}
    </div>
  );
}
