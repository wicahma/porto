"use client";

import Breadcrumb from "@/components/molecules/header/Breadcrumb";
import Infographic from "@/components/molecules/header/Infograpnic";
import { m } from "motion/react";
import React from "react";

interface PublicPageShellProps {
  /** Section heading used by the shared public-page frame. */
  children: React.ReactNode;
}

/**
 * Shared frame for every public sub-page: breadcrumb + station info on top.
 */
export const PublicPageShell: React.FC<PublicPageShellProps> = ({
  children,
}) => {
  return (
    <div className="relative w-full min-h-screen pb-16">
      <div
        aria-hidden="true"
        className="grid-plot pointer-events-none absolute inset-0 opacity-40"
      />

      <m.div
        layoutId="page-top-header"
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full border-b border-neutral-800/60 pb-4 mb-6"
      >
        <div className="flex flex-col-reverse gap-3">
          <Breadcrumb />
          <Infographic showToggle={false} />
        </div>
      </m.div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default PublicPageShell;
