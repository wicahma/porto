import { MetadataRoute } from "next";
import { ArticleService } from "@/services/article.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const { data: articles } = await ArticleService.getAllArticles(1, 1000);

    const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${baseUrl}/article/${article.slug}`,
      lastModified: new Date(
        article.updated_at || article.created_at || new Date(),
      ),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/article`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/experience`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/project`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ];

    return [...staticPages, ...articleEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/article`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/experience`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/project`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ];
  }
}
