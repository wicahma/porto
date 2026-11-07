"use client";

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

export interface SimpleArticlePageProps {
  initialArticles?: { articles: TArticleRow[]; total: number };
  initialCategories?: string[];
}

export const SimpleArticlePage: React.FC<SimpleArticlePageProps> = ({
  initialArticles,
  initialCategories,
}) => {
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
  const { data: dbCategories } = useArticleCategories(initialCategories);

  // Fetch articles with server-side search and category filtering
  const { data, isLoading } = useArticles(
    1,
    50,
    debouncedSearch,
    selectedCategory === "All" ? "" : selectedCategory,
    initialArticles,
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
            aria-label="Search articles"
            placeholder="Search some article..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full border border-[var(--line-strong)] bg-[var(--ink-900)] px-4 py-3 font-mono text-sm text-neutral-200 transition-colors placeholder:text-[var(--text-low)] focus:border-[var(--signal)] focus:outline-none"
          />
        </div>

        {/* Dynamic filter chips showing categories only from articles table */}
        {categories.length > 1 && (
          <div className="pt-1">
            <ChipGroup
              key={categories.join("-")}
              initialChips={chipItems}
              activeColor="bg-[var(--signal)]"
              multiSelect={false}
              onChipsChange={handleChipsChange}
            />
          </div>
        )}
      </div>

      {/* 3. Article Card List (shared borderless card with the home summary) */}
      <h2 className="text-lg font-bold tracking-tight text-white">
        Article index
      </h2>
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
          {articles.map((article, index) => (
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

      <span className="rule mt-8 block w-full" aria-hidden="true" />
    </div>
  );
};

export default SimpleArticlePage;
