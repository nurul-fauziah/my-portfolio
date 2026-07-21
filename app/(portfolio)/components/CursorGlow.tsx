"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-[400px] w-[400px] rounded-full md:block"
      animate={{
        x: pos.x - 200,
        y: pos.y - 200,
        opacity: 0.15,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
      style={{
        background:
          "radial-gradient(circle, rgba(129,166,198,0.3) 0%, transparent 70%)",
      }}
    />
  );
}
