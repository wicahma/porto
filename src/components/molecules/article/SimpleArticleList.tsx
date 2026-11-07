"use client";

import Triangles from "@/assets/svg/triangles";
import { SectionHeader } from "@/components/molecules/header/SectionHeader";
import { ArticlePreviewCard } from "@/components/molecules/article/ArticlePreviewCard";
import { useArticles } from "@/hooks/queries/article.wrapper";
import { TArticleRow } from "@/interface/entities/article.interface";
import { useRouter } from "next/navigation";
import React from "react";

export const SimpleArticleList: React.FC = () => {
  const router = useRouter();
  const { data, isLoading } = useArticles(1, 6);
  const articles = (data?.articles as TArticleRow[] | undefined) ?? [];

  const handleArticleClick = (slug?: string) => {
    if (slug) {
      router.push(`/article/${slug}`);
    } else {
      router.push("/article");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <SectionHeader
        title="Articles"
        icon={<Triangles />}
        action={
          <button
            type="button"
            onClick={() => router.push("/article")}
            className="focus-spec flex cursor-pointer items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-neutral-400 transition-colors hover:text-[var(--signal)]"
          >
            <span>Index</span>
            <span aria-hidden="true">→</span>
          </button>
        }
      />

      {/* Grid: Only real articles from database */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[466/252] rounded-2xl bg-neutral-900/60 border border-neutral-800 animate-pulse"
            />
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ArticlePreviewCard
              key={article.id}
              article={article}
              onOpen={handleArticleClick}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-neutral-500 text-sm">
          No articles published yet.
        </div>
      )}
    </div>
  );
};

export default SimpleArticleList;
