"use client";

import {
  CarouselCardStyle,
  StackedCarouselProps,
} from "@/interface/atoms/stackedCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const StackedCarousel = <T,>({
  items,
  renderCard,
  autoPlayDuration = 0,
  blurIntensity = 4,
  overlapSpace = 120,
  cardWidth = 400,
  cardHeight = 500,
  className = "",
}: StackedCarouselProps<T>) => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  const getCardStyle = useCallback(
    (relativePosition: number): CarouselCardStyle => {
      const absPosition = Math.abs(relativePosition);

      if (absPosition === 0) {
        return {
          scale: 1,
          blur: 0,
          zIndex: 50,
          opacity: 1,
          x: 0,
        };
      }

      if (absPosition === 1) {
        return {
          scale: 0.85,
          blur: blurIntensity * 0.5,
          zIndex: 40,
          opacity: 0.9,
          x: relativePosition * overlapSpace,
        };
      }

      return {
        scale: 0.7,
        blur: blurIntensity,
        zIndex: 30,
        opacity: 0.6,
        x: relativePosition * overlapSpace,
      };
    },
    [blurIntensity, overlapSpace]
  );

  const navigate = useCallback(
    (direction: "next" | "prev") => {
      setActiveIndex((current) => {
        if (direction === "next") {
          return current === items.length - 1 ? 0 : current + 1;
        } else {
          return current === 0 ? items.length - 1 : current - 1;
        }
      });
    },
    [items.length]
  );

  useEffect(() => {
    if (autoPlayDuration > 0 && !isPaused && items.length > 0) {
      const interval = setInterval(() => {
        navigate("next");
      }, autoPlayDuration);

      return () => clearInterval(interval);
    }
  }, [autoPlayDuration, isPaused, navigate, items.length]);

  const getVisibleItems = useCallback(() => {
    const visible = [];
    const totalItems = items.length;

    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + totalItems) % totalItems;
      visible.push({
        item: items[index],
        originalIndex: index,
        relativePosition: i,
      });
    }

    return visible;
  }, [items, activeIndex]);

  const visibleItems = getVisibleItems();

  return (
    <div className={`relative w-full ${className}`}>
      <section
        className="relative flex items-center justify-center"
        style={{ height: `${cardHeight}px` }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-roledescription="carousel"
        aria-label="Stacked Carousel"
      >
        <div className="absolute pointer-events-none h-full top-1/2 -translate-y-1/2 left-0 z-[100] w-full flex justify-between">
          <button
            onClick={() => navigate("prev")}
            className="group rounded-full transition-colors pointer-events-auto cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:scale-110" />
          </button>
          <button
            onClick={() => navigate("next")}
            className="group rounded-full transition-colors pointer-events-auto cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:scale-110" />
          </button>
        </div>
        <AnimatePresence initial={false}>
          {visibleItems.map(({ item, originalIndex, relativePosition }) => {
            const style = getCardStyle(relativePosition);

            return (
              <m.div
                key={originalIndex}
                className="absolute"
                style={{
                  zIndex: style.zIndex,
                  width: `${cardWidth}px`,
                }}
                initial={{
                  scale: style.scale,
                  x: style.x,
                  filter: `blur(${style.blur}px)`,
                  opacity: style.opacity,
                }}
                animate={{
                  scale: style.scale,
                  x: style.x,
                  filter: `blur(${style.blur}px)`,
                  opacity: style.opacity,
                }}
                transition={{
                  duration: 1,
                  ease: [0.32, 0.72, 0, 1],
                }}
                onClick={() => {
                  if (relativePosition !== 0) {
                    setActiveIndex(originalIndex);
                  }
                }}
              >
                {renderCard(item, originalIndex, relativePosition === 0)}
              </m.div>
            );
          })}
        </AnimatePresence>
      </section>

      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={`${_}${index}`}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer h-2 rounded-full transition-all ${
                index === activeIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-[#ABABAB]/30 hover:bg-[#ABABAB]/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackedCarousel;
