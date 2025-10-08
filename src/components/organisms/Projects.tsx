import React from "react";
import Container from "./Container";
import RightCard from "../molecules/projects/RightCard";
import LeftCard from "../molecules/projects/LeftCard";

const Projects = () => {
  return (
    <Container
      className="h-[calc(100vh-5rem)] overflow-x-visible"
      classNameLeft="flex flex-col relative z-50 bg-[var(--background)]"
      classNameRight="min-w-0 grow relative pt-10 pb-14 z-0"
      left={<LeftCard />}
      right={<RightCard />}
    />
  );
};

export default Projects;
