"use client";
import { IStaggerProps } from "@/interface/atoms/animation";
import { HTMLMotionProps, m, useInView, Variants } from "motion/react";
import * as React from "react";

export const StaggerPull: React.FC<IStaggerProps> = ({
    direction = "to-top",
    children,
    className = "",
    staggerChildren = 0.1,
}) => {
    const show: Variants = {
        show: {
            opacity: 1,
            y: 0,
        },
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
            };
            break;
        case "to-left":
            hidden.hidden = { x: 18, opacity: 0 };
            show.show = {
                x: 0,
                opacity: 1,
            };
            break;
        case "to-right":
            hidden.hidden = { x: -18, opacity: 0 };
            show.show = {
                x: 0,
                opacity: 1,
            };
            break;
        case "to-center":
            hidden.hidden = { z: -18, opacity: 0 };
            show.show = {
                z: 0,
                opacity: 1,
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

                return (
                    <m.div
                        {...(tag as HTMLMotionProps<"div">)}
                        variants={{
                            ...show,
                            ...hidden,
                        }}
                    />
                );
            })}
        </m.div>
    );
};
