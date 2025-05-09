import React, { SVGProps } from "react";

const LampOn: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
        width="800"
        height="800"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g filter="url(#filter0_ddd_1675_30)">
            <circle cx="400" cy="395" r="5" fill="#FAFF00" />
        </g>
        <path
            d="M404.763 412.398V410.053C404.763 407.219 407.845 404.538 409.844 402.626C412.662 399.932 414.144 396.312 414.144 392.072C414.144 384.254 407.916 378 400.072 378C398.223 377.995 396.39 378.355 394.681 379.061C392.971 379.766 391.418 380.802 390.11 382.11C388.802 383.418 387.766 384.971 387.061 386.681C386.355 388.39 385.995 390.223 386 392.072C386 396.161 387.545 400.025 390.3 402.626C392.288 404.503 395.381 407.189 395.381 410.053V412.398M396.945 421.779H403.199M395.381 417.089H404.763M400.072 412.398V399.89"
            stroke="#FBFBFB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M403.785 398.326C403.785 398.326 401.683 399.89 400.072 399.89C398.461 399.89 396.359 398.326 396.359 398.326"
            stroke="#FBFBFB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <defs>
            <filter
                id="filter0_ddd_1675_30"
                x="105"
                y="100"
                width="590"
                height="590"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feMorphology
                    radius="177"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect1_dropShadow_1675_30"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="56.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.980392 0 0 0 0 1 0 0 0 0 0.054902 0 0 0 0.25 0"
                />
                <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1675_30"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feMorphology
                    radius="23"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect2_dropShadow_1675_30"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="38.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.980392 0 0 0 0 1 0 0 0 0 0.054902 0 0 0 1 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_1675_30"
                    result="effect2_dropShadow_1675_30"
                />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feMorphology
                    radius="4"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect3_dropShadow_1675_30"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="4" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.980392 0 0 0 0 1 0 0 0 0 0.054902 0 0 0 0.38 0"
                />
                <feBlend
                    mode="normal"
                    in2="effect2_dropShadow_1675_30"
                    result="effect3_dropShadow_1675_30"
                />
                <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect3_dropShadow_1675_30"
                    result="shape"
                />
            </filter>
        </defs>
    </svg>
);

export default LampOn;
