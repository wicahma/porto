import New from "@/assets/svg/new";
import Chip from "@/components/atoms/chips/Index";
import { WordsPull } from "@/components/atoms/text/WordsPull";
import {
    initialChips,
    initialExperience,
} from "@/constants/dummies/experience-page";
import { TChip } from "@/interface/app/experience";
import { chipTransition, chipVariants } from "@/interface/atoms/chip";
import { cn } from "@/utils/helper/cn";
import { AnimatePresence, domMax, LazyMotion } from "motion/react";
import { useState } from "react";
import { FisheyeList } from "../FisheyeList";

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
            <div className="pt-7 pb-10">
                <WordsPull
                    delayWords={0.15}
                    direction="to-bottom"
                    className="font-bold flex text-7xl flex-wrap"
                    tag="h1"
                    text="This is my experience"
                />
                <WordsPull
                    delayWords={0.15}
                    direction="to-bottom"
                    className="font-semibold mt-6 text-xl leading-6 flex flex-wrap text-neutral-700"
                    textClassName={"pr-1"}
                    tag="h2"
                    text="Explore all of my projects and experience that showcase my skills and passion."
                />
            </div>
            <LazyMotion features={domMax} strict>
                <AnimatePresence>
                    <div className="flex gap-2 mt-6">
                        {chips.map((chip, i) => (
                            <Chip
                                key={chip.id}
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
                                children={<p>{chip.label}</p>}
                            />
                        ))}
                    </div>
                </AnimatePresence>
            </LazyMotion>

            <FisheyeList
                // debug
                items={initialExperience.map((val) => (
                    <div className="flex gap-3 items-start">
                        {val.isNew && <New />}
                        <div>
                            <p className={cn("text-4xl font-semibold")}>
                                {val.text.split(" • ")[1]}
                            </p>
                            <p>{val.text.split(" • ")[0]}</p>
                        </div>
                    </div>
                ))}
            />
        </>
    );
};

export default LeftCard;
