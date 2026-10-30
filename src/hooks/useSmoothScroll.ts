import { isMdUp } from "@/utils/helper/responsive";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export interface SmoothScrollOptions {
  disableOnMobile?: boolean;
  disableOnPathname?: string[];
  speed?: number;
  smoothness?: number;
}

export const useSmoothScroll = ({
  speed = 1,
  smoothness = 0.1,
  disableOnMobile = false,
  disableOnPathname = [],
}: SmoothScrollOptions = {}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentScrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const animationFrameRef = useRef<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    let isScrolling = false;

    const checkIsElementScrollable = () => {
      const cs = window.getComputedStyle(element);
      return (
        element.scrollHeight > element.clientHeight &&
        cs.overflowY !== "visible" &&
        cs.overflowY !== "hidden"
      );
    };

    let useElementScroll = checkIsElementScrollable();

    const getMaxScroll = () => {
      if (useElementScroll) {
        return Math.max(0, element.scrollHeight - element.clientHeight);
      }
      return Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
    };

    const getCurrentScroll = () => {
      if (useElementScroll) {
        return element.scrollTop;
      }
      return window.scrollY;
    };

    const performScroll = (val: number) => {
      if (useElementScroll) {
        element.scrollTop = val;
      } else {
        window.scrollTo(0, val);
      }
    };

    const animate = () => {
      const diff = targetScrollRef.current - currentScrollRef.current;
      const delta = diff * smoothness;

      if (Math.abs(diff) > 0.5) {
        currentScrollRef.current += delta;
        performScroll(currentScrollRef.current);
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        currentScrollRef.current = targetScrollRef.current;
        performScroll(currentScrollRef.current);
        isScrolling = false;
      }
    };

    // Fast O(1) check: true when the gesture starts inside any scrollable container
    // or portaled overlay that this hook does not drive. Avoids calling getComputedStyle
    // inside handleWheel, eliminating forced synchronous layout recalculation jank.
    const isInsideNestedScroller = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;

      // Instant check for scroll containers and dialogs
      const nested = target.closest(
        "pre, code, textarea, [data-scrollable], [data-lenis-prevent], [role='dialog'], .overflow-y-auto, .overflow-y-scroll, .overflow-auto, .overflow-scroll"
      );
      if (nested && nested !== element) return true;

      // Any fixed overlay / portaled modal
      if (target.closest("[role='dialog'], [data-scrollable], .fixed")) {
        return true;
      }

      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      const isDesktop = disableOnMobile ? isMdUp() : true;
      if (!isDesktop || disableOnPathname.includes(pathname)) return;

      useElementScroll = checkIsElementScrollable();
      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) return;

      // Never hijack a gesture that belongs to a nested scroller.
      if (isInsideNestedScroller(e.target)) return;

      e.preventDefault();

      // Sync before adding delta in case of manual scroll
      if (!isScrolling) {
        currentScrollRef.current = getCurrentScroll();
        targetScrollRef.current = getCurrentScroll();
      }

      targetScrollRef.current += e.deltaY * speed;
      targetScrollRef.current = Math.max(
        0,
        Math.min(targetScrollRef.current, maxScroll),
      );

      if (!isScrolling) {
        isScrolling = true;
        animate();
      }
    };

    const handleNativeScroll = () => {
      if (!isScrolling) {
        const current = getCurrentScroll();
        currentScrollRef.current = current;
        targetScrollRef.current = current;
      }
    };

    currentScrollRef.current = getCurrentScroll();
    targetScrollRef.current = getCurrentScroll();

    window.addEventListener("scroll", handleNativeScroll, { passive: true });
    element.addEventListener("scroll", handleNativeScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleNativeScroll);
      element.removeEventListener("scroll", handleNativeScroll);
      window.removeEventListener("wheel", handleWheel);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, smoothness, disableOnMobile, disableOnPathname, pathname]);

  return scrollRef;
};
