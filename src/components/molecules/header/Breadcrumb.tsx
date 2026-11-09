"use client";

import BreadcrumbArrow from "@/components/atoms/breadcrumbs/BreadcrumbArrow";
import { cn } from "@/utils/helper/cn";
import { m } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

interface BreadcrumbProps {
  /**
   * Display overrides keyed by path segment, for routes whose dynamic segment
   * is not readable (e.g. an experience UUID -> company name).
   */
  labels?: Record<string, string>;
  className?: string;
}

export default function Breadcrumb({ labels, className }: BreadcrumbProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isArticlePage = pathname.startsWith("/article");

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);

    const breadcrumbs = paths.map((path, index) => {
      const label =
        labels?.[path] ??
        path
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
        className,
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
                  className={cn("aspect-square", "w-3.5 h-3.5 shrink-0")}
                  isActive={isActive}
                />
              )}
              <span
                className={cn(
                  isActive
                    ? "text-[var(--signal)]"
                    : "text-neutral-400 hover:text-neutral-200",
                  "text-xs sm:text-sm font-medium tracking-normal truncate max-w-[180px] sm:max-w-xs md:max-w-md",
                )}
              >
                {crumb.label}
              </span>
              {index < lastIndex && (
                <span className={cn("text-neutral-600", "text-xs mx-0.5")}>
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
