import ArrowLeftup from "@/assets/svg/arrow-leftup";
import ArrowRight from "@/assets/svg/arrow-right";
import ArrowRightup from "@/assets/svg/arrow-rightup";
import Daun from "@/assets/svg/daun";
import StarGede from "@/assets/svg/star-gede";
import StarKecil from "@/assets/svg/star-kecil";
import ThreeWave from "@/assets/svg/three-wave";
import TwoWave from "@/assets/svg/two-wave";
import VRed from "@/assets/svg/v-red";
import { IHomeDecoration } from "@/interface/app/home";
import { Transition } from "motion";
import { Variants } from "motion/react";

export const homeDescorations: IHomeDecoration[] = (
    [
        { Comp: StarGede, x: -250, y: -320, rt: -25 },
        {
            Comp: ArrowRight,
            x: -120,
            y: -240,
            rt: -10,
            duration: 1,
        },
        { Comp: Daun, x: 280, y: -200, r: 45, s: 0.7, rt: 18 },
        {
            Comp: VRed,
            x: -120,
            y: -100,
            s: 0.8,
            duration: 1,
            ease: "easeInOut",
        },
        { Comp: StarKecil, x: 260, y: -50, s: 0.8, rt: 346 },
        { Comp: StarKecil, x: 300, y: -100, s: 0.8, rt: 266, duration: 0.9 },
        { Comp: ArrowRightup, x: -280, y: 350, rt: -10, r: 40, duration: 1.3 },
        { Comp: ArrowLeftup, x: 250, y: 350, rt: 20, r: 20, duration: 1 },
        { Comp: TwoWave, x: [-200, -250, -200], y: [150] },
        { Comp: ThreeWave, x: [200, 250, 200], y: [100] },
    ] as IHomeDecoration[]
).map((item, i) => {
    return {
        duration: Math.floor(Math.random() * 10) + 1,
        ...item,
    } as IHomeDecoration;
});

export const homeVariants: Variants = {
    float: (custom: IHomeDecoration) => {
        const upDownRandom =
            typeof custom.y === "number"
                ? (Math.round(Math.random()) ? -1 : 1) * 20 + custom.y
                : 0;
        const rtRandom = custom.rt
            ? (Math.round(Math.random()) ? -1 : 1) + custom.rt
            : 0;
        return {
            y:
                typeof custom.y === "number"
                    ? [custom.y, upDownRandom || custom.y, custom.y]
                    : custom.y,
            ...(typeof custom.x === "object" && { x: custom.x }),
            rotate: rtRandom ? [0, rtRandom, 0] : 0,
            transition: {
                duration: custom.duration,
                repeat: Infinity,
                ease: custom.ease ? custom.ease : "backInOut",
            },
        };
    },
    hidden: { opacity: 0, scale: 0, x: 0, y: 0 },
    visible: (custom: IHomeDecoration) => ({
        opacity: 1,
        scale: custom.s || 1,
        rotate: custom.r,
        x: custom.x,
        y: custom.y,
        transition: { duration: 0.5, ease: "easeInOut" },
    }),
};

export const homeSpring: Transition = {
    type: "spring",
    stiffness: 100,
    damping: 30,
};
