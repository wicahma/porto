import Sun from "@/assets/svg/sun";
import ExperienceCarouselCard from "@/components/atoms/ExperienceCarouselCard";
import StackedCarousel from "@/components/atoms/StackedCarousel";
import { useExperiences } from "@/hooks/queries/experience.wrapper";
import {
  filterUniqueCompanies,
  mapExperienceToCard,
} from "@/utils/mappers/experience.mapper";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const ExperienceCard = () => {
  const router = useRouter();
  const { data: experiencesData, isLoading } = useExperiences(1, 5);
  const experiences = experiencesData?.data;

  const handleSetPage = () => {
    window.history.replaceState(null, "", `/experience`);
    router.prefetch("/experience");
  };

  const filteredExperiences = useMemo(() => {
    if (!experiences) return [];
    return filterUniqueCompanies(experiences);
  }, [experiences]);

  const mappedExperiences = filteredExperiences.map(mapExperienceToCard) || [];

  return (
    <div className="space-y-10">
      <button
        className="flex items-center justify-center gap-3 cursor-pointer w-full"
        onClick={handleSetPage}
      >
        <Sun />
        <h3 className="text-3xl font-semibold">Work Experience</h3>
        <Sun />
      </button>

      {isLoading ? (
        <div className="w-full h-50 flex justify-center items-center mt-10">
          <div className="animate-pulse w-50 h-50 bg-[#131313] border border-[#1a1a1a] rounded-2xl" />
        </div>
      ) : mappedExperiences.length > 0 ? (
        <StackedCarousel
          items={mappedExperiences}
          renderCard={(item, _, isCenter) => (
            <ExperienceCarouselCard data={item} isCenter={isCenter} />
          )}
          autoPlayDuration={2000}
          blurIntensity={4}
          overlapSpace={70}
          cardWidth={200}
          cardHeight={200}
          className="mt-10"
        />
      ) : (
        <div className="w-full h-50 flex justify-center items-center mt-10 text-neutral-500">
          No experience data available
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
