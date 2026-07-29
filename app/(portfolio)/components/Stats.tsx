"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "Happy Clients", value: 10, suffix: "+" },
  { label: "Technologies", value: 12, suffix: "+" },
];

export function Stats() {
  return (
    <section className="border-t border-[var(--border)] py-20">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center"
          >
            <p className="font-serif text-4xl text-[var(--text-primary)] md:text-5xl">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
