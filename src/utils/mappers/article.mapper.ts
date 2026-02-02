import { Article } from "@/interface/entities/article.interface";
import { ArticleCard } from "@/constants/dummies/article-card";

export const mapArticleToCard = (article: Article): ArticleCard => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const date = new Date(article.created_at || "");
  const time = date
    .toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    .replace(":", ".");
  const dayDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedDate = `${time} - ${dayDate}`;

  return {
    id: article.id,
    image: article.image,
    title: article.title,
    category: article.category,
    date: formattedDate,
    readTime: article.read_time,
    slug: article.slug,
  };
};
