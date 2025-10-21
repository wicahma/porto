"use client";
import DiamaDev from "@/assets/svg/diama-dev";
import { useCircularRevealNavigation } from "@/components/atoms/CircularRevealTransition";
import { FadePull } from "@/components/atoms/FadePull";
import { navLink } from "@/constants/navbar";
import { cn } from "@/utils/helper/cn";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const cnLink = "text-neutral-300 hover:text-neutral-100 transition-colors";
  const pathname = usePathname();
  const { navigateWithReveal } = useCircularRevealNavigation();

  const handlePageChange: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href") || "/";
    const clickX = e.clientX;
    const clickY = e.clientY;

    const getColorForRoute = () => {
      if (href === "/") return "#3B82F6";
      if (href.startsWith("/projects")) return "#10B981";
      if (href.startsWith("/experience")) return "#F59E0B";
      if (href.startsWith("/blog")) return "#8B5CF6";
      return "#1a1a1a";
    };

    navigateWithReveal(href, {
      color: getColorForRoute(),
      clickPosition: { x: clickX, y: clickY },
      duration: 2,
      initialSize: 15,
    });
  };

  return (
    <FadePull
      direction="to-bottom"
      className="flex gap-3 fixed container top-3 z-[1000]"
    >
      <div className="relative gap-3 flex overflow-hidden backdrop-blur-sm max-w-[570px] w-full shrink justify-center items-center h-[56px] bg-white/5 rounded-2xl">
        <DiamaDev className="h-[30px] w-fit" />
        <p className="font-bold text-xl hoverable">
          diama.<span className="italic">dev</span>
        </p>
      </div>
      <div className="relative backdrop-blur-sm grow w-full flex justify-between px-4 items-center h-[56px] bg-white/5 rounded-2xl">
        <p>Indonesia</p>
        <ul>
          <FadePull className="flex gap-3" direction="to-bottom">
            {navLink.map((d) => (
              <li key={d.title}>
                <a
                  onClick={handlePageChange}
                  className={cn(
                    cnLink,
                    "cursor-pointer",
                    pathname.startsWith(d.href) && "text-neutral-100"
                  )}
                  href={d.href}
                >
                  {d.title}
                </a>
              </li>
            ))}
          </FadePull>
        </ul>
      </div>
    </FadePull>
  );
};

export const pageAnimation = (from: string, to: string) => {
  const fromIdx =
    from !== "/"
      ? navLink.findIndex((d) => from.startsWith(d.href) && d.href !== "/")
      : 0;
  const toIdx =
    to !== "/"
      ? navLink.findIndex((d) => to.startsWith(d.href) && d.href !== "/")
      : 0;

  const direction = fromIdx - toIdx < 0;
  document.documentElement.animate(
    [
      { opacity: 1, scale: 1, transform: "translateX(0)" },
      {
        opacity: 0,
        scale: 0.9,
        transform: direction ? "translateX(100%)" : "translateX(-100%)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        transform: direction ? "translateX(-100%)" : "translateX(100%)",
      },
      {
        transform: "translateX(0)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};

export default Navbar;
