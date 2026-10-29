"use client";

import BreadcrumbArrow from "@/components/atoms/breadcrumbs/BreadcrumbArrow";
import { useViewModeStore } from "@/store/viewModeStore";
import { cn } from "@/utils/helper/cn";
import { m } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const router = useRouter();
  const isSimpleMode = useViewModeStore((state) => state.isSimpleMode);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isArticlePage = pathname.startsWith("/article");

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);

    const breadcrumbs = paths.map((path, index) => {
      const label = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const href = "/" + paths.slice(0, index + 1).join("/");

      return { label, href, index };
    });

    if (paths.length > 0) {
      return [{ label: "Home", href: "/", index: -1 }, ...breadcrumbs];
    }

    return [{ label: "Home", href: "/", index: -1 }];
  };

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  const breadcrumbs = getBreadcrumbs();
  const lastIndex = breadcrumbs.length - 1;

  return (
    <m.div
      layout="position"
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "w-full flex items-center justify-between gap-3 overflow-hidden",
        !isSimpleMode && !isArticlePage && "md:w-1/2",
      )}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        {breadcrumbs.map((crumb, index) => {
          const isActive =
            hoveredIndex === null
              ? index === lastIndex
              : hoveredIndex === index;

          return (
            <button
              key={crumb.href}
              type="button"
              className="flex items-center gap-1.5 sm:gap-2 bg-transparent border-0 p-0 cursor-pointer"
              onClick={() => handleNavigate(crumb.href)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {(index === 0 || !isArticlePage) && (
                <BreadcrumbArrow
                  className={cn(
                    "aspect-square",
                    isArticlePage ? "w-3.5 h-3.5 shrink-0" : "max-md:w-4",
                  )}
                  isActive={isActive}
                />
              )}
              <span
                className={cn(
                  isActive
                    ? "text-[#02C380]"
                    : "text-neutral-400 hover:text-neutral-200",
                  isArticlePage
                    ? "text-xs sm:text-sm font-medium tracking-normal truncate max-w-[180px] sm:max-w-xs md:max-w-md"
                    : "font-medium md:text-xl text-base",
                )}
              >
                {crumb.label}
              </span>
              {index < lastIndex && (
                <span
                  className={cn(
                    "text-neutral-600",
                    isArticlePage ? "text-xs mx-0.5" : "text-base",
                  )}
                >
                  /
                </span>
              )}
            </button>
          );
        })}
      </div>
    </m.div>
  );
}
