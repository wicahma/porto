"use client";

import Batik from "@/assets/svg/batik";
import Br from "@/assets/svg/br";
import CubeBluered from "@/assets/svg/cube-bluered";
import Hello from "@/assets/svg/hello";
import Peeps from "@/assets/svg/peeps";
import StarGede from "@/assets/svg/star-gede";
import ButtonsLeft from "@/components/atoms/buttons/ButtonsLeft";
import Socials from "@/components/molecules/Socials";
import SimpleArticleList from "@/components/molecules/article/SimpleArticleList";
import SimpleExperienceList from "@/components/molecules/experience/SimpleExperienceList";
import SimpleProjectList from "@/components/molecules/project/SimpleProjectList";
import { cn } from "@/utils/helper/cn";
import React from "react";

export const SimpleModeView: React.FC<{
  detail?: React.ReactNode;
}> = ({ detail }) => {
  return (
    <div className="w-full mx-auto space-y-12 py-6">
      {detail ? (
        <div className="space-y-6">{detail}</div>
      ) : (
        <>
          <div
            className={cn(
              "p-6 flex flex-nowrap md:p-8 rounded-3xl space-y-6 gap-5",
            )}
          >
            <div className="grow">
              <div className="flex items-center gap-8 grow my-8">
                <div className="relative font-bold flex items-center justify-center">
                  <span className="relative z-10 text-sm md:text-base font-semibold">
                    Hello, I'm
                  </span>
                  <Hello className="absolute w-28 -translate-y-0.5" />
                </div>
                <div className="h-[0.27rem] flex-1 bg-[#FF3714] rounded-full max-w-[77%]" />
              </div>
              <h1 className="text-5xl md:text-[5.5rem] md:leading-18 font-black text-right tracking-tight text-neutral-300 flex flex-wrap justify-end gap-2">
                <span>Teguh Dwi</span>
                <span>Cahya</span>
                <span>Kusuma</span>
              </h1>
            </div>

            <Socials simpleView />

            <div className="space-y-4 grow">
              <div>
                <h2 className="text-5xl md:text-[5.5rem] md:leading-18 font-black tracking-tight flex flex-wrap gap-2">
                  <span>Software</span>
                  <span className="text-[#02C380]">Developer</span>
                </h2>
                <p className="mt-6 text-base md:text-lg text-neutral-400 font-medium">
                  Specialized in Backend Developer, Frontend developer & Mobile
                  Developer
                </p>
              </div>

              <div className="pt-2">
                <ButtonsLeft simpleView />
              </div>
            </div>
          </div>

          <Br />

          {/* About Section */}
          <div className="space-y-3 flex">
            <div className="aspect-square  bg-neutral-500">
              <Peeps
              // className="aspect-auto h-[200px]"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <StarGede className="w-8 h-8 text-amber-400" />
                <h3 className="text-2xl font-bold">
                  The Person Behind the Work
                </h3>
              </div>
              <p className="leading-relaxed text-neutral-300 text-base md:text-lg">
                Driven by a passion for creating seamless digital experiences, I
                specialize in turning complex problems into elegant,
                user-centric solutions. I believe that great design/code isn't
                just about how it looks, but how it functions and scales. Over
                the years, I’ve honed my ability to bridge the gap between
                technical constraints and creative vision, ensuring every
                project I touch delivers measurable value and a lasting
                impression.
              </p>
            </div>
          </div>

          <Br />

          {/* Project List */}
          <SimpleProjectList />

          <Br />

          {/* Experience List */}
          <SimpleExperienceList />

          <Br />

          {/* Article List */}
          <SimpleArticleList />

          <div className="flex flex-nowrap">
            <Batik />
            <Batik />
          </div>
        </>
      )}
    </div>
  );
};

export default SimpleModeView;
