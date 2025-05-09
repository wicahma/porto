"use client";
import DiamaDev from "@/assets/svg/diama-dev";
import LampOff from "@/assets/svg/lamp-off";
import LampOn from "@/assets/svg/lamp-on";
import { nav_link } from "@/constants/navbar";
import { cn } from "@/utils/helper/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Navbar = () => {
    const cnLink = "text-neutral-300 hover:text-neutral-100 transition-colors";
    const pathname = usePathname();
    const [darkmode, setDarkmode] = useState(true);

    const handlePageChange: React.MouseEventHandler<HTMLLIElement> = (e) => {
        console.log("e", e.currentTarget.offsetLeft);
        console.log("e", e.currentTarget.offsetParent);
    };

    const handleChangeTheme: React.MouseEventHandler<SVGSVGElement> = (e) => {
        setDarkmode((prev) => !prev);
    };

    return (
        <nav className="flex gap-3 fixed container top-3 z-50">
            <div className="relative z-[1000] backdrop-blur-sm gap-3 max-w-[570px] w-full shrink flex justify-center items-center h-[56px] border border-white/20 bg-white/20 rounded-2xl">
                <DiamaDev className="h-[30px] w-fit" />
                <p className="font-bold text-xl">
                    diama.<span className="italic">dev</span>
                </p>
            </div>
            <div className="relative z-[1000] backdrop-blur-sm grow w-full flex justify-between px-4 items-center h-[56px] border border-white/20 bg-white/20 rounded-2xl">
                <div>Indonesia</div>
                <ul className="flex gap-3">
                    {nav_link.map((d) => (
                        <li key={d.title} onClick={handlePageChange}>
                            <Link
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
                </ul>
            </div>
            <div className="z-10 aspect-square relative h-[56px] flex items-center justify-center ">
                {darkmode ? (
                    <LampOn
                        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                        onClick={handleChangeTheme}
                    />
                ) : (
                    <LampOff
                        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                        onClick={handleChangeTheme}
                    />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
