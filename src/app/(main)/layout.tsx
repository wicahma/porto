"use client";
import LoadingScreen from "@/components/molecules/loaders-notfound/LoadingScreen";
import { usePageLoading } from "@/hooks/loading.hook";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ILayoutProps } from "@/interface/app/layout";
import { cn } from "@/lib/utils";
import { RenderIf } from "@/utils/helper/render-if";
import { useParams, usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const params = useParams();
  const pathname = usePathname();
  const disableOnPathname = [`/article/${params.slug}`];
  usePageLoading();
  const scrollRef = useSmoothScroll({
    disableOnPathname,
    disableOnMobile: false,
  });

  return (
    <main className="max-w-screen overflow-hidden">
      <LoadingScreen />
      <NextTopLoader height={1} color="#414141" />
      <RenderIf condition={!disableOnPathname.includes(pathname)}>
        <div className="md:mask-blur mask-blur-y w-screen h-screen cursor-none pointer-events-none fixed top-0 left-0 z-[1000]" />
        <div className="md:mask-color mask-color-y w-screen h-screen cursor-none pointer-events-none fixed top-0 left-0 z-[1000]" />
      </RenderIf>
      <div
        className={cn(
          "w-screen overflow-visible md:h-screen min-h-screen",
          disableOnPathname.includes(pathname) ? "" : "md:pt-[7rem] pt-[3rem]",
        )}
      >
        <div
          id="core-animation-component"
          ref={scrollRef}
          className="max-w-[1080px] mx-auto h-full"
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
