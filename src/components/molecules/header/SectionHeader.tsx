"use client";

import React from "react";

export interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Section header with title and optional trailing action.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  action,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
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
