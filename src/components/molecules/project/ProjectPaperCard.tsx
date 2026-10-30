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

export const ProjectPaperCard: React.FC<ProjectPaperCardProps> = ({
  project,
  variant = "full",
  tilt = 1,
  onClick,
}) => {
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
      className="group relative isolate flex h-full w-full cursor-pointer flex-col justify-between focus:outline-none"
    >
      {/* 1. Underlying stacked paper layer (sleek dark paper base) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1.5 -top-1.5 bottom-1 -z-10 rounded-2xl border border-neutral-800/70 bg-[#0c0c0c] shadow-lg transition-transform duration-300 group-hover:rotate-0"
        style={{
          transform: `rotate(${tilt}deg)`,
        }}
      />

      {/* 2. Main Dark Paper Card (Clean dark background, uniform height) */}
      <div className="relative flex h-full min-h-[280px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800/90 bg-[#141414] p-5 shadow-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-neutral-600/80 md:p-6">
        <div className="flex flex-1 flex-col justify-between">
          <div>
            {/* Top row: Year & Title & External Link */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-center gap-2">
                  {project.year && (
                    <span className="rounded-full border border-neutral-700/60 bg-neutral-800/90 px-2 py-0.5 font-mono text-[10px] text-neutral-300 md:text-[11px]">
                      {project.year}
                    </span>
                  )}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                    Project file
                  </span>
                </div>
                <h4 className="truncate text-lg font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-[#02C380] md:text-xl">
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

            {/* Description (2 lines clamp) */}
            {project.description && (
              <p className="mt-3 line-clamp-2 text-xs font-normal leading-relaxed text-neutral-300 md:text-sm">
                {project.description}
              </p>
            )}
          </div>

          {/* Problem & Solution callouts: rendered on ALL cards for balanced uniform height */}
          <div className="mt-3.5 space-y-1.5 border-t border-neutral-800/80 pt-3 text-[11px] font-mono">
            {project.problem ? (
              <div className="truncate text-neutral-400">
                <span className="mr-1.5 font-semibold text-amber-400">
                  Problem:
                </span>
                <span>{project.problem}</span>
              </div>
            ) : (
              <div className="truncate text-neutral-500">
                <span className="mr-1.5 font-semibold text-neutral-500">
                  System:
                </span>
                <span>Production service and domain architecture</span>
              </div>
            )}
            {project.solution ? (
              <div className="truncate text-neutral-400">
                <span className="mr-1.5 font-semibold text-[#02C380]">
                  Solution:
                </span>
                <span>{project.solution}</span>
              </div>
            ) : (
              <div className="truncate text-neutral-500">
                <span className="mr-1.5 font-semibold text-neutral-500">
                  Deliverable:
                </span>
                <span>High-performance implementation &amp; APIs</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom row: Tech stack tags & Detail preview prompt */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-800/70 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-neutral-700/60 bg-neutral-800/90 px-2 py-0.5 font-mono text-[10px] text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="font-mono text-[10px] text-neutral-400 transition-colors group-hover:text-[#02C380]">
            Click to view detail ↗
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectPaperCard;
