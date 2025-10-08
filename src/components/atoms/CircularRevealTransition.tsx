"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { m, AnimatePresence } from "motion/react";
import DiamaDev from "@/assets/svg/diama-dev";
import { useCircularRevealStore } from "@/store/circularRevealStore";

interface CircularRevealProps {
  onFinish?: () => void;
}

export const CircularRevealTransition: React.FC<CircularRevealProps> = ({
  onFinish,
}) => {
  const isTransitioning = useCircularRevealStore(
    (state) => state.isTransitioning
  );
  const color = useCircularRevealStore((state) => state.color);
  const clickPosition = useCircularRevealStore((state) => state.clickPosition);
  const duration = useCircularRevealStore((state) => state.duration);
  const initialSize = useCircularRevealStore((state) => state.initialSize);

  const [maxDimension, setMaxDimension] = useState(2000);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const calculateMaxDimension = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const distances = [
          Math.hypot(clickPosition.x, clickPosition.y),
          Math.hypot(windowWidth - clickPosition.x, clickPosition.y),
          Math.hypot(clickPosition.x, windowHeight - clickPosition.y),
          Math.hypot(
            windowWidth - clickPosition.x,
            windowHeight - clickPosition.y
          ),
        ];

        const maxDistance =
          Math.max(...distances, Math.max(windowWidth, windowHeight)) * 1.5;
        setMaxDimension(maxDistance * 2);
      };

      calculateMaxDimension();
      window.addEventListener("resize", calculateMaxDimension);

      return () => window.removeEventListener("resize", calculateMaxDimension);
    }
  }, [clickPosition]);

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        onFinish?.();
      }, duration * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isTransitioning, duration, onFinish]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[999999] pointer-events-none overflow-hidden">
          <m.div
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(12px) saturate(180%)",
              WebkitBackdropFilter: "blur(12px) saturate(180%)",
              backgroundColor: "rgba(17, 17, 17, 0.3)",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delay: duration * 0.3,
                duration: duration * 0.5,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: duration / (duration * 2),
              },
            }}
          />

          <m.div
            className="fixed top-1/2 right-1/2 z-50 translate-x-1/2 -translate-y-1/2"
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: [0, 1, 1, 1],
              transition: {
                delay: duration * 0.15,
                duration: duration * 0.6,
                times: [0, 0.4, 0.7, 1],
                ease: "easeOut",
              },
            }}
            exit={{
              opacity: 0,
              scale: 1.2,
              rotate: 3,
              transition: {
                duration: duration * 0.25,
              },
            }}
          >
            <DiamaDev
              width={150}
              height={150}
              style={{
                transition: "filter 0.3s ease",
              }}
            />
          </m.div>

          <m.div
            className="absolute rounded-full border-4"
            style={{
              backgroundColor: "#1a1a1a",
              left: clickPosition.x,
              top: clickPosition.y,
              transformOrigin: "center center",
              transform: "translate(-50%, -50%)",
              mixBlendMode: "soft-light",
              boxShadow: `inset 0 0 200px 70px ${color}30`,
              borderColor: color,
            }}
            initial={{
              width: `${initialSize}px`,
              height: `${initialSize}px`,
              opacity: 0.9,
            }}
            animate={{
              width: `${maxDimension}px`,
              height: `${maxDimension}px`,
              opacity: 0.75,
            }}
            transition={{
              duration: duration,
              ease: [0.19, 0.9, 0.22, 1],
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: duration / (duration * 2),
                ease: "easeOut",
              },
            }}
          />

          <m.div
            className="absolute rounded-full border-4"
            style={{
              backgroundColor: `#1a1a1a40`,
              borderColor: `${color}80`,
              left: clickPosition.x,
              top: clickPosition.y,
              transformOrigin: "center center",
              transform: "translate(-50%, -50%)",
              mixBlendMode: "plus-lighter",
              boxShadow: `inset 0 0 200px 70px ${color}20`,
              filter: "blur(4px)",
            }}
            initial={{
              width: `${initialSize * 0.5}px`,
              height: `${initialSize * 0.5}px`,
              opacity: 0.7,
            }}
            animate={{
              width: `${maxDimension * 0.7}px`,
              height: `${maxDimension * 0.7}px`,
              opacity: 1,
            }}
            transition={{
              duration: duration * 0.7,
              ease: [0.19, 0.9, 0.22, 1],
              delay: duration * 0.05,
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: duration / (duration * 2),
                ease: "easeOut",
              },
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export function useCircularRevealNavigation() {
  const router = useRouter();

  const {
    startTransition,
    resetTransition,
    isTransitioning,
    nextRoute,
    color,
    clickPosition,
    initialSize,
  } = useCircularRevealStore();

  const navigateWithReveal = (
    href: string,
    options?: {
      color?: string;
      clickPosition?: { x: number; y: number };
      duration?: number;
      initialSize?: number;
    }
  ) => {
    startTransition(href, options);

    const durationValue = options?.duration || 0.8;
    setTimeout(() => {
      router.push(href);
    }, durationValue * 500);
  };

  const handleTransitionFinish = () => {
    resetTransition();
  };

  return {
    isTransitioning,
    transitionConfig: { color, clickPosition, nextRoute, initialSize },
    navigateWithReveal,
    handleTransitionFinish,
  };
}
