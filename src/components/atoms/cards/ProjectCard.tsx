"use client";

import FolderIcon from "@/assets/svg/folder";
import ProjectIcon from "@/assets/svg/project-icon";
import ProjectDetailDialog, {
  ProjectDetailData,
} from "@/components/molecules/project/ProjectDetailDialog";
import ProjectPaperCard from "@/components/molecules/project/ProjectPaperCard";
import { useProjectCount, useProjects } from "@/hooks/queries/project.wrapper";
import { TProjectRow } from "@/interface/entities/project.interface";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

const TARGET_ORDER = ["Onesist", "TypeScript Gateway", "Patok", "Blindfold"];

const FALLBACK_FOUR_PROJECTS: ProjectDetailData[] = [
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

const ProjectCard = () => {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectDetailData | null>(null);

  const { data: count, isLoading: isCountLoading } = useProjectCount();
  const {
    data: projectData,
    isLoading: isProjectsLoading,
    isError: hasProjectsError,
  } = useProjects(1, 20, true);

  const rawProjects = (projectData as { projects?: TProjectRow[] } | undefined)
    ?.projects;

  // Filter and order the exact 4 target projects
  const projects = useMemo<ProjectDetailData[]>(() => {
    if (!rawProjects || rawProjects.length === 0) {
      return FALLBACK_FOUR_PROJECTS;
    }

    const matched = TARGET_ORDER.map((name) => {
      const found = rawProjects.find((p) =>
        p.title?.toLowerCase().includes(name.toLowerCase()),
      );
      if (found) {
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
      return FALLBACK_FOUR_PROJECTS.find((f) =>
        f.title?.toLowerCase().includes(name.toLowerCase()),
      );
    }).filter(Boolean) as ProjectDetailData[];

    return matched.length === 4 ? matched : FALLBACK_FOUR_PROJECTS;
  }, [rawProjects]);

  return (
    <div className="w-full">
      <m.button
        type="button"
        aria-label={
          isExpanded ? "Hide project previews" : "Show project previews"
        }
        aria-expanded={isExpanded}
        aria-controls={isExpanded ? "project-previews" : undefined}
        onClick={() => setIsExpanded((expanded) => !expanded)}
        whileTap={reduceMotion ? undefined : { scale: 0.99 }}
        className="group w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#02C380]"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <ProjectIcon className="aspect-square shrink-0" />
            <h3 className="truncate text-2xl font-semibold md:text-3xl">
              What i’ve build
            </h3>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-neutral-500">
            {isCountLoading ? (
              <span className="h-4 w-20 animate-pulse rounded bg-neutral-800" />
            ) : (
              <span>{count ?? 9} projects</span>
            )}
            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        <FolderIcon className="h-auto w-full transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none" />
      </m.button>

      {/* Unfolding Project Files Expansion */}
      <AnimatePresence initial={false}>
        {isExpanded ? (
          <m.div
            id="project-previews"
            key="project-previews"
            initial={reduceMotion ? false : { opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
            }
            role="region"
            aria-label="Project previews"
            className="relative mt-5 px-1 pb-1"
          >
            <div className="mb-4 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400 md:text-xs">
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#02C380] animate-pulse" />
                <span>Project files</span>
              </span>
              <span>{projects.length.toString().padStart(2, "0")} / 04</span>
            </div>

            {isProjectsLoading && (!rawProjects || rawProjects.length === 0) ? (
              <div className="space-y-4" aria-label="Loading projects">
                {[0, 1].map((item) => (
                  <div
                    key={item}
                    className="h-28 animate-pulse rounded-2xl border border-neutral-800 bg-neutral-900/70"
                  />
                ))}
              </div>
            ) : hasProjectsError ? (
              <p className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 text-sm text-neutral-400">
                Project summaries are unavailable right now.
              </p>
            ) : projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map((project, index) => {
                  const tilt =
                    index === 0 ? -1 : index === 1 ? 0.8 : index === 2 ? -0.8 : 1;

                  return (
                    <m.div
                      key={project.id || index}
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, y: -16, scale: 0.96 }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: reduceMotion ? 0 : index * 0.08,
                        duration: reduceMotion ? 0 : 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <ProjectPaperCard
                        project={project}
                        variant="full"
                        tilt={tilt}
                        onClick={() => setSelectedProject(project)}
                      />
                    </m.div>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 text-sm text-neutral-400">
                Project notes will appear here once they’re published.
              </p>
            )}

            <button
              type="button"
              onClick={() => router.push("/project")}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-neutral-700 px-4 py-2 text-xs font-mono font-semibold text-neutral-300 transition-colors hover:border-[#02C380] hover:text-[#02C380] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02C380]"
            >
              <span>Explore all projects archive</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </m.div>
        ) : null}
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

export default ProjectCard;
