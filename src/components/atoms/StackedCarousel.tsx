"use client";

import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "motion/react";
import ArrowRight from "@/assets/svg/arrow-right";
import {
  StackedCarouselProps,
  CarouselCardStyle,
} from "@/interface/atoms/stackedCarousel";

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
  const [activeIndex, setActiveIndex] = useState(2); // Start with center card (index 2 of 5 visible)
  const [isPaused, setIsPaused] = useState(false);

  // Calculate card style based on position relative to center
  const getCardStyle = useCallback(
    (relativePosition: number): CarouselCardStyle => {
      const absPosition = Math.abs(relativePosition);

      // Center card (position 0)
      if (absPosition === 0) {
        return {
          scale: 1,
          blur: 0,
          zIndex: 50,
          opacity: 1,
          x: 0,
        };
      }

      // Adjacent cards (position ±1)
      if (absPosition === 1) {
        return {
          scale: 0.85,
          blur: blurIntensity * 0.5,
          zIndex: 40,
          opacity: 0.9,
          x: relativePosition * overlapSpace,
        };
      }

      // Outer cards (position ±2)
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

  // Navigate to next/previous card
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

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayDuration > 0 && !isPaused && items.length > 0) {
      const interval = setInterval(() => {
        navigate("next");
      }, autoPlayDuration);

      return () => clearInterval(interval);
    }
  }, [autoPlayDuration, isPaused, navigate, items.length]);

  // Get visible items (5 cards centered around active)
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
      {/* Carousel Container */}
      <section
        className="relative flex items-center justify-center"
        style={{ height: `${cardHeight}px` }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-roledescription="carousel"
        aria-label="Stacked Carousel"
      >
        <AnimatePresence initial={false}>
          {visibleItems.map(({ item, originalIndex, relativePosition }) => {
            const style = getCardStyle(relativePosition);

            return (
              <m.div
                key={originalIndex}
                className="absolute cursor-pointer"
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

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-8 mt-8">
        <button
          onClick={() => navigate("prev")}
          className="group p-3 rounded-full border border-[#ABABAB]/30 hover:border-white/50 transition-colors"
          aria-label="Previous"
        >
          <ArrowRight className="w-6 h-6 rotate-180 transition-transform group-hover:scale-110" />
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-[#ABABAB]/30 hover:bg-[#ABABAB]/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => navigate("next")}
          className="group p-3 rounded-full border border-[#ABABAB]/30 hover:border-white/50 transition-colors"
          aria-label="Next"
        >
          <ArrowRight className="w-6 h-6 transition-transform group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
};

export default StackedCarousel;
