"use client";

import Batik from "@/assets/svg/batik";
import Br from "@/assets/svg/br";
import { initialExperience } from "@/constants/dummies/experience-page";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { m } from "motion/react";

const ExperienceDetail = () => {
  const scrollRef = useSmoothScroll();

  return (
    <m.div
      ref={scrollRef}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-0 md:h-[calc(100vh-10rem)] md:overflow-y-auto mask-color-card-top md:pt-10 pb-20"
    >
      <div className="space-y-0">
        {initialExperience.map((exp, index) => (
          <m.div
            key={`${exp.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="mt-4 hover:bg-neutral-900/20 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-purple-600/80 text-white rounded text-xs font-semibold uppercase">
                FULL TIME
              </span>
              <span className="text-sm text-neutral-400">2024 - Present</span>
            </div>

            <p className="text-sm text-neutral-500 mb-4">
              Berjalan Technocenter
            </p>

            <p className="text-neutral-400 leading-relaxed mb-6">
              {exp.text} Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor i...
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer">
                NextJs
              </span>
              <span className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer">
                ReactJs
              </span>
              <span className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer">
                Postgresql
              </span>
            </div>
            <Br />
          </m.div>
        ))}
      </div>

      <div className="flex justify-center py-8">
        <span className="text-xs text-neutral-500">
          Created with ❤️ by Teguh
        </span>
      </div>

      <Batik />
    </m.div>
  );
};

export default ExperienceDetail;
