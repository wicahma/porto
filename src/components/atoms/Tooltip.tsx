"use client";
import { m, AnimatePresence } from "motion/react";
import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
  children,
  content,
  position = "bottom",
}: Readonly<TooltipProps>) {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-2 left-1/2 -translate-x-1/2";
      case "bottom":
        return "top-full mt-2 right-0";
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2";
      default:
        return "top-full mt-2 right-0";
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case "top":
        return "top-full left-1/2 -translate-x-1/2 -mt-2 rotate-45";
      case "bottom":
        return "-top-2 right-8 rotate-45";
      case "left":
        return "left-full top-1/2 -translate-y-1/2 -ml-2 rotate-45";
      case "right":
        return "right-full top-1/2 -translate-y-1/2 -mr-2 rotate-45";
      default:
        return "-top-2 right-8 rotate-45";
    }
  };

  return (
    <div
      className="relative inline-block"
      role="tooltip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute ${getPositionClasses()} z-50`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`absolute w-4 h-4 bg-neutral-900 border-t border-l border-neutral-800 ${getArrowClasses()}`}
            />

            <div
              role="tooltip"
              className="hoverable relative overflow-hidden bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl"
            >
              {content}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
