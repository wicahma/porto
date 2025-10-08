"use client";

import { experiences } from "@/constants/dummies/experience-page";
import { WordsPull } from "@/components/atoms/text/WordsPull";
import { m } from "motion/react";
import ExperienceCard from "@/components/molecules/experience/ExperienceCard";

const ExperiencePage = () => {
  return (
    <div className=" max-w-4xl mx-auto pt-10 pb-20">
      <div className="mb-10">
        <WordsPull
          delayWords={0.15}
          direction="to-bottom"
          className="font-bold flex text-7xl flex-wrap"
          tag="h1"
          text="My Experience"
        />

        <WordsPull
          delayWords={0.15}
          direction="to-bottom"
          className="font-semibold mt-6 text-xl leading-6 flex flex-wrap text-neutral-700"
          textClassName={"pr-1"}
          tag="p"
          text="A timeline of my professional journey and the skills I've developed along the way."
        />
      </div>

      <m.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            index={index}
            isLast={index === experiences.length - 1}
          />
        ))}
      </m.div>
    </div>
  );
};

export default ExperiencePage;
