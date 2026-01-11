"use client";

import Container from "./Container";
import LeftCard from "../molecules/home/LeftCard";
import RightCard from "../molecules/home/RightCard";

const MainPage = () => {
  return <Container left={<LeftCard />} right={<RightCard />} />;
};

export default MainPage;
