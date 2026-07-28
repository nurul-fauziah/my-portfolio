"use client";

import { useEffect } from "react";
import type { ThemeColors } from "../lib/types";

type ThemeProviderProps = {
  light: ThemeColors;
  dark: ThemeColors;
  children: React.ReactNode;
};

function applyTheme(colors: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("--bg-primary", colors.bgPrimary);
  root.style.setProperty("--bg-secondary", colors.bgSecondary);
  root.style.setProperty("--bg-card", colors.bgCard);
  root.style.setProperty("--text-primary", colors.textPrimary);
  root.style.setProperty("--text-secondary", colors.textSecondary);
  root.style.setProperty("--text-muted", colors.textMuted);
  root.style.setProperty("--accent", colors.accent);
  root.style.setProperty("--accent-light", colors.accentLight);
  root.style.setProperty("--border", colors.border);
}

export function ThemeProvider({ light, dark, children }: ThemeProviderProps) {
  useEffect(() => {
    // Apply light theme defaults
    applyTheme(light);

    // Observe dark mode class changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      applyTheme(isDark ? dark : light);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [light, dark]);

  return <>{children}</>;
}
