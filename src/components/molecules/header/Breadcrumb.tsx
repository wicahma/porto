"use client";
import BreadcrumbArrow from "@/components/atoms/breadcrumbs/BreadcrumbArrow";
import { useViewModeStore } from "@/store/viewModeStore";
import { cn } from "@/utils/helper/cn";
import { m } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const router = useRouter();
  const isSimpleMode = useViewModeStore((state) => state.isSimpleMode);
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

  const handleSetPage = (href: string) => {
    if (href === "home") {
      window.history.replaceState(null, "", "/");
      router.prefetch("/");
      return;
    }
    window.history.replaceState(null, "", `/${href}`);
    router.prefetch(`/${href}`);
  };

  const breadcrumbs = getBreadcrumbs();
  const lastIndex = breadcrumbs.length - 1;

  return (
    <m.div
      layout="position"
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "w-full flex items-center justify-between gap-3 overflow-hidden",
        !isSimpleMode && "md:w-1/2",
      )}
    >
      <div className="flex items-center gap-2 flex-wrap">
        {breadcrumbs.map((crumb, index) => {
          const isActive =
            hoveredIndex === null
              ? index === lastIndex
              : hoveredIndex === index;

          return (
            <button
              key={crumb.href}
              className="flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer"
              onClick={() => handleSetPage(crumb.label.toLowerCase())}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <BreadcrumbArrow
                className="aspect-square max-md:w-4"
                isActive={isActive}
              />
              <span
                className={cn(
                  isActive ? "text-[#02C380]" : "text-[#004E33]",
                  "font-medium md:text-xl text-base",
                )}
              >
                {crumb.label}
              </span>
              {index < lastIndex && <span className="text-neutral-600">/</span>}
            </button>
          );
        })}
      </div>
    </m.div>
  );
}
