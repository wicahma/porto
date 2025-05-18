"use client";
import { IWordsUpProps } from "@/interface/atoms/text";
import { cn } from "@/utils/helper/cn";
import { m, useInView, Variants } from "motion/react";
import * as React from "react";

export const WordsPull: React.FC<IWordsUpProps> = ({
    text,
    className = "",
    direction = "to-top",
    delay = 0,
    delayWords = 0.05,
    textClassName = "pr-2",
    tag = "h1",
}) => {
    const Tag = tag;
    const splittedText = text.split(" ");

    const initial: Variants = { initial: { y: 20, opacity: 0 } };
    const animate: Variants = {
        animate: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: i * delayWords + delay },
        }),
    };

    switch (direction) {
        case "to-bottom":
            initial.initial = { y: -20, opacity: 0 };
            animate.animate = (i: number) => ({
                y: 0,
                opacity: 1,
                transition: { delay: i * delayWords + delay },
            });
            break;
        case "to-left":
            initial.initial = { x: 20, opacity: 0 };
            animate.animate = (i: number) => ({
                x: 0,
                opacity: 1,
                transition: { delay: i * delayWords + delay },
            });
            break;
        case "to-right":
            initial.initial = { x: -20, opacity: 0 };
            animate.animate = (i: number) => ({
                x: 0,
                opacity: 1,
                transition: { delay: i * delayWords + delay },
            });
            break;
        case "to-center":
            initial.initial = { z: -20, opacity: 0 };
            animate.animate = (i: number) => ({
                z: 0,
                opacity: 1,
                transition: { delay: i * delayWords + delay },
            });
            break;
        default:
            break;
    }
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <Tag className={cn("flex", className)}>
            {splittedText.map((current, i) => (
                <m.span
                    key={i}
                    ref={ref}
                    variants={{
                        ...initial,
                        ...animate,
                    }}
                    initial="initial"
                    animate={isInView ? "animate" : ""}
                    custom={i}
                    className={cn("text-center", textClassName)}
                >
                    {current == "" ? <span>&nbsp;</span> : current}
                </m.span>
            ))}
        </Tag>
    );
};
