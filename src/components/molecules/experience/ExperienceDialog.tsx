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

const ExperienceDialog = ({
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
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

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
        <>
          <m.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{ zIndex: 150 }}
            onClick={onClose}
            // Swallow wheel gestures so the page behind never scrolls.
            onWheel={(event) => event.stopPropagation()}
          />

          <m.div
            className="fixed top-1/2 left-1/2 flex max-h-[85vh] w-[95%] max-w-[700px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden overscroll-contain rounded-xl border border-[#1a1a1a] bg-[#131313] shadow-2xl md:max-h-[80vh] md:w-[90%] md:rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              zIndex: 200,
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 transition-colors z-10"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>

            <div
              data-scrollable
              className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain p-4 md:p-8"
            >
              <m.div
                className="flex flex-col items-center text-center mb-4 md:mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0, 0.2, 1],
                }}
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

                <h2 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">
                  {data.company}
                </h2>
                <p className="text-sm md:text-base text-[#ABABAB]">
                  {jobHistory
                    ? `${jobHistory.length} positions`
                    : `${data.role} | ${data.period}`}
                </p>
              </m.div>

              {jobHistory ? (
                <m.div
                  className="mb-4 md:mb-6 space-y-3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15,
                    duration: 1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {jobHistory.map((position, index) => (
                    <div
                      key={`${position.role}-${index}`}
                      className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5 md:p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm md:text-base font-semibold text-white leading-snug">
                          {position.role}
                        </h3>
                        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] md:text-xs text-neutral-300">
                          {position.period}
                        </span>
                      </div>

                      {position.description && (
                        <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-[#ABABAB]">
                          {position.description}
                        </p>
                      )}

                      {position.competency.length > 0 && (
                        <div className="mt-2.5 space-y-2">
                          {position.competency.map((comp, compIndex) => (
                            <p
                              key={`${index}-${compIndex}`}
                              className="flex items-start text-sm text-[#ABABAB]"
                            >
                              <ChevronRight
                                color="#FFC501"
                                className="mt-0.5 h-4 w-4 shrink-0"
                              />
                              <span>{comp}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </m.div>
              ) : (
                <>
                  <m.div
                    className="mb-4 md:mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15,
                      duration: 1,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <h3 className="md:text-lg font-semibold text-white mb-1.5 md:mb-2">
                      Description
                    </h3>
                    <p className="text-[#ABABAB] leading-relaxed">
                      {data.description}
                    </p>
                  </m.div>

                  <m.div className="space-y-3 mb-4 md:mb-6 text-[#ABABAB]">
                    {data?.competency?.map((comp, i) => (
                      <m.div
                        key={`${comp.slice(2)}-${i}`}
                        initial={{ opacity: 0, x: 10, y: 30 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{
                          delay: 0.15 + i * 0.1,
                          duration: 1,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      >
                        <p className="flex items-start">
                          <span>
                            <ChevronRight color="#FFC501" />
                          </span>
                          <span> {comp}</span>
                        </p>
                      </m.div>
                    ))}
                  </m.div>
                </>
              )}

              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <h3 className="font-semibold text-white mb-2 md:mb-3">
                  Technologies & Skills
                </h3>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {data.technologies.map((tech, index) => (
                    <m.span
                      key={tech}
                      className="px-2 py-1 md:px-3 md:py-1.5 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm text-white"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.45 + index * 0.15,
                        duration: 1,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      {tech}
                    </m.span>
                  ))}
                </div>
              </m.div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ExperienceDialog;
