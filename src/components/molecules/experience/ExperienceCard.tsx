import Sun from "@/assets/svg/sun";
import ExperienceCarouselCard from "@/components/atoms/ExperienceCarouselCard";
import StackedCarousel from "@/components/atoms/StackedCarousel";
import { experienceCarouselData } from "@/constants/dummies/experience-carousel";
import { useNavigationStore } from "@/store/navigationStore";

const ExperienceCard = () => {
  const setPage = useNavigationStore((state) => state.setPage);

  const handleSetPage = () => {
    setPage("experience");
  };

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

      <StackedCarousel
        items={experienceCarouselData}
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
    </div>
  );
};

export default ExperienceCard;
