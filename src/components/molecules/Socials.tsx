"use client";
import { StaggerPull } from "@/components/atoms/animations/StaggerPull";
import { cn } from "@/utils/helper/cn";
import { m, useInView } from "motion/react";
import React from "react";
import { GithubIcon } from "../atoms/icons/Github";
import { InstagramIcon } from "../atoms/icons/Instagram";
import { LinkedinIcon } from "../atoms/icons/Linkedin";

function SocialCard({
  icon,
  color,
  className,
  delay = 0,
  link,
  label,
}: Readonly<{
  icon: React.ReactNode;
  color: string;
  delay?: number;
  className?: string;
  link: string;
  label: string;
}>) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true });

  if (className?.includes("bg-transparent")) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={label}
        className={cn(
          "cursor-pointer hoverable flex items-center justify-center transition-transform hover:scale-110",
          className,
        )}
      >
        {icon}
      </a>
    );
  }

  return (
    <m.a
      ref={ref}
      initial={{ backgroundColor: color }}
      animate={{
        backgroundColor: isInView ? "#191919" : color,
      }}
      href={link}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={cn(
        "cursor-pointer hoverable rounded-full flex items-center justify-center flex-nowrap transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      {icon}
    </m.a>
  );
}

export default function Socials({
  simpleView = false,
}: Readonly<{
  simpleView?: boolean;
}>) {
  return (
    <StaggerPull
      direction="to-top"
      staggerChildren={0.2}
      className={cn(
        simpleView
          ? "flex w-fit shrink-0 flex-col"
          : "grid w-full grid-cols-3 gap-2 md:gap-3",
      )}
      itemClassName={simpleView ? "mb-3" : "min-w-0"}
    >
      <SocialCard
        link="https://github.com/wicahma"
        label="GitHub profile"
        icon={
          <GithubIcon
            className={cn("text-[#FFC501] aspect-auto md:w-10 w-6.25")}
          />
        }
        color="#FFC501"
        className={cn(
          simpleView ? "bg-transparent p-2" : "w-full min-h-14 px-3 py-3",
        )}
        delay={0}
      />
      <SocialCard
        link="https://www.linkedin.com/in/u-diama/"
        label="LinkedIn profile"
        icon={
          <LinkedinIcon
            className={cn("text-[#0F589B] aspect-auto md:w-10 w-6.25")}
          />
        }
        color="#0F589B"
        className={cn(
          simpleView ? "bg-transparent p-2" : "w-full min-h-14 px-3 py-3",
        )}
        delay={0.3}
      />
      <SocialCard
        link="https://www.instagram.com/diama.dev/"
        label="Instagram profile"
        icon={
          <InstagramIcon
            className={cn("text-[#FF5A5A] aspect-auto md:w-10 w-6.25")}
          />
        }
        color="#FF5A5A"
        className={cn(
          simpleView ? "bg-transparent p-2" : "w-full min-h-14 px-3 py-3",
        )}
        delay={0.6}
      />
    </StaggerPull>
  );
}
