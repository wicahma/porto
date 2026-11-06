"use client";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ILayoutProps } from "@/interface/app/layout";
import { cn } from "@/lib/utils";
import { useViewModeStore } from "@/store/viewModeStore";
import { useParams, usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React, { useEffect } from "react";

/**
 * Public shell. The old dual-mode blur masks were tied to the animated home
 * variant; the public site now renders one composition, so the masks are gone
 * and only the shared chrome remains.
 */
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const params = useParams();
  const pathname = usePathname();
  const disableOnPathname = [`/article/${params.slug}`];
  const init = useViewModeStore((state) => state.init);

  useEffect(() => {
    init();
  }, [init]);

  const scrollRef = useSmoothScroll({
    disableOnPathname,
    disableOnMobile: false,
  });

  return (
    <main className="max-w-screen overflow-hidden">
      <NextTopLoader height={1} color="var(--ink-500)" />
      <div
        id="data"
        className={cn(
          "w-screen overflow-visible min-h-screen pb-24",
          disableOnPathname.includes(pathname) ? "pt-12" : "pt-12 md:pt-20",
        )}
      >
        <div
          id="core-animation-component"
          ref={scrollRef}
          className="max-w-270 mx-auto h-full"
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
