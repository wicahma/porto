import { useDebounce } from "@/hooks/debounce";
import { IFisheyeListProps } from "@/interface/molecules/FisheyeList";
import { cn } from "@/utils/helper/cn";
import { m } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const FisheyeList: React.FC<IFisheyeListProps> = ({
    items,
    debug = false,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const animationFrame = useRef<number | null>(null);
    const [hoverInd, setHoverInd] = useState<number | null>(null);
    const [selectedInd, setSelectedInd] = useState<number | null>(null);

    const itemIndex = useDebounce(hoverInd, {
        bypass: selectedInd !== null,
    });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (selectedInd !== null) return;
        if (animationFrame.current)
            cancelAnimationFrame(animationFrame.current);

        animationFrame.current = requestAnimationFrame(() => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const focusY = e.clientY;
            const relativeY = focusY - rect.top;
            const scrollY = (relativeY / rect.height) * container.scrollHeight;
            container.scrollTop = scrollY - rect.height / 2;

            const itemsNodeList = container.querySelectorAll(".fisheye-item");
            let closestItem: HTMLElement | null = null;
            let minDistance = Infinity;

            itemsNodeList.forEach((item) => {
                const itemRect = item.getBoundingClientRect();
                const itemCenterY = itemRect.top + itemRect.height / 2;
                const distance = -60 + Math.abs(focusY - itemCenterY);

                const maxDistance = rect.height / 4;
                const scale =
                    1 + Math.max(0, 0.6 - (distance + 80) / maxDistance);
                const opacity = Math.max(
                    0.05,
                    1 - distance / (maxDistance * 1.2)
                );
                const blur = Math.min(2, (distance / maxDistance) * 2);

                const el = item as HTMLElement;
                el.style.transition =
                    "transform 0.15s ease-out, filter 0.15s ease-out, opacity 0.15s ease-out";
                el.style.transform = `scale(${scale}) translate(${
                    scale + 40
                }px)`;
                el.style.opacity = `${opacity}`;
                el.style.filter = `blur(${blur}px)`;

                if (distance < minDistance) {
                    minDistance = distance;
                    closestItem = el;
                }
            });

            if (closestItem) {
                const ariaIndex = (closestItem as HTMLElement).ariaLabel;
                if (ariaIndex === hoverInd) return;
                setHoverInd(Number(ariaIndex) || null);
            }
        });
    };

    const handleMouseLeave = () => {
        if (selectedInd !== null) return;
        setHoverInd(null);
        resetNode();
    };

    const handleOnClick = (index: number) => {
        setSelectedInd(index);
        setHoverInd(index);
    };

    const handleOutsideClick = () => {
        setSelectedInd(null);
        setHoverInd(null);
        resetNode();
    };

    const resetNode = () => {
        const itemsNodeList =
            containerRef.current?.querySelectorAll(".fisheye-item");
        itemsNodeList?.forEach((item) => {
            const el = item as HTMLElement;
            el.style.transition =
                "transform 0.3s ease, filter 0.3s ease, opacity 0.3s ease";
            el.style.transform = "scale(1)";
            el.style.opacity = "1";
            el.style.filter = "blur(0px)";
        });
    };

    useEffect(() => {
        if (!selectedInd) return;
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".fisheye-item.selected")) {
                handleOutsideClick();
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [selectedInd]);

    useEffect(() => {
        return () => {
            containerRef.current = null;
            animationFrame.current = null;
        };
    }, []);

    return (
        <m.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                delay: 0.5,
            }}
            className="unhoverable relative w-full !select-none"
        >
            {debug && (
                <div className="flex justify-end bg-neutral-600 gap-1 rounded px-1 py-[2px] text-[10px] items-center absolute top-5 right-5 z-50 pointer-events-none">
                    <p>Debug mode</p>
                    <div className="text-white bg-black px-3 rounded shadow">
                        Focused: <strong>{itemIndex}</strong>
                    </div>
                    <div className="text-white bg-black px-3 rounded shadow">
                        Clicked: <strong>{selectedInd}</strong>
                    </div>
                    <div
                        className={cn(
                            "text-white px-3 rounded shadow",
                            itemIndex === hoverInd && hoverInd !== null
                                ? "bg-green-500"
                                : "bg-red-500"
                        )}
                    >
                        Stay:{" "}
                        <strong>
                            {itemIndex === hoverInd && hoverInd !== null
                                ? "true"
                                : "false"}
                        </strong>
                    </div>
                </div>
            )}

            <div
                className={cn(
                    "absolute w-full h-full pointer-events-none z-10 top-0",
                    hoverInd === null
                        ? "inset-shadow-[0px_0px_10px_10px_var(--background)]"
                        : "inset-shadow-[0px_0px_20px_30px_var(--background)]"
                )}
            />

            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full text-white h-[calc(100vh-38px-216px-24px-5rem-2.5rem-2.75rem)] no-scrollbar overflow-y-scroll overflow-x-clip"
            >
                <div className="flex flex-col w-full items-start py-6 gap-6">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            aria-label={i.toString()}
                            onClick={() => handleOnClick(i)}
                            className={cn(
                                "cursor-pointer fisheye-item transition-all text-neutral-500 px-4 py-0",
                                i === selectedInd && "selected z-20",
                                selectedInd !== null &&
                                    i !== selectedInd &&
                                    "pointer-events-none",
                                i === hoverInd && "text-neutral-50",
                                i === hoverInd &&
                                    itemIndex === hoverInd &&
                                    hoverInd !== null &&
                                    "flex gap-3 flex-nowrap"
                            )}
                            style={{
                                transform:
                                    selectedInd === i
                                        ? "scale(1.5) rotate(-3deg) translateY(-10px)"
                                        : undefined,
                            }}
                        >
                            {selectedInd === i && (
                                <div className="absolute inset-0 -top-1 -bottom-1 bg-indigo-700 rounded-lg -z-10 rotate-0" />
                            )}
                            {i === hoverInd &&
                            itemIndex === hoverInd &&
                            hoverInd !== null ? (
                                <m.div
                                    className={"whitespace-nowrap flex gap-2"}
                                    initial={{ x: 0 }}
                                    animate={{ x: ["0%", "-100%"] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 6,
                                        ease: "linear",
                                    }}
                                >
                                    <span className="mx-6">{item}</span>
                                    <span className="mx-6">{item}</span>
                                    <span className="mx-6">{item}</span>
                                </m.div>
                            ) : (
                                <div className="whitespace-nowrap">{item}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </m.div>
    );
};
