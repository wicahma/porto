import CircleArrow from "@/assets/svg/circle-arrow";
import Triangles from "@/assets/svg/triangles";
import { articleCardData } from "@/constants/dummies/article-card";
import MainCard from "@/components/atoms/ArticleCard";
import { useNavigationStore } from "@/store/navigationStore";
import ChipGroup from "@/components/molecules/chips/ChipGroup";
import { articleFilters } from "@/constants/dummies/article-filters";
import { m, AnimatePresence } from "motion/react";

const ArticleCard = () => {
  const setPage = useNavigationStore((state) => state.setPage);
  const detailPage = useNavigationStore((state) => state.detailPage);

  const handleSetPage = () => {
    setPage("article");
  };

  return (
    <AnimatePresence mode="wait">
      {detailPage === "article" ? (
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
            {articleCardData.map((article) => (
              <MainCard key={article.id} article={article} />
            ))}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleCard;
