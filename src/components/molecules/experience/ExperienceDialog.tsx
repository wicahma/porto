"use client";

import { ExperienceCard } from "@/constants/dummies/experience-carousel";
import { m, AnimatePresence } from "motion/react";
import { ChevronRight, X } from "lucide-react";
import { createPortal } from "react-dom";

interface ExperienceDialogProps {
  data: ExperienceCard;
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceDialog = ({ data, isOpen, onClose }: ExperienceDialogProps) => {
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
          />

          <m.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[700px] md:w-[90%] bg-[#131313] border border-[#1a1a1a] rounded-xl md:rounded-2xl shadow-2xl overflow-hidden"
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

            <div className="p-4 md:p-8 max-h-[85vh] md:max-h-[80vh] overflow-y-scroll">
              <m.div
                className="text-center mb-4 md:mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <h2 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">
                  {data.company}
                </h2>
                <p className="text-sm md:text-base text-[#ABABAB]">
                  {data.role} | {data.period}
                </p>
              </m.div>

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
                <h3 className="text-xs md:text-sm font-semibold text-white mb-1.5 md:mb-2">
                  Description
                </h3>
                <p className="text-[#ABABAB] text-xs md:text-sm leading-relaxed">
                  {data.description}
                </p>
              </m.div>

              <m.div>
                {data?.competency?.map((comp, i) => (
                  <m.div
                    key={`${comp.slice(2)}-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.05,
                      duration: 1,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <p>
                      <span>
                        <ChevronRight color="#FFC501" />
                      </span>{" "}
                      {comp}
                    </p>
                  </m.div>
                ))}
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 1,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <h3 className="text-xs md:text-sm font-semibold text-white mb-2 md:mb-3">
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
                        delay: 0.45 + index * 0.05,
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
