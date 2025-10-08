"use client";

import Navbar from "@/components/molecules/header/Navbar";
import { ILayoutProps } from "@/interface/app/layout";
import NextTopLoader from "nextjs-toploader";
import React from "react";
import {
  ColorWipeTransition,
  useColorWipeNavigation,
} from "@/components/atoms/ColorWipeTransition";
import {
  CircularRevealTransition,
  useCircularRevealNavigation,
} from "@/components/atoms/CircularRevealTransition";

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const { handleTransitionFinish: handleColorWipeFinish } =
    useColorWipeNavigation();
  const { handleTransitionFinish: handleRevealFinish } =
    useCircularRevealNavigation();

  return (
    <main>
      <ColorWipeTransition onFinish={handleColorWipeFinish} />
      <CircularRevealTransition onFinish={handleRevealFinish} />
      <NextTopLoader height={1} color="#414141" />
      <div className="overflow-hidden min-h-screen pt-[5rem]">
        <div className="container mx-auto h-full flex flex-row">
          <Navbar />
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
