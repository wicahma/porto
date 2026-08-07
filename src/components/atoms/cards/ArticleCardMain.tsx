import CircleArrow from "@/assets/svg/circle-arrow";
import Triangles from "@/assets/svg/triangles";
import MainCard from "@/components/atoms/cards/ArticleCard";
import ChipGroup from "@/components/molecules/chips/ChipGroup";
import { articleFilters } from "@/constants/dummies/article-filters";
import { useArticles } from "@/hooks/queries/article.wrapper";
import { mapArticleToCard } from "@/utils/mappers/article.mapper";
import { AnimatePresence, m } from "motion/react";
import { usePathname, useRouter } from "next/navigation";

const ArticleCard = () => {
  const { data: articlesData, isLoading } = useArticles(1, 5);
  const pathname = usePathname();
  const router = useRouter();
  const articles = articlesData as any;
  const mappedArticles =
    (((articles as any)?.articles || []) as any[]).map(mapArticleToCard) || [];
  console.log("mappedArticles:", mappedArticles);

  const handleSetPage = () => {
    window.history.replaceState(null, "", `/article`);
    router.prefetch("/article");
  };

  return (
    <AnimatePresence mode="wait">
      {pathname === "/article" ? (
        <m.div
          key="article-detail"
          className="relative p-3 rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="absolute -z-10 rounded-full top-0 right-10 -translate-y-1/2 translate-x-1/2 w-full aspect-square bg-[#FF8FC0]" />

          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <Triangles />
              <h3 className="text-3xl font-semibold">Articles</h3>
            </div>
            <div className="flex gap-2 items-center text-[var(--background)] font-semibold text-sm mr-5">
              <span>See more there</span>
              <CircleArrow />
            </div>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search some article..."
              className="w-full px-5 py-3 bg-neutral-900 border-2 border-[#FF8FC0] rounded-full text-neutral-400 placeholder:text-neutral-600 focus:outline-none focus:border-[#FF8FC0] transition-colors"
            />
          </div>

          <ChipGroup
            initialChips={articleFilters}
            activeColor="bg-pink-400"
            multiSelect={true}
          />
        </m.div>
      ) : (
        <m.div
          key="article-summary"
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="absolute -z-10 rounded-full top-0 right-10 -translate-y-1/2 translate-x-1/2 w-full aspect-square bg-[#FF8FC0]" />
          <button
            onClick={handleSetPage}
            className="flex justify-between items-center cursor-pointer w-full"
          >
            <div className="flex items-center gap-3">
              <Triangles />
              <h3 className="text-3xl font-semibold">Articles</h3>
            </div>
            <div className="flex gap-2 items-center text-[var(--background)] font-semibold text-sm mr-5">
              <span>See more</span>
              <CircleArrow />
            </div>
          </button>
          <div className="mt-5">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-24 bg-neutral-800 animate-pulse rounded-xl"
                  />
                ))}
              </div>
            ) : mappedArticles.length > 0 ? (
              mappedArticles.map((article: any) => (
                <MainCard key={article.id} article={article} />
              ))
            ) : (
              <div className="text-center text-neutral-500 py-10">
                No articles found
              </div>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleCard;
