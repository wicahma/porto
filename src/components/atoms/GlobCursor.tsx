import { cn } from "@/utils/helper/cn";
import {
    domMax,
    LazyMotion,
    m,
    SpringOptions,
    useMotionValue,
    useSpring,
} from "framer-motion";
import React, { ReactNode, useEffect, useRef, useState } from "react";

const spotlightSize = 200;

export const GlobCursor: React.FC<{ readonly children: ReactNode }> = ({
    children,
}) => {
    // const blurLayerRef = useRef<HTMLDivElement>(null);

    // const x = useSpring(0, { stiffness: 300, damping: 30 });
    // const y = useSpring(0, { stiffness: 300, damping: 30 });
    // const width = useSpring(40, { stiffness: 300, damping: 30 });
    // const height = useSpring(40, { stiffness: 300, damping: 30 });
    // const [clipPath, setClipPath] = useState("circle(20px at center)");
    // const [isHovering, setIsHovering] = useState(false);

    // useEffect(() => {
    //     const blurLayer = blurLayerRef.current;
    //     if (!blurLayer) return;
    //     const move = (e: MouseEvent) => {
    //         const target = e.target as HTMLElement;
    //         const hoverTarget = target.closest(".hvt") as HTMLElement;

    //         if (hoverTarget) {
    //             const rect = hoverTarget.getBoundingClientRect();
    //             const computed = getComputedStyle(hoverTarget);

    //             setIsHovering(true);
    //             const padding = 10;
    //             const paddedWidth = rect.width + padding * 2;
    //             const paddedHeight = rect.height + padding * 2;

    //             width.set(paddedWidth);
    //             height.set(paddedHeight);
    //             x.set(rect.left + rect.width / 2);
    //             y.set(rect.top + rect.height / 2);

    //             const br = computed.borderRadius;
    //             const clip = `inset(0 round ${br})`;

    //             const mask = `radial-gradient(circle ${
    //                 spotlightSize / 2
    //             }px at ${x}px ${y}px, transparent 0%, black 100%)`;
    //             blurLayer.style.maskImage = mask;
    //             blurLayer.style.webkitMaskImage = mask;
    //             blurLayer.style.backdropFilter = "blur(10px)";

    //             setClipPath(clip);
    //         } else {
    //             setIsHovering(false);
    //             blurLayer.style = "";
    //             x.set(e.clientX);
    //             y.set(e.clientY);
    //             width.set(40);
    //             height.set(40);
    //             setClipPath("circle(20px at center)");
    //         }
    //     };

    //     window.addEventListener("mousemove", move);
    //     return () => window.removeEventListener("mousemove", move);
    // }, [blurLayerRef]);

    // return (
    //     <>
    //         <LazyMotion features={domMax}>
    //             <div className="relative w-screen h-screen overflow-hidden bg-cover">
    //                 <div className="absolute inset-0 z-0 p-10 space-y-6 text-lg">
    //                     {children}
    //                 </div>
    //                 <div
    //                     ref={blurLayerRef}
    //                     className="fixed inset-0 z-20 pointer-events-none"
    //                 />

    //                 {/* <m.div
    //                     className="fixed z-30 pointer-events-none rounded-full border-[2px] border-white/60 bg-white/10 backdrop-blur-md"
    //                     style={{
    //                         x: smoothX.get().toString(),
    //                         y: smoothY.get().toString(),
    //                         width: spotlightSize,
    //                         height: spotlightSize,
    //                         marginLeft: -spotlightSize / 2,
    //                         marginTop: -spotlightSize / 2,
    //                     }}
    //                 /> */} new component

    //                 {/* {isHovering && (
    //                 <div
    //                     style={{
    //                         position: "fixed",
    //                         inset: 0,
    //                         zIndex: 999,
    //                         backdropFilter: "blur(6px)",
    //                         pointerEvents: "none",
    //                     }}
    //                 />
    //             )} */}
    //                 <div
    //                     ref={blurLayerRef}
    //                     className={cn(
    //                         "fixed inset-0 z-20 pointer-events-none",
    //                         isHovering ? "hidden" : "block"
    //                     )}
    //                 />

    //                 <m.div
    //                     style={{
    //                         x,
    //                         y,
    //                         width,
    //                         height,
    //                         translateX: "-50%",
    //                         translateY: "-50%",
    //                         pointerEvents: "none",
    //                         position: "fixed",
    //                         zIndex: 9999,
    //                         clipPath: clipPath,
    //                         WebkitClipPath: clipPath,
    //                         boxSizing: "border-box",
    //                         backgroundColor: "rgba(0,0,0,0.5)",
    //                     }}
    //                 >
    //                     {/* {isHovering && (
    //                 <div
    //                     style={{
    //                         width: "100%",
    //                         height: "100%",
    //                         clipPath: clipPath,
    //                         position: "absolute",
    //                         WebkitClipPath: clipPath,
    //                         backdropFilter: "unset",
    //                         backgroundColor: "rgba(0,0,0,0.5)",
    //                     }}
    //                 />
    //             )} */}
    //                 </m.div>
    //             </div>
    //         </LazyMotion>
    //     </>
    // );

    const springOpt: SpringOptions = {
        stiffness: 800,
        damping: 50,
        mass: 2,
    };

    const blurLayerRef = useRef<HTMLDivElement>(null);
    const [isHover, setIsHover] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const width = useSpring(40, { stiffness: 300, damping: 30 });
    const height = useSpring(40, { stiffness: 300, damping: 30 });
    const opacity = useSpring(1, springOpt);
    const borderRadius = useSpring(100, springOpt);

    const smoothX = useSpring(x, springOpt);
    const smoothY = useSpring(y, springOpt);

    useEffect(() => {
        const blurLayer = blurLayerRef.current;
        if (!blurLayer) return;

        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const hoverTarget = target.closest(".hvt") as HTMLElement;

            x.set(e.clientX);
            y.set(e.clientY);

            blurLayer.style.transitionDuration = "1000ms";

            if (hoverTarget) {
                console.log("masuk hover");
                const rect = hoverTarget.getBoundingClientRect();
                const computed = getComputedStyle(hoverTarget);

                const br = +(computed.borderRadius.split("px")[0] || 10);
                borderRadius.set(0);

                const padding = 10;
                const paddedWidth = rect.width + padding * 2;
                const paddedHeight = rect.height + padding * 2;

                width.set(paddedWidth);
                height.set(paddedHeight);
                x.set(rect.left + rect.width / 2);
                y.set(rect.top + rect.height / 2);

                const left = rect.left - padding;
                const right = rect.right + padding;
                const top = rect.top - padding;
                const bottom = rect.bottom + padding;

                const invertedMask = `polygon(0% 0%, 0% 100%, ${left}px 100%, ${left}px ${top}px, ${right}px ${top}px, ${right}px ${bottom}px, ${left}px ${bottom}px, ${left}px 100%, 100% 100%, 100% 0%)`;

                // console.log(mask);
                blurLayer.style.clipPath = invertedMask;
                blurLayer.style.webkitMaskImage = invertedMask;
                blurLayer.style.backdropFilter = "blur(15px)";

                opacity.set(0);
                setIsHover(true);
            } else {
                console.log("keluar hover");
                opacity.set(1);
                setIsHover(false);
                width.set(40);
                height.set(40);
                borderRadius.set(100);

                blurLayer.style.clipPath = "circle(20px at center)";
                blurLayer.style.webkitMaskImage = "circle(20px at center)";
                blurLayer.style.backdropFilter = "blur(0px)";
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <LazyMotion features={domMax} strict>
            <div className="relative w-screen h-screen overflow-hidden bg-cover">
                <div className="absolute inset-0 z-0 p-10 space-y-6 text-lg">
                    {children}
                </div>

                <m.div
                    ref={blurLayerRef}
                    className="fixed inset-0 z-20 pointer-events-none"
                />
                <m.div className="fixed inset-0 z-20 pointer-events-none" />

                <m.div
                    className="fixed z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2 border-[2px] border-white/60 bg-white/10"
                    style={{
                        x: smoothX,
                        y: smoothY,
                        // opacity,
                        width,
                        height,
                        borderRadius,
                    }}
                />
            </div>
        </LazyMotion>
    );
};
