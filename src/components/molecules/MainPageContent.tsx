"use client";

import ArticleDetail from "./ArticleDetail";
import LeftCard from "../atoms/cards/LeftCard";
import RightCard from "../atoms/cards/RightCard";
import Container from "../organisms/wrapper/Container";
import { useMainPage } from "@/hooks/pages/use-main-page";

const MainPageContent = () => {
  const { pathname, isInitialLoad } = useMainPage();

  const getDetailComponent = () => {
    if (pathname === "/article") {
      return <ArticleDetail skipAnimation={isInitialLoad} />;
    }
    return null;
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
