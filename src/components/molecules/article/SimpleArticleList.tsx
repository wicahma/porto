"use client";

import Triangles from "@/assets/svg/triangles";
import MainCard from "@/components/atoms/cards/ArticleCard";
import { useArticles } from "@/hooks/queries/article.wrapper";
import { mapArticleToCard } from "@/utils/mappers/article.mapper";
import { RenderIf } from "@/utils/helper/render-if";
import { useRouter } from "next/navigation";
import React from "react";

export const SimpleArticleList: React.FC = () => {
  const router = useRouter();
  const { data: articlesData, isLoading } = useArticles(1, 4);
  const mappedArticles =
    (((articlesData as any)?.articles || []) as any[]).map(mapArticleToCard) ||
    [];

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push("/article")}
        className="flex items-center justify-between w-full group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Triangles />
          <h3 className="text-2xl font-bold group-hover:text-[#FF8FC0] transition-colors">
            Articles
          </h3>
        </div>
        <span className="text-xs font-semibold text-neutral-500 group-hover:text-neutral-300 transition-colors">
          View all →
        </span>
      </button>

      <RenderIf condition={isLoading}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-neutral-900/60 border border-neutral-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </RenderIf>

      <RenderIf condition={!isLoading && mappedArticles.length > 0}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mappedArticles.map((article: any) => (
            <div
              key={article.id}
              className="p-3 bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800/80 hover:border-neutral-700 rounded-2xl transition-all"
            >
              <MainCard article={article} />
            </div>
          ))}
        </div>
      </RenderIf>
    </div>
  );
};

export default SimpleArticleList;
