"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiGetArticles,
  apiGetArticleById,
  apiGetArticleBySlug,
  apiGetRelatedArticles,
  apiCreateArticle,
  apiUpdateArticle,
  apiDeleteArticle,
  apiGetArticleCount,
} from "@/lib/api/article.api";
import {
  CreateArticleInput,
  UpdateArticleInput,
} from "@/interface/entities/article.interface";
import { errorWrapper } from "@/utils/error.util";
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
      const result = await errorWrapper(apiGetArticles(page, limit));
      return result.data;
    },
  });
}

export function useArticle(id: string) {
  return useQuery({
    queryKey: articleKeys.detail(id),
    queryFn: async () => {
      const result = await errorWrapper(apiGetArticleById(id), false);
      return result.data;
    },
    enabled: !!id,
  });
}

export function useArticleBySlug(slug: string) {
  return useQuery({
    queryKey: articleKeys.slug(slug),
    queryFn: async () => {
      const result = await errorWrapper(apiGetArticleBySlug(slug), false);
      return result.data;
    },
    enabled: !!slug,
  });
}

export function useRelatedArticles(
  articleId: string,
  category: string,
  limit: number = 5,
) {
  return useQuery({
    queryKey: articleKeys.related(articleId, category),
    queryFn: async () => {
      const result = await errorWrapper(
        apiGetRelatedArticles(articleId, category, limit),
        false,
      );
      return result.data;
    },
    enabled: !!articleId && !!category,
  });
}

export function useArticleCount() {
  return useQuery({
    queryKey: articleKeys.count(),
    queryFn: async () => {
      const result = await errorWrapper(apiGetArticleCount(), false);
      return result.data?.count ?? 0;
    },
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create article"],
    mutationFn: (input: CreateArticleInput) =>
      errorWrapper(apiCreateArticle(input)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: articleKeys.count() });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update article"],
    mutationFn: (input: UpdateArticleInput) =>
      errorWrapper(apiUpdateArticle(input.id, input)),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
      if (data?.data?.id) {
        queryClient.invalidateQueries({
          queryKey: articleKeys.detail(data.data.id),
        });
        queryClient.invalidateQueries({
          queryKey: articleKeys.slug(data.data.slug),
        });
      }
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete article"],
    mutationFn: (id: string) => errorWrapper(apiDeleteArticle(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: articleKeys.count() });
    },
  });
}
