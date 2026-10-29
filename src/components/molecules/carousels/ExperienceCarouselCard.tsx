"use client";

import ExperienceDialog from "@/components/molecules/experience/ExperienceDialog";
import { ExperienceCard } from "@/constants/dummies/experience-carousel";
import { m } from "motion/react";
import React, { useState } from "react";

interface ExperienceCardProps {
  data: ExperienceCard;
  isCenter: boolean;
}

const ExperienceCarouselCard: React.FC<ExperienceCardProps> = ({
  data,
  isCenter,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <m.div
        whileHover={isCenter ? { scale: 1.04 } : { scale: 0.98 }}
        whileTap={isCenter ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2 }}
        onClick={() => {
          if (isCenter) {
            setIsDialogOpen(true);
          }
        }}
        className={`w-[200px] h-[200px] aspect-square rounded-2xl bg-[#131313] border shadow-2xl p-4 flex flex-col justify-center items-center text-center select-none transition-colors ${
          isCenter
            ? "border-neutral-700/80 hover:border-neutral-500 cursor-pointer"
            : "border-[#1a1a1a] cursor-pointer"
        }`}
      >
        <h3 className="text-base font-bold text-white mb-1.5 leading-snug truncate max-w-full">
          {data.company}
        </h3>
        <p className="text-sm font-medium text-[#ABABAB] mb-1 line-clamp-2 leading-snug">
          {data.role}
        </p>
        <p className="text-xs text-neutral-400 font-mono mt-0.5">
          {data.period}
        </p>
      </m.div>

      {/* Detail Popup Modal */}
      <ExperienceDialog
        data={data}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default ExperienceCarouselCard;
