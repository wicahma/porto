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
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Lightweight backdrop overlay */}
          <m.div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />

          {/* Modal Container: wraps both paper cards into one GPU-composited layer */}
          <m.div
            className="relative z-10 w-[95%] max-w-[680px] md:w-[90%]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Underlying tilted paper card (clean sleek dark base) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-1.5 -top-1.5 bottom-1 -z-10 rotate-1 rounded-2xl border border-neutral-800/70 bg-[#0c0c0c] shadow-2xl"
            />

            {/* Main Modal Card (Clean dark background) */}
            <div className="relative flex max-h-[85vh] w-full flex-col overflow-hidden overscroll-contain rounded-2xl border border-neutral-800/90 bg-[#141414] shadow-2xl shadow-black/90 md:max-h-[80vh]">
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3.5 right-3.5 z-20 cursor-pointer rounded-full border border-white/10 bg-white/5 p-2 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white active:bg-white/15 md:top-4 md:right-4"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>

              {/* Scrollable Modal Content */}
              <div
                data-scrollable
                className="min-h-0 flex-1 touch-pan-y space-y-6 overflow-y-auto overscroll-contain p-6 md:p-8"
              >
                {/* Header */}
                <div className="space-y-2 pr-10">
                  <div className="flex items-center gap-2.5">
                    {project.year && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-xs text-neutral-400">
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
                          {project.link
                            .replace(/^https?:\/\//, "")
                            .replace(/\/$/, "")}
                        </span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>

                  <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white md:text-3xl">
                    {project.title}
                  </h2>
                </div>

                {/* Description */}
                {project.description && (
                  <div className="text-sm leading-relaxed text-neutral-300 md:text-base">
                    {project.description}
                  </div>
                )}

                {/* Problem Callout Box */}
                {project.problem && (
                  <div className="space-y-1.5 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      Problem
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-300">
                      {project.problem}
                    </p>
                  </div>
                )}

                {/* Solution Callout Box */}
                {project.solution && (
                  <div className="space-y-1.5 rounded-xl border border-[#02C380]/30 bg-[#02C380]/5 p-4">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#02C380]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#02C380]" />
                      Solution
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-300">
                      {project.solution}
                    </p>
                  </div>
                )}

                {/* Tech Stack Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="space-y-2 border-t border-neutral-800/70 pt-2">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                      Tech Stack &amp; Tools
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-neutral-700/60 bg-neutral-800/90 px-2.5 py-1 font-mono text-xs font-medium text-neutral-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {project.link && (
                  <div className="flex justify-end pt-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#02C380] px-5 py-2.5 text-sm font-bold text-neutral-950 shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] hover:bg-emerald-400 active:scale-[0.98]"
                    >
                      <span>
                        {project.link.includes("github.com")
                          ? "View Repository"
                          : "Open Live Website"}
                      </span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ProjectDetailDialog;
