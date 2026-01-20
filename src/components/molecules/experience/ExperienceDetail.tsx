"use client";

import Batik from "@/assets/svg/batik";
import Br from "@/assets/svg/br";
import Skeleton from "@/components/atoms/animations/Skeleton";
import CompanyExperienceGroup from "@/components/molecules/experience/CompanyExperienceGroup";
import { useExperiences } from "@/hooks/queries/experience.wrapper";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { RenderIf } from "@/utils/helper/render-if";
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

interface ExperienceDetailProps {
  skipAnimation?: boolean;
}

const ExperienceDetail = ({ skipAnimation = false }: ExperienceDetailProps) => {
  const scrollRef = useSmoothScroll();
  const { data, isLoading, isError } = useExperiences(1, 100);

  return (
    <m.div
      ref={scrollRef}
      initial={skipAnimation ? false : { opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-0 md:h-[calc(100vh-10rem)] md:overflow-y-auto mask-color-card-top md:pt-10 pb-20"
    >
      <RenderIf condition={isLoading}>
        <ExperienceDetailSkeleton />
      </RenderIf>

      <RenderIf condition={!isLoading && Boolean(isError && data?.data)}>
        <p className="text-neutral-400 text-center">
          Failed to load experiences
        </p>
      </RenderIf>

      <RenderIf
        condition={!isLoading && Boolean(!isError && data?.data.length === 0)}
      >
        <p className="text-neutral-400 text-center mt-5">
          There is no way to gain experience without experience, but stay tuned
          for upcoming experiences!
        </p>
      </RenderIf>

      <RenderIf condition={Boolean(!isLoading && !isError && data?.data)}>
        <div className="space-y-0">
          <AnimatePresence mode="popLayout">
            {data?.data?.map((exp, index) => (
              <div key={exp.id}>
                <CompanyExperienceGroup experience={exp} index={index} />
                <Br />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </RenderIf>

      <div className="flex justify-center py-8">
        <span className="text-xs text-neutral-500 ">
          Created with ❤️ by Teguh
        </span>
      </div>

      <Batik />
    </m.div>
  );
};

export default ExperienceDetail;
