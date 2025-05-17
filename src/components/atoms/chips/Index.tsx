import { IChipProps } from "@/interface/atoms/chip";
import { cn } from "@/utils/helper/cn";
import { m, SpringOptions, useSpring } from "motion/react";
import React, { useEffect } from "react";

const Chip: React.FC<IChipProps> = ({
    children,
    active,
    setActive,
    childClassName,
    ...props
}) => {
    const springOpt: SpringOptions = {
        duration: 1500,
        stiffness: 300,
        damping: 50,
        restSpeed: 100,
    };

    const left = useSpring(0, springOpt);
    const top = useSpring(0, springOpt);
    const radius = useSpring(0, springOpt);

    const handleOnClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
        props.onClick?.(e);
        const rect = e.currentTarget.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        if (e.currentTarget.checked) {
            const xRect = e.clientX - rect.x - w / 2;
            const yRect = e.clientY - rect.y - h / 2;
            left.set(xRect);
            top.set(yRect);
            radius.set(w * 2);
        } else {
            radius.set(0);
        }
    };

    useEffect(() => {
        return () => {
            left.destroy();
            top.destroy();
            radius.destroy();
        };
    }, []);

    return (
        <m.div
            className="relative bg-neutral-800 overflow-hidden font-semibold w-fit px-6 h-[38px] flex items-center justify-center rounded-full"
            {...props.motioncomp}
        >
            <m.div
                style={{
                    y: top,
                    x: left,
                    width: radius,
                }}
                className="aspect-square bg-orange-400 absolute rounded-full"
            />
            <input
                {...props}
                type="checkbox"
                className={cn(
                    props.className,
                    "cursor-pointer absolute top-0 left-0 w-full h-full opacity-0"
                )}
                checked={active}
                onClick={handleOnClick}
                onChange={(e) => setActive(e.target.checked)}
                children={undefined}
            />
            <div
                className={cn(
                    childClassName,
                    "relative z-10 pointer-events-none duration-300"
                )}
            >
                {children}
            </div>
        </m.div>
    );
};

export default Chip;
