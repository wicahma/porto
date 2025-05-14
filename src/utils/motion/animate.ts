import { Variants } from "motion/react";

export const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = i * 0.5;
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring", duration: 15, bounce: 0 },
                opacity: { delay, duration: 0.5 },
            },
        };
    },
};
