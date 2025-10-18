"use client";
import Chip from "@/components/atoms/chips/Index";
import { WordsPull } from "@/components/atoms/text/WordsPull";
import { initialChips } from "@/constants/dummies/projects-page";
import { TChip } from "@/interface/app/projects";
import { chipTransition, chipVariants } from "@/interface/atoms/chip";
import { AnimatePresence, domMax, LazyMotion } from "motion/react";
import { useState } from "react";

const LeftCard = () => {
  const [chips, setChips] = useState<TChip[]>(initialChips);

  const toggleChip = (id: number) => {
    const updated = chips.map((chip) =>
      chip.id === id ? { ...chip, active: !chip.active } : chip
    );
    const sorted = [...updated].sort(
      (a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0)
    );
    setChips(sorted);
  };

  return (
    <>
      <div className="pt-7">
        <WordsPull
          delayWords={0.15}
          direction="to-bottom"
          className="font-bold flex text-7xl flex-wrap"
          tag="h1"
          text="This is my Projects"
        />
        <WordsPull
          delayWords={0.15}
          direction="to-bottom"
          className="font-semibold mt-6 text-xl leading-6 flex flex-wrap text-neutral-700"
          textClassName={"pr-1"}
          tag="h2"
          text="Explore all of my projects that showcase my skills and passion."
        />
      </div>
      <LazyMotion features={domMax} strict>
        <AnimatePresence>
          <div className="flex gap-2 mt-6 flex-wrap select-none">
            {chips.map((chip, i) => (
              <Chip
                key={`${chip.id}-${i}`}
                motioncomp={{
                  layout: true,
                  custom: { i },
                  style: {
                    zIndex: chip.active ? 1 : 0,
                    color: chip.active
                      ? "var(--color-neutral-900)"
                      : "var(--color-neutral-600)",
                  },
                  variants: chipVariants,
                  initial: "initial",
                  animate: "animate",
                  exit: "exit",
                  transition: chipTransition,
                }}
                active={chip.active}
                setActive={() => toggleChip(chip.id)}
              >
                <p>{chip.label}</p>
              </Chip>
            ))}
          </div>
        </AnimatePresence>
      </LazyMotion>
    </>
  );
};

export default LeftCard;
