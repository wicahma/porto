"use client";

import Batik from "@/assets/svg/batik";
import ProjectIcon from "@/assets/svg/project-icon";
import { useProjects } from "@/hooks/queries/project.wrapper";
import { TProjectRow } from "@/interface/entities/project.interface";
import { ExternalLink } from "lucide-react";
import React, { useMemo } from "react";

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
    description: "Real-time infrastructure monitoring platform with high-throughput stream ingestion and distributed tracing.",
    problem: "Existing monolithic APM tools struggled with memory pressure and high tail latencies during sudden traffic spikes.",
    solution: "Designed event-driven ingestion workers with Go channels and Redis ring buffers, achieving 50,000 events/sec throughput.",
    year: "2024",
    tags: ["Go", "Redis", "Kafka", "TimescaleDB", "Docker"],
    link: "https://github.com/wicahma",
  },
  {
    id: "proj-2",
    title: "NexCommerce Headless Storefront",
    description: "Enterprise e-commerce platform built with a modular headless architecture for lightning-fast catalog navigation.",
    problem: "Traditional server-rendered e-commerce pages suffered from sluggish time-to-interactive and slow layout recalculations.",
    solution: "Leveraged Next.js Server Components with edge-cached GraphQL queries to attain sub-100ms LCP on product detail pages.",
    year: "2023",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GraphQL"],
    link: "https://github.com/wicahma",
  },
  {
    id: "proj-3",
    title: "Enterprise Document AI Parser",
    description: "Automated financial document processing pipeline utilizing OCR and LLM embeddings for structured verification.",
    problem: "Manual verification of thousands of invoices and contracts daily led to costly processing delays and input errors.",
    solution: "Engineered async task queues with vector similarity search in PostgreSQL via pgvector, reducing review times by 80%.",
    year: "2023",
    tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "LangChain"],
    link: "https://github.com/wicahma",
  },
  {
    id: "proj-4",
    title: "Modular Monolith Go Starter Kit",
    description: "Production-ready Go backend starter kit featuring clean vertical slice architecture and zero-reflection JSON handlers.",
    problem: "Microservices overhead often introduces high operational complexity and debugging friction for medium-scale teams.",
    solution: "Implemented modular monolith domain isolation communicating through strict interfaces with automated database migrations.",
    year: "2024",
    tags: ["Go", "PostgreSQL", "sqlc", "Docker", "REST API"],
    link: "https://github.com/wicahma",
  },
];

export const SimpleProjectPage: React.FC = () => {
  const { data, isLoading } = useProjects(1, 100);

  const projects = useMemo<DisplayProjectItem[]>(() => {
    const rawList = data?.projects as TProjectRow[] | undefined;
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
    <div className="w-full space-y-12 py-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <ProjectIcon className="w-8 h-8 rounded-sm shrink-0" />
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Featured Projects
          </h1>
        </div>
        <p className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed">
          A showcase of production systems, distributed infrastructure, and
          interactive web applications built with modern engineering standards.
        </p>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-neutral-900/60 border border-neutral-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl bg-[#161616] border border-neutral-800/80 hover:border-neutral-700 p-6 sm:p-7 flex flex-col justify-between transition-all hover:scale-[1.01] shadow-lg group"
            >
              <div>
                {/* Top: Title, Year & Live Link */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-medium text-neutral-500 block mb-1">
                      {proj.year}
                    </span>
                    <h2 className="text-xl font-bold text-white group-hover:text-[#02C380] transition-colors leading-snug">
                      {proj.title}
                    </h2>
                  </div>

                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors shrink-0"
                      aria-label={`Open ${proj.title} link`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-300 leading-relaxed mt-3">
                  {proj.description}
                </p>

                {/* Problem & Solution Callouts */}
                {(proj.problem || proj.solution) && (
                  <div className="space-y-3 mt-4 pt-4 border-t border-neutral-800/70">
                    {proj.problem && (
                      <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                          The Problem
                        </span>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {proj.problem}
                        </p>
                      </div>
                    )}

                    {proj.solution && (
                      <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                        <span className="text-[11px] font-bold text-[#02C380] uppercase tracking-wider block mb-1">
                          Solution
                        </span>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {proj.solution}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-5 pt-3 border-t border-neutral-800/60">
                {proj.tags.map((tag) => (
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
    </div>
  );
};

export default SimpleProjectPage;
