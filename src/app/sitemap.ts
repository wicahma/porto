import { MetadataRoute } from "next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getArticles() {
  const res = await fetch(`${API_BASE_URL}/api/articles?page=1&limit=1000`, {
    headers: { "X-API-Key": process.env.API_KEY || "" },
  });
  const body = await res.json();
  return body.data?.articles || [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const articles = await getArticles();

    const articleEntries: MetadataRoute.Sitemap = (articles as any[]).map(
      (article: any) => ({
        url: `${baseUrl}/article/${article.slug}`,
        lastModified: new Date(
          article.updated_at || article.created_at || new Date(),
        ),
        changeFrequency: "weekly",
        priority: 0.7,
      }),
    );

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
