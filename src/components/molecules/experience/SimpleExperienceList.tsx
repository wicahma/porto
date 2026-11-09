"use client";

import Sun from "@/assets/svg/sun";
import { useExperiences } from "@/hooks/queries/experience.wrapper";
import { useCssColors } from "@/hooks/useCssColors";
import { ExperiencePositionSummary } from "@/interface/entities/experience.interface";
import {
  companyPhotoFallback,
  isLogoSource,
} from "@/utils/helper/experience-logo";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export interface SimpleExperienceListProps {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  pauseOnHover?: boolean;
  showArrows?: boolean;
  showIndicators?: boolean;
}

interface CardExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  tags: string[];
  description?: string;
  competency?: string[];
  logo?: string;
  image?: string;
  positions?: ExperiencePositionSummary[];
}

const DEFAULT_EXPERIENCES: CardExperience[] = [
  {
    id: "exp-1",
    role: "Lead Backend Developer",
    company: "Tech Innovations Corp",
    period: "2024 - Present",
    location: "Jakarta, ID",
    tags: ["Golang", "PostgreSQL", "Redis", "Distributed Systems"],
    image: "https://picsum.photos/seed/tech-corp/200/200",
    description:
      "Architected high-throughput cloud telemetry platforms and real-time streaming pipelines.",
    competency: [
      "Engineered microservices processing 10k+ requests per second with sub-millisecond latencies.",
      "Optimized PostgreSQL database query planning, indexing, and connection pooling.",
      "Architected real-time streaming pipelines utilizing Redis and Kafka.",
    ],
  },
  {
    id: "exp-2",
    role: "Senior Full Stack",
    company: "Fintech Nusantara",
    period: "2022 - 2024",
    location: "Jakarta, ID",
    tags: ["Next.js", "TypeScript", "Microservices", "Kafka"],
    image: "https://picsum.photos/seed/fintech-nusantara/200/200",
    description:
      "Spearheaded headless core banking services and dynamic customer dashboard portals.",
    competency: [
      "Built performant Next.js client-facing interfaces with server components and edge rendering.",
      "Implemented secure OAuth2/JWT authentication and fine-grained role-based access controls.",
      "Integrated payment gateways and real-time financial transaction reconciliation.",
    ],
  },
  {
    id: "exp-3",
    role: "Software Engineer",
    company: "Digital Solusindo",
    period: "2021 - 2022",
    location: "Bandung, ID",
    tags: ["PostgreSQL", "Go", "Docker", "REST API"],
    image: "https://picsum.photos/seed/digital-solusindo/200/200",
    description:
      "Engineered scalable microservices and optimized relational database queries.",
    competency: [
      "Developed robust RESTful APIs following domain-driven design and clean architecture.",
      "Containerized microservices with Docker and set up automated CI/CD deployment pipelines.",
      "Conducted code reviews and improved automated unit test coverage across core modules.",
    ],
  },
  {
    id: "exp-4",
    role: "Cloud Infrastructure Eng",
    company: "Astra Cloud Media",
    period: "2020 - 2021",
    location: "Surabaya, ID",
    tags: ["AWS", "Kubernetes", "CI/CD", "Terraform"],
    image: "https://picsum.photos/seed/astra-cloud/200/200",
    description:
      "Managed containerized infrastructure with automated deployments and observability.",
    competency: [
      "Provisioned cloud resources on AWS using Terraform infrastructure-as-code.",
      "Configured Prometheus, Grafana, and OpenTelemetry monitoring dashboards.",
      "Maintained 99.9% uptime for mission-critical client deployments.",
    ],
  },
  {
    id: "exp-5",
    role: "Junior Web Developer",
    company: "Nusantara Cyber Labs",
    period: "2019 - 2020",
    location: "Jakarta, ID",
    tags: ["React", "HTML/CSS", "JavaScript"],
    image: "https://picsum.photos/seed/cyber-labs/200/200",
    description:
      "Built responsive web applications and collaborated with UI/UX designers.",
    competency: [
      "Created pixel-perfect interactive web pages from Figma design specifications.",
      "Optimized client-side web asset loading times and Core Web Vitals.",
      "Worked closely with QA engineers to debug and fix cross-browser compatibility issues.",
    ],
  },
];

interface ApiJobItem {
  position?: string;
  start_date?: string;
  end_date?: string;
  is_current?: boolean;
  description?: string;
  competency?: string[];
}

interface ApiExperienceItem {
  id: string;
  company: string;
  location?: string;
  tags?: string[];
  jobs?: ApiJobItem[];
  logo?: string;
  image?: string;
}

export const SimpleExperienceList: React.FC<SimpleExperienceListProps> = ({
  autoSlide = false,
  autoSlideInterval = 4000,
  pauseOnHover = true,
  showArrows = true,
  showIndicators = true,
}) => {
  const router = useRouter();
  const { data: experiencesData } = useExperiences(1, 10);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const experiences = useMemo<CardExperience[]>(() => {
    const rawList = (
      experiencesData as unknown as { experiences?: ApiExperienceItem[] }
    )?.experiences;

    if (!rawList || rawList.length === 0) {
      return DEFAULT_EXPERIENCES;
    }

    const mapped: CardExperience[] = rawList.map((item, index) => {
      const newestJob =
        item.jobs && item.jobs.length > 0 ? item.jobs[0] : undefined;
      const startYear = newestJob?.start_date
        ? new Date(newestJob.start_date).getFullYear()
        : 2023;
      const endYear = newestJob?.is_current
        ? "Present"
        : newestJob?.end_date
          ? new Date(newestJob.end_date).getFullYear().toString()
          : "2024";

      const positions: ExperiencePositionSummary[] = (item.jobs || []).map(
        (job) => {
          const jobStart = job.start_date
            ? new Date(job.start_date).getFullYear()
            : 2023;
          const jobEnd = job.is_current
            ? "Present"
            : job.end_date
              ? new Date(job.end_date).getFullYear().toString()
              : "2024";

          return {
            role: job.position || "Software Developer",
            period: `${jobStart} - ${jobEnd}`,
            description: job.description || "",
            competency: job.competency || [],
            isCurrent: job.is_current,
          };
        },
      );

      return {
        id: item.id || `exp-real-${index}`,
        company: item.company || "Tech Company",
        role: newestJob?.position || "Software Developer",
        period: `${startYear} - ${endYear}`,
        location: item.location || "Indonesia",
        tags: item.tags || ["Go", "Next.js", "PostgreSQL"],
        logo: isLogoSource(item.logo) ? item.logo : undefined,
        image: item.image || companyPhotoFallback(item.company),
        description:
          newestJob?.description ||
          "Built modern web systems and scalable services.",
        competency: newestJob?.competency || [
          "Developed scalable backend systems and high-availability APIs.",
          "Designed database schemas, indexing strategies, and optimized query performance.",
          "Collaborated across engineering squads to deliver robust client features.",
        ],
        positions,
      };
    });

    while (mapped.length < 5) {
      mapped.push(
        DEFAULT_EXPERIENCES[mapped.length % DEFAULT_EXPERIENCES.length],
      );
    }

    return mapped;
  }, [experiencesData]);

  const total = experiences.length;

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      setCenterIndex((prev) => {
        if (dir === "next") {
          return (prev + 1) % total;
        }
        return (prev - 1 + total) % total;
      });
    },
    [total],
  );

  // Auto-slide effect with customizable interval and pause-on-hover
  useEffect(() => {
    if (
      !autoSlide ||
      reduceMotion ||
      (pauseOnHover && isHovered) ||
      total <= 1
    ) {
      return;
    }

    const timer = setInterval(() => {
      navigate("next");
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [
    autoSlide,
    autoSlideInterval,
    pauseOnHover,
    isHovered,
    total,
    navigate,
    reduceMotion,
  ]);

  // Compute position, scale, opacity, and zIndex for a given relative offset
  const color = useCssColors(["--ink-600", "--line", "--ink-650", "--ink-710"]);

  const getCardStyle = useCallback(
    (offset: number) => {
      const step = isMobile ? 130 : 320;
      const farStep = isMobile ? 240 : 600;

      if (offset === 0) {
        return {
          x: 0,
          scale: 1,
          opacity: 1,
          zIndex: 30,
          bgColor: color("--ink-600"),
          border: "1px solid rgba(115, 115, 115, 0.4)",
          shadow: "0 20px 40px -10px rgba(0, 0, 0, 0.7)",
        };
      }

      if (offset === -1) {
        return {
          x: -step,
          scale: 0.85,
          opacity: 0.75,
          zIndex: 20,
          bgColor: color("--line"),
          border: "1px solid rgba(64, 64, 64, 0.4)",
          shadow: "0 10px 20px -5px rgba(0, 0, 0, 0.5)",
        };
      }

      if (offset === 1) {
        return {
          x: step,
          scale: 0.85,
          opacity: 0.75,
          zIndex: 20,
          bgColor: color("--line"),
          border: "1px solid rgba(64, 64, 64, 0.4)",
          shadow: "0 10px 20px -5px rgba(0, 0, 0, 0.5)",
        };
      }

      if (offset === -2) {
        return {
          x: -farStep,
          scale: 0.7,
          opacity: 0.45,
          zIndex: 10,
          bgColor: color("--ink-650"),
          border: "1px solid transparent",
          shadow: "none",
        };
      }

      if (offset === 2) {
        return {
          x: farStep,
          scale: 0.7,
          opacity: 0.45,
          zIndex: 10,
          bgColor: color("--ink-650"),
          border: "1px solid transparent",
          shadow: "none",
        };
      }

      return {
        x: offset > 0 ? farStep + 140 : -farStep - 140,
        scale: 0.5,
        opacity: 0,
        zIndex: 0,
        bgColor: color("--ink-710"),
        border: "1px solid transparent",
        shadow: "none",
      };
    },
    [color, isMobile],
  );

  /** Records with a real backend id open the detail page; fallbacks stay put. */
  const openExperience = (item: CardExperience) => {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        item.id,
      );
    router.push(isUuid ? `/experience/${item.id}` : "/experience");
  };

  return (
    <div
      className="space-y-6 flex flex-col items-center w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Sun className="h-6 w-6 shrink-0 text-[var(--caution)] md:h-7 md:w-7" />
          <h3 className="text-2xl font-bold text-white tracking-tight transition-colors md:text-3xl">
            Experience
          </h3>
          <Sun className="h-6 w-6 shrink-0 text-[var(--caution)] md:h-7 md:w-7" />
        </div>
        <Link
          href="/experience"
          className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400 transition-colors hover:text-[var(--signal)]"
        >
          <span>All experience</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Carousel Container with Left & Right Arrows */}
      <div className="relative w-full flex items-center justify-center select-none py-1">
        {/* Left Arrow Button */}
        {showArrows && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("prev");
            }}
            aria-label="Previous experience"
            className="absolute left-1 sm:left-4 md:left-8 lg:left-12 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--ink-690)]/90 hover:bg-[var(--ink-610)] border border-neutral-700/60 hover:border-neutral-500 flex items-center justify-center text-neutral-300 hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Physical 3D Sliding Cards Carousel Track (Compact Height) */}
        <div className="relative w-full h-[210px] sm:h-[225px] md:h-[235px] flex items-center justify-center py-2 overflow-hidden">
          {/*<div />*/}
          {experiences.map((item, index) => {
            let offset = index - centerIndex;
            while (offset > total / 2) offset -= total;
            while (offset < -total / 2) offset += total;

            const isCenter = offset === 0; 
            const isLeft = offset < 0;
            const isRight = offset > 0;
            const isVisible = Math.abs(offset) <= 2;
            const style = getCardStyle(offset);

            return (
              <m.div
                key={item.id}
                initial={false}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  backgroundColor: style.bgColor,
                  boxShadow: style.shadow,
                  border: style.border,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.32, 0.72, 0, 1],
                }}
                style={{
                  width: isMobile ? "290px" : "460px",
                  height: isMobile ? "165px" : "195px",
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                className="absolute cursor-pointer overflow-hidden rounded-2xl border border-orange-950/50 bg-[#1a130b] p-4 sm:p-5 flex flex-col justify-between"
                onClick={() => {
                  if (isCenter) {
                    openExperience(item);
                  } else {
                    setCenterIndex(index);
                  }
                }}
              >
                {/* Company artwork: the stored logo bleeds out of the top-right corner, photos stay a soft wash */}
                {item.logo && isCenter ? (
                  <div className="pointer-events-none absolute -top-6 -right-6 h-32 w-32 sm:h-40 sm:w-40">
                    <img
                      src={item.logo}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-contain opacity-40 sm:opacity-45"
                    />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[var(--line)]/50 to-[var(--line)]" />
                  </div>
                ) : (
                  <div className="absolute top-0 right-0 w-28 h-28 sm:w-36 sm:h-36 overflow-hidden pointer-events-none rounded-tr-2xl md:rounded-tr-3xl rounded-bl-3xl">
                    <img
                      src={item.image}
                      alt={item.company}
                      className="w-full h-full object-cover opacity-15 sm:opacity-20 filter contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[var(--line)]/40 to-[var(--line)]" />
                  </div>
                )}

                <div className="relative z-10 flex h-full w-full flex-col justify-between">
                  {/* Top row: Company & Period Badge */}
                  <div
                    className={`flex items-center gap-2 ${
                      isRight ? "justify-end" : "justify-between"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-1.5 min-w-0 ${
                        isRight ? "text-right" : "text-left"
                      }`}
                    >
                      <span className="truncate font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--signal)] sm:text-xs">
                        {item.company}
                      </span>
                      {item.location && (
                        <span className="text-[11px] text-neutral-400 hidden sm:inline-block">
                          • {item.location}
                        </span>
                      )}
                    </div>

                    {isCenter && (item.positions?.length ?? 0) > 1 && (
                      <span className="shrink-0 rounded-full bg-[var(--signal)]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[var(--signal)]">
                        {item.positions?.length} roles
                      </span>
                    )}
                  </div>

                  {/* Middle: Role & Description (Compact spacing) */}
                  <div
                    className={`mt-1.5 mb-1 transition-opacity duration-300 ${isCenter ? "opacity-100" : "opacity-50"} ${isRight ? "text-right" : "text-left"}`}
                  >
                    <h3 className="truncate text-sm font-black tracking-tight text-white sm:text-base md:text-lg lg:text-xl">
                      {item.role}
                    </h3>
                    <span className="mt-0.5 block font-mono text-[10px] sm:text-xs text-neutral-400 transition-opacity duration-300">
                      {item.period}
                    </span>
                    {item.description && (
                      <p
                        className={`text-[11px] sm:text-xs text-neutral-300 font-normal line-clamp-2 mt-0.5 leading-snug transition-opacity duration-300 ${
                          isCenter ? "opacity-100" : "opacity-50"
                        }`}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom row: Compact Tech Stack tags */}
                  <div
                    className={`mt-1 flex items-center gap-1.5 overflow-hidden transition-opacity duration-300 ${
                      isCenter
                        ? "opacity-100 flex-wrap max-h-6"
                        : isRight
                          ? "opacity-80 justify-end"
                          : "opacity-80 justify-start"
                    }`}
                  >
                    {isCenter &&
                      item.tags.slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          className="border border-[var(--line)] px-1.5 py-0.5 font-mono text-[10px] leading-none text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        {showArrows && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("next");
            }}
            aria-label="Next experience"
            className="absolute right-1 sm:right-4 md:right-8 lg:right-12 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--ink-690)]/90 hover:bg-[var(--ink-610)] border border-neutral-700/60 hover:border-neutral-500 flex items-center justify-center text-neutral-300 hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>

      {/* Pagination / Slide Indicators */}
      {showIndicators && total > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          {experiences.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCenterIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === centerIndex ? "true" : undefined}
              className="group relative flex h-6 w-6 cursor-pointer items-center justify-center"
            >
              <span
                className={`block h-1.5 transition-all duration-300 ${
                  idx === centerIndex
                    ? "w-5 bg-[var(--signal)]"
                    : "w-1.5 bg-neutral-700 group-hover:bg-neutral-500"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Subtitle */}
      <p className="text-xs md:text-sm text-neutral-400 font-medium text-center">
        with 2 years of work experience
      </p>
    </div>
  );
};

export default SimpleExperienceList;
