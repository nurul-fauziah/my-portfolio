"use client";

import { useEffect, useRef } from "react";

export function CursorRevealBackground({ src }: { src: string }) {
  const blobRef = useRef<HTMLDivElement>(null);
  const mx = useRef(-500);
  const my = useRef(-500);
  const tx = useRef(-500);
  const ty = useRef(-500);
  const raf = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = blobRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      tx.current = e.clientX;
      ty.current = e.clientY;
      el!.style.opacity = "1";
    }

    function onLeave() {
      tx.current = -500;
      ty.current = -500;
      el!.style.opacity = "0";
    }

    function tick() {
      mx.current += (tx.current - mx.current) * 0.1;
      my.current += (ty.current - my.current) * 0.1;
      el!.style.setProperty("--mx", mx.current + "px");
      el!.style.setProperty("--my", my.current + "px");
      raf.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Single masked blob — wavy via CSS animation */}
      <div
        ref={blobRef}
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: 0,
          "--mx": "-500px",
          "--my": "-500px",
          backgroundImage: "url(" + src + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage:
            "radial-gradient(circle 160px at var(--mx) var(--my), black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle 160px at var(--mx) var(--my), black 40%, transparent 100%)",
          animation: "cr-wavy 6s ease-in-out infinite",
        } as React.CSSProperties}
      />
    </div>
  );
}
