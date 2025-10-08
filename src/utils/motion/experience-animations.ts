import { Variants } from "motion/react";

export const colorWipeVariants: Variants = {
  hidden: {
    x: "-100%",
  },
  visible: (custom: { direction: string; delay: number }) => ({
    x: "100%",
    transition: {
      duration: 0.8,
      delay: custom.delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const experienceItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.1,
      ease: "easeOut",
    },
  }),
  hover: {
    y: -5,
    scale: 1.03,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.97,
    transition: {
      duration: 0.1,
    },
  },
};

export const connectorVariants: Variants = {
  hidden: { height: 0 },
  visible: (custom: number) => ({
    height: "100%",
    transition: {
      duration: 0.8,
      delay: custom * 0.1 + 0.3,
      ease: "easeInOut",
    },
  }),
};

export const skillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: custom * 0.05,
      ease: "easeOut",
    },
  }),
};

export const achievementVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.1,
      ease: "easeOut",
    },
  }),
};

export const detailTransitionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const wipeOverlayVariants: Variants = {
  initial: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    pointerEvents: "none",
  },
};
