"use client";
import { m, AnimatePresence } from "motion/react";
import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  onClick?: boolean;
}

export default function Tooltip({
  children,
  content,
  position = "bottom",
  onClick = false,
}: Readonly<TooltipProps>) {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    if (!onClick) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!onClick) {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    if (onClick) {
      setIsVisible(!isVisible);
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 -translate-x-1/2 pb-2";
      case "bottom":
        return "top-full right-0 pt-2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2 pr-2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 pl-2";
      default:
        return "top-full right-0 pt-2";
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case "top":
        return "top-full left-1/2 -translate-x-1/2 -mt-[9px] rotate-45";
      case "bottom":
        return "-top-[0px] right-8 rotate-45";
      case "left":
        return "left-full top-1/2 -translate-y-1/2 -ml-[9px] rotate-45";
      case "right":
        return "right-full top-1/2 -translate-y-1/2 -mr-[9px] rotate-45";
      default:
        return "-top-[9px] right-8 rotate-45";
    }
  };

  return (
    <div
      className="relative inline-block"
      role="tooltip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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
              className="hoverable relative overflow-hidden bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl"
            >
              {content}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
