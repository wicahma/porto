import { draw } from "@/utils/motion/animate";
import { m, SVGMotionProps } from "motion/react";
import React from "react";

const CubeBluered: React.FC<SVGMotionProps<SVGSVGElement>> = (props) => (
    <m.svg
        variants={draw}
        initial="hidden"
        animate="visible"
        width="95"
        height="97"
        viewBox="0 0 95 97"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <m.path
            initial="hidden"
            animate="visible"
            variants={draw}
            custom={0.5}
            d="M2 23.475L47.5 45.6416V93.8639L2 74.4194V23.475Z"
            fill="#1CADFF"
        />
        <m.path
            d="M93 23.475L47.5 45.6416V93.8639L93 74.4194V23.475Z"
            initial="hidden"
            animate="visible"
            custom={0.5}
            variants={draw}
            fill="#FF4141"
        />
        <m.path
            d="M47.5 3V45.7778M47.5 3L2 23.6111M47.5 3L93 23.6111M47.5 45.7778L2 23.6111M47.5 45.7778L93 23.6111M47.5 45.7778V94M2 23.6111V74.5556L47.5 94M93 23.6111V74.5556L47.5 94"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={draw}
            stroke="black"
            strokeWidth="4"
        />
    </m.svg>
);

export default CubeBluered;
