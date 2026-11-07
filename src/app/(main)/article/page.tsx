import Breadcrumb from "@/components/molecules/header/Breadcrumb";
import Infographic from "@/components/molecules/header/Infograpnic";
import SimpleArticlePage from "@/components/organisms/SimpleArticlePage";
import { TArticleRow } from "@/interface/entities/article.interface";
import React from "react";

// The list is fetched on the server so the first paint already contains the
// article cards (previously the whole grid appeared only after hydration).
export const dynamic = "force-dynamic";

interface ArticleListPayload {
  articles?: TArticleRow[];
  total?: number;
}

async function loadInitialArticles(): Promise<{
  articles: TArticleRow[];
  total: number;
} | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  const headers = { "X-API-Key": process.env.API_KEY ?? "" };

  try {
    const response = await fetch(`${baseUrl}/api/articles?page=1&limit=50`, {
      headers,
      cache: "no-store",
    });
    if (!response.ok) return null;

    const body = (await response.json()) as {
      data?: ArticleListPayload;
    };
    const articles = body.data?.articles ?? [];

    return { articles, total: body.data?.total ?? articles.length };
  } catch {
    return null;
  }
}

async function loadInitialCategories(): Promise<string[] | undefined> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
  const headers = { "X-API-Key": process.env.API_KEY ?? "" };

  try {
    const response = await fetch(`${baseUrl}/api/articles/categories`, {
      headers,
      cache: "no-store",
    });
    if (!response.ok) return undefined;

    const body = (await response.json()) as { data?: string[] };
    return body.data ?? undefined;
  } catch {
    return undefined;
  }
}

export default async function ArticleListPage() {
  const [initialArticles, initialCategories] = await Promise.all([
    loadInitialArticles(),
    loadInitialCategories(),
  ]);

  return (
    <div className="w-full min-h-screen pb-16">
      <div className="mb-6 flex flex-col-reverse gap-3 border-b border-neutral-800/60 pb-4">
        <Breadcrumb />
        <Infographic showToggle={false} />
      </div>
      <div className="relative">
        <SimpleArticlePage
          initialArticles={initialArticles ?? undefined}
          initialCategories={initialCategories}
        />
      </div>
    </div>
  );
}
