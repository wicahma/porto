"use client";

import { ExperienceCard } from "@/constants/dummies/experience-carousel";
import { m, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useScrollStore } from "@/store/scrollStore";
import { createPortal } from "react-dom";
import { isMdUp } from "@/utils/helper/responsive";
import ExperienceDialog from "@/components/molecules/experience/ExperienceDialog";
import ListLimiter from "@/components/atoms/chips/ListLimiter";

interface ExperienceCardProps {
  data: ExperienceCard;
  isCenter: boolean;
}

const ExperienceCarouselCard = ({ data, isCenter }: ExperienceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });
  const [canHover, setCanHover] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isScrolling = useScrollStore((state) => state.isScrolling);
  const isExpanded = isCenter && isHovered && canHover && !isScrolling;

  useEffect(() => {
    if (isCenter) {
      const timer = setTimeout(() => {
        setCanHover(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanHover(false);
      setIsHovered(false);
    }
  }, [isCenter]);

  useEffect(() => {
    if (isExpanded && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardPosition({
        top: rect.top,
        left: rect.left,
      });
    }
  }, [isExpanded]);

  const CollapsedCard = () => (
    <m.div
      ref={cardRef}
      className="bg-[#131313] border border-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden"
      onMouseEnter={() => canHover && isMdUp() && setIsHovered(true)}
      animate={{}}
      transition={{
        opacity: { delay: isExpanded ? 0 : 0.5 },
        duration: 0.8,
      }}
      style={{
        width: "200px",
        height: "200px",
        cursor: canHover ? "pointer" : "default",
      }}
    >
      <div className="flex h-full p-4 flex-col justify-center">
        <div className="text-center">
          <h3 className="text-base font-bold text-white mb-1">
            {data.company}
          </h3>
          <p className="text-sm text-[#ABABAB] mb-0.5">{data.role}</p>
          <p className="text-xs text-[#ABABAB]/70">{data.period}</p>
        </div>
      </div>
    </m.div>
  );

  const showMoreComponent = (_: string[], rem: string[]) => (
    <m.span
      className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-xs text-white inline-block"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.75,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      {rem.length}+
    </m.span>
  );

  const ExpandedCard = () =>
    createPortal(
      <AnimatePresence>
        {isExpanded && (
          <m.div
            className="fixed select-none cursor-pointer bg-[#131313] border border-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden"
            initial={{
              top: cardPosition.top,
              left: cardPosition.left,
              width: "200px",
              height: "200px",
              opacity: 0,
            }}
            animate={{
              top: cardPosition.top,
              left: cardPosition.left,
              width: "550px",
              height: "200px",
              opacity: 1,
            }}
            exit={{
              width: "200px",
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.32, 0.72, 0, 1],
            }}
            style={{
              zIndex: 100,
            }}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsDialogOpen(true)}
          >
            <div className="flex h-full">
              <div className="flex-1 py-6 px-5 flex flex-col justify-center gap-3">
                <m.div
                  className="text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <h3 className="text-base font-bold text-white">
                    {data.company}
                  </h3>
                  <p className="text-sm text-[#ABABAB] mb-0.5">
                    {data.role} | {data.period}
                  </p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.55,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <p className="text-[#ABABAB] line-clamp-2 text-xs">
                    {data.description}
                  </p>
                </m.div>

                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.7,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <p className="text-xs text-[#ABABAB]/70 mb-1">
                    Technologies:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <ListLimiter
                      items={data.technologies}
                      limit={5}
                      className="flex flex-wrap gap-1.5"
                      showMoreComponent={showMoreComponent}
                    >
                      {(tech, index) => {
                        return (
                          <m.span
                            className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-xs text-white inline-block"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.75 + index * 0.05,
                              ease: [0.32, 0.72, 0, 1],
                            }}
                          >
                            {tech}
                          </m.span>
                        );
                      }}
                    </ListLimiter>
                  </div>
                </m.div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <CollapsedCard />
      {isExpanded && <ExpandedCard />}
      <ExperienceDialog
        data={data}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default ExperienceCarouselCard;
