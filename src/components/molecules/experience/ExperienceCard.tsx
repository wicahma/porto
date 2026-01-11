import Sun from "@/assets/svg/sun";
import ExperienceCarouselCard from "@/components/atoms/ExperienceCarouselCard";
import StackedCarousel from "@/components/atoms/StackedCarousel";
import { experienceCarouselData } from "@/constants/dummies/experience-carousel";

const ExperienceCard = () => {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-center gap-3">
        <Sun />
        <h3 className="text-3xl font-semibold">Experience</h3>
        <Sun />
      </div>

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
