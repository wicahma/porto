import Br from "@/assets/svg/br";
import FolderIcon from "@/assets/svg/folder";
import ProjectIcon from "@/assets/svg/project-icon";
import StarGede from "@/assets/svg/star-gede";
import Sun from "@/assets/svg/sun";
import { m } from "motion/react";
import StackedCarousel from "@/components/atoms/StackedCarousel";
import ExperienceCarouselCard from "@/components/atoms/ExperienceCarouselCard";
import { experienceCarouselData } from "@/constants/dummies/experience-carousel";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const RightCard = () => {
  const scrollRef = useSmoothScroll({ speed: 1, smoothness: 0.1 });

  return (
    <m.div
      ref={scrollRef}
      className="w-full pt-10 space-y-10 overflow-y-scroll overflow-x-clip h-[calc(100vh-10rem)] pb-20"
    >
      <div className="flex items-center gap-3 w-full justify-between flex-nowrap">
        <span className="text-nowrap text-[#ABABAB]">About me</span>
        <Br className="mt-1" />
      </div>

      <div>
        <div className="flex gap-x-5 items-center mb-2">
          <StarGede className="aspect-square w-10 h-fit" />
          <h3 className="text-3xl font-semibold">The Person Behind the Work</h3>
        </div>
        <p className="leading-8 text-[#ABABAB] text-xl tracking-wider">
          Driven by a passion for creating seamless digital experiences, I
          specialize in turning complex problems into elegant, user-centric
          solutions. I believe that great design/code isn't just about how it
          looks, but how it functions and scales. Over the years, I’ve honed my
          ability to bridge the gap between technical constraints and creative
          vision, ensuring every project I touch delivers measurable value and a
          lasting impression.
        </p>
      </div>

      <Br />

      <div>
        <div className="flex gap-5 items-center mb-5">
          <ProjectIcon className="aspect-square" />
          <h3 className="text-3xl font-semibold">What i’ve build</h3>
        </div>
        <FolderIcon />
      </div>

      <Br />

      <div className="space-y-10">
        <div className="flex items-center justify-center gap-5">
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
          overlapSpace={80}
          cardWidth={200}
          cardHeight={200}
          className="mt-10"
        />
      </div>
    </m.div>
  );
};

export default RightCard;
