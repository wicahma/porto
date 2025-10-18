"use client";
import Chip from "@/components/atoms/chips/Index";
import { WordsPull } from "@/components/atoms/text/WordsPull";
import { initialBlogCategories } from "@/constants/dummies/blog-page";
import { TBlogCategory } from "@/interface/app/blog";
import { chipTransition, chipVariants } from "@/interface/atoms/chip";
import { AnimatePresence, domMax, LazyMotion, m } from "motion/react";
import { useState } from "react";

const LeftCard = () => {
  const [categories, setCategories] = useState<TBlogCategory[]>(
    initialBlogCategories
  );
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCategory = (id: number) => {
    const updated = categories.map((category) =>
      category.id === id ? { ...category, active: !category.active } : category
    );
    const sorted = [...updated].sort(
      (a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0)
    );
    setCategories(sorted);
  };

  return (
    <div className="mb-10">
      <div className="mb-8">
        <WordsPull
          delayWords={0.15}
          direction="to-bottom"
          className="font-bold flex text-6xl md:text-7xl flex-wrap mb-4"
          tag="h1"
          text="Blog & Articles"
        />
        <WordsPull
          delayWords={0.15}
          direction="to-bottom"
          className="font-semibold text-lg md:text-xl leading-6 flex flex-wrap text-neutral-700"
          textClassName={"pr-1"}
          tag="h2"
          text="Thoughts, tutorials, and insights about web development and design."
        />
      </div>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 bg-neutral-800 border border-neutral-700 rounded-full text-white placeholder-neutral-500 focus:outline-none focus:border-orange-400 transition-colors"
        />
      </m.div>

      <LazyMotion features={domMax} strict>
        <AnimatePresence>
          <div className="flex gap-2 flex-wrap select-none">
            {categories.map((category, i) => (
              <Chip
                key={category.id}
                motioncomp={{
                  layout: true,
                  custom: { i },
                  style: {
                    zIndex: category.active ? 1 : 0,
                    color: category.active
                      ? "var(--color-neutral-900)"
                      : "var(--color-neutral-600)",
                  },
                  variants: chipVariants,
                  initial: "initial",
                  animate: "animate",
                  exit: "exit",
                  transition: chipTransition,
                }}
                active={category.active}
                setActive={() => toggleCategory(category.id)}
              >
                <p>{category.label}</p>
              </Chip>
            ))}
          </div>
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

export default LeftCard;
