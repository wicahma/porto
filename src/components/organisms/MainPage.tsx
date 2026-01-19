"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import ArticleDetail from "../molecules/article/ArticleDetail";
import ExperienceDetail from "../molecules/experience/ExperienceDetail";
import LeftCard from "../molecules/home/LeftCard";
import RightCard from "../molecules/home/RightCard";
import ProjectDetail from "../molecules/projects/ProjectDetail";
import Container from "./Container";

const MainPage = () => {
  const pathname = usePathname();
  const lastDetailPageRef = useRef<string | null>(null);
  const isFirstRender = useRef(true);

  const isInitialLoad = isFirstRender.current;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    if (lastDetailPageRef.current && pathname === "/") {
      setTimeout(() => {
        const id = `mainpage-card-${lastDetailPageRef.current}`;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }
      }, 1500);
    } else {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        lastDetailPageRef.current = pathname;
      }, 300);
    }
  }, [pathname]);

  const getDetailComponent = () => {
    const skipAnimation = isInitialLoad;
    switch (pathname) {
      case "/article":
        return <ArticleDetail skipAnimation={skipAnimation} />;
      case "/project":
        return <ProjectDetail skipAnimation={skipAnimation} />;
      case "/experience":
        return <ExperienceDetail skipAnimation={skipAnimation} />;
      default:
        return null;
    }
  };

  return (
    <Container
      left={<LeftCard />}
      right={<RightCard />}
      detail={getDetailComponent()}
      isInitialLoad={isInitialLoad}
    />
  );
};

export default MainPage;
