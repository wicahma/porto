"use client";
import { domAnimation, LazyMotion } from "motion/react";
import React from "react";
import { GlobCursor } from "../atoms/GlobCursor";
import { StoreProvider } from "../providers/StoreProvider";

const Providers: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StoreProvider>
      <LazyMotion features={domAnimation} strict>
        <GlobCursor />
        {children}
      </LazyMotion>
    </StoreProvider>
  );
};

export default Providers;
