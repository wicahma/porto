"use client";

import Batik from "@/assets/svg/batik";
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
    <div className="w-full mx-auto space-y-16 lg:space-y-24 py-6">
      {/* 1. Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-8">
        {/* Left: Hello tag + Line + Name (Right Aligned) */}
        <div className="flex flex-col items-end w-full">
          {/* Hello tag and stretching orange line */}
          <div className="flex items-center gap-4 w-full mb-4">
            <div className="relative font-bold flex items-center justify-center shrink-0">
              <span className="relative z-10 text-xs md:text-sm font-semibold text-white px-4 py-1">
                Hello, I'm
              </span>
              <Hello className="absolute w-28 -translate-y-0.5" />
            </div>
            <div className="h-[2.5px] flex-1 bg-[#FF3714] rounded-full" />
          </div>

          {/* Name in 3 lines right-aligned */}
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-[64px] font-black text-right tracking-tight text-white leading-[1.05]">
            <div>Teguh Dwi</div>
            <div>Cahya</div>
            <div>Kusuma</div>
          </h1>
        </div>

        {/* Center: Bare Social Icons Stack */}
        <div className="flex justify-center md:py-0 py-4">
          <Socials simpleView />
        </div>

        {/* Right: Software Developer + Subtitle + Buttons */}
        <div className="flex flex-col items-start w-full">
          <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-[64px] font-black tracking-tight leading-[1.05]">
            <span className="text-white">Software</span>
            <br />
            <span className="text-[#02C380]">Developer</span>
          </h2>

          <p className="mt-4 text-sm md:text-base lg:text-lg text-neutral-400 font-normal leading-relaxed max-w-md">
            Specialized in Backend Developer, Frontend developer &amp; Mobile Developer
          </p>

          <ButtonsLeft simpleView />
        </div>
      </div>

      {/* 2. About Me Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
        {/* Avatar Box with Peeps */}
        <div className="w-[260px] sm:w-[280px] md:w-[320px] aspect-square rounded-[36px] bg-[#ABABAB] flex items-end justify-center overflow-hidden shrink-0 shadow-lg">
          <Peeps className="w-[85%] h-[85%] object-contain" />
        </div>

        {/* About Details */}
        <div className="flex-1 space-y-4">
          {/* Header Line */}
          <div className="flex items-center gap-4 w-full">
            <span className="text-xs md:text-sm font-semibold text-neutral-400 tracking-wider">
              About me
            </span>
            <div className="h-px flex-1 bg-neutral-800" />
          </div>

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

      {/* 6. Footer Decorative Batik Pattern */}
      <div className="w-full overflow-hidden flex flex-nowrap rounded-lg my-12 opacity-90 select-none pointer-events-none">
        <Batik />
        <Batik />
        <Batik />
      </div>
    </div>
  );
};

export default SimpleModeView;
