"use client";

import { m } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface ThreeDCursorProps {
  isDragging?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const ThreeDCursor: React.FC<ThreeDCursorProps> = ({
  isDragging = false,
  children,
  className = "",
}) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement> | MouseEvent
  ) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setCursorVisible(true);
  };

  const handleMouseLeave = () => {
    setCursorVisible(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className={`${className} relative cursor-none`}>
      {/* Custom cursor */}
      <m.div
        className="absolute pointer-events-none z-50"
        animate={{
          opacity: cursorVisible && !isDragging ? 1 : 0,
          x: position.x,
          y: position.y,
          scale: isDragging ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 500,
          damping: 28,
        }}
        style={{
          left: -15,
          top: -15,
        }}
      >
        <div className="w-[30px] h-[30px] flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-white bg-blue-500/30 backdrop-blur-sm flex items-center justify-center">
            {isDragging ? (
              <m.svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </m.svg>
            ) : (
              <div className="w-1 h-1 bg-white rounded-full"></div>
            )}
          </div>
        </div>
      </m.div>

      {children}
    </div>
  );
};

export default ThreeDCursor;
