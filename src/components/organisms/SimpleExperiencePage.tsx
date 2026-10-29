"use client";

import Batik from "@/assets/svg/batik";
import Sun from "@/assets/svg/sun";
import ExperienceDialog from "@/components/molecules/experience/ExperienceDialog";
import { ExperienceCard as IExperienceCard } from "@/constants/dummies/experience-carousel";
import { ExperiencePositionSummary } from "@/interface/entities/experience.interface";
import { useExperiences } from "@/hooks/queries/experience.wrapper";
import { isLogoSource } from "@/utils/helper/experience-logo";
import { ChevronRight, ExternalLink } from "lucide-react";
import React, { useMemo, useState } from "react";

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
}

interface DisplayExperienceItem {
  id: string;
  company: string;
  location: string;
  tags: string[];
  logo?: string;
  jobs: {
    id: string;
    role: string;
    period: string;
    description: string;
    competency: string[];
  }[];
}

const FALLBACK_EXPERIENCES: DisplayExperienceItem[] = [
  {
    id: "exp-1",
    company: "Tech Innovations Corp",
    location: "Jakarta, Indonesia",
    tags: ["Golang", "PostgreSQL", "Redis", "Distributed Systems", "Docker"],
    jobs: [
      {
        id: "job-1",
        role: "Lead Backend Developer",
        period: "2024 - Present",
        description: "Architected high-throughput cloud telemetry platforms and real-time streaming pipelines.",
        competency: [
          "Engineered microservices processing 10k+ requests per second with sub-millisecond latencies.",
          "Optimized PostgreSQL database query planning, indexing, and connection pooling.",
          "Architected real-time streaming pipelines utilizing Redis and Kafka.",
        ],
      },
    ],
  },
  {
    id: "exp-2",
    company: "Fintech Nusantara",
    location: "Jakarta, Indonesia",
    tags: ["Next.js", "TypeScript", "React", "Microservices", "Kafka"],
    jobs: [
      {
        id: "job-2",
        role: "Senior Full Stack Developer",
        period: "2022 - 2024",
        description: "Spearheaded headless core banking services and dynamic customer dashboard portals.",
        competency: [
          "Built performant Next.js client-facing interfaces with server components and edge rendering.",
          "Implemented secure OAuth2/JWT authentication and fine-grained role-based access controls.",
          "Integrated payment gateways and real-time financial transaction reconciliation.",
        ],
      },
    ],
  },
  {
    id: "exp-3",
    company: "Digital Solusindo",
    location: "Bandung, Indonesia",
    tags: ["PostgreSQL", "Go", "Docker", "REST API", "Clean Architecture"],
    jobs: [
      {
        id: "job-3",
        role: "Software Engineer",
        period: "2021 - 2022",
        description: "Engineered scalable microservices and optimized relational database queries.",
        competency: [
          "Developed robust RESTful APIs following domain-driven design and clean architecture.",
          "Containerized microservices with Docker and set up automated CI/CD deployment pipelines.",
          "Conducted code reviews and improved automated unit test coverage across core modules.",
        ],
      },
    ],
  },
];

export const SimpleExperiencePage: React.FC = () => {
  const { data, isLoading } = useExperiences(1, 100);
  const [selectedExperience, setSelectedExperience] = useState<IExperienceCard | null>(null);
  const [selectedPositions, setSelectedPositions] = useState<
    ExperiencePositionSummary[] | undefined
  >(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const experiences = useMemo<DisplayExperienceItem[]>(() => {
    const rawList = (data as unknown as { experiences?: ApiExperienceItem[] })?.experiences;

    if (!rawList || rawList.length === 0) {
      return FALLBACK_EXPERIENCES;
    }

    return rawList.map((item, index) => {
      const jobs = (item.jobs || []).map((j, jIndex) => {
        const startYear = j.start_date ? new Date(j.start_date).getFullYear() : 2023;
        const endYear = j.is_current
          ? "Present"
          : j.end_date
            ? new Date(j.end_date).getFullYear().toString()
            : "2024";

        return {
          id: `job-${index}-${jIndex}`,
          role: j.position || "Software Developer",
          period: `${startYear} - ${endYear}`,
          description: j.description || "Contributed to core application engineering and delivered scalable services.",
          competency: j.competency || [
            "Architected scalable services and microservices components.",
            "Optimized database performance, caching layers, and reliability.",
            "Maintained high code quality and test coverage.",
          ],
        };
      });

      return {
        id: item.id || `exp-real-${index}`,
        company: item.company || "Tech Company",
        location: item.location || "Indonesia",
        tags: item.tags || ["Go", "Next.js", "PostgreSQL"],
        logo: isLogoSource(item.logo) ? item.logo : undefined,
        jobs: jobs.length > 0 ? jobs : [
          {
            id: `default-job-${index}`,
            role: "Software Engineer",
            period: "2023 - Present",
            description: "Developed scalable backend systems and high-availability APIs.",
            competency: [
              "Developed scalable backend systems and high-availability APIs.",
              "Designed database schemas, indexing strategies, and optimized query performance.",
            ],
          },
        ],
      };
    });
  }, [data]);

  const handleOpenDialog = (exp: DisplayExperienceItem) => {
    const primaryJob = exp.jobs[0];
    const dialogData: IExperienceCard = {
      id: exp.id,
      company: exp.company,
      role: primaryJob?.role || "Software Developer",
      period: primaryJob?.period || "2023 - Present",
      description: primaryJob?.description || "",
      technologies: exp.tags,
      competency: primaryJob?.competency || [],
      logo: exp.logo,
    };
    setSelectedExperience(dialogData);
    setSelectedPositions(exp.jobs);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full space-y-12 py-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Sun className="w-8 h-8 text-[#A855F7] shrink-0" />
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Work Experience
          </h1>
        </div>
        <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
          My professional journey, roles, and engineering contributions across
          high-scale systems, startups, and enterprise software platforms.
        </p>
      </div>

      {/* Experience Cards List */}
      {isLoading ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-56 rounded-2xl bg-neutral-900/60 border border-neutral-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="rounded-2xl bg-[#161616] border border-neutral-800/80 hover:border-neutral-700 p-6 sm:p-8 space-y-6 transition-colors shadow-lg"
            >
              {/* Company Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {exp.company}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">
                    {exp.location}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenDialog(exp)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer self-start sm:self-center"
                >
                  <span>Quick Modal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Jobs inside this company */}
              <div className="space-y-6">
                {exp.jobs.map((job) => (
                  <div key={job.id} className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-[#02C380]">
                        {job.role}
                      </h3>
                      <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-neutral-800/90 text-neutral-300 border border-neutral-700/60 self-start sm:self-auto">
                        {job.period}
                      </span>
                    </div>

                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {job.description}
                    </p>

                    {job.competency && job.competency.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {job.competency.map((comp, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-neutral-400"
                          >
                            <ChevronRight className="w-4 h-4 text-[#FFC501] shrink-0 mt-0.5" />
                            <span>{comp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-800/60">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-neutral-800/90 text-neutral-300 border border-neutral-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Batik */}
      <div className="w-full overflow-hidden flex flex-nowrap rounded-lg my-8 opacity-90 select-none pointer-events-none">
        <Batik />
        <Batik />
      </div>

      {/* Modal Dialog */}
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

export default SimpleExperiencePage;
