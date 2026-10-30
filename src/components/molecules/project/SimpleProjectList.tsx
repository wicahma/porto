"use client";

import FolderIcon from "@/assets/svg/folder";
import ProjectIcon from "@/assets/svg/project-icon";
import { useProjectCount, useProjects } from "@/hooks/queries/project.wrapper";
import { TProjectRow } from "@/interface/entities/project.interface";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import ProjectPaperCard from "./ProjectPaperCard";
import ProjectDetailDialog, {
  ProjectDetailData,
} from "./ProjectDetailDialog";

/** The exact 4 projects requested for the featured showcase */
const FEATURED_FOUR_PROJECTS: Partial<TProjectRow>[] = [
  {
    id: "77777777-7777-7777-7777-777777777701",
    title: "Onesist",
    description:
      "Full-stack desktop and web workspace for System Analysts: FSD documents, API specs, ERD schemas, test cases, task breakdowns, traceability matrices, and canvas sketches in one place, wired to local CLI AI agents.",
    problem:
      "System analysts produce FSDs, API specs, ERDs, SIT cases, and traceability matrices across scattered files, while AI CLI agents generate artifacts that have no unified viewer or review workflow.",
    solution:
      "Built a Tauri desktop app plus web dashboard with MDXEditor-based FSD analysis, an ERD studio (ReactFlow + Dagre over DBML), parsed OpenAPI spec viewer, sprint/phase task breakdown with Jira and Monday export, SIT case runner, BR-FR-DS-TC traceability with AI gap detection, Excalidraw canvas, and an embedded xterm.js agent terminal.",
    year: "2026",
    tags: [
      "TypeScript",
      "Rust",
      "Tauri",
      "React",
      "ReactFlow",
      "DBML",
      "Excalidraw",
      "LLM Agents",
    ],
    link: "https://onesist.rogasper.com",
  },
  {
    id: "77777777-7777-7777-7777-777777777702",
    title: "TypeScript Gateway",
    description:
      "Production-grade HTTP API gateway written in pure TypeScript on native node:http — zero runtime dependencies, one process, no frameworks.",
    problem:
      "Most gateways pull in a framework, router, HTTP client, metrics library, and dozens of transitive packages before proxying a single byte, inflating the audit surface and supply-chain risk.",
    solution:
      "Implemented every hot-path component — radix router, connection pool, circuit breaker, cache, compression — on the Node.js standard library, reaching sub-10ms P99 latency and 150k+ req/s throughput with a node_modules you can read in one sitting.",
    year: "2026",
    tags: [
      "TypeScript",
      "Node.js",
      "API Gateway",
      "Radix Router",
      "Circuit Breaker",
      "Zero Dependencies",
    ],
    link: "https://tsgate.diama.dev",
  },
  {
    id: "77777777-7777-7777-7777-777777777703",
    title: "Patok",
    description:
      "Indonesian spatial boundaries and address cleansing platform covering 38 provinces down to RT/RW, roads, and POIs by combining Kemendagri and OpenStreetMap data.",
    problem:
      "Inconsistent regional boundary datasets and unstructured address data across Indonesia made geospatial queries, reverse geocoding, and jurisdiction lookups slow and inaccurate.",
    solution:
      "Engineered a spatial data platform on PostGIS with automated GeoJSON harvesting pipelines, geometry compression, hierarchical boundary explorer APIs via Hono, and an interactive MapLibre GL web client.",
    year: "2026",
    tags: [
      "TypeScript",
      "PostGIS",
      "PostgreSQL",
      "Hono",
      "MapLibre GL",
      "Python",
      "GIS",
    ],
    link: "https://patok.diama.dev",
  },
  {
    id: "77777777-7777-7777-7777-777777777705",
    title: "Blindfold",
    description:
      "Secret redaction boundary for LLM agents: registers actual .env values and their transforms so they are masked before the model ever sees them.",
    problem:
      "Agent harnesses scan tool output for credential patterns such as sk- or xoxb-, so non-patterned secrets like SUDO_PASSWORD pass straight to the model, and base64/hex/reversed variants slip past the same scanner.",
    solution:
      "Took the opposite approach: register real values and their transforms into the harness exact-substring scrub boundary, so no pattern guessing is involved and a byte match is masked. Python standard library only.",
    year: "2026",
    tags: ["Python", "Security", "Secret Redaction", "LLM Agents"],
    link: "https://github.com/wicahma/blindfold",
  },
];

const TARGET_ORDER = ["Onesist", "TypeScript Gateway", "Patok", "Blindfold"];

export const SimpleProjectList: React.FC = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectDetailData | null>(null);

  const { data: countData } = useProjectCount();
  const { data: projectData, isLoading: isProjectsLoading } = useProjects(
    1,
    20,
    isExpanded,
  );
  const count = countData ?? 9;

  const rawProjects = (projectData as { projects?: TProjectRow[] } | undefined)
    ?.projects;

  // Filter and order the exact 4 projects: Onesist, TypeScript Gateway, Patok, Blindfold
  const projects = useMemo<ProjectDetailData[]>(() => {
    if (!rawProjects || rawProjects.length === 0) {
      return FEATURED_FOUR_PROJECTS as ProjectDetailData[];
    }

    const matched = TARGET_ORDER.map((name) => {
      const found = rawProjects.find((p) =>
        p.title?.toLowerCase().includes(name.toLowerCase()),
      );
      if (found) {
        // Enforce the requested destination links
        let link = found.link || "";
        if (name === "Onesist" && !link.includes("onesist.rogasper.com")) {
          link = "https://onesist.rogasper.com";
        } else if (
          name === "TypeScript Gateway" &&
          !link.includes("tsgate.diama.dev")
        ) {
          link = "https://tsgate.diama.dev";
        }
        return { ...found, link };
      }
      return FEATURED_FOUR_PROJECTS.find((f) =>
        f.title?.toLowerCase().includes(name.toLowerCase()),
      );
    }).filter(Boolean) as ProjectDetailData[];

    return matched.length === 4
      ? matched
      : (FEATURED_FOUR_PROJECTS as ProjectDetailData[]);
  }, [rawProjects]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left: What i've build */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex items-center justify-between w-full cursor-pointer group text-left focus:outline-none"
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

          {/* Folder Graphic Trigger */}
          <div
            onClick={() => setIsExpanded((prev) => !prev)}
            className="cursor-pointer group relative transition-transform duration-300 hover:scale-[1.01]"
            title={isExpanded ? "Click to fold back" : "Click to unfold projects"}
          >
            <FolderIcon className="w-full max-w-[614px] aspect-[614/286] drop-shadow-xl" />
          </div>
        </div>

        {/* Right: What i work with */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {/* 4-petal icon */}
            <svg
              width="41"
              height="41"
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

      {/* Unfolding Project Files Animation - Emerging out from folder opening */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <m.div
            key="unfolding-project-files"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2 space-y-5">
              {/* Top Bar matching Folder tab */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#02C380] animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                    Unfolded Project Documents (04 / 04)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Fold back ✕
                </button>
              </div>

              {isProjectsLoading && (!rawProjects || rawProjects.length === 0) ? (
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12 md:col-span-7 h-56 rounded-2xl bg-neutral-900/60 border border-neutral-800 animate-pulse" />
                  <div className="col-span-12 md:col-span-5 h-56 rounded-2xl bg-neutral-900/60 border border-neutral-800 animate-pulse" />
                  <div className="col-span-12 md:col-span-5 h-56 rounded-2xl bg-neutral-900/60 border border-neutral-800 animate-pulse" />
                  <div className="col-span-12 md:col-span-7 h-56 rounded-2xl bg-neutral-900/60 border border-neutral-800 animate-pulse" />
                </div>
              ) : (
                /* Tetris / Bento Grid (Image #1 layout: 7+5 on row 1, 5+7 on row 2) */
                <div className="grid grid-cols-12 gap-5 items-stretch">
                  {projects.map((proj, idx) => {
                    // Alternating Tetris widths:
                    // 0: wide (7 cols), 1: compact (5 cols)
                    // 2: compact (5 cols), 3: wide (7 cols)
                    const variant =
                      idx === 0 || idx === 3 ? "wide" : "compact";
                    const tilt =
                      idx === 0 ? -1 : idx === 1 ? 1 : idx === 2 ? -0.8 : 0.8;

                    return (
                      <m.div
                        key={proj.id || idx}
                        className={
                          variant === "wide"
                            ? "col-span-12 md:col-span-7 flex flex-col"
                            : "col-span-12 md:col-span-5 flex flex-col"
                        }
                        initial={{
                          opacity: 0,
                          y: -32,
                          scale: 0.94,
                          rotateX: 12,
                        }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, y: -20, scale: 0.96 }}
                        transition={{
                          delay: idx * 0.08,
                          duration: 0.45,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ transformOrigin: "top center" }}
                      >
                        <ProjectPaperCard
                          project={proj}
                          variant={variant}
                          tilt={tilt}
                          onClick={() => setSelectedProject(proj)}
                        />
                      </m.div>
                    );
                  })}
                </div>
              )}

              {/* Bottom Navigation footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-800/60 text-xs font-mono text-neutral-400">
                <span>
                  4 selected systems • {count} total projects in database
                </span>
                <button
                  type="button"
                  onClick={() => router.push("/project")}
                  className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-[#02C380] transition-colors cursor-pointer"
                >
                  <span>Explore all projects archive</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <ProjectDetailDialog
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default SimpleProjectList;
