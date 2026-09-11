"use client";

import Batik from "@/assets/svg/batik";
import Br from "@/assets/svg/br";
import CubeBluered from "@/assets/svg/cube-bluered";
import Hello from "@/assets/svg/hello";
import StarGede from "@/assets/svg/star-gede";
import ButtonsLeft from "@/components/atoms/buttons/ButtonsLeft";
import Socials from "@/components/molecules/Socials";
import SimpleArticleList from "@/components/molecules/article/SimpleArticleList";
import SimpleExperienceList from "@/components/molecules/experience/SimpleExperienceList";
import SimpleProjectList from "@/components/molecules/project/SimpleProjectList";
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
          {/* Header Profile */}
          <div className="p-6 md:p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-6">
            <Socials />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative font-bold flex items-center justify-center">
                  <span className="relative z-10 text-sm md:text-base font-semibold">
                    Hello, I'm
                  </span>
                  <Hello className="absolute w-28 -translate-y-0.5" />
                </div>
                <div className="h-0.5 flex-1 bg-red-600/70 rounded-full max-w-30" />
                <h1 className="text-sm md:text-base font-semibold text-neutral-300">
                  Teguh Dwi Cahya Kusuma
                </h1>
              </div>

              <div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight flex flex-wrap items-baseline gap-2">
                  <span>Software</span>
                  <span className="text-[#02C380]">Developer</span>
                  <CubeBluered className="inline-block w-8 h-8 ml-1" />
                </h2>
                <p className="mt-3 text-base md:text-lg text-neutral-400 font-medium">
                  Specialized in Backend Developer, Frontend developer & Mobile
                  Developer
                </p>
              </div>

              <div className="pt-2">
                <ButtonsLeft />
              </div>
            </div>
          </div>

          <Br />

          {/* About Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <StarGede className="w-8 h-8 text-amber-400" />
              <h3 className="text-2xl font-bold">The Person Behind the Work</h3>
            </div>
            <p className="leading-relaxed text-neutral-300 text-base md:text-lg">
              I build digital products that balance technical logic with
              intuitive design. My focus is always on the end user: taking a
              complicated challenge and finding the most elegant way to solve
              it. I’ve spent my career learning how to turn a creative vision
              into a functional reality, making sure that whatever I build
              doesn't just look great, but performs exactly how it’s supposed
              to.
            </p>
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

          <Batik />
        </>
      )}
    </div>
  );
};

export default SimpleModeView;
