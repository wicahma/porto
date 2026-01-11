import CircleArrow from "@/assets/svg/circle-arrow";
import Triangles from "@/assets/svg/triangles";
import { articleCardData } from "@/constants/dummies/article-card";
import MainCard from "@/components/atoms/ArticleCard";
import { useNavigationStore } from "@/store/navigationStore";

const ArticleCard = () => {
  const setPage = useNavigationStore((state) => state.setPage);

  const handleSetPage = () => {
    setPage("article");
  };
  return (
    <div className="relative overflow-hidden">
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
    </div>
  );
};

export default ArticleCard;
