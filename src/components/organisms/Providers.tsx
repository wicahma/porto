"use client";
import { domAnimation, LazyMotion } from "motion/react";
import React from "react";
import { GlobCursor } from "../atoms/GlobCursor";

const Providers: React.FC<{ readonly children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <LazyMotion features={domAnimation} strict>
            <GlobCursor>{children}</GlobCursor>
        </LazyMotion>
    );
};

export default Providers;
