import React, { SVGProps } from "react";

const LampOff: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="800"
        height="800"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx="400" cy="395" r="5" fill="#35361B" />
        <path
            d="M404.763 412.398V410.053C404.763 407.219 407.845 404.538 409.844 402.626C412.662 399.932 414.144 396.312 414.144 392.072C414.144 384.254 407.916 378 400.072 378C398.223 377.995 396.39 378.355 394.681 379.061C392.971 379.766 391.418 380.802 390.11 382.11C388.802 383.418 387.766 384.971 387.061 386.681C386.355 388.39 385.995 390.223 386 392.072C386 396.161 387.545 400.025 390.3 402.626C392.288 404.503 395.381 407.189 395.381 410.053V412.398M396.945 421.779H403.199M395.381 417.089H404.763M400.072 412.398V399.89"
            stroke="#5A5A5A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M403.785 398.326C403.785 398.326 401.683 399.89 400.072 399.89C398.461 399.89 396.359 398.326 396.359 398.326"
            stroke="#5A5A5A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default LampOff;
