"use client";

import Sun from "@/assets/svg/sun";
import { SmartImage } from "@/components/atoms/images/ImageWithFallback";
import { formatDateRange } from "@/utils/helper/date.utils";
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Breadcrumb from "../molecules/header/Breadcrumb";

export interface ExperienceDetailJob {
  id?: string;
  position?: string;
  employment_type?: string;
  description?: string;
  competency?: string[];
  start_date?: string;
  end_date?: string;
  is_current?: boolean;
}

export interface ExperienceDetailData {
  id?: string;
  company?: string;
  location?: string;
  total_duration?: string;
  tags?: string[];
  logo?: string;
  is_current?: boolean;
  jobs?: ExperienceDetailJob[];
}

/**
 * Experience detail page: company header plus the full position timeline.
 * Target of the home-page experience list and the `/[id]` rows on `/experience`.
 */
export const ExperienceDetailView: React.FC<{
  experience: ExperienceDetailData;
  id: string;
}> = ({ experience, id }) => {
  const company = experience.company || "Company";
  const jobs = experience.jobs ?? [];
  const tags = experience.tags ?? [];

  return (
    <div className="w-full space-y-10 py-6" data-section="experience">
      <div className="space-y-4">
        <Breadcrumb labels={{ [id]: company }} />

        <Link
          href="/experience"
          className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-[var(--signal)]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Work experience
        </Link>
      </div>

      {/* Company plate */}
      <section className="plate cornered relative overflow-hidden p-5 md:p-8">
        <div
          aria-hidden="true"
          className="grid-plot pointer-events-none absolute inset-0 opacity-40"
        />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            {experience.logo ? (
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--ink-800)]">
                <SmartImage
                  src={experience.logo}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
              </span>
            ) : (
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--ink-800)]">
                <Sun className="h-6 w-6 text-[var(--caution)]" />
              </span>
            )}

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                  Company record
                </span>
                {experience.is_current ? (
                  <span className="rounded-full bg-[var(--signal)]/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-[var(--signal)]">
                    Current
                  </span>
                ) : null}
              </div>

              <h1 className="mt-1 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                {company}
              </h1>

              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400">
                {experience.location ?? "Indonesia"}
                {experience.total_duration
                  ? ` · ${experience.total_duration}`
                  : ""}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[var(--line)] pt-3 md:block md:border-t-0 md:pt-0 md:text-right">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              Positions
            </span>
            <p className="text-xl font-black tracking-tight text-[var(--signal)] md:text-2xl">
              {String(jobs.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        {tags.length > 0 ? (
          <div className="relative mt-6 flex flex-wrap gap-1.5 border-t border-[var(--line-soft)] pt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border border-[var(--line)] px-1.5 py-0.5 font-mono text-[10px] leading-none text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </section>

      {/* Position timeline */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Sun className="h-6 w-6 shrink-0 text-[var(--caution)] md:h-7 md:w-7" />
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Positions
          </h2>
        </div>

        <ol className="border-t border-[var(--line)]">
          {jobs.map((job, index) => {
            const period =
              job.start_date && job.start_date !== ""
                ? formatDateRange(
                    job.start_date,
                    job.end_date,
                    job.is_current,
                  )
                : "—";

            return (
              <li
                key={job.id ?? `${company}-${index}`}
                className="group relative grid grid-cols-1 gap-4 border-b border-[var(--line)] py-5 transition-colors hover:bg-[var(--ink-700)]/40 sm:grid-cols-[210px_1fr] sm:gap-6"
              >
                <div className="min-w-0">
                  <span className="font-mono text-[11px] tabular-nums text-neutral-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-300">
                    {period}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    {job.employment_type ? (
                      <span className="border border-[var(--line)] px-1.5 py-0.5 font-mono text-[10px] leading-none text-neutral-500">
                        {job.employment_type}
                      </span>
                    ) : null}
                    {job.is_current ? (
                      <span className="rounded-full bg-[var(--signal)]/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-[var(--signal)]">
                        Current
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="font-mono text-sm font-bold uppercase tracking-[0.08em] text-[var(--signal)] md:text-base">
                    {job.position ?? "Software Developer"}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                    {job.description ?? "—"}
                  </p>

                  {job.competency && job.competency.length > 0 ? (
                    <ul className="mt-3 space-y-1.5">
                      {job.competency.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs leading-relaxed text-neutral-400 md:text-sm"
                        >
                          <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--caution)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/experience"
          className="group inline-flex items-center gap-1.5 text-sm text-neutral-300 transition-colors hover:text-[var(--signal)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          All work experience
        </Link>

        <Link
          href="/project"
          className="group inline-flex items-center gap-1.5 text-sm text-neutral-300 transition-colors hover:text-[var(--signal)]"
        >
          Featured projects
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <span className="rule block w-full" aria-hidden="true" />
    </div>
  );
};

export default ExperienceDetailView;
