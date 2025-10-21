"use client";

import { IExperience } from "@/interface/app/experience";
import { FC } from "react";
import { m } from "motion/react";
import {
  achievementVariants,
  skillVariants,
} from "@/utils/motion/experience-animations";
import { WordsPull } from "@/components/atoms/text/WordsPull";
import { FadePull } from "@/components/atoms/FadePull";
import Link from "next/link";
import { useColorWipeNavigation } from "@/components/atoms/ColorWipeTransition";
import MultiCarousel from "../molecules/MultiCarousel";

interface ExperienceDetailProps {
  experience: IExperience;
}

const ExperienceDetail: FC<ExperienceDetailProps> = ({ experience }) => {
  const { navigateWithTransition } = useColorWipeNavigation();

  return (
    <div className="container max-w-4xl mx-auto pt-10 pb-20 px-4">
      <div className="mb-6">
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-300 transition-colors mb-6"
          onClick={(e) => {
            e.preventDefault();
            navigateWithTransition("/experience", {
              colors: [
                experience.color,
                "#1A1A1A",
                "#111111",
                experience.color,
              ],
              direction: "right",
            });
          }}
        >
          <span>←</span> Back to all experiences
        </Link>

        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <WordsPull
              delayWords={0.15}
              direction="to-bottom"
              className="font-bold flex text-5xl flex-wrap"
              tag="h1"
              text={experience.role}
            />

            <WordsPull
              delayWords={0.15}
              direction="to-bottom"
              className="font-semibold mt-3 text-2xl flex flex-wrap"
              tag="div"
              text={experience.company}
              textClassName="pr-1"
            />
          </div>

          <m.div
            className="px-4 py-2 rounded-lg backdrop-blur-sm"
            style={{ backgroundColor: experience.color + "10" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-neutral-400">
              <span
                className="font-semibold"
                style={{ color: experience.color }}
              >
                {experience.startYear} - {experience.endYear}
              </span>
              <span className="mx-2">•</span>
              <span>{experience.type}</span>
            </div>
          </m.div>
          <div className="w-full hover:h-[300px] duration-500 h-0 transition-all py-4 overflow-y-clip rounded-xl">
            <MultiCarousel className="relative -rotate-12 -translate-y-40" />
          </div>
        </div>
      </div>
      {/* <m.div
        className="h-0.5 w-full mb-10"
        style={{ backgroundColor: experience.color + "40" }}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, delay: 0.4 }}
      /> */}
      <FadePull direction="to-bottom" delay={0.5}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-neutral-300 leading-relaxed mb-8">
              {experience.description}
            </p>

            {experience.achievements && experience.achievements.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Key Achievements</h2>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, i) => (
                    <m.li
                      key={`achievement-${i}`}
                      className="flex items-baseline gap-2"
                      variants={achievementVariants}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                    >
                      <span style={{ color: experience.color }}>•</span>
                      <span className="text-neutral-300">{achievement}</span>
                    </m.li>
                  ))}
                </ul>
              </div>
            )}

            {experience.projects && experience.projects.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Projects</h2>
                <div className="space-y-4">
                  {experience.projects.map((project, i) => (
                    <m.div
                      key={`project-${i}`}
                      className="p-4 rounded-lg bg-white/5 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    >
                      <h3
                        className="text-lg font-bold mb-1"
                        style={{ color: experience.color }}
                      >
                        {project.name}
                      </h3>
                      <p className="text-neutral-400">{project.description}</p>
                    </m.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="sticky top-28">
              <h2 className="text-2xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, i) => (
                  <m.div
                    key={`detail-skill-${i}`}
                    className="text-sm px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm"
                    style={{ border: `1px solid ${experience.color}20` }}
                    variants={skillVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: experience.color + "20",
                    }}
                  >
                    {skill}
                  </m.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadePull>
    </div>
  );
};

export default ExperienceDetail;
