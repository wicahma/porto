import CubeBluered from "@/assets/svg/cube-bluered";
import Hello from "@/assets/svg/hello";
import { FadePull } from "@/components/atoms/FadePull";
import { LettersPull } from "@/components/atoms/text/LettersPull";
import { WordsPull } from "@/components/atoms/text/WordsPull";
import { cn } from "@/utils/helper/cn";
import {
    animate,
    m,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";
import React, { useRef } from "react";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;
const GLOW_DIAMETER = 160;

const MeCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const xGlow = useSpring(20);
    const yGlow = useSpring(100);

    const hoverProgress = useMotionValue(0);
    const boxShadow = useTransform(
        hoverProgress,
        [0, 1],
        ["0px 0px 0px rgba(0,0,0,0)", "0px 40px 80px rgba(0,0,0,0.35)"]
    );

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return [0, 0];

        animate(hoverProgress, 1, {
            type: "spring",
            stiffness: 150,
            damping: 15,
        });
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        const xGlowPos = e.clientX - rect.left - GLOW_DIAMETER / 2;
        const yGlowPos = e.clientY - rect.top - GLOW_DIAMETER / 2;

        x.set(rX);
        y.set(rY);
        xGlow.set(xGlowPos);
        yGlow.set(yGlowPos);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);

        xGlow.set(20);
        yGlow.set(100);

        animate(hoverProgress, 0, {
            type: "spring",
            stiffness: 150,
            damping: 15,
        });
    };

    return (
        <m.div
            ref={cardRef}
            style={{
                transformStyle: "preserve-3d",
                boxShadow,
                transform,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hoverable hover:bg-neutral-800 hover:overflow-hidden border transition-colors border-transparent hover:border cursor-pointer hover:border-neutral-700 px-3.5 rounded-2xl pb-4 pt-3"
        >
            <m.div
                className={cn(
                    `absolute aspect-square bg-cyan-300 rounded-full opacity-50 cursor-pointer blur-2xl`,
                    "w-[160px]"
                )}
                style={{
                    x: xGlow,
                    y: yGlow,
                }}
            />
            <div className="text-xl flex justify-between items-center gap-2">
                <div className="relative pl-8 pr-2 py-6 font-bold w-fit h-fit flex items-center justify-center">
                    <p className="relative z-10 right-3 bottom-0.5">
                        Hello, I'm
                    </p>
                    <Hello className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
                <div className="h-1 grow bg-red-600 rounded-2xl" />
                <LettersPull
                    delay={1}
                    className="font-semibold"
                    direction="to-bottom"
                    tag="h1"
                    text="Teguh Dwi Cahya Kusuma"
                />
            </div>
            <div className="mt-2">
                <h2 className="text-7xl font-bold relative z-10">
                    <FadePull delay={0.5}>
                        <span>Software{"\n"}</span>
                        <span className="relative block">
                            Developer
                            <CubeBluered className="absolute -bottom-5 right-0" />
                        </span>
                    </FadePull>
                </h2>

                <WordsPull
                    text="Specialized in Backend Developer, Frontend developer & Mobile Developer"
                    direction="to-top"
                    tag="p"
                    delay={0.9}
                    className="mt-6 leading-6 text-neutral-700 font-semibold text-xl w-full flex-wrap justify-start"
                />
            </div>
        </m.div>
    );
};

export default MeCard;
