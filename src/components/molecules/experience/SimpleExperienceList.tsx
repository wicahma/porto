"use client";

import Br from "@/assets/svg/br";
import Sun from "@/assets/svg/sun";
import { StorageImage } from "@/components/atoms/images/StorageImage";
import { useExperiences } from "@/hooks/queries/experience.wrapper";
import {
  filterUniqueCompanies,
  mapExperienceToCard,
} from "@/utils/mappers/experience.mapper";
import { RenderIf } from "@/utils/helper/render-if";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

export const SimpleExperienceList: React.FC = () => {
  const router = useRouter();
  const { data: experiencesData, isLoading } = useExperiences(1, 10);
  const experiences = (experiencesData as any)?.experiences;

  const filteredExperiences = useMemo(() => {
    if (!experiences) return [];
    return filterUniqueCompanies(experiences);
  }, [experiences]);

  const mappedExperiences = filteredExperiences.map(mapExperienceToCard) || [];

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push("/experience")}
        className="flex items-center justify-between w-full group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Sun className="text-amber-400" />
          <h3 className="text-2xl font-bold group-hover:text-[#02C380] transition-colors">
            Work Experience
          </h3>
        </div>
        <span className="text-xs font-semibold text-neutral-500 group-hover:text-neutral-300 transition-colors">
          View all →
        </span>
      </button>

      <RenderIf condition={isLoading}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-neutral-900/60 border border-neutral-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </RenderIf>

      <RenderIf condition={!isLoading && mappedExperiences.length > 0}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {mappedExperiences.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push("/experience")}
              className="p-4 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800/80 hover:border-neutral-700 rounded-2xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                {item.image ? (
                  <StorageImage
                    src={item.image}
                    alt={item.company}
                    className="w-10 h-10 rounded-xl object-cover bg-neutral-950 border border-neutral-800"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center font-bold text-[#02C380]">
                    {item.company.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-sm truncate">
                    {item.company}
                  </h4>
                  <p className="text-xs text-neutral-400 truncate">
                    {item.role}
                  </p>
                </div>
              </div>
              <p className="text-[11px] font-medium text-neutral-500 mt-3">
                {item.period}
              </p>
            </div>
          ))}
        </div>
      </RenderIf>
    </div>
  );
};

export default SimpleExperienceList;
