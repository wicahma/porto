import New from "@/assets/svg/new";
import Chip from "@/components/atoms/chips/Index";
import { WordsPull } from "@/components/atoms/text/WordsPull";
import { TChip, TExperience } from "@/interface/app/about";
import { chipTransition, chipVariants } from "@/interface/atoms/chip";
import { cn } from "@/utils/helper/cn";
import { AnimatePresence, domMax, LazyMotion, m } from "motion/react";
import { div } from "motion/react-client";
import { useState } from "react";
import { FisheyeList } from "../FisheyeList";

const initialChips: TChip[] = [
    { id: 1, label: "React", active: false },
    { id: 2, label: "Tailwind", active: false },
    { id: 3, label: "Framer Motion", active: false },
    { id: 4, label: "Next.js", active: false },
];

const initialExperience: TExperience[] = [
    {
        id: 1,
        isNew: true,
        text: "2025 • WEB GiS",
    },
    {
        id: 2,
        isNew: true,
        text: "2024 • AI Project",
    },
    {
        id: 3,
        isNew: true,
        text: "2023 • Website Bakwan Kawi",
    },
    {
        id: 3,
        isNew: true,
        text: "2023 • Kawi For Lyfe",
    },
    {
        id: 3,
        isNew: true,
        text: "2023 • No Bakwan No Life",
    },
    {
        id: 3,
        isNew: true,
        text: "2023 • Brr brr patapim",
    },
    {
        id: 3,
        isNew: false,
        text: "2022 • Anomaly Management",
    },
    {
        id: 3,
        isNew: false,
        text: "2021 • Project Kampus",
    },
    {
        id: 3,
        isNew: false,
        text: "2021 • Reksata",
    },
    {
        id: 3,
        isNew: false,
        text: "2021 • Tung Tung Tung Tung Sawrrr",
    },
    {
        id: 3,
        isNew: false,
        text: "2020 • Bombardilo Crocodilo",
    },
    {
        id: 3,
        isNew: false,
        text: "2020 • Cappucino Assasino",
    },
    {
        id: 3,
        isNew: false,
        text: "2020 • Nengarepo Mambubangkeno",
    },
    {
        id: 3,
        isNew: false,
        text: "2023 • Infokan lemburan",
    },
    {
        id: 3,
        isNew: false,
        text: "2023 • Mbuh wes",
    },
    {
        id: 3,
        isNew: false,
        text: "2023 • Rareti meh diisi opoe",
    },
    {
        id: 3,
        isNew: false,
        text: "2023 • Cok",
    },
    {
        id: 3,
        isNew: false,
        text: "2023 • Kerja kerja kerja tipes",
    },
];

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
            <div>
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
                        <p className={cn("text-4xl font-semibold")}>
                            {val.text}
                        </p>
                    </div>
                ))}
            />
        </>
    );
};

export default LeftCard;
