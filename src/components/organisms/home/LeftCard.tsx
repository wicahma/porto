import CubeBluered from "@/assets/svg/cube-bluered";
import Hello from "@/assets/svg/hello";
import { animate, useSpring } from "motion/react";
import { motion, useMotionValue, useTransform } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

const LeftCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardRect, setCardRect] = useState<DOMRect | null>(null);
    const rawMouseX = useMotionValue(0.5);
    const rawMouseY = useMotionValue(0.5);
    const mouseX = useSpring(rawMouseX, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(rawMouseY, { stiffness: 300, damping: 30 });
    const hoverProgress = useMotionValue(0);

    const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
    const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);
    const boxShadow = useTransform(
        hoverProgress,
        [0, 1],
        ["0px 0px 0px rgba(0,0,0,0)", "0px 40px 80px rgba(0,0,0,0.35)"]
    );

    const depthOffset = useTransform(
        [mouseX, mouseY, hoverProgress],
        ([x, y, p]: number[]) => {
            const centerX = x - 0.5;
            const centerY = y - 0.5;
            return p * (centerX * 10 + centerY * 10);
        }
    );

    const glowX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
    const glowY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

    // const borderGlow = useTransform([mouseX, mouseY], ([x, y]: number[]) => {
    //     const dx = Math.abs(x - 0.5) * 2;
    //     const dy = Math.abs(y - 0.5) * 2;
    //     const distanceToEdge = Math.max(dx, dy);
    //     const intensity = 1 - distanceToEdge;
    //     const alpha = Math.max(0, intensity * 0.7);
    //     return `rgba(255, 255, 255, ${alpha})`;
    // });

    useEffect(() => {
        const updateRect = () => {
            if (cardRef.current) {
                setCardRect(cardRef.current.getBoundingClientRect());
            }
        };
        updateRect();
        window.addEventListener("resize", updateRect);
        return () => window.removeEventListener("resize", updateRect);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRect) return;
        const x = (e.clientX - cardRect.left) / cardRect.width;
        const y = (e.clientY - cardRect.top) / cardRect.height;
        rawMouseX.set(x);
        rawMouseY.set(y);
        animate(hoverProgress, 1, {
            type: "spring",
            stiffness: 150,
            damping: 15,
        });
    };

    const handleMouseLeave = () => {
        animate(rawMouseX, 0.5, {
            type: "spring",
            stiffness: 200,
            damping: 20,
        });
        animate(rawMouseY, 0.5, {
            type: "spring",
            stiffness: 200,
            damping: 20,
        });
        animate(hoverProgress, 0, {
            type: "spring",
            stiffness: 150,
            damping: 15,
        });
    };
    return (
        <motion.div
            ref={cardRef}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                boxShadow,
                y: depthOffset,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hover:bg-neutral-800 hover:overflow-hidden border transition-colors border-transparent hover:border hover:border-neutral-700 px-3.5 rounded-3xl pb-4 pt-3"
        >
            <motion.div
                className="absolute w-40 h-40 bg-cyan-300 rounded-full opacity-30 pointer-events-none blur-2xl"
                style={{
                    x: glowX,
                    y: glowY,
                }}
            />
            <div className=" text-xl flex justify-between items-center gap-2">
                <div className="relative pl-8 pr-2 py-6 font-bold w-fit h-fit flex items-center justify-center">
                    <p className="relative z-10 right-3 bottom-0.5">
                        Hello, I'm
                    </p>
                    <Hello className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
                </div>
                <div className="h-1 grow bg-red-600 rounded-2xl" />
                <h1 className="font-semibold">Teguh Dwi Cahya Kusuma</h1>
            </div>
            <div className="mt-2">
                <h2 className="text-7xl font-bold">
                    Software{"\n"}
                    <span className="relative block">
                        Developer
                        <CubeBluered className="absolute -bottom-5 right-0" />
                    </span>
                </h2>

                <p className="mt-6 leading-6 text-neutral-700 font-semibold text-xl">
                    Specialized in Backend Developer, Frontend developer &
                    Mobile Developer
                </p>
            </div>
        </motion.div>
    );
};

export default LeftCard;
