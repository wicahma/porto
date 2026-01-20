"use client";
import { StaggerPull } from "@/components/atoms/animations/StaggerPull";
import { cn } from "@/utils/helper/cn";
import { Github, Instagram, Linkedin } from "lucide-react";
import { m, useInView } from "motion/react";
import React from "react";

function SocialCard({
  icon,
  color,
  delay = 0,
  link,
}: Readonly<{
  icon: React.ReactNode;
  color: string;
  delay?: number;
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
      className="cursor-pointer hoverable rounded-full flex items-center justify-center py-3 flex-nowrap"
    >
      {icon}
    </m.div>
  );
}

export default function Socials() {
  return (
    <StaggerPull
      direction="to-top"
      staggerChildren={0.2}
      className="flex md:gap-3 gap-5"
    >
      <SocialCard
        link="https://github.com/wicahma"
        icon={
          <Github
            className={cn("text-[#FFC501] aspect-auto md:w-[35px] w-[25px]")}
          />
        }
        color="#FFC501"
        delay={0}
      />
      <SocialCard
        link="https://www.linkedin.com/in/u-diama/"
        icon={
          <Linkedin
            className={cn("text-[#0F589B] aspect-auto md:w-[35px] w-[25px]")}
          />
        }
        color="#0F589B"
        delay={0.3}
      />
      <SocialCard
        link="https://www.instagram.com/diama.dev/"
        icon={
          <Instagram
            className={cn("text-[#FF5A5A] aspect-auto md:w-[35px] w-[25px]")}
          />
        }
        color="#FF5A5A"
        delay={0.6}
      />
    </StaggerPull>
  );
}
