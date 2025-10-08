"use client";

import Container from "./Container";
import LeftCard from "../molecules/home/LeftCard";
import RightCard from "../molecules/home/RightCard";

const HomePage = () => {
  return (
    <Container
      left={<LeftCard />}
      right={<RightCard />}
      classNameRight="w-full relative flex overflow-hidden"
      className="h-[calc(100vh-5rem)] overflow-x-visible"
    />
  );
};

export default HomePage;
