"use client";

import Hello from "@/assets/svg/hello";
import Peeps from "@/assets/svg/peeps";
import StarGede from "@/assets/svg/star-gede";
import ButtonsLeft from "@/components/atoms/buttons/ButtonsLeft";
import Socials from "@/components/molecules/Socials";
import SimpleArticleList from "@/components/molecules/article/SimpleArticleList";
import SimpleExperienceList from "@/components/molecules/experience/SimpleExperienceList";
import SimpleProjectList from "@/components/molecules/project/SimpleProjectList";
import SimpleArticlePage from "@/components/organisms/SimpleArticlePage";
import { usePathname } from "next/navigation";
import React from "react";

export const SimpleModeView: React.FC<{
  detail?: React.ReactNode;
}> = ({ detail }) => {
  const pathname = usePathname();

  if (pathname === "/article") {
    return <SimpleArticlePage />;
  }

  if (detail) {
    return <div className="space-y-6">{detail}</div>;
  }

  return (
    <div className="section-stack mx-auto w-full py-6">
      {/* 1. Hero Section */}
      <section className="relative">
        <div
          aria-hidden="true"
          className="grid-plot pointer-events-none absolute inset-0 opacity-40"
        />
        <div className="plate cornered relative overflow-hidden p-5 md:p-8">

          <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr] lg:gap-8">
            {/* Left: Hello tag + Line + Name (Right Aligned) */}
            <div className="flex w-full flex-col items-end">
              <div className="mb-4 flex w-full items-center gap-4">
                <div className="relative flex shrink-0 items-center justify-center font-bold">
                  <span className="relative z-10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white md:text-sm">
                    Hello, I&apos;m
                  </span>
                  <Hello className="absolute w-28 -translate-y-0.5" />
                </div>
                <div className="h-[2.5px] flex-1 bg-[var(--flare)]" />
              </div>

              <h1 className="text-right text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-[64px]">
                <div>Teguh Dwi</div>
                <div>Cahya</div>
                <div>Kusuma</div>
              </h1>

            </div>

            {/* Center: Bare Social Icons Stack */}
            <div className="flex justify-center py-4 md:py-0">
              <Socials simpleView />
            </div>

            {/* Right: Software Developer + Subtitle + Buttons */}
            <div className="flex w-full flex-col items-start">
              <h2 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-5xl lg:text-[64px]">
                <span className="text-white">Software</span>
                <br />
                <span className="text-[var(--signal)]">Developer</span>
              </h2>

              <p className="mt-4 max-w-md text-sm font-normal leading-relaxed text-neutral-400 md:text-base lg:text-lg">
                Specialized in Backend Developer, Frontend developer &amp; Mobile
                Developer
              </p>

              <ButtonsLeft simpleView />
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Me Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
        {/* Avatar Box with Peeps */}
        <div className="w-[260px] sm:w-[280px] md:w-[320px] aspect-square rounded-[36px] bg-[var(--text-mid)] flex items-end justify-center overflow-hidden shrink-0 shadow-lg">
          <Peeps className="w-[85%] h-[85%] object-contain" />
        </div>

        {/* About Details */}
        <div className="flex-1 space-y-4">
          {/* Header Line */}

          {/* Heading */}
          <div className="flex items-center gap-3">
            <StarGede className="w-6 h-6 shrink-0" />
            <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              The Person Behind the Work
            </h3>
          </div>

          {/* Paragraph */}
          <p className="text-sm md:text-base lg:text-lg text-neutral-400 font-normal leading-relaxed">
            Driven by a passion for creating seamless digital experiences, I
            specialize in turning complex problems into elegant, user-centric
            solutions. I believe that great design/code isn't just about how it
            looks, but how it functions and scales. Over the years, I've honed my
            ability to bridge the gap between technical constraints and creative
            vision, ensuring every project I touch delivers measurable value and
            a lasting impression.
          </p>
        </div>
      </div>

      {/* 3. What i've build & What i work with */}
      <SimpleProjectList />

      {/* 4. Experience Section */}
      <SimpleExperienceList />

      {/* 5. Articles Section */}
      <SimpleArticleList />

      {/* 6. Footer rule */}
    </div>
  );
};

export default SimpleModeView;
