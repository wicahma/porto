"use client";

import { ExperienceCard } from "@/constants/dummies/experience-carousel";
import { ExperiencePositionSummary } from "@/interface/entities/experience.interface";
import { isLogoSource } from "@/utils/helper/experience-logo";
import { m, AnimatePresence } from "motion/react";
import { ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ExperienceDialogProps {
  data: ExperienceCard;
  /** Every position held at the company, newest first. */
  positions?: ExperiencePositionSummary[];
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceDialog = ({
  data,
  positions,
  isOpen,
  onClose,
}: ExperienceDialogProps) => {
  const jobHistory = positions && positions.length > 1 ? positions : undefined;

  // Lock the page behind the dialog so a swipe inside it can never scroll the
  // page instead of the dialog body.
  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6"
          onWheel={(event) => event.stopPropagation()}
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

          {/* Modal Container: matching ProjectDetailDialog layout & scale animation */}
          <m.div
            className="relative z-10 w-[95%] max-w-[700px] md:w-[90%]"
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
                {/* Header with animated entrance */}
                <m.div
                  className="flex flex-col items-center text-center pr-8 pl-8 md:pr-10 md:pl-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Company logo (stored on the experience row) */}
                  {isLogoSource(data.logo) ? (
                    <img
                      src={data.logo}
                      alt={data.company}
                      className="mb-3 h-16 w-16 shrink-0 rounded-2xl object-contain md:h-20 md:w-20"
                    />
                  ) : (
                    <div className="mb-3 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-neutral-800 text-xl font-black text-[#02C380] md:h-20 md:w-20">
                      {data.company.charAt(0)}
                    </div>
                  )}

                  <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                    {data.company}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-neutral-400 md:text-sm">
                    {jobHistory
                      ? `${jobHistory.length} career positions`
                      : `${data.role} • ${data.period}`}
                  </p>
                </m.div>

                {/* Body Content */}
                {jobHistory ? (
                  <div className="space-y-3.5">
                    {jobHistory.map((position, index) => (
                      <m.div
                        key={`${position.role}-${index}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.05 + index * 0.07,
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="rounded-xl border border-neutral-800/80 bg-[#191919]/60 p-4 transition-all hover:border-neutral-700 hover:bg-[#1c1c1c]/80"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-sm font-semibold leading-snug text-white md:text-base">
                            {position.role}
                          </h3>
                          <span className="shrink-0 rounded-full border border-neutral-700/60 bg-neutral-800/90 px-2.5 py-0.5 font-mono text-[10px] text-neutral-300 md:text-xs">
                            {position.period}
                          </span>
                        </div>

                        {position.description && (
                          <p className="mt-2 text-xs leading-relaxed text-neutral-300 md:text-sm">
                            {position.description}
                          </p>
                        )}

                        {position.competency.length > 0 && (
                          <ul className="mt-3 space-y-1.5 border-t border-neutral-800/60 pt-2.5">
                            {position.competency.map((comp, compIndex) => (
                              <m.li
                                key={`${index}-${compIndex}`}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay:
                                    0.1 + index * 0.07 + compIndex * 0.03,
                                  duration: 0.25,
                                }}
                                className="flex items-start gap-2 text-xs leading-relaxed text-neutral-300 md:text-sm"
                              >
                                <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC501]" />
                                <span>{comp}</span>
                              </m.li>
                            ))}
                          </ul>
                        )}
                      </m.div>
                    ))}
                  </div>
                ) : (
                  <>
                    <m.div
                      className="rounded-xl border border-neutral-800/80 bg-[#191919]/60 p-4"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.05,
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <h3 className="mb-1.5 font-mono text-xs uppercase tracking-wider text-neutral-400">
                        Description
                      </h3>
                      <p className="text-xs leading-relaxed text-neutral-300 md:text-sm">
                        {data.description}
                      </p>
                    </m.div>

                    {data?.competency && data.competency.length > 0 && (
                      <m.div
                        className="space-y-2 rounded-xl border border-neutral-800/80 bg-[#191919]/60 p-4"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.1,
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <h3 className="mb-1 font-mono text-xs uppercase tracking-wider text-neutral-400">
                          Key Responsibilities &amp; Competencies
                        </h3>
                        <ul className="space-y-1.5">
                          {data.competency.map((comp, i) => (
                            <m.li
                              key={`${comp.slice(2)}-${i}`}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.12 + i * 0.03,
                                duration: 0.25,
                              }}
                              className="flex items-start gap-2 text-xs leading-relaxed text-neutral-300 md:text-sm"
                            >
                              <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC501]" />
                              <span>{comp}</span>
                            </m.li>
                          ))}
                        </ul>
                      </m.div>
                    )}
                  </>
                )}

                {/* Technologies & Skills chips with animated entrance */}
                {data.technologies && data.technologies.length > 0 && (
                  <m.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.18,
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="space-y-2 border-t border-neutral-800/70 pt-4"
                  >
                    <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                      Technologies &amp; Skills
                    </h3>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {data.technologies.map((tech, index) => (
                        <m.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.2 + index * 0.03,
                            duration: 0.2,
                          }}
                          className="rounded-md border border-neutral-700/60 bg-neutral-800/90 px-2.5 py-1 font-mono text-xs font-medium text-neutral-200 transition-colors hover:border-[#02C380] hover:text-[#02C380]"
                        >
                          {tech}
                        </m.span>
                      ))}
                    </div>
                  </m.div>
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

export default ExperienceDialog;
