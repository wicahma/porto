"use client";
import { GlobCursor } from "@/components/atoms/animations/GlobCursor";
import LegoBackground from "@/components/background/LegoBackground";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ILayoutProps } from "@/interface/app/layout";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React from "react";

/**
 * Public shell. One composition is rendered for every public route; the old
 * animated/simple mode switch is gone, so the shell only owns chrome, scroll
 * behaviour, and the shared gutters.
 */
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const params = useParams();
  const pathname = usePathname();
  const disableOnPathname = [`/article/${params.slug}`];
  const isArticleDetail = pathname.startsWith("/article/");

  const scrollRef = useSmoothScroll({
    disableOnPathname,
    disableOnMobile: false,
  });

  return (
    <main className="relative isolate max-w-screen overflow-hidden">
      {!isArticleDetail && <LegoBackground contentRef={scrollRef} />}
      <NextTopLoader height={1} color="var(--ink-500)" />
      <GlobCursor />
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
          className="max-w-270 mx-auto h-full px-4 sm:px-6 xl:px-0"
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
