"use client";

import Chip from "@/components/atoms/chips/Index";
import { chipTransition, chipVariants } from "@/interface/atoms/chip";
import { TChip } from "@/interface/app/experience";
import { AnimatePresence, domMax, LazyMotion } from "motion/react";
import { useState } from "react";

interface ChipGroupProps {
  initialChips: TChip[];
  activeColor?: string;
  multiSelect?: boolean;
  onChipsChange?: (chips: TChip[]) => void;
}

const ChipGroup: React.FC<ChipGroupProps> = ({
  initialChips,
  activeColor = "bg-pink-400",
  multiSelect = false,
  onChipsChange,
}) => {
  const [chips, setChips] = useState<TChip[]>(initialChips);

  const toggleChip = (id: number) => {
    let updated: TChip[];

    if (multiSelect) {
      // Multi-select: toggle the clicked chip
      updated = chips.map((chip) =>
        chip.id === id ? { ...chip, active: !chip.active } : chip
      );
    } else {
      // Single-select: only one chip can be active
      updated = chips.map((chip) => ({
        ...chip,
        active: chip.id === id,
      }));
    }

    // Sort with active chips first
    const sorted = [...updated].sort((a, b) => {
      if (a.active === b.active) return 0;
      return a.active ? -1 : 1;
    });

    setChips(sorted);
    onChipsChange?.(sorted);
  };

  return (
    <LazyMotion features={domMax} strict>
      <AnimatePresence mode="popLayout">
        <div className="flex gap-2 flex-wrap">
          {chips.map((chip, i) => (
            <Chip
              key={chip.id}
              activeColor={activeColor}
              motioncomp={{
                layout: true,
                custom: { i },
                style: {
                  zIndex: chip.active ? 1 : 0,
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
  );
};

export default ChipGroup;
