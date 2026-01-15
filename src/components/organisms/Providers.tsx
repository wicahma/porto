"use client";
import { domAnimation, LazyMotion } from "motion/react";
import React from "react";
import { GlobCursor } from "../atoms/GlobCursor";
import { useSecretHotkeys } from "@/hooks/useSecretHotkeys";
import { useRouter } from "next/navigation";
import { env } from "@/constants/env";

const Providers: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  useSecretHotkeys(env.hotkeys, (hotkey) => {
    router.push(env.redirectPage);
  });

  return (
    <LazyMotion features={domAnimation} strict>
      <GlobCursor />
      {children}
    </LazyMotion>
  );
};

export default Providers;
