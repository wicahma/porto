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
}: Readonly<{
  icon: React.ReactNode;
  color: string;
  delay?: number;
  className?: string;
  link: string;
}>) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleRedirect = () => {
    window.open(link, "_blank");
  };

  return (
    <m.div
      ref={ref}
      initial={{ backgroundColor: color }}
      animate={{
        backgroundColor: isInView ? "#191919" : color,
      }}
      onClick={handleRedirect}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={cn(
        "cursor-pointer hoverable rounded-full flex items-center justify-center py-3 flex-nowrap",
        className,
      )}
    >
      {icon}
    </m.div>
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
      className={cn("flex", simpleView ? "flex-col" : "md:gap-3 gap-5")}
      itemClassName="mb-3"
    >
      <SocialCard
        link="https://github.com/wicahma"
        icon={
          <GithubIcon
            className={cn("text-[#FFC501] aspect-auto md:w-10 w-6.25")}
          />
        }
        color="#FFC501"
        className={cn(simpleView ? "p-5" : "aspect-auto")}
        delay={0}
      />
      <SocialCard
        link="https://www.linkedin.com/in/u-diama/"
        icon={
          <LinkedinIcon
            className={cn("text-[#0F589B] aspect-auto md:w-10 w-6.25")}
          />
        }
        color="#0F589B"
        className={cn(simpleView ? "p-5" : "aspect-auto")}
        delay={0.3}
      />
      <SocialCard
        link="https://www.instagram.com/diama.dev/"
        icon={
          <InstagramIcon
            className={cn("text-[#FF5A5A] aspect-auto md:w-10 w-6.25")}
          />
        }
        color="#FF5A5A"
        className={cn(simpleView ? "p-5" : "aspect-auto")}
        delay={0.6}
      />
    </StaggerPull>
  );
}
