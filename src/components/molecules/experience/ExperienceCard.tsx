import Sun from "@/assets/svg/sun";
import ExperienceCarouselCard from "@/components/atoms/ExperienceCarouselCard";
import StackedCarousel from "@/components/atoms/StackedCarousel";
import { useExperiences } from "@/hooks/queries/useExperiences";
import { useNavigationStore } from "@/store/navigationStore";
import { mapExperienceToCard } from "@/utils/mappers/experience.mapper";

const ExperienceCard = () => {
  const setPage = useNavigationStore((state) => state.setPage);
  const { data: experiencesData, isLoading } = useExperiences(1, 5);
  const experiences = experiencesData?.data;

  const handleSetPage = () => {
    setPage("experience");
  };

  const mappedExperiences = experiences?.map(mapExperienceToCard) || [];

  return (
    <div className="space-y-10">
      <button
        className="flex items-center justify-center gap-3 cursor-pointer w-full"
        onClick={handleSetPage}
      >
        <Sun />
        <h3 className="text-3xl font-semibold">Experience</h3>
        <Sun />
      </button>

      {isLoading ? (
        <div className="w-full h-[200px] flex justify-center items-center mt-10">
          <div className="animate-pulse w-[200px] h-[200px] bg-[#131313] border border-[#1a1a1a] rounded-2xl" />
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
        <div className="w-full h-[200px] flex justify-center items-center mt-10 text-neutral-500">
          No experience data available
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
