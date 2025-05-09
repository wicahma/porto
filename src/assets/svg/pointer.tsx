import React, { SVGProps } from "react";

const Pointer: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="58"
        height="58"
        viewBox="0 0 58 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M49.957 15.2158L32.9648 22.499L30.249 23.6631L55.5859 49L49 55.5859L23.6631 30.249L22.499 32.9639L15.2158 49.957L2.41699 2.41699L49.957 15.2158Z"
            fill="#574BF5"
            stroke="black"
            strokeWidth="4"
        />
    </svg>
);

export default Pointer;
