"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { m, AnimatePresence } from "motion/react";
import { useColorWipeStore } from "@/store/colorWipeStore";

interface ColorWipeProps {
  onFinish?: () => void;
}

export const ColorWipeTransition: React.FC<ColorWipeProps> = ({ onFinish }) => {
  const isTransitioning = useColorWipeStore((state) => state.isTransitioning);
  const colors = useColorWipeStore((state) => state.colors);
  const direction = useColorWipeStore((state) => state.direction);
  const duration = useColorWipeStore((state) => state.duration);
  const staggerDelay = useColorWipeStore((state) => state.staggerDelay);

  useEffect(() => {
    if (isTransitioning) {
      const totalDuration = (colors.length - 1) * staggerDelay + duration + 0.2;
      const timeoutMs = totalDuration * 1000;

      const timeout = setTimeout(() => {
        onFinish?.();
      }, timeoutMs);

      return () => clearTimeout(timeout);
    }
  }, [isTransitioning, colors.length, duration, staggerDelay, onFinish]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden">
          {colors.map((color: string, index: number) => (
            <m.div
              key={`wipe-${color}-${index}`}
              className="absolute inset-0"
              style={{ backgroundColor: color }}
              initial={{
                x: (() => {
                  if (direction === "left") return "-100%";
                  if (direction === "right") return "100%";
                  return 0;
                })(),
                y: (() => {
                  if (direction === "top") return "-100%";
                  if (direction === "bottom") return "100%";
                  return 0;
                })(),
              }}
              animate={{
                x: (() => {
                  if (direction === "left") return "100%";
                  if (direction === "right") return "-100%";
                  return 0;
                })(),
                y: (() => {
                  if (direction === "top") return "100%";
                  if (direction === "bottom") return "-100%";
                  return 0;
                })(),
              }}
              transition={{
                duration: duration,
                delay: index * staggerDelay,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export function useColorWipeNavigation() {
  const router = useRouter();

  const {
    startTransition,
    resetTransition,
    isTransitioning,
    nextRoute,
    colors,
    direction,
    duration,
    staggerDelay,
  } = useColorWipeStore();

  const navigateWithTransition = (
    href: string,
    options?: {
      colors?: string[];
      direction?: "left" | "right" | "top" | "bottom";
      duration?: number;
      staggerDelay?: number;
    }
  ) => {
    resetTransition();
    startTransition(href, options);
    setTimeout(() => {
      router.push(href);
    }, 300);
  };

  const handleTransitionFinish = () => {
    resetTransition();
  };

  return {
    isTransitioning,
    transitionConfig: { colors, direction, nextRoute, duration, staggerDelay },
    navigateWithTransition,
    handleTransitionFinish,
  };
}
