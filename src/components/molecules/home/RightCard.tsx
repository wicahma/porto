import Batik from "@/assets/svg/batik";
import Br from "@/assets/svg/br";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useNavigationStore } from "@/store/navigationStore";
import { useScrollStore } from "@/store/scrollStore";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef } from "react";
import AboutCard from "../about/AboutCard";
import ArticleCard from "../article/ArticleCard";
import ExperienceCard from "../experience/ExperienceCard";
import ProjectCard from "../projects/ProjectCard";
import { cn } from "@/utils/helper/cn";

const RightCard = () => {
  const scrollRef = useSmoothScroll();
  const detailPage = useNavigationStore((state) => state.detailPage);
  const setScrolling = useScrollStore((state) => state.setScrolling);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    const handleScroll = () => {
      setScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setScrolling(false);
      }, 120);
    };
    node.addEventListener("scroll", handleScroll);
    return () => {
      node.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [scrollRef, setScrolling]);

  return (
    <m.div
      ref={scrollRef}
      className={cn(
        "mask-color-card-top pt-10 space-y-10 md:overflow-y-scroll md:overflow-x-clip md:h-[calc(100vh-10rem)] pb-20"
      )}
    >
      <AnimatePresence mode="wait">
        {detailPage ? (
          <m.div key={`${detailPage}-card`} layout className="space-y-10">
            {detailPage === "project" && (
              <m.div layout layoutId="project-card">
                <ProjectCard />
              </m.div>
            )}
            {detailPage === "experience" && (
              <m.div layout layoutId="experience-card">
                <ExperienceCard />
              </m.div>
            )}
            {detailPage === "article" && (
              <m.div layout layoutId="article-card">
                <ArticleCard />
              </m.div>
            )}
          </m.div>
        ) : (
          <m.div key="all-cards" layout className="md:space-y-10 space-y-16">
            <m.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-3"
            >
              <AboutCard />
            </m.div>
            <Br />
            <m.div
              layout
              layoutId="project-card"
              id="mainpage-card-project"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <ProjectCard />
            </m.div>
            <Br />
            <m.div
              layout
              layoutId="experience-card"
              id="mainpage-card-experience"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <ExperienceCard />
            </m.div>
            <Br />
            <m.div
              layout
              layoutId="article-card"
              id="mainpage-card-article"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <ArticleCard />
            </m.div>
            <Batik />
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};

export default RightCard;
