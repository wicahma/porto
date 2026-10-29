"use client";

import FolderIcon from "@/assets/svg/folder";
import ProjectIcon from "@/assets/svg/project-icon";
import { useProjectCount, useProjects } from "@/hooks/queries/project.wrapper";
import { TProjectRow } from "@/interface/entities/project.interface";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, ChevronDown, ExternalLink } from "lucide-react";
import React, { useState } from "react";

const FALLBACK_PROJECTS: Partial<TProjectRow>[] = [
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
];

export const SimpleProjectList: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: countData } = useProjectCount();
  const { data: projectData, isLoading: isProjectsLoading } = useProjects(
    1,
    6,
    isExpanded,
  );
  const count = countData ?? 21;

  const rawProjects = (projectData as { projects?: TProjectRow[] } | undefined)?.projects;
  const projects = rawProjects && rawProjects.length > 0 ? rawProjects : FALLBACK_PROJECTS;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: What i've build */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex items-center justify-between w-full cursor-pointer group text-left"
          >
            <div className="flex items-center gap-3">
              <ProjectIcon className="w-8 h-8 rounded-sm shrink-0" />
              <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#02C380] transition-colors">
                What i've build
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
              <span>{count} projects</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? "rotate-180 text-[#02C380]" : "text-neutral-500"
                }`}
              />
            </div>
          </button>

          <div
            onClick={() => setIsExpanded((prev) => !prev)}
            className="cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
          >
            <FolderIcon className="w-full max-w-[614px] aspect-[614/286] drop-shadow-xl" />
          </div>
        </div>

        {/* Right: What i work with */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* Petal icon */}
            <svg
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 shrink-0"
            >
              <path
                d="M20.5 41C9.17817 41 4.61708e-06 31.8218 5.60686e-06 20.5L20.5 20.5L20.5 41Z"
                fill="#574BF5"
              />
              <path
                d="M3.8147e-06 -1.79217e-06C11.3218 -8.0238e-07 20.5 9.17816 20.5 20.5L2.02253e-06 20.5L3.8147e-06 -1.79217e-06Z"
                fill="#4FF1FF"
              />
              <path
                d="M41 1.79217e-06C29.6782 8.0238e-07 20.5 9.17816 20.5 20.5L41 20.5L41 1.79217e-06Z"
                fill="#FFC700"
              />
              <path
                d="M20.5 41C31.8218 41 41 31.8218 41 20.5L20.5 20.5L20.5 41Z"
                fill="#4FF1FF"
              />
            </svg>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              What i work with
            </h3>
          </div>

          <p className="text-sm text-neutral-400 font-normal">
            My go-to technologies for building projects.
          </p>

          {/* Tech Chips (Compact) */}
          <div className="flex flex-wrap items-center gap-2 pt-1.5">
            {/* Grafana */}
            <a
              href="https://grafana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs font-medium transition-colors hover:text-white group"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 shrink-0"
              >
                <path
                  d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
                  fill="#F05A28"
                />
                <path
                  d="M16.5 12C16.5 14.485 14.485 16.5 12 16.5C9.515 16.5 7.5 14.485 7.5 12C7.5 9.515 9.515 7.5 12 7.5C14.485 7.5 16.5 9.515 16.5 12Z"
                  fill="#FF884D"
                />
                <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
              </svg>
              <span>Grafana</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
            </a>

            {/* Redis */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181818] border border-neutral-800 text-neutral-300 text-xs font-medium">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 shrink-0"
              >
                <path d="M3 7.5L12 3L21 7.5L12 12L3 7.5Z" fill="#D82C20" />
                <path d="M3 7.5L12 12V21L3 16.5V7.5Z" fill="#A32219" />
                <path d="M21 7.5L12 12V21L21 16.5V7.5Z" fill="#B8271D" />
                <path
                  d="M7 8L12 5.5L17 8L12 10.5L7 8Z"
                  fill="#FFFFFF"
                  fillOpacity="0.4"
                />
              </svg>
              <span>Redis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Project Details Expansion */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Featured Project Previews
                </span>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Close previews ✕
                </button>
              </div>

              {isProjectsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-44 rounded-2xl bg-neutral-900/60 border border-neutral-800 animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="rounded-2xl bg-[#161616] border border-neutral-800/80 hover:border-neutral-700 p-5 flex flex-col justify-between shadow-lg transition-all"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            {proj.year && (
                              <span className="text-[10px] font-mono text-neutral-500 block mb-0.5">
                                {proj.year}
                              </span>
                            )}
                            <h4 className="text-base font-bold text-white leading-snug">
                              {proj.title}
                            </h4>
                          </div>
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors shrink-0"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        <p className="text-xs text-neutral-300 leading-relaxed mt-2 line-clamp-2">
                          {proj.description}
                        </p>

                        {(proj.problem || proj.solution) && (
                          <div className="space-y-2 mt-3 pt-3 border-t border-neutral-800/60">
                            {proj.problem && (
                              <div className="text-[11px] text-neutral-400">
                                <span className="font-semibold text-amber-400 mr-1.5">
                                  Problem:
                                </span>
                                <span className="line-clamp-1">{proj.problem}</span>
                              </div>
                            )}
                            {proj.solution && (
                              <div className="text-[11px] text-neutral-400">
                                <span className="font-semibold text-[#02C380] mr-1.5">
                                  Solution:
                                </span>
                                <span className="line-clamp-1">{proj.solution}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {proj.tags && proj.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-neutral-800/50">
                          {proj.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-800/90 text-neutral-300 border border-neutral-700/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SimpleProjectList;
