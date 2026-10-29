"use client";

import Sun from "@/assets/svg/sun";
import ExperienceDialog from "@/components/molecules/experience/ExperienceDialog";
import { ExperienceCard as IExperienceCard } from "@/constants/dummies/experience-carousel";
import { useExperiences } from "@/hooks/queries/experience.wrapper";
import { ExperiencePositionSummary } from "@/interface/entities/experience.interface";
import {
  companyPhotoFallback,
  isLogoSource,
} from "@/utils/helper/experience-logo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { m } from "motion/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

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
    description: "Architected high-throughput cloud telemetry platforms and real-time streaming pipelines.",
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
    description: "Spearheaded headless core banking services and dynamic customer dashboard portals.",
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
    description: "Engineered scalable microservices and optimized relational database queries.",
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
    description: "Managed containerized infrastructure with automated deployments and observability.",
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
    description: "Built responsive web applications and collaborated with UI/UX designers.",
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

export const ExperienceCard: React.FC = () => {
  const router = useRouter();
  const { data: experiencesData } = useExperiences(1, 10);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<IExperienceCard | null>(null);
  const [selectedPositions, setSelectedPositions] = useState<
    ExperiencePositionSummary[] | undefined
  >(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const experiences = useMemo<CardExperience[]>(() => {
    const rawList = (experiencesData as unknown as { experiences?: ApiExperienceItem[] })?.experiences;

    if (!rawList || rawList.length === 0) {
      return DEFAULT_EXPERIENCES;
    }

    const mapped: CardExperience[] = rawList.map((item, index) => {
      const newestJob = item.jobs && item.jobs.length > 0 ? item.jobs[0] : undefined;
      const startYear = newestJob?.start_date ? new Date(newestJob.start_date).getFullYear() : 2023;
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
        description: newestJob?.description || "Built modern web systems and scalable services.",
        competency: newestJob?.competency || [
          "Developed scalable backend systems and high-availability APIs.",
          "Designed database schemas, indexing strategies, and optimized query performance.",
          "Collaborated across engineering squads to deliver robust client features.",
        ],
        positions,
      };
    });

    while (mapped.length < 5) {
      mapped.push(DEFAULT_EXPERIENCES[mapped.length % DEFAULT_EXPERIENCES.length]);
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

  // Auto-slide effect with pause on hover
  useEffect(() => {
    if (isHovered || total <= 1 || isDialogOpen) {
      return;
    }

    const timer = setInterval(() => {
      navigate("next");
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered, total, navigate, isDialogOpen]);

  // Style calculations maintaining square card proportions
  const getCardStyle = useCallback((offset: number) => {
    const step = 85;
    const farStep = 150;

    if (offset === 0) {
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        zIndex: 30,
        bgColor: "#161616",
        border: "1px solid rgba(115, 115, 115, 0.4)",
        shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
      };
    }

    if (offset === -1) {
      return {
        x: -step,
        scale: 0.85,
        opacity: 0.65,
        filter: "blur(1.5px)",
        zIndex: 20,
        bgColor: "#131313",
        border: "1px solid rgba(64, 64, 64, 0.3)",
        shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
      };
    }

    if (offset === 1) {
      return {
        x: step,
        scale: 0.85,
        opacity: 0.65,
        filter: "blur(1.5px)",
        zIndex: 20,
        bgColor: "#131313",
        border: "1px solid rgba(64, 64, 64, 0.3)",
        shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
      };
    }

    if (offset === -2) {
      return {
        x: -farStep,
        scale: 0.72,
        opacity: 0.35,
        filter: "blur(3px)",
        zIndex: 10,
        bgColor: "#101010",
        border: "1px solid transparent",
        shadow: "none",
      };
    }

    if (offset === 2) {
      return {
        x: farStep,
        scale: 0.72,
        opacity: 0.35,
        filter: "blur(3px)",
        zIndex: 10,
        bgColor: "#101010",
        border: "1px solid transparent",
        shadow: "none",
      };
    }

    return {
      x: offset > 0 ? farStep + 80 : -farStep - 80,
      scale: 0.5,
      opacity: 0,
      filter: "blur(4px)",
      zIndex: 0,
      bgColor: "#101010",
      border: "1px solid transparent",
      shadow: "none",
    };
  }, []);

  const handleOpenModal = (item: CardExperience) => {
    const dialogData: IExperienceCard = {
      id: item.id,
      company: item.company,
      role: item.role,
      period: item.period,
      description: item.description || "Built reliable production architecture and high-performance services.",
      technologies: item.tags || [],
      competency: item.competency || [
        "Architected scalable services and microservices components.",
        "Optimized database performance, caching layers, and reliability.",
        "Maintained high code quality and test coverage.",
      ],
      logo: item.logo,
      image: item.image,
    };
    setSelectedExperience(dialogData);
    setSelectedPositions(item.positions);
    setIsDialogOpen(true);
  };

  return (
    <div
      className="space-y-6 flex flex-col items-center w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-3 group w-full">
        <Sun className="w-6 h-6 text-[#8D41FF] shrink-0 group-hover:rotate-45 transition-transform duration-300" />
        <h3 className="text-3xl font-semibold text-white tracking-tight group-hover:text-purple-300 transition-colors">
          Work Experience
        </h3>
        <Sun className="w-6 h-6 text-[#8D41FF] shrink-0 group-hover:-rotate-45 transition-transform duration-300" />
      </div>

      {/* Carousel Track with Left & Right Arrows */}
      <div className="relative w-full flex items-center justify-center select-none py-1">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate("prev");
          }}
          aria-label="Previous experience"
          className="absolute left-0 sm:left-2 z-40 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1c1c1c]/90 hover:bg-[#282828] border border-neutral-700/60 hover:border-neutral-500 flex items-center justify-center text-neutral-300 hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Physical 3D Sliding Track for Square Cards (200px x 200px) */}
        <div className="relative w-full h-[215px] sm:h-[225px] flex items-center justify-center overflow-hidden py-2">
          {experiences.map((item, index) => {
            let offset = index - centerIndex;
            while (offset > total / 2) offset -= total;
            while (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
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
                  filter: style.filter,
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
                  width: "200px",
                  height: "200px",
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                className={`absolute aspect-square rounded-2xl overflow-hidden p-4 flex flex-col justify-center items-center text-center select-none transition-colors ${
                  isCenter
                    ? "cursor-pointer hover:border-neutral-500"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  if (isCenter) {
                    handleOpenModal(item);
                  } else {
                    setCenterIndex(index);
                  }
                }}
              >
                {/* Company artwork: the stored logo sits at the top with equal top/left/right insets */}
                {item.logo ? (
                  <div className="pointer-events-none absolute inset-x-4 top-4 flex justify-center">
                    <img
                      src={item.logo}
                      alt=""
                      aria-hidden="true"
                      className="h-14 w-14 rounded-xl shadow-lg shadow-black/30"
                    />
                  </div>
                ) : (
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none rounded-tr-2xl rounded-bl-3xl">
                    <img
                      src={item.image}
                      alt={item.company}
                      className="w-full h-full object-cover opacity-20 filter contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[#161616]/40 to-[#161616]" />
                  </div>
                )}

                <div className="relative z-10 flex flex-col justify-center items-center w-full pt-16">
                  <h4 className="text-sm sm:text-base font-bold text-white mb-1.5 leading-snug truncate max-w-full">
                    {item.company}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-[#ABABAB] mb-1 line-clamp-2 leading-snug">
                    {item.role}
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-400 font-mono mt-0.5">
                    {item.period}
                  </p>
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate("next");
          }}
          aria-label="Next experience"
          className="absolute right-0 sm:right-2 z-40 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1c1c1c]/90 hover:bg-[#282828] border border-neutral-700/60 hover:border-neutral-500 flex items-center justify-center text-neutral-300 hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Pagination / Slide Indicators */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          {experiences.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCenterIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === centerIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-neutral-700 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>
      )}

      {/* Experience Detail Popup Modal */}
      {selectedExperience && (
        <ExperienceDialog
          data={selectedExperience}
          positions={selectedPositions}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default ExperienceCard;
