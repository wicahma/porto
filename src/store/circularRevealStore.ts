"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";

export type CircularRevealDirectionType = "left" | "right" | "top" | "bottom";

interface CircularRevealStore {
  isTransitioning: boolean;
  color: string;
  nextRoute: string;
  clickPosition: { x: number; y: number };
  duration: number;
  initialSize: number;

  setIsTransitioning: (isTransitioning: boolean) => void;
  setTransitionConfig: (config: {
    color?: string;
    nextRoute?: string;
    clickPosition?: { x: number; y: number };
    duration?: number;
    initialSize?: number;
  }) => void;
  startTransition: (
    href: string,
    options?: {
      color?: string;
      clickPosition?: { x: number; y: number };
      duration?: number;
      initialSize?: number;
    }
  ) => void;
  resetTransition: () => void;
}

export const useCircularRevealStore = create<CircularRevealStore>()(
  devtools(
    (set) => ({
      isTransitioning: false,
      color: "#1A1A1A",
      nextRoute: "",
      clickPosition: { x: 0, y: 0 },
      duration: 0.8,
      initialSize: 20,

      setIsTransitioning: (isTransitioning) => set({ isTransitioning }),

      setTransitionConfig: (config) =>
        set((state) => ({
          color: config.color || state.color,
          nextRoute: config.nextRoute ?? state.nextRoute,
          clickPosition: config.clickPosition || state.clickPosition,
          duration: config.duration ?? state.duration,
          initialSize: config.initialSize ?? state.initialSize,
        })),

      startTransition: (href, options) =>
        set((state) => ({
          isTransitioning: true,
          color: options?.color || state.color,
          clickPosition: options?.clickPosition || state.clickPosition,
          duration: options?.duration ?? state.duration,
          initialSize: options?.initialSize ?? state.initialSize,
          nextRoute: href,
        })),

      resetTransition: () =>
        set({
          isTransitioning: false,
        }),
    }),
    { name: "circular-reveal-store" }
  )
);

export { shallow };
