"use client";

import { getStorageFileUrl } from "@/utils/helper/storage";
import { TArticleRow } from "@/interface/entities/article.interface";
import { ArrowUpRight } from "lucide-react";
import React from "react";

export interface ArticlePreviewCardProps {
  article: TArticleRow;
  onOpen: (slug?: string) => void;
}

export const formatArticleDate = (dateStr?: string | null): string => {
  if (!dateStr) return "27 Okt 2026";

  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

/**
 * Borderless article card used on both the home summary and /article list.
 * The image carries the arrow affordance; metadata stays on a single quiet line.
 */
export const ArticlePreviewCard: React.FC<ArticlePreviewCardProps> = ({
  article,
  onOpen,
}) => {
  const readTime = (article.read_time || "5").replace(/min read/gi, "").trim();

  return (
    <div
      onClick={() => onOpen(article.slug)}
      className="group flex cursor-pointer flex-col justify-between"
    >
      <div>
        {/* Thumbnail */}
        <div className="relative flex aspect-[466/252] w-full items-center justify-center overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--ink-550)]">
          {article.image ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundImage: `url("${getStorageFileUrl(article.image)}")`,
              }}
            />
          ) : null}

          <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center border border-[var(--line-strong)] bg-[var(--ink-900)]/80 text-[var(--text-mid)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-[var(--signal)] group-hover:text-[var(--signal)]"><ArrowUpRight className="h-4 w-4" /></span>
        </div>

        <h3 className="mt-3.5 line-clamp-2 text-base font-bold leading-snug text-white transition-colors group-hover:text-[var(--signal)] md:text-lg">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="mt-1.5 line-clamp-2 text-xs font-normal leading-relaxed text-neutral-400">
            {article.excerpt}
          </p>
        )}
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-[var(--line-soft)] pt-2">
        <span className="spec-label spec-label--signal">{article.category || "Tech"}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500">
          {readTime} MIN · {formatArticleDate(article.created_at)}
        </span>
      </div>
    </div>
  );
};

export default ArticlePreviewCard;
