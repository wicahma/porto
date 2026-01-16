"use client";

import Batik from "@/assets/svg/batik";
import Br from "@/assets/svg/br";
import Skeleton from "@/components/atoms/Skeleton";
import { useExperiences } from "@/hooks/queries/useExperiences";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { AnimatePresence, m } from "motion/react";

const ExperienceDetailSkeleton = () => {
  return (
    <div className="space-y-0 md:pt-10 pb-20">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="mt-4">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-28 h-6" />
            <Skeleton className="w-32 h-5" />
          </div>
          <Skeleton className="w-48 h-5 mb-4" />
          <Skeleton className="w-full h-20 mb-6" />
          <div className="flex flex-wrap gap-3 mb-4">
            <Skeleton className="w-16 h-5" />
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-24 h-5" />
          </div>
          <Br />
        </div>
      ))}
    </div>
  );
};

const ExperienceDetail = () => {
  const scrollRef = useSmoothScroll();
  const { data, isLoading, isError } = useExperiences(1, 100);

  if (isLoading) {
    return (
      <m.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="md:h-[calc(100vh-10rem)] md:overflow-y-auto mask-color-card-top"
      >
        <ExperienceDetailSkeleton />
      </m.div>
    );
  }

  if (isError || !data?.data) {
    return (
      <m.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-center py-12"
      >
        <p className="text-neutral-400">Failed to load experiences</p>
      </m.div>
    );
  }

  return (
    <m.div
      ref={scrollRef}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-0 md:h-[calc(100vh-10rem)] md:overflow-y-auto mask-color-card-top md:pt-10 pb-20"
    >
      <div className="space-y-0">
        <AnimatePresence mode="popLayout">
          {data.data.map((exp, index) => (
            <m.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="mt-4 hover:bg-neutral-900/20 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-600/80 text-white rounded text-xs font-semibold uppercase">
                  {exp.employment_type}
                </span>
                <span className="text-sm text-neutral-400">
                  {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
                </span>
              </div>

              <p className="text-sm text-neutral-500 mb-4">{exp.company}</p>

              <p className="text-neutral-400 leading-relaxed mb-6">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-4">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Br />
            </m.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center py-8">
        <span className="text-xs text-neutral-500">
          Created with ❤️ by Teguh
        </span>
      </div>

      <Batik />
    </m.div>
  );
};

export default ExperienceDetail;
