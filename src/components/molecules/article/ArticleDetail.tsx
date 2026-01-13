"use client";

import Batik from "@/assets/svg/batik";
import Br from "@/assets/svg/br";
import { articleCardData } from "@/constants/dummies/article-card";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { m } from "motion/react";

const ArticleDetail = () => {
  const scrollRef = useSmoothScroll();

  return (
    <m.div
      ref={scrollRef}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-0 md:h-[calc(100vh-10rem)] md:overflow-y-auto md:mask-color-top md:pt-10 pb-20"
    >
      <div className="space-y-0">
        {articleCardData.map((article, index) => (
          <m.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="mt-4 hover:bg-neutral-900/20 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 bg-pink-500/80 text-white rounded-full text-xs font-semibold uppercase">
                {article.category}
              </span>
              <span className="text-sm text-neutral-400">{article.date}</span>
              <span className="text-sm text-neutral-400">•</span>
              <span className="text-sm text-neutral-400">
                {article.readTime}
              </span>
            </div>

            <p className="text-neutral-400 leading-relaxed mb-6">
              {article.title} Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud e...
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer">
                NextJs
              </span>
              <span className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer">
                ReactJs
              </span>
              <span className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer">
                Postgresql
              </span>
            </div>
            <Br />
          </m.article>
        ))}
      </div>

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
