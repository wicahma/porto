import { ForwardRefComponent, HTMLMotionProps, Variants } from "motion/react";
import { ReactNode } from "react";
import { TCustom } from "../app/experience";
import { Transition } from "motion";

export interface IChipProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    readonly active: boolean;
    readonly setActive: (active: boolean) => void;
    readonly children?: ReactNode;
    motioncomp: HTMLMotionProps<"div">;
    childClassName?: string;
}

export const chipTransition: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
};

export const chipVariants: Variants = {
    animate: ({ i }: TCustom) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.2,
        },
    }),
    initial: {
        opacity: 0,
        scale: 0.3,
    },
    exit: { opacity: 0 },
};
