"use client";

import { ArrowUpRight } from "lucide-react";
import React from "react";
import { ProjectDetailData } from "./ProjectDetailDialog";

export interface ProjectPaperCardProps {
  project: ProjectDetailData;
  index?: number;
  /**
   * Bento/Tetris grid sizing variant:
   * - "wide": 7 columns on md+ screens
   * - "compact": 5 columns on md+ screens
   * - "full": full width (for stacked/animated UI)
   */
  variant?: "wide" | "compact" | "full";
  /** Tilt angle for underlying stacked paper card (e.g. -1, 1, -0.8, 0.8) */
  tilt?: number;
  onClick?: () => void;
}

const DARK_PAPER_PATTERN = `
  url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E"),
  url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 36 0 L 0 0 0 36' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1' stroke-dasharray='2 3'/%3E%3C/svg%3E")
`;

export const ProjectPaperCard: React.FC<ProjectPaperCardProps> = ({
  project,
  variant = "full",
  tilt = 1,
  onClick,
}) => {
  const colSpanClass =
    variant === "wide"
      ? "col-span-12 md:col-span-7"
      : variant === "compact"
        ? "col-span-12 md:col-span-5"
        : "w-full";

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
      className={`group relative isolate cursor-pointer flex flex-col justify-between ${colSpanClass} focus:outline-none`}
    >
      {/* 1. Underlying stacked paper layer (dark paper metaphor) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1.5 -top-1.5 bottom-1 -z-10 rounded-2xl border border-neutral-800/80 bg-[#0c0c0c] transition-transform duration-300 group-hover:rotate-0"
        style={{ transform: `rotate(${tilt}deg)` }}
      />

      {/* 2. Main Dark Paper Card (Grid + Grain background from Image #2) */}
      <div
        className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800/90 p-5 md:p-6 shadow-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-neutral-700"
        style={{
          backgroundColor: "#131313",
          backgroundImage: DARK_PAPER_PATTERN,
        }}
      >
        <div>
          {/* Top row: Year & Title & External Link */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                {project.year && (
                  <span className="font-mono text-[10px] md:text-[11px] text-neutral-400 bg-neutral-800/80 border border-neutral-700/60 px-2 py-0.5 rounded-full">
                    {project.year}
                  </span>
                )}
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  Project file
                </span>
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-[#02C380] transition-colors truncate">
                {project.title}
              </h4>
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title={`Open ${project.title}`}
                className="shrink-0 rounded-xl border border-neutral-700/70 bg-neutral-800/90 p-2 text-neutral-300 shadow-sm transition-all hover:border-[#02C380] hover:bg-[#02C380] hover:text-neutral-950"
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Description */}
          {project.description && (
            <p className="mt-3 text-xs md:text-sm leading-relaxed text-neutral-300 font-normal line-clamp-2">
              {project.description}
            </p>
          )}

          {/* Problem / Solution preview for wide cards */}
          {variant === "wide" && (project.problem || project.solution) && (
            <div className="mt-3.5 space-y-1.5 border-t border-neutral-800/80 pt-3 text-[11px] font-mono">
              {project.problem && (
                <div className="truncate text-neutral-400">
                  <span className="mr-1.5 font-semibold text-amber-400">
                    Problem:
                  </span>
                  <span>{project.problem}</span>
                </div>
              )}
              {project.solution && (
                <div className="truncate text-neutral-400">
                  <span className="mr-1.5 font-semibold text-[#02C380]">
                    Solution:
                  </span>
                  <span>{project.solution}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom row: Tech stack tags & Detail preview prompt */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-800/70 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags?.slice(0, variant === "wide" ? 4 : 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-neutral-700/60 bg-neutral-800/90 px-2 py-0.5 font-mono text-[10px] text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="font-mono text-[10px] text-neutral-400 group-hover:text-[#02C380] transition-colors">
            Click to view detail ↗
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectPaperCard;
