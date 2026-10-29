"use client";
import { domMax, LazyMotion } from "motion/react";
import React from "react";
import { GlobCursor } from "../../atoms/animations/GlobCursor";
import { useSecretHotkeys } from "@/hooks/secret-hotkeys.hook";
import { useRouter } from "next/navigation";
import { vals } from "@/constants/val";
import { QueryProvider } from "./QueryProvider";

const Providers: React.FC<{
  readonly children: React.ReactNode;
  resolvedVal: Partial<Awaited<ReturnType<typeof vals>>>;
}> = ({ children, resolvedVal }) => {
  const router = useRouter();
  useSecretHotkeys(resolvedVal?.hotkeys || "", (hotkey) => {
    router.push(
      `${resolvedVal?.redirectPage}?key=${resolvedVal?.adminSecretKey}`,
    );
  });

  return (
    <QueryProvider>
      <LazyMotion features={domMax} strict>
        <GlobCursor />
        {children}
      </LazyMotion>
    </QueryProvider>
  );
};

export default Providers;
