import Batik from "@/assets/svg/batik";
import Br from "@/assets/svg/br";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { m } from "motion/react";
import AboutCard from "../about/AboutCard";
import ExperienceCard from "../experience/ExperienceCard";
import ProjectCard from "../projects/ProjectCard";
import ArticleCard from "../article/ArticleCard";

const RightCard = () => {
  const scrollRef = useSmoothScroll();

  return (
    <m.div
      ref={scrollRef}
      className="mask-color-top w-full pt-10 space-y-10 overflow-y-scroll overflow-x-clip h-[calc(100vh-10rem)] pb-20"
    >
      <AboutCard />
      <Br />
      <ProjectCard />
      <Br />
      <ExperienceCard />
      <Br />
      <ArticleCard />
      <Batik />
    </m.div>
  );
};

export default RightCard;
