"use client";

import { useEffect, useMemo, useState } from "react";

const tokenCache = new Map<string, string>();

/**
 * Framer Motion cannot interpolate CSS custom properties: passing
 * `"var(--x)"` to `animate={{ backgroundColor }}` makes the transition snap.
 * This hook resolves tokens to concrete colour strings after mount (SSR-safe)
 * so animated properties stay interpolatable.
 */
export function useCssColors(names: readonly string[]) {
  const key = names.join("|");
  const [colors, setColors] = useState<Record<string, string>>(() =>
    Object.fromEntries(names.map((name) => [name, tokenCache.get(name) ?? "transparent"])),
  );

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};

    for (const name of names) {
      const cached = tokenCache.get(name);
      const value =
        cached ?? (rootStyle.getPropertyValue(name).trim() || "transparent");
      tokenCache.set(name, value);
      next[name] = value;
    }

    setColors(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return useMemo(
    () => (name: string) => colors[name] ?? "transparent",
    [colors],
  );
}
