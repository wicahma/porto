import {
  apiGetArticleBySlug,
  apiGetRelatedArticles,
} from "@/lib/api/article.api";
import ArticleDetailPage from "@/components/organisms/ArticleDetailPage";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const result = await apiGetArticleBySlug(slug);
    if (result.status === "error" || !result.data) {
      return { title: "Article" };
    }
    const article = result.data as Record<string, any>;
    return {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt,
      keywords: article.meta_keywords,
      openGraph: {
        title: article.meta_title || article.title,
        description: article.meta_description || article.excerpt || undefined,
        images: article.og_image ? [article.og_image] : [article.image],
        type: "article",
        publishedTime: article.created_at || undefined,
        modifiedTime: article.updated_at || undefined,
        tags: article.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: article.meta_title || article.title,
        description: article.meta_description || article.excerpt || undefined,
        images: article.og_image ? [article.og_image] : [article.image],
      },
    };
  } catch {
    return { title: "Article" };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  let article: Record<string, any> | null = null;
  let related: any[] = [];

  try {
    const result = await apiGetArticleBySlug(slug);
    if (result.status !== "error" && result.data) {
      article = result.data as Record<string, any>;
    }
  } catch {
    article = null;
  }

  if (!article) {
    notFound();
  }

  try {
    const relatedResult = await apiGetRelatedArticles(
      article.id,
      article.category,
      3,
    );
    if (relatedResult.status !== "error") {
      related = (relatedResult.data || []) as any[];
    }
  } catch {
    // related articles are optional
  }

  return <ArticleDetailPage article={article} related={related} />;
}
