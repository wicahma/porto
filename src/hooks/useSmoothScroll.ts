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
  smoothness = 0.07,
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
    let enabled = false;
    let initFrameId: number;
    let retryCount = 0;
    const maxRetries = 10;

    const initAfterReady = () => {
      const checkAndInit = () => {
        const isDesktop = isMdUp();
        const hasOverflow = element.scrollHeight > element.clientHeight;
        const hasHeight = element.clientHeight > 0;

        if (
          isDesktop &&
          hasHeight &&
          hasOverflow &&
          !disableOnMobile &&
          !disableOnPathname.includes(pathname)
        ) {
          enabled = true;
          return;
        }
        if (retryCount < maxRetries && isDesktop && hasHeight && !hasOverflow) {
          retryCount++;
          initFrameId = requestAnimationFrame(checkAndInit);
        }
      };

      initFrameId = requestAnimationFrame(checkAndInit);
    };

    initAfterReady();

    const mutationObserver = new MutationObserver(() => {
      const isDesktop = isMdUp();
      const hasOverflow = element.scrollHeight > element.clientHeight;
      const wasDisabled = !enabled;

      if (
        isDesktop &&
        hasOverflow &&
        !disableOnMobile &&
        wasDisabled &&
        !disableOnPathname.includes(pathname)
      ) {
        enabled = true;
        return;
      }
      if (!hasOverflow && enabled) {
        enabled = false;
      }
    });

    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
    });

    const handleResize = () => {
      const shouldBeEnabled =
        isMdUp() && !disableOnMobile && !disableOnPathname.includes(pathname);
      if (enabled !== shouldBeEnabled) {
        enabled = shouldBeEnabled;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!enabled) return;
      e.preventDefault();
      targetScrollRef.current += e.deltaY * speed;
      targetScrollRef.current = Math.max(
        0,
        Math.min(
          targetScrollRef.current,
          element.scrollHeight - element.clientHeight,
        ),
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

    window.addEventListener("resize", handleResize);
    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      if (initFrameId) {
        cancelAnimationFrame(initFrameId);
      }
      mutationObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      element.removeEventListener("wheel", handleWheel);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, smoothness, disableOnMobile, disableOnPathname, pathname]);

  return scrollRef;
};
