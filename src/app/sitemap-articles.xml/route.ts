import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

async function getArticles() {
  const res = await fetch(`${API_BASE_URL}/api/articles?page=1&limit=1000`, {
    headers: { "X-API-Key": process.env.API_KEY || "" },
  });
  const body = await res.json();
  return body.data?.articles || [];
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    // Get all published articles
    const articles = await getArticles();

    // Build XML sitemap for articles
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${(articles as any[])
  .map(
    (article: any) => `  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <lastmod>${new Date(article.updated_at || article.created_at || new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>${
      article.image
        ? `
    <image:image>
      <image:loc>${article.image}</image:loc>
      <image:title>${escapeXml(article.title)}</image:title>
    </image:image>`
        : ""
    }
  </url>`,
  )
  .join("\n")}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating article sitemap:", error);

    // Return empty sitemap if there's an error
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=60",
      },
    });
  }
}

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
