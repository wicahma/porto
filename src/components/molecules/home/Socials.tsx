import { StaggerPull } from "@/components/atoms/StaggerPull";
import { isMdUp } from "@/utils/helper/responsive";
import { Github, Instagram, Linkedin } from "lucide-react";
import { m, useInView } from "motion/react";
import React from "react";

function SocialCard({
  icon,
  color,
  delay = 0,
}: Readonly<{
  icon: React.ReactNode;
  color: string;
  delay?: number;
}>) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <m.div
      ref={ref}
      initial={{ backgroundColor: color }}
      animate={{
        backgroundColor: isInView ? "#191919" : color,
      }}
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
        icon={<Github className="text-[#FFC501]" size={isMdUp() ? 35 : 25} />}
        color="#FFC501"
        delay={0}
      />
      <SocialCard
        icon={<Linkedin className="text-[#0F589B]" size={isMdUp() ? 35 : 25} />}
        color="#0F589B"
        delay={0.3}
      />
      <SocialCard
        icon={
          <Instagram className="text-[#FF5A5A]" size={isMdUp() ? 35 : 25} />
        }
        color="#FF5A5A"
        delay={0.6}
      />
    </StaggerPull>
  );
}
