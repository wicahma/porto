"use client";

import FolderIcon from "@/assets/svg/folder";
import ProjectIcon from "@/assets/svg/project-icon";
import { useProjects, useProjectCount } from "@/hooks/queries/project.wrapper";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProjectSummary = {
  id: string;
  title: string;
  description?: string | null;
  year?: string | null;
  tags?: string[] | null;
};

const ProjectCard = () => {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: count, isLoading: isCountLoading } = useProjectCount();
  const {
    data: projectData,
    isLoading: isProjectsLoading,
    isError: hasProjectsError,
  } = useProjects(1, 3, isExpanded);
  const projects = (projectData as { projects?: ProjectSummary[] } | undefined)
    ?.projects ?? [];

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
              <span>{count ?? 0} projects</span>
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

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <m.div
            id="project-previews"
            key="project-previews"
            initial={reduceMotion ? false : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.35, ease: "easeOut" }
            }
            role="region"
            aria-label="Project previews"
            className="relative mt-5 px-1 pb-1"
          >
            <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 md:text-xs">
              <span>Project files</span>
              <span>{projects.length.toString().padStart(2, "0")} / 03</span>
            </div>

            {isProjectsLoading ? (
              <div className="space-y-3" aria-label="Loading projects">
                {[0, 1].map((item) => (
                  <div
                    key={item}
                    className="h-24 animate-pulse rounded-xl border border-neutral-800 bg-neutral-900/70"
                  />
                ))}
              </div>
            ) : hasProjectsError ? (
              <p className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 text-sm text-neutral-400">
                Project summaries are unavailable right now.
              </p>
            ) : projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <m.article
                    key={project.id}
                    initial={
                      reduceMotion ? false : { opacity: 0, x: -12, y: -8 }
                    }
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : index * 0.07,
                      duration: reduceMotion ? 0 : 0.3,
                      ease: "easeOut",
                    }}
                    className="relative isolate"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-1 -top-1 bottom-1 -z-10 rotate-1 rounded-xl border border-neutral-700/70 bg-neutral-800"
                    />
                    <div className="rounded-xl border border-neutral-300/70 bg-[#f5f1e8] p-4 text-neutral-950 shadow-lg shadow-black/20 md:p-5">
                      <div className="flex items-baseline justify-between gap-3">
                        <h4 className="line-clamp-1 font-semibold md:text-lg">
                          {project.title}
                        </h4>
                        <span className="shrink-0 font-mono text-xs text-neutral-500">
                          {project.year || `0${index + 1}`}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                        {project.description || "A selected project from my portfolio."}
                      </p>
                      {project.tags?.length ? (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-neutral-300 px-2 py-0.5 font-mono text-[10px] text-neutral-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </m.article>
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 text-sm text-neutral-400">
                Project notes will appear here once they’re published.
              </p>
            )}

            <button
              type="button"
              onClick={() => router.push("/project")}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-300 transition-colors hover:border-[#02C380] hover:text-[#02C380] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02C380]"
            >
              View all projects
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default ProjectCard;
