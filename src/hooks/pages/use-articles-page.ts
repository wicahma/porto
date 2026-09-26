"use client";
import { useArticles, useDeleteArticle } from "@/hooks/queries/article.wrapper";
import { ArticlesPageHook } from "@/interface/pages/articles-page.interface";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiDeleteFiles } from "@/lib/api/storage.api";
import { collectStorageKeys } from "@/utils/helper/storage";

export const useArticlesPage = (): ArticlesPageHook => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useArticles(page, 20);
  const deleteArticle = useDeleteArticle();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const totalPages = (data as any)?.total_pages || 1;

  // Deleting the last row of the last page would strand the user on an empty page.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const handleDelete = async () => {
    if (!deleteId) return;
    const target = ((data as any)?.articles || []).find(
      (a: any) => a.id === deleteId,
    );
    try {
      await deleteArticle.mutateAsync(deleteId);
      if (target) {
        const paths = collectStorageKeys(
          target.image,
          target.content,
          target.og_image,
        );
        if (paths.length) await apiDeleteFiles(paths).catch(() => {});
      }
      toast.success("Article deleted successfully!");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete article");
    }
  };

  return {
    data: {
      articles: (data as any)?.articles || [],
      count: (data as any)?.total || 0,
      page: (data as any)?.page || page,
      totalPages,
      isLoading,
      deleteId,
    },
    state: {
      isDeleting: deleteArticle.isPending,
    },
    handlers: {
      setPage,
      setDeleteId,
      handleDelete,
    },
  };
};
