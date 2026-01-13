"use client";

import Container from "./Container";
import LeftCard from "../molecules/home/LeftCard";
import RightCard from "../molecules/home/RightCard";
import ArticleDetail from "../molecules/article/ArticleDetail";
import ProjectDetail from "../molecules/projects/ProjectDetail";
import ExperienceDetail from "../molecules/experience/ExperienceDetail";
import { useNavigationStore } from "@/store/navigationStore";

const MainPage = () => {
  const detailPage = useNavigationStore((state) => state.detailPage);

  const getDetailComponent = () => {
    switch (detailPage) {
      case "article":
        return <ArticleDetail />;
      case "project":
        return <ProjectDetail />;
      case "experience":
        return <ExperienceDetail />;
      default:
        return null;
    }
  };

  return (
    <Container
      left={<LeftCard />}
      right={<RightCard />}
      detail={getDetailComponent()}
    />
  );
};

export default MainPage;
