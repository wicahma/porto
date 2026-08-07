import { useMemo } from "react"

export const useArticlePage = (
  article: Record<string, any> | null,
  related: any[],
) => {
  return useMemo(() => {
    const formattedDate = article?.created_at
      ? new Date(article.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : ""

    return {
      article,
      relatedArticles: related || [],
      formattedDate,
    }
  }, [article, related])
}
