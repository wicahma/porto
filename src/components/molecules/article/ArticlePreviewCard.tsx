"use client";

import { StorageImage } from "@/components/atoms/images/StorageImage";
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
        <div className="relative flex aspect-[466/252] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#373737]">
          {article.image ? (
            <StorageImage
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}

          <ArrowUpRight className="absolute top-4 right-4 h-6 w-6 text-[#A1A1A1] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
        </div>

        <h4 className="mt-3.5 line-clamp-2 text-base font-bold leading-snug text-white transition-colors group-hover:text-[#02C380] md:text-lg">
          {article.title}
        </h4>

        {article.excerpt && (
          <p className="mt-1.5 line-clamp-2 text-xs font-normal leading-relaxed text-neutral-400">
            {article.excerpt}
          </p>
        )}
      </div>

      <p className="mt-2 text-xs font-normal text-neutral-400 md:text-sm">
        {article.category || "Tech"} {readTime} min read ·{" "}
        {formatArticleDate(article.created_at)}
      </p>
    </div>
  );
};

export default ArticlePreviewCard;
