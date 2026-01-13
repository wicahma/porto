"use client";

import Batik from "@/assets/svg/batik";
import Br from "@/assets/svg/br";
import { projectCardData } from "@/constants/dummies/project-card";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { m } from "motion/react";

const ProjectDetail = () => {
  const scrollRef = useSmoothScroll();

  return (
    <m.div
      ref={scrollRef}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-0 h-[calc(100vh-10rem)] overflow-y-auto mask-color-top pt-10 pb-20"
    >
      <div className="space-y-0">
        {projectCardData.map((project, index) => (
          <m.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="mt-4"
          >
            <p className="text-sm text-neutral-500 mb-4">
              {project.year} - {project.title}
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">
                The problem
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {project.description} Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor i...
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-teal-400 mb-2">
                Solution
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                i...
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
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

export default ProjectDetail;
