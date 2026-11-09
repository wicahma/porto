"use client";

import Sun from "@/assets/svg/sun";
import { useExperiences } from "@/hooks/queries/experience.wrapper";
import { isLogoSource } from "@/utils/helper/experience-logo";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";
import Breadcrumb from "../molecules/header/Breadcrumb";

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
  total_duration?: string;
  tags?: string[];
  jobs?: ApiJobItem[];
  logo?: string;
}

interface DisplayExperienceItem {
  id: string;
  company: string;
  location: string;
  duration?: string;
  tags: string[];
  logo?: string;
  jobs: {
    id: string;
    role: string;
    period: string;
    isCurrent: boolean;
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
        isCurrent: true,
        description:
          "Architected high-throughput cloud telemetry platforms and real-time streaming pipelines.",
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
        isCurrent: false,
        description:
          "Spearheaded headless core banking services and dynamic customer dashboard portals.",
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
        isCurrent: false,
        description:
          "Engineered scalable microservices and optimized relational database queries.",
        competency: [
          "Developed robust RESTful APIs following domain-driven design and clean architecture.",
          "Containerized microservices with Docker and set up automated CI/CD deployment pipelines.",
          "Conducted code reviews and improved automated unit test coverage across core modules.",
        ],
      },
    ],
  },
];

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isExperiencePayload = (
  value: unknown,
): value is { experiences?: ApiExperienceItem[] } =>
  typeof value === "object" && value !== null && "experiences" in value;

/**
 * `/experience` archive: the same data-list language as the home section, with
 * every company opening its detail page.
 */
export const SimpleExperiencePage: React.FC = () => {
  const { data, isLoading } = useExperiences(1, 100);

  const experiences = useMemo<DisplayExperienceItem[]>(() => {
    const payload: unknown = data;
    const rawList = isExperiencePayload(payload)
      ? payload.experiences
      : undefined;

    if (!rawList || rawList.length === 0) {
      return FALLBACK_EXPERIENCES;
    }

    return rawList.map((item, index) => {
      const jobs = (item.jobs || []).map((job, jobIndex) => {
        const startYear = job.start_date
          ? new Date(job.start_date).getFullYear()
          : 2023;
        const endYear = job.is_current
          ? "Present"
          : job.end_date
            ? new Date(job.end_date).getFullYear().toString()
            : "2024";

        return {
          id: `job-${index}-${jobIndex}`,
          role: job.position || "Software Developer",
          period: `${startYear} - ${endYear}`,
          isCurrent: Boolean(job.is_current),
          description:
            job.description ||
            "Contributed to core application engineering and delivered scalable services.",
          competency: job.competency || [
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
        duration: item.total_duration,
        tags: item.tags || ["Go", "Next.js", "PostgreSQL"],
        logo: isLogoSource(item.logo) ? item.logo : undefined,
        jobs:
          jobs.length > 0
            ? jobs
            : [
                {
                  id: `default-job-${index}`,
                  role: "Software Engineer",
                  period: "2023 - Present",
                  isCurrent: true,
                  description:
                    "Developed scalable backend systems and high-availability APIs.",
                  competency: [
                    "Developed scalable backend systems and high-availability APIs.",
                    "Designed database schemas, indexing strategies, and optimized query performance.",
                  ],
                },
              ],
      };
    });
  }, [data]);

  return (
    <div className="w-full space-y-10 py-6" data-section="experience">
      {/* Header */}
      <div className="space-y-4">
        <Breadcrumb />
        <div className="flex items-center gap-3">
          <Sun className="h-7 w-7 shrink-0 text-[var(--caution)] md:h-8 md:w-8" />
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            Work Experience
          </h1>
        </div>
        <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
          My professional journey, roles, and engineering contributions across
          high-scale systems, startups, and enterprise software platforms.
        </p>
      </div>

      {/* Records */}
      {isLoading ? (
        <div className="space-y-px">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse border-b border-[var(--line)] bg-[var(--ink-700)]/40"
            />
          ))}
        </div>
      ) : (
        <div className="border-t border-[var(--line)]">
          {experiences.map((exp, index) => {
            const href = UUID_PATTERN.test(exp.id)
              ? `/experience/${exp.id}`
              : "/experience";

            return (
              <Link
                key={exp.id}
                href={href}
                className="group relative grid grid-cols-1 gap-4 border-b border-[var(--line)] py-5 transition-colors hover:bg-[var(--ink-700)]/60 sm:grid-cols-[240px_1fr] sm:gap-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-px scale-y-0 bg-[var(--signal)] transition-transform duration-300 group-hover:scale-y-100"
                />

                {/* Company identity */}
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] tabular-nums text-neutral-600 transition-colors group-hover:text-[var(--signal)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {exp.logo ? (
                      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--ink-800)]">
                        <img
                          src={exp.logo}
                          alt=""
                          aria-hidden="true"
                          className="h-full w-full object-cover opacity-85"
                        />
                      </span>
                    ) : null}
                    {exp.duration ? (
                      <span className="border border-[var(--line)] px-1.5 py-0.5 font-mono text-[10px] leading-none text-neutral-400">
                        {exp.duration}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-2.5 truncate text-base font-bold tracking-tight text-white transition-colors group-hover:text-[var(--signal)] sm:text-lg">
                    {exp.company}
                  </h2>
                  <p className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                    {exp.location}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                      {exp.jobs.length}{" "}
                      {exp.jobs.length === 1 ? "role" : "roles"}
                    </span>
                    <span className="hidden items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 transition-colors group-hover:text-[var(--signal)] sm:inline-flex">
                      · View detail
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>

                {/* Jobs */}
                <div className="min-w-0 space-y-4">
                  {exp.jobs.map((job) => (
                    <div
                      key={job.id}
                      className="border-l border-[var(--line)] pl-4 transition-colors group-hover:border-[var(--signal)]/40"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-mono text-sm font-bold uppercase tracking-[0.08em] text-[var(--signal)]">
                          {job.role}
                        </h3>
                        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                          {job.period}
                          {job.isCurrent ? (
                            <span className="rounded-full bg-[var(--signal)]/15 px-1.5 py-0.5 text-[9px] text-[var(--signal)]">
                              Current
                            </span>
                          ) : null}
                        </span>
                      </div>

                      <p className="mt-1 text-sm leading-relaxed text-neutral-300">
                        {job.description}
                      </p>

                      {job.competency.length > 0 ? (
                        <ul className="mt-2 space-y-1">
                          {job.competency.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-xs leading-relaxed text-neutral-400"
                            >
                              <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--caution)]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}

                  <div className="flex flex-wrap gap-1.5 border-t border-[var(--line-soft)] pt-3">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[var(--line)] px-1.5 py-0.5 font-mono text-[10px] leading-none text-neutral-500 transition-colors group-hover:border-[var(--signal)]/40 group-hover:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <span className="rule block w-full" aria-hidden="true" />
    </div>
  );
};

export default SimpleExperiencePage;
