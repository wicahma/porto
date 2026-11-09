"use client";

import ProjectIcon from "@/assets/svg/project-icon";
import { useProjects } from "@/hooks/queries/project.wrapper";
import { TProjectRow } from "@/interface/entities/project.interface";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import React, { useMemo } from "react";
import Breadcrumb from "../molecules/header/Breadcrumb";

interface DisplayProjectItem {
  id: string;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  year?: string;
  tags: string[];
  link?: string;
}

const FALLBACK_PROJECTS: DisplayProjectItem[] = [
  {
    id: "proj-1",
    title: "Distributed Cloud Telemetry Platform",
    description:
      "Real-time infrastructure monitoring platform with high-throughput stream ingestion and distributed tracing.",
    problem:
      "Existing monolithic APM tools struggled with memory pressure and high tail latencies during sudden traffic spikes.",
    solution:
      "Designed event-driven ingestion workers with Go channels and Redis ring buffers, achieving 50,000 events/sec throughput.",
    year: "2024",
    tags: ["Go", "Redis", "Kafka", "TimescaleDB", "Docker"],
    link: "https://github.com/wicahma",
  },
  {
    id: "proj-2",
    title: "NexCommerce Headless Storefront",
    description:
      "Enterprise e-commerce platform built with a modular headless architecture for lightning-fast catalog navigation.",
    problem:
      "Traditional server-rendered e-commerce pages suffered from sluggish time-to-interactive and slow layout recalculations.",
    solution:
      "Leveraged Next.js Server Components with edge-cached GraphQL queries to attain sub-100ms LCP on product detail pages.",
    year: "2023",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GraphQL"],
    link: "https://github.com/wicahma",
  },
  {
    id: "proj-3",
    title: "Enterprise Document AI Parser",
    description:
      "Automated financial document processing pipeline utilizing OCR and LLM embeddings for structured verification.",
    problem:
      "Manual verification of thousands of invoices and contracts daily led to costly processing delays and input errors.",
    solution:
      "Engineered async task queues with vector similarity search in PostgreSQL via pgvector, reducing review times by 80%.",
    year: "2023",
    tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "LangChain"],
    link: "https://github.com/wicahma",
  },
  {
    id: "proj-4",
    title: "Modular Monolith Go Starter Kit",
    description:
      "Production-ready Go backend starter kit featuring clean vertical slice architecture and zero-reflection JSON handlers.",
    problem:
      "Microservices overhead often introduces high operational complexity and debugging friction for medium-scale teams.",
    solution:
      "Implemented modular monolith domain isolation communicating through strict interfaces with automated database migrations.",
    year: "2024",
    tags: ["Go", "PostgreSQL", "sqlc", "Docker", "REST API"],
    link: "https://github.com/wicahma",
  },
];

const isProjectPayload = (
  value: unknown,
): value is { projects?: TProjectRow[] } =>
  typeof value === "object" && value !== null && "projects" in value;

/**
 * `/project` archive: the same record-list language as the featured section on
 * the home page, one row per project.
 */
export const SimpleProjectPage: React.FC = () => {
  const { data, isLoading } = useProjects(1, 100);

  const projects = useMemo<DisplayProjectItem[]>(() => {
    const payload: unknown = data;
    const rawList = isProjectPayload(payload) ? payload.projects : undefined;

    if (!rawList || rawList.length === 0) {
      return FALLBACK_PROJECTS;
    }

    return rawList.map((item) => ({
      id: item.id,
      title: item.title || "Untitled Project",
      description: item.description || "Software engineering project.",
      problem: item.problem || undefined,
      solution: item.solution || undefined,
      year: item.year || "2024",
      tags: item.tags || ["Go", "TypeScript"],
      link: item.link || undefined,
    }));
  }, [data]);

  return (
    <div className="w-full space-y-10 py-6" data-section="build">
      {/* Header */}
      <div className="space-y-4">
        <Breadcrumb />
        <div className="flex items-center gap-3">
          <ProjectIcon className="h-7 w-7 shrink-0 rounded-sm md:h-8 md:w-8" />
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            Featured Projects
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 md:text-base">
          A showcase of production systems, distributed infrastructure, and
          interactive web applications built with modern engineering standards.
        </p>
      </div>

      {/* Records */}
      {isLoading ? (
        <div className="space-y-px">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse border-b border-[var(--line)] bg-[var(--ink-700)]/40"
            />
          ))}
        </div>
      ) : (
        <div className="border-t border-[var(--line)]">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
              className="group relative grid grid-cols-1 gap-x-6 gap-y-2 border-b border-[var(--line)] py-4 transition-colors hover:bg-[var(--ink-700)]/60 sm:grid-cols-[220px_1fr_auto]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px scale-y-0 bg-[var(--project-amber)] transition-transform duration-300 group-hover:scale-y-100"
              />

              {/* Serial + title + external link */}
              <div className="min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600 transition-colors group-hover:text-[var(--project-amber)]">
                  PRJ-{String(index + 1).padStart(2, "0")} ·{" "}
                  {proj.year ?? "—"}
                </span>
                <div className="mt-1 flex items-start justify-between gap-2">
                  <h2 className="truncate text-sm font-bold text-white transition-colors group-hover:text-[var(--project-amber)] md:text-base">
                    {proj.title}
                  </h2>
                  {proj.link ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 border border-[var(--line)] p-1.5 text-neutral-500 transition-colors hover:border-[var(--project-amber)] hover:text-[var(--project-amber)]"
                      aria-label={`Open ${proj.title} link`}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
              </div>

              {/* Description + problem/solution callouts + stack */}
              <div className="min-w-0">
                <p className="text-xs leading-relaxed text-neutral-400 md:text-[13px]">
                  {proj.description}
                </p>

                {proj.problem || proj.solution ? (
                  <dl className="mt-2 grid gap-x-4 gap-y-1 border-t border-[var(--line-soft)] pt-2 sm:grid-cols-[58px_1fr]">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                      Problem
                    </dt>
                    <dd className="line-clamp-2 font-mono text-[11px] leading-relaxed text-neutral-500 sm:line-clamp-1">
                      {proj.problem ?? "—"}
                    </dd>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                      Solution
                    </dt>
                    <dd className="line-clamp-2 font-mono text-[11px] leading-relaxed text-neutral-500 sm:line-clamp-1">
                      {proj.solution ?? "—"}
                    </dd>
                  </dl>
                ) : null}

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[var(--line)] px-1.5 py-0.5 font-mono text-[10px] leading-none text-neutral-500 transition-colors group-hover:border-[var(--project-amber)]/40 group-hover:text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Affordance */}
              <div className="flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 opacity-0 transition-opacity group-hover:opacity-100">
                <span>Live</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
      )}

      <span className="rule mt-2 block w-full" aria-hidden="true" />
    </div>
  );
};

export default SimpleProjectPage;
