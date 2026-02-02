import {
  getArticleBySlugAction,
  getRelatedArticlesAction,
} from "@/actions/article.actions";
import { Badge } from "@/components/atoms/chips/badge";
import { StorageHtmlContent } from "@/components/atoms/content/StorageHtmlContent";
import { StorageImg } from "@/components/atoms/images/StorageImage";
import ArticleFooter from "@/components/molecules/ArticleFooter";
import ArticleHeader from "@/components/molecules/ArticleHeader";
import ScrollableContainer from "@/components/organisms/wrapper/ScrollableContainer";
import { Calendar, Clock } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getArticleBySlugAction(slug);

  if (!result.success || !result.data) {
    return {
      title: "Article Not Found",
    };
  }

  const article = result.data;

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
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const result = await getArticleBySlugAction(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const article = result.data;

  const relatedResult = await getRelatedArticlesAction(
    article.id,
    article.category,
    3,
  );
  const relatedArticles = relatedResult.success ? relatedResult.data : [];

  return (
    <ScrollableContainer className="h-screen relative rounded-2xl overflow-y-auto">
      <ArticleHeader />

      <article className="max-w-350 mx-auto px-6 py-16 relative z-10">
        <div className="max-w-170 mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-400 pb-8 border-b border-neutral-800/50">
            <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 hover:bg-pink-500/30 transition-colors">
              {article.category}
            </Badge>
            <span className="text-neutral-700">•</span>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.created_at || ""}>
                {new Date(article.created_at || "").toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </time>
            </div>
            <span className="text-neutral-700">•</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.read_time}</span>
            </div>
          </div>
        </div>

        {article.image && (
          <div className="max-w-200 mx-auto mb-16">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <StorageImg
                src={article.image}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}

        {article.excerpt && (
          <div className="max-w-170 mx-auto mb-12">
            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed italic border-l-4 border-pink-500 pl-6 py-2">
              {article.excerpt}
            </p>
          </div>
        )}

        <div className="max-w-170 mx-auto">
          <StorageHtmlContent
            content={article.content}
            className="prose prose-invert prose-lg md:prose-xl max-w-none
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-12
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
              prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-pink-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-pink-400 prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
              prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-lg
              prose-ul:text-neutral-300 prose-ol:text-neutral-300
              prose-li:text-neutral-300 prose-li:my-2
              prose-blockquote:border-l-pink-500 prose-blockquote:text-neutral-400 prose-blockquote:italic prose-blockquote:pl-6
              prose-img:rounded-lg prose-img:shadow-lg"
          />

          {(article?.tags?.length || 0) > 0 && (
            <div className="mt-16 pt-8 border-t border-neutral-800/50">
              <div className="flex flex-wrap gap-2">
                {article?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-full text-sm font-medium hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {relatedArticles && relatedArticles.length > 0 && (
        <section className="max-w-350 mx-auto px-6 py-16 border-t border-neutral-800/50 relative z-10">
          <div className="max-w-170 mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              More to explore
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-300 mx-auto">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/article/${related.slug}`}
                className="group"
              >
                <article className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-pink-500/50 hover:shadow-xl transition-all duration-300">
                  {related.image && (
                    <div className="aspect-video overflow-hidden bg-neutral-800">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <Badge className="mb-3 bg-pink-500/20 text-pink-400 border-pink-500/30 text-xs">
                      {related.category}
                    </Badge>
                    <h3 className="text-white font-bold text-lg mb-3 line-clamp-2 group-hover:text-pink-400 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                      {related.excerpt}
                    </p>
                    <div className="text-xs text-neutral-500 font-medium">
                      {related.read_time}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      <ArticleFooter />
    </ScrollableContainer>
  );
}
