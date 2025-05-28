import React from "react";
import Carousel from "../atoms/Carousel";
import { IMultiCarouselProps } from "@/interface/molecules/MultiCarousel";
import { cn } from "@/utils/helper/cn";
import { m, Variants } from "motion/react";
import { Transition } from "motion";

const variants: Variants = {
    inUp: {
        y: 0,
        scale: 1,
        opacity: 1,
        // filter: "blur(0)",
    },
    outUp: (range) => ({
        y: -100 - 20 * range,
        scale: 0.95,
        opacity: 0.2,
        // filter: "blur(5px)",
    }),
    inDown: {
        y: 0,
        opacity: 1,
        scale: 1,
        // filter: "blur(0)",
    },
    outDown: (range) => ({
        y: 100 + 20 * range,
        opacity: 0.2,
        scale: 0.95,
        // filter: "blur(5px)",
    }),
};

const transition: Transition = {
    duration: 150 / 1000,
};

const MultiCarousel: React.FC<IMultiCarouselProps> = ({
    className,
    isHover = false,
}) => {
    return (
        <div className={cn("space-y-6", className)}>
            <m.div
                animate={isHover ? "outUp" : "inDown"}
                custom={2}
                variants={variants}
                transition={transition}
            >
                <Carousel
                    direction="right"
                    contentWidth="300px"
                    contentSpace="12px"
                    // debug
                    images={[
                        "https://picsum.photos/seed/11/768/480",
                        "https://picsum.photos/seed/12/768/480",
                        "https://picsum.photos/seed/13/768/480",
                        "https://picsum.photos/seed/14/768/480",
                        "https://picsum.photos/seed/15/768/480",
                    ]}
                    speed={0.05}
                />
            </m.div>
            <m.div
                animate={isHover ? "outDown" : "inUp"}
                custom={2}
                variants={variants}
                transition={transition}
            >
                <Carousel
                    containerClassName=""
                    direction="left"
                    contentWidth="300px"
                    contentSpace="12px"
                    // debug
                    images={[
                        "https://picsum.photos/seed/21/768/480",
                        "https://picsum.photos/seed/22/768/480",
                        "https://picsum.photos/seed/23/768/480",
                        "https://picsum.photos/seed/24/768/480",
                        "https://picsum.photos/seed/25/768/480",
                        "https://picsum.photos/seed/26/768/480",
                    ]}
                    speed={0.05}
                />
            </m.div>
            <m.div
                animate={isHover ? "outDown" : "inUp"}
                variants={variants}
                custom={1}
                transition={transition}
            >
                <Carousel
                    containerClassName=""
                    direction="right"
                    contentWidth="300px"
                    contentSpace="12px"
                    // debug
                    images={[
                        "https://picsum.photos/seed/31/768/480",
                        "https://picsum.photos/seed/32/768/480",
                        "https://picsum.photos/seed/33/768/480",
                        "https://picsum.photos/seed/34/768/480",
                        "https://picsum.photos/seed/35/768/480",
                        "https://picsum.photos/seed/36/768/480",
                        "https://picsum.photos/seed/37/768/480",
                    ]}
                    speed={0.05}
                />
            </m.div>
        </div>
    );
};

export default MultiCarousel;
