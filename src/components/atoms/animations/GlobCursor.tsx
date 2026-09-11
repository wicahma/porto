import { useViewModeStore } from "@/store/viewModeStore";
import { cn } from "@/utils/helper/cn";
import {
  domMax,
  LazyMotion,
  m,
  SpringOptions,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import React, { useEffect, useState } from "react";

export const GlobCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const isSimpleMode = useViewModeStore((state) => state.isSimpleMode);

  useEffect(() => {
    const handleResize = () => {
      setEnabled(globalThis.innerWidth >= 768);
    };

    handleResize();
    globalThis.addEventListener("resize", handleResize);
    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);

  const springOpt: SpringOptions = {
    stiffness: 800,
    damping: 50,
    mass: 2,
  };
  const [hoverable, setHoverable] = useState(false);
  const [unhoverable, setUnhoverable] = useState(false);
  const [cursor, setCursor] = useState("");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const width = useSpring(40, { stiffness: 300, damping: 30 });
  const height = useSpring(40, { stiffness: 300, damping: 30 });
  const left = useSpring(0, springOpt);
  const right = useSpring(0, springOpt);
  const top = useSpring(0, springOpt);
  const bottom = useSpring(0, springOpt);
  const borderRadius = useSpring(100, springOpt);
  const bf = useSpring(0, springOpt);
  const backdropFilter = useMotionTemplate`blur(${bf}px)`;
  const clipPath = useMotionTemplate`polygon(0% 0%, 0% 100%, ${left}px 100%, ${left}px ${top}px, ${right}px ${top}px, ${right}px ${bottom}px, ${left}px ${bottom}px, ${left}px 100%, 100% 100%, 100% 0%)`;
  const smoothX = useSpring(0, springOpt);
  const smoothY = useSpring(0, springOpt);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const unhoverTarget = target.closest(".unhoverable") as HTMLElement;
      if (unhoverTarget) {
        setHoverable(false);
        setUnhoverable(true);
        width.set(0);
        height.set(0);
        bf.set(0);
        return;
      }

      const hoverTarget = target.closest(".hoverable") as HTMLElement;

      const tCursor = globalThis.getComputedStyle(target)["cursor"];
      setUnhoverable(false);
      setCursor(tCursor);

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);

      if (hoverTarget) {
        const padding = 10;
        const rect = hoverTarget.getBoundingClientRect();
        borderRadius.set(5);

        left.set(rect.left - padding);
        right.set(rect.right + padding);
        top.set(rect.top - padding);
        bottom.set(rect.bottom + padding);

        const paddedWidth = rect.width + padding * 2;
        const paddedHeight = rect.height + padding * 2;

        width.set(paddedWidth);
        height.set(paddedHeight);
        smoothX.set(rect.left + rect.width / 2);
        smoothY.set(rect.top + rect.height / 2);
        bf.set(15);

        setHoverable(true);
      } else {
        if (tCursor === "pointer") {
          const cs = 60;

          width.set(cs);
          height.set(cs);
          borderRadius.set(100);
          return;
        }
        const circSize = 30;

        setHoverable(false);
        width.set(circSize);
        height.set(circSize);
        borderRadius.set(100);
        bf.set(0);
      }
    };

    const handleMouseLeave = () => {
      const circSize = 0;

      setHoverable(false);
      width.set(circSize);
      height.set(circSize);
      borderRadius.set(0);
      bf.set(0);
    };

    const handleMouseEnter = () => {
      const circSize = 30;

      setHoverable(false);
      width.set(circSize);
      height.set(circSize);
      borderRadius.set(100);
      bf.set(0);
    };

    globalThis.addEventListener("mousemove", handleMouseMove);
    globalThis.addEventListener("mouseenter", handleMouseEnter);
    globalThis.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      globalThis.removeEventListener("mousemove", handleMouseMove);
      globalThis.removeEventListener("mouseenter", handleMouseEnter);
      globalThis.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled]);

  // Clean up motion values on unmount
  useEffect(() => {
    return () => {
      cursorX.destroy();
      cursorY.destroy();
      width.destroy();
      height.destroy();
      left.destroy();
      right.destroy();
      top.destroy();
      bottom.destroy();
      borderRadius.destroy();
      bf.destroy();
      backdropFilter.destroy();
      clipPath.destroy();
      smoothX.destroy();
      smoothY.destroy();
    };
  }, []);

  if (!enabled || isSimpleMode) return null;

  return (
    <LazyMotion features={domMax} strict>
      {hoverable && (
        <style jsx global>{`
          * {
            cursor: none !important;
          }
        `}</style>
      )}

      <m.div
        className="fixed inset-0 z-9999 pointer-events-none"
        style={{
          backdropFilter,
          clipPath,
        }}
      />

      <m.div
        className={cn(
          "fixed z-9999 pointer-events-none -translate-x-1/2 -translate-y-1/2",
          hoverable
            ? "border-2 border-neutral-500/50"
            : "bg-white/20 backdrop-blur-xs",
          cursor === "pointer" && !unhoverable
            ? "border border-neutral-50 bg-white/10 backdrop-blur-none"
            : null,
        )}
        style={{
          x: smoothX,
          y: smoothY,
          width,
          height,
          borderRadius,
        }}
      />

      {(hoverable || cursor === "pointer") && (
        <m.div
          className="fixed z-10000 pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
          style={{
            x: cursorX,
            y: cursorY,
            width: 8,
            height: 8,
          }}
        />
      )}
    </LazyMotion>
  );
};
