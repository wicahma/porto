import { ArticleCard as ArticleCardType } from "@/constants/dummies/article-card";
import { StorageImage } from "../images/StorageImage";
import Link from "next/link";

interface ArticleCardProps {
  article: ArticleCardType;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="flex gap-3 items-center mb-5 cursor-pointer"
    >
      <div className="grow w-[30%]">
        <StorageImage
          src={article.image}
          alt={article.title}
          className="border-4 border-[#383838] bg-[#131313] rounded-xl w-full object-cover aspect-square"
        />
      </div>
      <div className="shrink w-fit">
        <h4 className="line-clamp-2 text-2xl font-bold leading-6">
          {article.title}
        </h4>
        <p className="space-x-4 font-semibold text-xs mt-3 line-clamp-1">
          <span>{article.category}</span>
          <span>{article.date}</span>
          <span>{article.readTime}</span>
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;
