"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";

export type DirectionType = "left" | "right" | "top" | "bottom";

interface ColorWipeStore {
  isTransitioning: boolean;
  colors: string[];
  direction: DirectionType;
  nextRoute: string;
  duration: number;
  staggerDelay: number;

  setIsTransitioning: (isTransitioning: boolean) => void;
  setTransitionConfig: (config: {
    colors?: string[];
    direction?: DirectionType;
    nextRoute?: string;
    duration?: number;
    staggerDelay?: number;
  }) => void;
  startTransition: (
    href: string,
    options?: {
      colors?: string[];
      direction?: DirectionType;
      duration?: number;
      staggerDelay?: number;
    }
  ) => void;
  resetTransition: () => void;
}

export const useColorWipeStore = create<ColorWipeStore>()(
  devtools(
    (set) => ({
      isTransitioning: false,
      colors: ["#3B82F6", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"],
      direction: "left",
      nextRoute: "",
      duration: 2,
      staggerDelay: 0.2,

      setIsTransitioning: (isTransitioning) => set({ isTransitioning }),

      setTransitionConfig: (config) =>
        set((state) => ({
          colors: config.colors || state.colors,
          direction: config.direction || state.direction,
          nextRoute: config.nextRoute ?? state.nextRoute,
          duration: config.duration ?? state.duration,
          staggerDelay: config.staggerDelay ?? state.staggerDelay,
        })),

      startTransition: (href, options) =>
        set((state) => ({
          isTransitioning: true,
          colors: options?.colors || state.colors,
          direction: options?.direction || state.direction,
          duration: options?.duration ?? state.duration,
          staggerDelay: options?.staggerDelay ?? state.staggerDelay,
          nextRoute: href,
        })),
      resetTransition: () =>
        set({
          isTransitioning: false,
        }),
    }),
    { name: "color-wipe-store" }
  )
);

export { shallow };
