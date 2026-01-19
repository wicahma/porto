import { createClient } from "@/lib/supabase/server";
import {
  Article,
  CreateArticleInput,
  UpdateArticleInput,
} from "@/interface/entities/article.interface";

export class ArticleService {
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  static async getAllArticles(
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: Article[]; count: number }> {
    const supabase = await createClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("articles")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return { data: data as Article[], count: count || 0 };
  }

  static async getArticleById(id: string): Promise<Article | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as Article;
  }

  static async getArticleBySlug(slug: string): Promise<Article | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      throw error;
    }

    return data as Article;
  }

  static async getRelatedArticles(
    articleId: string,
    category: string,
    limit: number = 5
  ): Promise<Article[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("category", category)
      .neq("id", articleId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data;
  }

  static async createArticle(input: CreateArticleInput): Promise<Article> {
    const supabase = await createClient();

    const slug = input.slug || this.generateSlug(input.title);

    const existing = await this.getArticleBySlug(slug);
    if (existing) {
      throw new Error(`Article with slug "${slug}" already exists`);
    }

    const { data, error } = await supabase
      .from("articles")
      .insert({
        ...input,
        slug,
        meta_title: input.meta_title || input.title,
        meta_description: input.meta_description || input.excerpt,
        og_image: input.og_image || input.image,
      })
      .select()
      .single();

    if (error) throw error;

    return data as Article;
  }

  static async updateArticle(input: UpdateArticleInput): Promise<Article> {
    const supabase = await createClient();

    if (input.slug) {
      const existing = await this.getArticleBySlug(input.slug);
      if (existing && existing.id !== input.id) {
        throw new Error(`Article with slug "${input.slug}" already exists`);
      }
    }

    const { id, ...updateData } = input;

    const { data, error } = await supabase
      .from("articles")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Article;
  }

  static async deleteArticle(id: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from("articles").delete().eq("id", id);

    if (error) throw error;
  }

  static async getCount(): Promise<number> {
    const supabase = await createClient();

    const { count, error } = await supabase
      .from("articles")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return count || 0;
  }
}
