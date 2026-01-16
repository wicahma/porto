"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getArticlesAction,
  getArticleByIdAction,
  getArticleBySlugAction,
  getRelatedArticlesAction,
  createArticleAction,
  updateArticleAction,
  deleteArticleAction,
  getArticleCountAction,
} from "@/actions/article.actions";
import {
  CreateArticleInput,
  UpdateArticleInput,
} from "@/interface/entities/article.interface";
import toast from "react-hot-toast";

export const articleKeys = {
  all: ["articles"] as const,
  lists: () => [...articleKeys.all, "list"] as const,
  list: (page: number, limit: number) =>
    [...articleKeys.lists(), { page, limit }] as const,
  details: () => [...articleKeys.all, "detail"] as const,
  detail: (id: string) => [...articleKeys.details(), id] as const,
  slug: (slug: string) => [...articleKeys.all, "slug", slug] as const,
  related: (articleId: string, category: string) =>
    [...articleKeys.all, "related", articleId, category] as const,
  count: () => [...articleKeys.all, "count"] as const,
};

export function useArticles(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: articleKeys.list(page, limit),
    queryFn: async () => {
      const result = await getArticlesAction(page, limit);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useArticle(id: string) {
  return useQuery({
    queryKey: articleKeys.detail(id),
    queryFn: async () => {
      const result = await getArticleByIdAction(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

export function useArticleBySlug(slug: string) {
  return useQuery({
    queryKey: articleKeys.slug(slug),
    queryFn: async () => {
      const result = await getArticleBySlugAction(slug);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!slug,
  });
}

export function useRelatedArticles(
  articleId: string,
  category: string,
  limit: number = 5
) {
  return useQuery({
    queryKey: articleKeys.related(articleId, category),
    queryFn: async () => {
      const result = await getRelatedArticlesAction(articleId, category, limit);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!articleId && !!category,
  });
}

export function useArticleCount() {
  return useQuery({
    queryKey: articleKeys.count(),
    queryFn: async () => {
      const result = await getArticleCountAction();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateArticleInput) => {
      const result = await createArticleAction(input);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: articleKeys.count() });
      toast.success("Article created successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create article");
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateArticleInput) => {
      const result = await updateArticleAction(input);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
      if (data) {
        queryClient.invalidateQueries({
          queryKey: articleKeys.detail(data.id),
        });
        queryClient.invalidateQueries({
          queryKey: articleKeys.slug(data.slug),
        });
      }
      toast.success("Article updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update article");
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteArticleAction(id);
      if (!result.success) throw new Error(result.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: articleKeys.count() });
      toast.success("Article deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete article");
    },
  });
}
