"use client";
import { domAnimation, LazyMotion } from "motion/react";
import React from "react";
import { GlobCursor } from "../atoms/GlobCursor";
import { useSecretHotkeys } from "@/hooks/useSecretHotkeys";
import { useRouter } from "next/navigation";
import { env } from "@/constants/env";
import { QueryProvider } from "./QueryProvider";

const Providers: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  useSecretHotkeys(env.hotkeys, (hotkey) => {
    router.push(`${env.redirectPage}?key=${env.adminSecretKey}`);
  });

  return (
    <QueryProvider>
      <LazyMotion features={domAnimation} strict>
        <GlobCursor />
        {children}
      </LazyMotion>
    </QueryProvider>
  );
};

export default Providers;
