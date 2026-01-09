"use client";
import BreadcrumbArrow from "@/components/atoms/BreadcrumbArrow";
import { cn } from "@/utils/helper/cn";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const breadcrumbs = getBreadcrumbs();
  const lastIndex = breadcrumbs.length - 1;

  return (
    <div className="mb-15 w-fit">
      <div className="hoverable flex items-center gap-2">
        {breadcrumbs.map((crumb, index) => {
          const isActive =
            hoveredIndex === null
              ? index === lastIndex
              : hoveredIndex === index;

          return (
            <button
              key={crumb.href}
              className="flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <BreadcrumbArrow isActive={isActive} />
              <span
                className={cn(
                  isActive ? "text-[#02C380]" : "text-[#004E33]",
                  "font-medium text-xl"
                )}
              >
                {crumb.label}
              </span>
              {index < lastIndex && <span className="text-neutral-600">/</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
