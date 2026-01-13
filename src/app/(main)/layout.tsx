"use client";
import { ILayoutProps } from "@/interface/app/layout";
import { useNavigationStore } from "@/store/navigationStore";
import NextTopLoader from "nextjs-toploader";
import React, { useEffect } from "react";
import LoadingScreen from "@/components/molecules/LoadingScreen";
import { usePageLoading } from "@/hooks/usePageLoading";

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  usePageLoading();
  const detailPage = useNavigationStore((state) => state.detailPage);
  useEffect(() => {
    if (!detailPage) {
      window.history.replaceState(null, "", `/`);
      return;
    }
    window.history.replaceState(null, "", `/${detailPage}`);
  }, [detailPage]);

  return (
    <main className="max-w-screen overflow-hidden">
      <LoadingScreen />
      <NextTopLoader height={1} color="#414141" />
      <div className="md:mask-blur mask-blur-y w-screen h-screen cursor-none pointer-events-none fixed top-0 left-0 z-[1000]" />
      <div className="md:mask-color mask-color-y w-screen h-screen cursor-none pointer-events-none fixed top-0 left-0 z-[1000]" />
      <div className="w-screen overflow-visible md:h-screen min-h-screen md:pt-[7rem] pt-[3rem]">
        <div
          id="core-animation-component"
          className="max-w-[1080px] mx-auto h-full"
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
