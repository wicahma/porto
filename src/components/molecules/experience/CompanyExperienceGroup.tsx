"use client";

import JobPositionItem from "@/components/atoms/JobPositionItem";
import ExperienceDialog from "@/components/molecules/experience/ExperienceDialog";
import { ExperienceCard } from "@/constants/dummies/experience-carousel";
import {
  Experience,
  ExperienceJob,
} from "@/interface/entities/experience.interface";
import { cn } from "@/lib/utils";
import { formatDateRange } from "@/utils/helper/date.utils";
import { ChevronUp } from "lucide-react";
import { m } from "motion/react";
import { useState } from "react";

interface CompanyExperienceGroupProps {
  experience: Experience & { jobs: ExperienceJob[] };
  index?: number;
}

const CompanyExperienceGroup = ({
  experience,
  index = 0,
}: CompanyExperienceGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<ExperienceJob | null>(null);
  const hasMultipleJobs = (experience?.jobs?.length || 0) > 1;

  const mapJobToExperienceCard = (job: ExperienceJob): ExperienceCard => {
    return {
      id: job.id,
      company: experience.company,
      role: job.position,
      period: formatDateRange(
        job.start_date,
        job.end_date || undefined,
        job.is_current,
      ),
      description: job.description,
      technologies: experience.tags || [],
    };
  };

  const handleJobClick = (job: ExperienceJob) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

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
      className="mt-4"
    >
      <button
        className={`mb-4 ${
          hasMultipleJobs && "cursor-pointer"
        } hover:bg-neutral-900/20 transition-all rounded-lg`}
        onClick={() => hasMultipleJobs && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-neutral-100 mb-2">
              {experience.company}
            </h3>
            <div className="pl-3 flex items-center gap-3 mb-2">
              <span className="text-sm text-neutral-500">
                {experience.location}
              </span>
              <span className="text-sm text-neutral-500">•</span>
              <span className="text-sm text-neutral-400">
                {experience.total_duration}
              </span>
            </div>
            {(experience?.tags?.length || 0) > 0 && (
              <div className="pl-3 flex flex-wrap gap-2 mt-3">
                {experience?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {hasMultipleJobs && (
            <div className="text-neutral-400 hover:text-neutral-200 transition-colors">
              <ChevronUp
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isExpanded && "rotate-180",
                )}
              />
            </div>
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="space-y-6">
          {experience.jobs?.map((job, jobIndex) => (
            <JobPositionItem
              key={job.id}
              job={job}
              isNested={hasMultipleJobs}
              index={jobIndex}
              onClick={() => handleJobClick(job)}
            />
          ))}
        </div>
      )}

      {selectedJob && (
        <ExperienceDialog
          data={mapJobToExperienceCard(selectedJob)}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </m.div>
  );
};

export default CompanyExperienceGroup;
