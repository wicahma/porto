"use client";

import { ArrowUpRight } from "lucide-react";
import React from "react";
import { ProjectDetailData } from "./ProjectDetailDialog";

export interface ProjectPaperCardProps {
  project: ProjectDetailData;
  index?: number;
  variant?: "wide" | "compact" | "full";
  tilt?: number;
  onClick?: () => void;
}

/**
 * Project plate with title, measurement rule,
 * problem/solution rows, and bracketed tech tags.
 */
export const ProjectPaperCard: React.FC<ProjectPaperCardProps> = ({
  project,
  index = 0,
  variant = "full",
  tilt = 1,
  onClick,
}) => {
  const compact = variant === "compact";

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="group relative isolate flex h-full w-full cursor-pointer flex-col focus:outline-none"
    >
      {/* Underside plate, offset for the stacked-document read */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1.5 -top-1.5 bottom-1 -z-10 rounded-2xl bg-[var(--project-amber)] shadow-lg transition-transform duration-300 group-hover:rotate-0"
        style={{ transform: `rotate(${tilt}deg)` }}
      />

      <div className="plate lift relative flex h-full min-h-[268px] w-full flex-col justify-between overflow-hidden rounded-2xl p-5 md:p-6">
        <div className="flex flex-1 flex-col justify-between">
          <div>
            {/* Serial + link */}
            <div className="flex items-start justify-between gap-3">
              {project.year ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500 md:text-[11px]">
                  {project.year}
                </span>
              ) : null}

              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title={`Open ${project.title}`}
                  className="shrink-0 border border-[var(--line)] p-2 text-neutral-400 transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>

            <h3 className="mt-3 truncate text-lg font-bold leading-snug tracking-tight text-neutral-400 md:text-xl group-hover:text-[var(--project-amber)]">
              {project.title}
            </h3>

            {project.description ? (
              <p
                className={`mt-2 text-xs leading-relaxed text-neutral-400 md:text-[13px] ${
                  compact ? "line-clamp-2" : "line-clamp-2"
                }`}
              >
                {project.description}
              </p>
            ) : null}
          </div>

          {/* Readout rows */}
          <dl className="mt-4 grid grid-cols-[58px_1fr] gap-x-3 gap-y-1.5 border-t border-[var(--line-soft)] pt-3">
            <dt className="spec-label">Problem</dt>
            <dd className="truncate font-mono text-[11px] leading-relaxed text-neutral-400">
              {project.problem ?? "—"}
            </dd>
            <dt className="spec-label">Solution</dt>
            <dd className="truncate font-mono text-[11px] leading-relaxed text-neutral-400">
              {project.solution ?? "—"}
            </dd>
          </dl>
        </div>

        {/* Tags + affordance */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line-soft)] pt-3">
          <div className="flex flex-wrap gap-1.5">
            {(project.tags ?? []).slice(0, compact ? 3 : 4).map((tag) => (
              <span
                key={tag}
                className="border border-[var(--line)] px-1.5 py-0.5 font-mono text-[10px] leading-none text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500 transition-colors group-hover:text-[var(--project-amber)]">
            Details
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectPaperCard;
