"use server";

import { ArticleService } from "@/services/article.service";
import {
  CreateArticleInput,
  UpdateArticleInput,
} from "@/interface/entities/article.interface";
import { revalidatePath } from "next/cache";

export async function getArticlesAction(page: number = 1, limit: number = 10) {
  try {
    const result = await ArticleService.getAllArticles(page, limit);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch articles",
    };
  }
}

export async function getArticleByIdAction(id: string) {
  try {
    const article = await ArticleService.getArticleById(id);
    return { success: true, data: article };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch article",
    };
  }
}

export async function getArticleBySlugAction(slug: string) {
  try {
    const article = await ArticleService.getArticleBySlug(slug);
    return { success: true, data: article };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch article",
    };
  }
}

export async function getRelatedArticlesAction(
  articleId: string,
  category: string,
  limit: number = 5,
) {
  try {
    const articles = await ArticleService.getRelatedArticles(
      articleId,
      category,
      limit,
    );
    return { success: true, data: articles };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch related articles",
    };
  }
}

export async function createArticleAction(input: CreateArticleInput) {
  try {
    console.log("Creating article with input:", input);
    const article = await ArticleService.createArticle(input);
    revalidatePath("/admin/articles");
    revalidatePath("/article");
    return { success: true, data: article };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create article",
    };
  }
}

export async function updateArticleAction(input: UpdateArticleInput) {
  try {
    const article = await ArticleService.updateArticle(input);
    revalidatePath("/admin/articles");
    revalidatePath(`/article/${article.slug}`);
    return { success: true, data: article };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update article",
    };
  }
}

export async function deleteArticleAction(id: string) {
  try {
    await ArticleService.deleteArticle(id);
    revalidatePath("/admin/articles");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete article",
    };
  }
}

export async function getArticleCountAction() {
  try {
    const count = await ArticleService.getCount();
    return { success: true, data: count };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get article count",
    };
  }
}
