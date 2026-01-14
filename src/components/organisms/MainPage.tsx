"use client";

import { useNavigationStore } from "@/store/navigationStore";
import { useEffect, useRef } from "react";
import ArticleDetail from "../molecules/article/ArticleDetail";
import ExperienceDetail from "../molecules/experience/ExperienceDetail";
import LeftCard from "../molecules/home/LeftCard";
import RightCard from "../molecules/home/RightCard";
import ProjectDetail from "../molecules/projects/ProjectDetail";
import Container from "./Container";

const MainPage = () => {
  const detailPage = useNavigationStore((state) => state.detailPage);
  const lastDetailPageRef = useRef<string | null>(null);

  useEffect(() => {
    if (lastDetailPageRef.current && detailPage === null) {
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
        lastDetailPageRef.current = detailPage;
      }, 300);
    }
  }, [detailPage]);

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
