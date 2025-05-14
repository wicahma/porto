"use client";
import { ILettersUpProps } from "@/interface/atoms/text";
import { cn } from "@/utils/helper/cn";
import { m, useInView, Variants } from "motion/react";
import * as React from "react";

export const LettersPull: React.FC<ILettersUpProps> = ({
    text,
    className = "",
    delay = 0,
    direction = "to-top",
    tag = "h1",
}) => {
    const Tag = tag;
    const splittedText = text.split("");

    const initial: Variants = { initial: { y: 10, opacity: 0 } };
    const animate: Variants = {
        animate: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: i * 0.05 + delay },
        }),
    };

    switch (direction) {
        case "to-bottom":
            initial.initial = { y: -10, opacity: 0 };
            animate.animate = (i: number) => ({
                y: 0,
                opacity: 1,
                transition: { delay: i * 0.05 + delay },
            });
            break;
        case "to-left":
            initial.initial = { x: 10, opacity: 0 };
            animate.animate = (i: number) => ({
                x: 0,
                opacity: 1,
                transition: { delay: i * 0.05 + delay },
            });
            break;
        case "to-right":
            initial.initial = { x: -10, opacity: 0 };
            animate.animate = (i: number) => ({
                x: 0,
                opacity: 1,
                transition: { delay: i * 0.05 + delay },
            });
            break;
        default:
            break;
    }

    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <Tag className={cn(className, "flex justify-center")}>
            {splittedText.map((current, i) => (
                <m.div
                    key={i}
                    ref={ref}
                    variants={{
                        ...initial,
                        ...animate,
                    }}
                    initial="initial"
                    animate={isInView ? "animate" : ""}
                    custom={i}
                >
                    {current == " " ? <span>&nbsp;</span> : current}
                </m.div>
            ))}
        </Tag>
    );
};
