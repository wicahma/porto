"use client";

import Triangles from "@/assets/svg/triangles";
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Triangles />
          <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
            Articles
          </h3>
        </div>

        <button
          type="button"
          onClick={() => router.push("/article")}
          className="text-sm font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>See more</span>
          <span>→</span>
        </button>
      </div>

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
          {articles.map((article) => (
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
