"use client";

import mePortrait from "@/assets/image/me-transparent.png";
import Hello from "@/assets/svg/hello";
import StarGede from "@/assets/svg/star-gede";
import Breadcrumb from "@/components/molecules/header/Breadcrumb";
import Infographic from "@/components/molecules/header/Infograpnic";
import ButtonsLeft from "@/components/atoms/buttons/ButtonsLeft";
import Socials from "@/components/molecules/Socials";
import SimpleArticleList from "@/components/molecules/article/SimpleArticleList";
import SimpleExperienceList from "@/components/molecules/experience/SimpleExperienceList";
import SimpleProjectList from "@/components/molecules/project/SimpleProjectList";
import { SmartNextImage } from "@/components/atoms/images/ImageWithFallback";
import React from "react";

export const SimpleModeView: React.FC = () => {
  return (
    <div className="relative mx-auto w-full py-6">
      <div
        aria-hidden="true"
        className="grid-plot pointer-events-none absolute inset-0 w-full opacity-40"
      />
      <div className="section-stack relative mx-auto w-full">
        <div className="flex flex-col-reverse gap-2 sm:gap-3 w-full">
          <Breadcrumb />
          <Infographic />
        </div>

        {/* 1. Hero Section */}
        <section className="relative">
          <div
            aria-hidden="true"
            className="grid-plot pointer-events-none absolute inset-0 opacity-40"
          />
          <div className="plate cornered relative overflow-hidden p-4 sm:p-5 md:p-8">
            <div className="relative grid grid-cols-1 items-center gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
              {/* Left: Hello tag + Line + Name (Right Aligned from md up) */}
              <div className="flex w-full flex-col items-start lg:items-end">
                <div className="mb-4 flex w-full items-center gap-3 md:gap-4">
                  <div className="relative flex shrink-0 items-center justify-center font-bold">
                    <span className="relative z-10 px-3.5 py-1 text-[11px] font-semibold text-white md:px-4 md:text-sm">
                      Hello, I&apos;m
                    </span>
                    <Hello className="absolute w-24 md:w-28" />
                  </div>
                  <div className="h-[2.5px] flex-1 bg-[var(--flare)]" />
                </div>

                <h1 className="text-left text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-right lg:text-[64px]">
                  <div>Teguh Dwi</div>
                  <div>Cahya</div>
                  <div>Kusuma</div>
                </h1>

                {/* Mobile: socials sit under the name instead of a tall column */}
                <div className="mt-5 lg:hidden">
                  <Socials simpleView orientation="row" />
                </div>
              </div>

              {/* Center: Bare Social Icons Stack (md+) */}
              <div className="hidden justify-center lg:flex">
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
                  Specialized in Backend Developer, Frontend developer &amp;
                  Mobile Developer
                </p>

                <ButtonsLeft simpleView />
              </div>
            </div>
          </div>
        </section>

        {/* 2. About Me Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
          {/* Avatar Box */}
          <div className="w-[260px] sm:w-[280px] md:w-[320px] aspect-square rounded-[36px] bg-[var(--text-ultra-low)] flex items-end justify-center overflow-hidden shrink-0 shadow-lg">
            <SmartNextImage
              src={mePortrait}
              alt="Teguh Dwi Cahya Kusuma"
              placeholder="blur"
              // sizes="(max-width: 640px) 260px, (max-width: 768px) 280px, 320px"
              className="h-full w-full object-contain object-bottom grayscale"
            />
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
              solutions. I believe that great design/code isn't just about how
              it looks, but how it functions and scales. Over the years, I've
              honed my ability to bridge the gap between technical constraints
              and creative vision, ensuring every project I touch delivers
              measurable value and a lasting impression.
            </p>
          </div>
        </div>

        {/* 3. What i've build & What i work with */}
        <div data-section="build">
          <SimpleProjectList />
        </div>

        {/* 4. Experience Section */}
        <div data-section="experience">
          <SimpleExperienceList />
        </div>

        {/* 5. Articles Section */}
        <div data-section="article">
          <SimpleArticleList />
        </div>

        {/* 6. Footer rule */}
      </div>
    </div>
  );
};

export default SimpleModeView;
