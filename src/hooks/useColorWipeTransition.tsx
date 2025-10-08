"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState, useCallback } from "react";
import { AnimatePresence, m } from "motion/react";
import { colorWipeVariants } from "@/utils/motion/experience-animations";

export function useColorWipeTransition() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [colors, setColors] = useState<string[]>([
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EC4899",
    "#8B5CF6",
  ]);
  const [direction, setDirection] = useState<
    "left" | "right" | "top" | "bottom"
  >("left");

  const ColorWipeOverlay = () => {
    return (
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            {colors.map((color, index) => (
              <m.div
                key={`wipe-${index}`}
                className="absolute inset-0"
                style={{ backgroundColor: color }}
                variants={colorWipeVariants}
                custom={{ direction, delay: index * 0.1 }}
                initial="hidden"
                animate="visible"
                exit="hidden"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    );
  };

  const navigateWithTransition = useCallback(
    (
      href: string,
      options?: {
        colors?: string[];
        direction?: "left" | "right" | "top" | "bottom";
      }
    ) => {
      if (options?.colors) setColors(options.colors);
      if (options?.direction) setDirection(options.direction);

      setIsTransitioning(true);

      setTimeout(() => {
        startTransition(() => {
          router.push(href);

          setTimeout(() => setIsTransitioning(false), 100);
        });
      }, colors.length * 100 + 300);
    },
    [router, colors]
  );

  return {
    navigateWithTransition,
    ColorWipeOverlay,
    isTransitioning: isTransitioning || isPending,
  };
}
