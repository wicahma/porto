"use client";

import { StorageHtmlContent } from "@/components/atoms/content/StorageHtmlContent";
import { StorageImg } from "@/components/atoms/images/StorageImage";
import ArticleFooter from "@/components/molecules/ArticleFooter";
import ArticleHeader from "@/components/molecules/ArticleHeader";
import ScrollableContainer from "@/components/organisms/wrapper/ScrollableContainer";
import { formatArticleDate } from "@/components/molecules/article/ArticlePreviewCard";
import { useArticlePage } from "@/hooks/pages/use-article-page";
import { RenderIf } from "@/utils/helper/render-if";
import Link from "next/link";

const ArticleDetailPage = ({
  article,
  related,
}: Readonly<{
  article: Record<string, any> | null;
  related: any[];
}>) => {
  const {
    article: data,
    relatedArticles,
    formattedDate,
  } = useArticlePage(article, related);

  return (
    <ScrollableContainer className="h-screen relative rounded-2xl overflow-y-auto">
      <ArticleHeader />

      <article className="max-w-350 mx-auto px-6 py-16 relative z-10" data-section="article">
        <div className="max-w-170 mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            {data?.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 pb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--signal)]">
              {data?.category}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500">
              {formatArticleDate(data?.created_at)} · {data?.read_time}
            </span>
          </div>
        </div>

        <RenderIf condition={Boolean(data?.image)}>
          <div className="max-w-200 mx-auto mb-16">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <StorageImg
                src={data?.image}
                alt={data?.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </RenderIf>

        <RenderIf condition={Boolean(data?.excerpt)}>
          <div className="max-w-170 mx-auto mb-12">
            <p className="border-l-2 border-[var(--signal)] py-2 pl-6 text-xl italic leading-relaxed text-neutral-300 md:text-2xl">
              {data?.excerpt}
            </p>
          </div>
        </RenderIf>

        <div className="max-w-170 mx-auto">
          <StorageHtmlContent
            content={data?.content}
            className="prose prose-invert prose-lg md:prose-xl max-w-none
              prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-12
              prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10
              prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
              prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[var(--signal)] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-[var(--caution)] prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
              prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-lg
              prose-ul:text-neutral-300 prose-ol:text-neutral-300
              prose-li:text-neutral-300 prose-li:my-2
              prose-blockquote:border-l-[var(--signal)] prose-blockquote:text-neutral-400 prose-blockquote:italic prose-blockquote:pl-6
              prose-img:rounded-sm prose-img:shadow-lg"
          />

          <RenderIf condition={(data?.tags?.length ?? 0) > 0}>
            <div className="mt-16 pt-8 border-t border-neutral-800/50">
              <div className="flex flex-wrap gap-2">
                {data?.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="border border-[var(--line)] px-2 py-1 font-mono text-[11px] text-neutral-400 transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </RenderIf>
        </div>
      </article>

      <RenderIf condition={relatedArticles.length > 0}>
        <section className="max-w-350 mx-auto px-6 py-16 border-t border-neutral-800/50 relative z-10">
          <div className="max-w-170 mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              More to explore
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-300 mx-auto">
            {relatedArticles.map((relatedItem: any) => (
              <Link
                key={relatedItem.id}
                href={`/article/${relatedItem.slug}`}
                className="group"
              >
                <article className="border border-[var(--line)] bg-[var(--ink-850)] overflow-hidden transition-colors duration-300 hover:border-[var(--line-strong)]">
                  <RenderIf condition={Boolean(relatedItem.image)}>
                    <div className="aspect-video overflow-hidden bg-neutral-800">
                      <img
                        src={relatedItem.image}
                        alt={relatedItem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </RenderIf>
                  <div className="p-6">
                    <span className="spec-label mb-3 inline-block border border-[var(--line)] px-2 py-0.5">
                      {relatedItem.category}
                    </span>
                    <h3 className="text-white font-bold text-lg mb-3 line-clamp-2 group-hover:text-[var(--signal)] transition-colors">
                      {relatedItem.title}
                    </h3>
                    <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                      {relatedItem.excerpt}
                    </p>
                    <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-500">
                      {relatedItem.read_time}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </RenderIf>

      <ArticleFooter />
    </ScrollableContainer>
  );
};

export default ArticleDetailPage;
