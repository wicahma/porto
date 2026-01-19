"use client";

import { ExperienceJob } from "@/interface/entities/experience.interface";
import { formatDateRange } from "@/utils/helper/date.utils";
import { m } from "motion/react";

interface JobPositionItemProps {
  job: ExperienceJob;
  isNested?: boolean;
  index?: number;
  onClick?: () => void;
}

const JobPositionItem = ({
  job,
  isNested = false,
  index = 0,
  onClick,
}: JobPositionItemProps) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      onClick={onClick}
      className={`${
        isNested
          ? "pl-6 border-l-2 border-neutral-800 hover:border-purple-600/50"
          : ""
      } transition-all ${onClick ? "cursor-pointer hover:bg-neutral-900/20 rounded-lg p-3 -m-3" : ""}`}
    >
      <h4 className="text-xl font-semibold text-neutral-400 mb-2">
        {job.position}
      </h4>
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-purple-600/80 text-white rounded text-xs font-semibold uppercase">
          {job.employment_type}
        </span>
        <span className="text-sm text-neutral-400">
          {formatDateRange(
            job.start_date,
            job.end_date || undefined,
            job.is_current,
          )}
        </span>
      </div>

      <p className="text-neutral-400 leading-relaxed mb-6">{job.description}</p>
    </m.div>
  );
};

export default JobPositionItem;
