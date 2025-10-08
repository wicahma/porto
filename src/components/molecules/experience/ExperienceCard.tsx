"use client";

import { IExperience } from "@/interface/app/experience";
import { FC, useState } from "react";
import { m } from "motion/react";
import {
  experienceItemVariants,
  skillVariants,
} from "@/utils/motion/experience-animations";
import { useColorWipeNavigation } from "@/components/atoms/ColorWipeTransition";

interface ExperienceCardProps {
  experience: IExperience;
  index: number;
  isLast?: boolean;
}

const ExperienceCard: FC<ExperienceCardProps> = ({
  experience,
  index,
  isLast = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { navigateWithTransition } = useColorWipeNavigation();

  const handleClick = () => {
    navigateWithTransition(`/experience/${experience.id}`, {
      colors: [experience.color, "#1A1A1A", "#111111", experience.color],
      direction: "left",
    });
  };

  return (
    <div className="relative">
      {!isLast && (
        <m.div
          className="absolute left-[19px] top-[80px] bottom-0 w-0.5 bg-neutral-800"
          variants={experienceItemVariants}
          custom={index + 0.5}
          initial="hidden"
          animate="visible"
        />
      )}
      <m.div
        className="flex gap-6 cursor-pointer mb-14 hoverable"
        variants={experienceItemVariants}
        custom={index}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onClick={handleClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative">
          <m.div
            className="w-10 h-10 rounded-full flex items-center justify-center z-10 relative"
            style={{ backgroundColor: experience.color }}
            animate={{
              boxShadow: isHovered
                ? `0 0 0 4px rgba(26, 26, 26, 0.8), 0 0 0 8px ${experience.color}40`
                : `0 0 0 0px rgba(26, 26, 26, 0.8), 0 0 0 0px ${experience.color}00`,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white font-bold">
              {experience.startYear.toString().substring(2)}
            </span>
          </m.div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-xl">{experience.role}</h3>
            <div
              className="text-sm px-2 py-0.5 rounded"
              style={{
                backgroundColor: experience.color + "20",
                color: experience.color,
              }}
            >
              {experience.type}
            </div>
          </div>

          <div className="text-neutral-400 mb-2">
            {experience.company} • {experience.startYear} - {experience.endYear}
          </div>

          <p className="text-neutral-300 mb-4">{experience.description}</p>

          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, i) => (
              <m.span
                key={`${experience.id}-skill-${i}`}
                className="text-xs px-2 py-1 rounded-full bg-white/5 text-neutral-400 backdrop-blur-sm"
                variants={skillVariants}
                custom={i}
                initial="hidden"
                animate="visible"
              >
                {skill}
              </m.span>
            ))}
          </div>
        </div>

        <m.div
          className="text-neutral-500 self-start"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-6 h-6">
            <svg
              viewBox="0 0 16 16"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              id="svg2"
              version="1.1"
            >
              <g id="layer1" transform="rotate(45 1254.793 524.438)">
                <path
                  style={{
                    fill: "#373737",
                    fillOpacity: 1,
                    fillRule: "evenodd",
                    stroke: "none",
                    strokeWidth: "1px",
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeOpacity: 1,
                  }}
                  d="m15.776 1040.172-1.412 1.412L8 1035.22l-6.364 6.364-1.414-1.414L8 1032.392z"
                  id="path4179"
                />
              </g>
            </svg>
          </div>
        </m.div>
      </m.div>
    </div>
  );
};

export default ExperienceCard;
