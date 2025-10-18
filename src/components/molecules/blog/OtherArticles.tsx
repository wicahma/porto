"use client";
import { useColorWipeNavigation } from "@/components/atoms/ColorWipeTransition";
import { TBlogPost } from "@/interface/app/blog";
import { m } from "motion/react";
import { FC } from "react";

interface OtherArticlesProps {
  articles: TBlogPost[];
  currentArticleId: number;
}

const OtherArticles: FC<OtherArticlesProps> = ({
  articles,
  currentArticleId,
}) => {
  const { navigateWithTransition } = useColorWipeNavigation();

  const otherArticles = articles
    .filter((article) => article.id !== currentArticleId)
    .slice(0, 5);

  const handleArticleClick = (id: number) => {
    navigateWithTransition(`/blog/${id}`, {
      colors: ["#fb923c", "#1A1A1A", "#111111", "#fb923c"],
      direction: "left",
    });
  };

  return (
    <m.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="sticky top-20 group/parent"
    >
      <div className="mb-6 opacity-20 group-hover/parent:opacity-100 transition-opacity duration-300">
        <h3 className="text-xl font-bold text-white mb-2">Other Articles</h3>
        <div className="h-1 w-12 bg-neutral-400 rounded-full" />
      </div>

      <div className="space-y-4 group-hover/parent:opacity-100 transition-opacity duration-300  opacity-20">
        {otherArticles.map((article, index) => (
          <m.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            onClick={() => handleArticleClick(article.id)}
            className="group cursor-pointer"
          >
            <div className="relative px-4 py-3 rounded-lg transition-all duration-300 hover:bg-neutral-900/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-orange-400/10 text-orange-400 rounded-full uppercase tracking-wider">
                  {article.category}
                </span>
                {article.isNew && (
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-red-600 text-white rounded-full">
                    NEW
                  </span>
                )}
              </div>

              <h4 className="text-sm font-semibold text-white mb-2 leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">
                {article.title}
              </h4>

              <div className="flex items-center gap-2 text-xs text-neutral-600">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>

              <m.div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-0 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:h-5 transition-all duration-300" />
            </div>
          </m.article>
        ))}
      </div>

      <m.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() =>
          navigateWithTransition("/blog", {
            colors: ["#fb923c", "#1A1A1A"],
            direction: "right",
          })
        }
        className="mt-6 w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-orange-400 rounded-lg text-sm font-semibold text-neutral-400 hover:text-orange-400 transition-all duration-300"
      >
        View All Articles →
      </m.button>
    </m.div>
  );
};

export default OtherArticles;
