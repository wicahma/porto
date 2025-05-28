import Carousel from "@/components/atoms/Carousel";
import React, { useState } from "react";
import MultiCarousel from "../MultiCarousel";
import { m, Variants } from "motion/react";

const variants: Variants = {
    inUp: {
        y: 0,
        scale: 1,
        opacity: 1,
    },
    outUp: {
        y: -100,
        scale: 0.9,
        opacity: 0,
    },
    inDown: {
        y: 0,
        opacity: 1,
        scale: 1,
    },
    outDown: {
        y: 100,
        opacity: 0,
        scale: 0.9,
    },
};

const RightCard = () => {
    const [isHover, setIsHover] = useState(false);
    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="unhoverable relative rounded-xl p-3 h-full w-full space-y-2"
        >
            <MultiCarousel
                isHover={isHover}
                className="absolute bottom-1/2 translate-y-1/2 left-0 min-w-0 min-h-0 w-full z-10 pointer-events-none"
            />
            <m.div
                className="absolute flex pt-32 justify-center top-0 left-0 py-3 px-5 w-full h-full"
                variants={variants}
                animate={isHover ? "inUp" : "outDown"}
            >
                Bwaaaaaaa!
            </m.div>
        </div>
    );
};

export default RightCard;
