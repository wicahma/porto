"use client";

import Batik from "@/assets/svg/batik";
import Triangles from "@/assets/svg/triangles";
import { ArticlePreviewCard } from "@/components/molecules/article/ArticlePreviewCard";
import ChipGroup from "@/components/molecules/chips/ChipGroup";
import {
  useArticleCategories,
  useArticles,
} from "@/hooks/queries/article.wrapper";
import { TChip } from "@/interface/app/experience";
import { TArticleRow } from "@/interface/entities/article.interface";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

export const SimpleArticlePage: React.FC = () => {
  const router = useRouter();

  // Search state with 300ms server-side debounce
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch distinct categories directly from database articles table
  const { data: dbCategories } = useArticleCategories();

  // Fetch articles with server-side search and category filtering
  const { data, isLoading } = useArticles(
    1,
    50,
    debouncedSearch,
    selectedCategory === "All" ? "" : selectedCategory,
  );

  const articles = (data?.articles as TArticleRow[] | undefined) ?? [];

  // Categories list: only "All" + categories from articles table
  const categories = useMemo(() => {
    const list = (dbCategories as string[] | undefined) ?? [];
    return ["All", ...list];
  }, [dbCategories]);

  // Map to TChip[] for ChipGroup component
  const chipItems = useMemo<TChip[]>(() => {
    return categories.map((cat, i) => ({
      id: i + 1,
      label: cat,
      active: selectedCategory === cat,
    }));
  }, [categories, selectedCategory]);

  const handleChipsChange = (updated: TChip[]) => {
    const active = updated.find((c) => c.active);
    setSelectedCategory(active ? active.label : "All");
  };

  return (
    <div className="w-full space-y-10 py-4">
      {/* 1. Header matching Image #2 */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Triangles />
          <h1 className="text-4xl font-black text-white tracking-tight">
            Articles
          </h1>
        </div>
        <p className="text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed">
          Technical deep-dives, architectural lessons, and tutorials on backend systems,
          modern frontend, and database engineering.
        </p>
      </div>

      {/* 2. Search and Filter matching Image #3 */}
      <div className="space-y-4">
        {/* Full-width rounded search input with pink border calling server-side */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Search some article..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-6 py-3.5 bg-transparent border-2 border-[#FF8FC0] rounded-full text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-[#FF8FC0] transition-colors text-base"
          />
        </div>

        {/* Dynamic filter chips showing categories only from articles table */}
        {categories.length > 1 && (
          <div className="pt-1">
            <ChipGroup
              key={categories.join("-")}
              initialChips={chipItems}
              activeColor="bg-[#FF8FC0]"
              multiSelect={false}
              onChipsChange={handleChipsChange}
            />
          </div>
        )}
      </div>

      {/* 3. Article Card List (shared borderless card with the home summary) */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[466/252] w-full animate-pulse rounded-2xl bg-neutral-900/60" />
              <div className="h-5 w-4/5 animate-pulse rounded bg-neutral-900/60" />
              <div className="h-3 w-3/5 animate-pulse rounded bg-neutral-900/60" />
            </div>
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticlePreviewCard
              key={article.id}
              article={article}
              onOpen={(slug) => {
                if (slug) router.push(`/article/${slug}`);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-sm text-neutral-500">
          No articles found for &quot;{debouncedSearch || selectedCategory}&quot;.
        </div>
      )}

      {/* Footer Batik */}
      <div className="w-full overflow-hidden flex flex-nowrap rounded-lg my-8 opacity-90 select-none pointer-events-none">
        <Batik />
        <Batik />
      </div>
    </div>
  );
};

export default SimpleArticlePage;
