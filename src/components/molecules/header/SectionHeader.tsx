"use client";

import React from "react";

export interface SectionHeaderProps {
  /** Two-digit section index, e.g. "02". */
  index: string;
  title: string;
  /** Short mono meta shown after the dashed rule. */
  meta?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/**
 * MIL-SPEC section header: index readout, stencilled title, dashed
 * measurement rule, and an optional trailing action.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  title,
  meta,
  icon,
  action,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="spec-label spec-label--signal readout">SEC.{index}</span>
        <span className="spec-label">//</span>
        {meta ? <span className="spec-label">{meta}</span> : null}
      </div>

      <div className="flex items-end justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {icon ? <span className="shrink-0">{icon}</span> : null}
          <h2 className="truncate text-xl font-bold tracking-tight text-white md:text-2xl">
            {title}
          </h2>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      <span className="rule w-full" aria-hidden="true" />
    </div>
  );
};

export default SectionHeader;
