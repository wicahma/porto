import { ILayoutProps } from "@/interface/app/layout";
import NextTopLoader from "nextjs-toploader";
import React from "react";

const layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <main>
      <NextTopLoader height={1} color="#414141" />
      <div className="mask-blur w-screen h-screen cursor-none pointer-events-none fixed top-0 left-0 z-[1000]" />
      <div className="mask-color w-screen h-screen cursor-none pointer-events-none fixed top-0 left-0 z-[1000]" />
      <div className="w-screen overflow-visible h-screen min-h-screen pt-[7rem]">
        <div
          id="core-animation-component"
          className="max-w-[1080px] mx-auto h-full flex flex-row"
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default layout;
