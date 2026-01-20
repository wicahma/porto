"use client";

import ArticleDetail from "./ArticleDetail";
import ExperienceDetail from "./experience/ExperienceDetail";
import LeftCard from "../atoms/cards/LeftCard";
import RightCard from "../atoms/cards/RightCard";
import ProjectDetail from "./ProjectDetail";
import Container from "../organisms/wrapper/Container";
import { useMainPageHooks } from "@/hooks/pages/main-page.hook";

const MainPageContent = () => {
  const { pathname, isInitialLoad } = useMainPageHooks();

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

export default MainPageContent;
