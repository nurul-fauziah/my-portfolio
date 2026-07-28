"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const elRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const tx = useRef(0);
  const ty = useRef(0);
  const raf = useRef(0);
  const visible = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = elRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      tx.current = e.clientX - 200;
      ty.current = e.clientY - 200;
      if (!visible.current) {
        visible.current = true;
        el!.style.opacity = "0.15";
      }
    }

    function onLeave() {
      visible.current = false;
      el!.style.opacity = "0";
    }

    function tick() {
      mx.current += (tx.current - mx.current) * 0.15;
      my.current += (ty.current - my.current) * 0.15;
      el!.style.transform = `translate3d(${mx.current}px, ${my.current}px, 0)`;
      raf.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={elRef}
      className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-[400px] w-[400px] rounded-full opacity-0 transition-opacity duration-300 md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(129,166,198,0.3) 0%, transparent 70%)",
      }}
    />
  );
}
