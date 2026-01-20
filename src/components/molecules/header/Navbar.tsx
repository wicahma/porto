"use client";
import DiamaDev from "@/assets/svg/diama-dev";
import { FadePull } from "@/components/atoms/animations/FadePull";
import { nav_link } from "@/constants/navbar";
import { cn } from "@/utils/helper/cn";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const cnLink = "text-neutral-300 hover:text-neutral-100 transition-colors";
  const pathname = usePathname();
  const prevPathRef = React.useRef(pathname);

  React.useEffect(() => {
    if (prevPathRef.current !== pathname) {
      pageAnimation(prevPathRef.current, pathname);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return (
    <FadePull
      direction="to-bottom"
      className="flex gap-3 fixed container top-3 z-[1000]"
    >
      <div className="relative gap-3 flex overflow-hidden backdrop-blur-sm max-w-[570px] w-full shrink justify-center items-center h-[56px] bg-white/5 rounded-2xl">
        <DiamaDev className="h-[30px] w-fit" />
        <p className="font-bold text-xl">
          diama.<span className="italic">dev</span>
        </p>
      </div>
      <div className="relative backdrop-blur-sm grow w-full flex justify-between px-4 items-center h-[56px] bg-white/5 rounded-2xl">
        <p>Indonesia</p>
        <ul>
          <FadePull className="flex gap-3" direction="to-bottom">
            {nav_link.map((d) => (
              <li key={d.title}>
                <Link
                  className={cn(
                    cnLink,
                    pathname.startsWith(d.href) && "text-neutral-100",
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
    </FadePull>
  );
};

const pageAnimation = (from: string, to: string) => {
  const fromIdx =
    from === "/"
      ? 0
      : nav_link.findIndex((d) => from.startsWith(d.href) && d.href !== "/");
  const toIdx =
    to === "/"
      ? 0
      : nav_link.findIndex((d) => to.startsWith(d.href) && d.href !== "/");
  const coreAnimation = document.getElementById("core-animation-component");
  const direction = fromIdx - toIdx < 0;

  if (!coreAnimation) return;

  coreAnimation.animate(
    [
      {
        transform: direction ? "translateX(100%)" : "translateX(-100%)",
      },
      { transform: "translateX(0)" },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
    },
  );
};

export default Navbar;
