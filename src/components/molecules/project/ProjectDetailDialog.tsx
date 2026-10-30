"use client";

import { m, AnimatePresence } from "motion/react";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export interface ProjectDetailData {
  id: string;
  title: string;
  description?: string | null;
  problem?: string | null;
  solution?: string | null;
  year?: string | null;
  tags?: string[] | null;
  link?: string | null;
}

interface ProjectDetailDialogProps {
  project: ProjectDetailData | null;
  isOpen: boolean;
  onClose: () => void;
}

const DARK_PAPER_PATTERN = `
  url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E"),
  url("data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 36 0 L 0 0 0 36' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1' stroke-dasharray='2 3'/%3E%3C/svg%3E")
`;

export const ProjectDetailDialog = ({
  project,
  isOpen,
  onClose,
}: ProjectDetailDialogProps) => {
  // Lock page scroll behind the modal
  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && project && (
        <>
          {/* Backdrop blur overlay */}
          <m.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ zIndex: 150 }}
            onClick={onClose}
            onWheel={(e) => e.stopPropagation()}
          />

          {/* Modal Card - Styled with dark grid + grain paper from Image #2 */}
          <m.div
            className="fixed top-1/2 left-1/2 flex max-h-[85vh] w-[95%] max-w-[680px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden overscroll-contain rounded-2xl border border-neutral-700/80 shadow-2xl shadow-black/80 md:max-h-[80vh] md:w-[90%]"
            initial={{ opacity: 0, scale: 0.94, y: "-46%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%" }}
            exit={{ opacity: 0, scale: 0.94, y: "-46%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              zIndex: 200,
              backgroundColor: "#131313",
              backgroundImage: DARK_PAPER_PATTERN,
            }}
          >
            {/* Underlying stacked paper edge effect */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-2 -top-1 bottom-1 -z-10 rotate-1 rounded-2xl border border-neutral-700/50 bg-[#0c0c0c]"
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 md:top-4 md:right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Scrollable Modal Content */}
            <div
              data-scrollable
              className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain p-6 md:p-8 space-y-6"
            >
              {/* Header */}
              <div className="space-y-2 pr-10">
                <div className="flex items-center gap-2.5">
                  {project.year && (
                    <span className="font-mono text-xs text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                      {project.year}
                    </span>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-[#02C380] hover:underline"
                    >
                      <span>
                        {project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* Description */}
              {project.description && (
                <div className="text-sm md:text-base text-neutral-300 leading-relaxed">
                  {project.description}
                </div>
              )}

              {/* Problem Callout Box */}
              {project.problem && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Problem
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Solution Callout Box */}
              {project.solution && (
                <div className="rounded-xl border border-[#02C380]/30 bg-[#02C380]/5 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#02C380] uppercase tracking-wider font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#02C380]" />
                    Solution
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}

              {/* Tech Stack Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-neutral-800/70">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Tech Stack & Tools
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-800/90 text-neutral-200 border border-neutral-700/60 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              {project.link && (
                <div className="pt-2 flex justify-end">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#02C380] hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>
                      {project.link.includes("github.com")
                        ? "View Repository"
                        : "Open Live Website"}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ProjectDetailDialog;
