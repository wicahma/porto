"use client";
import { IFadeProps } from "@/interface/atoms/animation";
import { m, useInView, Variants } from "motion/react";
import * as React from "react";

export const FadePull: React.FC<IFadeProps> = ({
    direction = "to-top",
    children,
    delay = 0,
    className = "",
    staggerChildren = 0.1,
}) => {
    const show: Variants = {
        show: { opacity: 1, y: 0, transition: { type: "spring", delay } },
    };
    const hidden: Variants = { hidden: { opacity: 0, y: 18 } };

    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    switch (direction) {
        case "to-bottom":
            hidden.hidden = { y: -18, opacity: 0 };
            show.show = {
                y: 0,
                opacity: 1,
                transition: { type: "spring", delay },
            };
            break;
        case "to-left":
            hidden.hidden = { x: 18, opacity: 0 };
            show.show = {
                x: 0,
                opacity: 1,
                transition: { type: "spring", delay },
            };
            break;
        case "to-right":
            hidden.hidden = { x: -18, opacity: 0 };
            show.show = {
                x: 0,
                opacity: 1,
                transition: { type: "spring", delay },
            };
            break;
        default:
            break;
    }

    return (
        <m.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "show" : ""}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: staggerChildren,
                    },
                },
            }}
            className={className}
        >
            {React.Children.map(children, (child) => {
                const tag = (child as React.ReactElement)
                    .props as React.AllHTMLAttributes<typeof child>;

                return React.isValidElement(child) ? (
                    <m.div
                        variants={{
                            ...show,
                            ...hidden,
                        }}
                        className={tag.className}
                    >
                        {tag.children}
                    </m.div>
                ) : (
                    child
                );
            })}
        </m.div>
    );
};
