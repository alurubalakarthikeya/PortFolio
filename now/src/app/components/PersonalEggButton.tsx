"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import easterEggImage from "../assets/imgs/easter.png";

type Position = {
  top: number;
  left: number;
};

function pickPosition(): Position {
  const margin = 18;
  const size = 18;
  const width = Math.max(window.innerWidth - size - margin * 2, 1);
  const height = Math.max(window.innerHeight - size - margin * 2, 1);
  const cornerBandWidth = Math.max(window.innerWidth * 0.2, 64);
  const cornerBandHeight = Math.max(window.innerHeight * 0.2, 64);
  const useLeftSide = Math.random() > 0.5;
  const useTopSide = Math.random() > 0.5;

  const left = useLeftSide
    ? margin + Math.random() * cornerBandWidth
    : Math.max(window.innerWidth - size - margin - Math.random() * cornerBandWidth, margin);

  const top = useTopSide
    ? margin + Math.random() * cornerBandHeight
    : Math.max(window.innerHeight - size - margin - Math.random() * cornerBandHeight, margin);

  return {
    left: Math.min(Math.max(left, margin), margin + width),
    top: Math.min(Math.max(top, margin), margin + height),
  };
}

export default function PersonalEggButton() {
  const [position, setPosition] = useState<Position | null>(null);
  const pathname = usePathname();
  const isEasterPage = pathname.startsWith("/easter");

  useEffect(() => {
    if (pathname.startsWith("/easter")) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setPosition(pickPosition());
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  if (isEasterPage || !position) {
    return null;
  }

  return (
    <Link
      aria-label="Open personal easter egg page"
      title="Personal easter egg"
      href="/easter"
      className="absolute z-[30] block transition-transform duration-300 hover:scale-110"
      style={{ top: position.top, left: position.left }}
    >
      <Image
        src={easterEggImage}
        alt="Personal easter egg"
        width={16}
        height={16}
        className="h-[16px] w-[16px] object-contain drop-shadow-[0_4px_10px_rgba(16,185,129,0.2)] opacity-40"
        priority={false}
      />
    </Link>
  );
}