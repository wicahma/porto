"use client";

import { IExperience } from "@/interface/app/experience";
import { FC, useRef } from "react";
import { m, useInView } from "motion/react";
import { useColorWipeNavigation } from "@/components/atoms/ColorWipeTransition";
import { cn } from "@/utils/helper/cn";

interface ExperienceCardProps {
  experience: IExperience;
  index: number;
  isLast?: boolean;
}

const ExperienceCard: FC<ExperienceCardProps> = ({ experience, index }) => {
  const { navigateWithTransition } = useColorWipeNavigation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleClick = () => {
    navigateWithTransition(`/experience/${experience.id}`, {
      colors: [experience.color, "#1A1A1A", "#111111", experience.color],
      direction: "left",
    });
  };

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="relative group cursor-pointer py-10"
      onClick={handleClick}
    >
      <m.div
        className="absolute top-0 left-0 h-[1px] w-full overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.2 }}
      >
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(to right, transparent, #404040, transparent)`,
          }}
        />
      </m.div>

      <div className="relative flex gap-6 items-start">
        <m.div
          className="relative flex-shrink-0"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
        >
          <m.div
            className="w-12 h-12 rounded-full flex items-center justify-center z-10 relative shadow-lg"
            style={{ backgroundColor: experience.color }}
            whileHover={{
              scale: 1.1,
              boxShadow: `0 0 0 6px ${experience.color}20`,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white font-bold text-sm">
              {experience.startYear.toString().substring(2)}
            </span>
          </m.div>

          <m.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
            style={{ backgroundColor: experience.color }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </m.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <m.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.15 + 0.3 }}
              className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{
                backgroundColor: `${experience.color}15`,
                color: experience.color,
              }}
            >
              {experience.type}
            </m.span>
            <m.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.15 + 0.4 }}
              className="flex items-center gap-2 text-sm text-neutral-600"
            >
              <span>
                {experience.startYear} - {experience.endYear}
              </span>
            </m.div>
          </div>

          <h3
            className={cn(
              "text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight flex flex-wrap gap-x-3 group-hover:text-neutral-50 text-neutral-300"
            )}
          >
            {experience.role.split(" ").map((word: string, wordIdx: number) => (
              <m.span
                key={wordIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{
                  delay: index * 0.15 + 0.4 + wordIdx * 0.05,
                  duration: 0.4,
                }}
                className="transition-colors duration-300"
              >
                {word}
              </m.span>
            ))}
          </h3>

          <m.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.5 }}
            className="text-neutral-400 mb-3 group-hover:text-neutral-300 transition-colors duration-300"
          >
            {experience.company}
          </m.p>

          <m.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.6 }}
            className="text-neutral-500 mb-4 leading-relaxed group-hover:text-neutral-400 transition-colors duration-300"
          >
            {experience.description}
          </m.p>

          <m.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.7 }}
            className="flex flex-wrap gap-2"
          >
            {experience.skills.map((skill, i) => (
              <m.span
                key={`${experience.id}-skill-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ delay: index * 0.15 + 0.7 + i * 0.03 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: `${experience.color}20`,
                }}
                className="text-xs px-3 py-1.5 text-neutral-500 hover:text-neutral-300 transition-all duration-200 cursor-pointer"
              >
                {skill}
              </m.span>
            ))}
          </m.div>
        </div>
      </div>
    </m.div>
  );
};

export default ExperienceCard;
