"use client";
import LoadingScreen from "@/components/molecules/loaders-notfound/LoadingScreen";
import { usePageLoading } from "@/hooks/loading.hook";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ILayoutProps } from "@/interface/app/layout";
import { cn } from "@/lib/utils";
import { useViewModeStore } from "@/store/viewModeStore";
import { RenderIf } from "@/utils/helper/render-if";
import { useParams, usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React, { useId, useEffect, useState } from "react";

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const params = useParams();
  const id = useId();
  const pathname = usePathname();
  const isSimpleMode = useViewModeStore((state) => state.isSimpleMode);
  const init = useViewModeStore((state) => state.init);
  const disableOnPathname = [`/article/${params.slug}`];
  usePageLoading();

  useEffect(() => {
    init();
  }, [init]);

  const scrollRef = useSmoothScroll({
    disableOnPathname,
    disableOnMobile: false,
  });

  return (
    <main className="max-w-screen overflow-hidden">
      <LoadingScreen />
      <NextTopLoader height={1} color="#414141" />
      <RenderIf
        condition={!isSimpleMode && !disableOnPathname.includes(pathname)}
      >
        <div
          id="maskblur"
          className="md:mask-blur mask-blur-y w-screen h-screen cursor-none pointer-events-none fixed top-0 left-0 z-1000"
        />
        <div
          id="maskcolor"
          className="md:mask-color mask-color-y w-screen h-screen cursor-none pointer-events-none fixed top-0 left-0 z-1000"
        />
      </RenderIf>
      <div
        id="data"
        className={cn(
          "w-screen overflow-visible min-h-screen",
          isSimpleMode ? "md:h-auto pb-24" : "md:h-screen",
          disableOnPathname.includes(pathname) ? "" : "md:pt-28 pt-12",
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
