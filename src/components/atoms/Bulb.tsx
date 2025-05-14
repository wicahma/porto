import LampOff from "@/assets/svg/lamp-off";
import LampOn from "@/assets/svg/lamp-on";
import {
    animate,
    domMax,
    LazyMotion,
    m,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useState } from "react";

export const Bulb = () => {
    const [isOn, setIsOn] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleDragEnd = () => {
        const distance = Math.sqrt(x.get() ** 2 + y.get() ** 2);
        if (distance > 100) {
            setIsOn((prev) => !prev);
        }

        animate(x, 0, {
            type: "spring",
            stiffness: 120,
            damping: 10,
            restDelta: 0.5,
        });
        animate(y, 0, {
            type: "spring",
            stiffness: 120,
            damping: 10,
            restDelta: 0.5,
        });
    };

    const getPath = (cx: number, cy: number) => {
        const startX = 0;
        const startY = 0;
        const endX = cx;
        const endY = cy;

        const cp1X = cx * 0.25;
        const cp1Y = cy * 0.25 - 30;
        const cp2X = cx * 0.75;
        const cp2Y = cy * 0.75 + 30;

        return `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
    };

    const pathD = useTransform([springX, springY], ([cx, cy]: number[]) =>
        getPath(cx, cy)
    );

    return (
        <LazyMotion strict features={domMax}>
            <div className="flex justify-center items-center flex-col">
                {isOn ? (
                    <LampOn className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
                ) : (
                    <LampOff className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
                )}

                <svg
                    className="absolute flex top-[50px] -left-1/2 translate-x-1/2"
                    width="100%"
                    height="300"
                >
                    <m.path
                        className={"absolute left-1/2 translate-x-1/2"}
                        d={pathD.get()}
                        stroke="#4b5563"
                        strokeWidth="2"
                        fill="transparent"
                    />
                </svg>

                <m.div
                    drag
                    dragConstraints={{
                        left: -150,
                        right: 150,
                        top: -150,
                        bottom: 150,
                    }}
                    style={{
                        x: springX,
                        y: springY,
                        backgroundColor: "#4b5563",
                    }}
                    onDragEnd={handleDragEnd}
                    className="w-2 aspect-square absolute rounded-full cursor-pointer shadow-md z-10 top-[55px]"
                />
            </div>
        </LazyMotion>
    );
};
