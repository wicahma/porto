import { useEffect, useRef } from "react";

interface SmoothScrollOptions {
  speed?: number;
  smoothness?: number;
}

export const useSmoothScroll = ({
  speed = 1,
  smoothness = 0.1,
}: SmoothScrollOptions = {}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentScrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollRef.current += e.deltaY * speed;
      targetScrollRef.current = Math.max(
        0,
        Math.min(
          targetScrollRef.current,
          element.scrollHeight - element.clientHeight
        )
      );

      if (!isScrolling) {
        isScrolling = true;
        animate();
      }
    };

    const animate = () => {
      const diff = targetScrollRef.current - currentScrollRef.current;
      const delta = diff * smoothness;

      if (Math.abs(diff) > 0.5) {
        currentScrollRef.current += delta;
        element.scrollTop = currentScrollRef.current;
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        currentScrollRef.current = targetScrollRef.current;
        element.scrollTop = currentScrollRef.current;
        isScrolling = false;
      }
    };

    currentScrollRef.current = element.scrollTop;
    targetScrollRef.current = element.scrollTop;

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, smoothness]);

  return scrollRef;
};
