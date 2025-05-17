"use client";
import DiamaDev from "@/assets/svg/diama-dev";
import { Bulb } from "@/components/atoms/Bulb";
import { FadePull } from "@/components/atoms/FadePull";
import { nav_link } from "@/constants/navbar";
import { cn } from "@/utils/helper/cn";
import { Link, useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
    const cnLink = "text-neutral-300 hover:text-neutral-100 transition-colors";
    const pathname = usePathname();
    const router = useTransitionRouter();
    const [darkmode, setDarkmode] = useState(true);

    const handlePageChange: React.MouseEventHandler<HTMLLIElement> = (e) => {
        console.log("e", e.currentTarget.offsetLeft);
        console.log("e", e.currentTarget.offsetParent);
    };

    const handleChangeTheme: React.MouseEventHandler<SVGSVGElement> = (e) => {
        setDarkmode((prev) => !prev);
    };

    return (
        <FadePull
            direction="to-bottom"
            className="flex gap-3 fixed container top-3 z-50"
        >
            <div className="relative z-[1000] gap-3 flex overflow-hidden backdrop-blur-sm max-w-[570px] w-full shrink justify-center items-center h-[56px] border border-white/20 bg-white/20 rounded-2xl">
                <DiamaDev className="h-[30px] w-fit" />
                <p className="font-bold text-xl">
                    diama.<span className="italic">dev</span>
                </p>
            </div>
            <div className="relative z-[1000] backdrop-blur-sm grow w-full flex justify-between px-4 items-center h-[56px] border border-white/20 bg-white/20 rounded-2xl">
                <p>Indonesia</p>
                <ul>
                    <FadePull className="flex gap-3" direction="to-bottom">
                        {nav_link.map((d) => (
                            <li key={d.title} onClick={handlePageChange}>
                                <Link
                                    onTransitionRun={pageAnimation}
                                    className={cn(
                                        cnLink,
                                        pathname.startsWith(d.href) &&
                                            "text-neutral-100"
                                    )}
                                    href={d.href}
                                >
                                    {d.title}
                                </Link>
                            </li>
                        ))}
                    </FadePull>
                </ul>
            </div>
            <div className="z-10 aspect-square relative h-[56px] flex items-center justify-center ">
                <Bulb />
            </div>
        </FadePull>
    );
};

const pageAnimation = () => {
    document.documentElement.animate(
        [
            { opacity: 1, scale: 1, transform: "translateY(0)" },
            { opacity: 0, scale: 0.9, transform: "translateY(-100px)" },
        ],
        {
            duration: 1000,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)",
        }
    );

    document.documentElement.animate(
        [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
        {
            duration: 1000,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
        }
    );
};

export default Navbar;
