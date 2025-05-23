import { cn } from "@/utils/helper/cn";
import {
    domMax,
    LazyMotion,
    m,
    SpringOptions,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";
import React, { useEffect, useState } from "react";

export const GlobCursor: React.FC = () => {
    const springOpt: SpringOptions = {
        stiffness: 800,
        damping: 50,
        mass: 2,
    };
    const [hoverable, setHoverable] = useState(false);
    const [unhoverable, setUnhover] = useState(false);
    const [cursor, setCursor] = useState("");

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const width = useSpring(40, { stiffness: 300, damping: 30 });
    const height = useSpring(40, { stiffness: 300, damping: 30 });
    const left = useSpring(0, springOpt);
    const right = useSpring(0, springOpt);
    const top = useSpring(0, springOpt);
    const bottom = useSpring(0, springOpt);
    const borderRadius = useSpring(100, springOpt);
    const bf = useSpring(0, springOpt);
    const backdropFilter = useMotionTemplate`blur(${bf}px)`;
    const clipPath = useMotionTemplate`polygon(0% 0%, 0% 100%, ${left}px 100%, ${left}px ${top}px, ${right}px ${top}px, ${right}px ${bottom}px, ${left}px ${bottom}px, ${left}px 100%, 100% 100%, 100% 0%)`;
    const smoothX = useSpring(x, springOpt);
    const smoothY = useSpring(y, springOpt);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const unhoverTarget = target.closest(".unhoverable") as HTMLElement;
            if (unhoverTarget) {
                setHoverable(false);
                setUnhover(true);
                width.set(0);
                height.set(0);
                bf.set(0);
                return;
            }

            const hoverTarget = target.closest(".hoverable") as HTMLElement;

            const tCursor = window.getComputedStyle(target)["cursor"];
            setUnhover(false);
            setCursor(tCursor);

            x.set(e.clientX);
            y.set(e.clientY);

            if (hoverTarget) {
                const padding = 10;
                const rect = hoverTarget.getBoundingClientRect();
                borderRadius.set(5);

                left.set(rect.left - padding);
                right.set(rect.right + padding);
                top.set(rect.top - padding);
                bottom.set(rect.bottom + padding);

                const paddedWidth = rect.width + padding * 2;
                const paddedHeight = rect.height + padding * 2;

                width.set(paddedWidth);
                height.set(paddedHeight);
                x.set(rect.left + rect.width / 2);
                y.set(rect.top + rect.height / 2);
                bf.set(15);

                setHoverable(true);
            } else {
                if (tCursor === "pointer") {
                    const cs = 60;

                    width.set(cs);
                    height.set(cs);
                    borderRadius.set(100);
                    return;
                }
                const circSize = 30;

                setHoverable(false);
                width.set(circSize);
                height.set(circSize);
                borderRadius.set(100);
                bf.set(0);
            }
        };

        const handleMouseLeave = () => {
            console.log("mouse leave");
            const circSize = 0;

            setHoverable(false);
            width.set(circSize);
            height.set(circSize);
            borderRadius.set(0);
            bf.set(0);
        };

        const handleMouseEnter = () => {
            console.log("mouse enter");
            const circSize = 30;

            setHoverable(false);
            width.set(circSize);
            height.set(circSize);
            borderRadius.set(100);
            bf.set(0);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mouseleave", handleMouseLeave);
            x.destroy();
            y.destroy();
            width.destroy();
            height.destroy();
            left.destroy();
            right.destroy();
            top.destroy();
            bottom.destroy();
            borderRadius.destroy();
            bf.destroy();
            backdropFilter.destroy();
            clipPath.destroy();
            smoothX.destroy();
            smoothY.destroy();
        };
    }, []);

    return (
        <LazyMotion features={domMax} strict>
            <m.div
                className="fixed inset-0 z-[9999] pointer-events-none"
                style={{
                    backdropFilter,
                    clipPath,
                }}
            />

            <m.div
                className={cn(
                    "fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2",
                    hoverable
                        ? "border-[2px] border-neutral-500/50"
                        : "bg-white/20 backdrop-blur-xs",
                    cursor === "pointer" && !unhoverable
                        ? "border-[1px] border-neutral-50 bg-white/10 backdrop-blur-none"
                        : null
                )}
                style={{
                    x: smoothX,
                    y: smoothY,
                    width,
                    height,
                    borderRadius,
                }}
            />
        </LazyMotion>
    );
};
