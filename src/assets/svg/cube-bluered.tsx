import React, { SVGProps } from "react";

const CubeBluered: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="95"
        height="97"
        viewBox="0 0 95 97"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M2 23.475L47.5 45.6416V93.8639L2 74.4194V23.475Z"
            fill="#1CADFF"
        />
        <path
            d="M93 23.475L47.5 45.6416V93.8639L93 74.4194V23.475Z"
            fill="#FF4141"
        />
        <path
            d="M47.5 3V45.7778M47.5 3L2 23.6111M47.5 3L93 23.6111M47.5 45.7778L2 23.6111M47.5 45.7778L93 23.6111M47.5 45.7778V94M2 23.6111V74.5556L47.5 94M93 23.6111V74.5556L47.5 94"
            stroke="black"
            strokeWidth="4"
        />
    </svg>
);

export default CubeBluered;
