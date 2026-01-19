"use client";

import Batik from "@/assets/svg/batik";
import Br from "@/assets/svg/br";
import Skeleton from "@/components/atoms/Skeleton";
import { useArticles } from "@/hooks/queries/useArticles";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import RenderIf from "@/utils/helper/render-if";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";

const ArticleDetailSkeleton = () => {
  return (
    <div className="space-y-0 md:pt-10 pb-20">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="mt-4">
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="w-24 h-7" />
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-1 h-1 rounded-full" />
            <Skeleton className="w-16 h-5" />
          </div>
          <Skeleton className="w-full h-16 mb-6" />
          <div className="flex flex-wrap gap-3 mb-4">
            <Skeleton className="w-16 h-5" />
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-24 h-5" />
          </div>
          <Br />
        </div>
      ))}
    </div>
  );
};

interface ArticleDetailProps {
  skipAnimation?: boolean;
}

const ArticleDetail = ({ skipAnimation = false }: ArticleDetailProps) => {
  const scrollRef = useSmoothScroll();
  const { data, isLoading, isError } = useArticles(1, 100);

  return (
    <m.div
      ref={scrollRef}
      initial={skipAnimation ? false : { opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-0 md:h-[calc(100vh-10rem)] md:overflow-y-auto mask-color-card-top md:pt-10 pb-20"
    >
      <RenderIf condition={isLoading}>
        <ArticleDetailSkeleton />
      </RenderIf>

      <RenderIf condition={Boolean(!isError && data?.data)}>
        <p className="text-neutral-400">Failed to load articles</p>
      </RenderIf>

      <RenderIf condition={Boolean(!isLoading && !isError && data?.data)}>
        <div className="space-y-0">
          <AnimatePresence mode="popLayout">
            {data?.data?.map((article, index) => (
              <Link key={article.id} href={`/article/${article.slug}`}>
                <m.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="mt-4 hover:bg-neutral-900/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-pink-500/80 text-white rounded-full text-xs font-semibold uppercase">
                      {article.category}
                    </span>
                    <span className="text-sm text-neutral-400">
                      {new Date(article?.created_at ?? "").toLocaleDateString()}
                    </span>
                    <span className="text-sm text-neutral-400">•</span>
                    <span className="text-sm text-neutral-400">
                      {article.read_time}
                    </span>
                  </div>

                  <p className="text-neutral-400 leading-relaxed mb-6">
                    {article.excerpt || article.title}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {article?.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Br />
                </m.article>
              </Link>
            ))}
          </AnimatePresence>
        </div>
      </RenderIf>

      <div className="flex justify-center py-8">
        <span className="text-xs text-neutral-500">
          Created with ❤️ by Teguh
        </span>
      </div>

      <Batik />
    </m.div>
  );
};

export default ArticleDetail;
