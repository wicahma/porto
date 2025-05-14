import MeBg from "@/assets/image/me-bg.png";
import Me from "@/assets/image/me.png";
import { homeDescorations, homeSpring, homeVariants } from "@/constants/home";
import { m } from "motion/react";
import { useState } from "react";

const RightCard = () => {
    const [animateMe, useAnimateMe] = useState<string[] | string>("");
    return (
        <m.div whileHover={{ scale: 1.1 }} className="w-full relative flex">
            {homeDescorations.map(({ Comp, x, y, duration, r, s, rt }, idx) => (
                <m.div
                    key={idx}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-20"
                    custom={{ x, y, duration, r, s, rt }}
                    initial={"hidden"}
                    whileHover={"float"}
                    animate={animateMe}
                    variants={homeVariants}
                >
                    <Comp />
                </m.div>
            ))}
            <m.img
                src={MeBg.src}
                width={MeBg.width}
                height={MeBg.height}
                transition={homeSpring}
                drag={false}
                className="aspect-auto h-auto w-[600px] max-w-full self-end mx-auto -z-10 absolute -bottom-20 left-[49%] -translate-x-1/2"
            />
            <m.img
                src={Me.src}
                width={Me.width}
                height={Me.height}
                transition={homeSpring}
                draggable={false}
                onHoverStart={() => useAnimateMe(["visible", "float"])}
                onHoverEnd={() => useAnimateMe("hidden")}
                className="aspect-auto h-auto w-[600px] max-w-full self-end mx-auto"
            />
        </m.div>
    );
};

export default RightCard;
