"use client";

import Breadcrumb from "@/components/molecules/header/Breadcrumb";
import Infographic from "@/components/molecules/header/Infograpnic";
import { m } from "motion/react";
import React from "react";

interface PublicPageShellProps {
  /** Short route designation shown in the meta strip, e.g. "SEC / 03". */
  code: string;
  children: React.ReactNode;
}

/**
 * Shared frame for every public sub-page: breadcrumb + station info on top,
 * a MIL-SPEC meta strip underneath, and a faint plotting grid behind content.
 */
export const PublicPageShell: React.FC<PublicPageShellProps> = ({
  code,
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

        <div className="mt-4 flex items-center gap-3">
          <span className="spec-label spec-label--signal">{code}</span>
          <span className="rule flex-1" aria-hidden="true" />
          <span className="spec-label hidden sm:inline">TDCK // PUBLIC</span>
        </div>
      </m.div>

      <div className="relative">{children}</div>
    </div>
  );
};

export default PublicPageShell;
