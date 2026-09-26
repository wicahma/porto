import {
  useExperiences,
  useDeleteExperience,
} from "@/hooks/queries/experience.wrapper";
import { useEffect, useState } from "react";
import { ExperiencesPageHook } from "@/interface/pages/experiences-page.interface";

export const useExperiencesPage = (): ExperiencesPageHook => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useExperiences(page, 20);
  const deleteExperience = useDeleteExperience();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const totalPages = (data as any)?.total_pages || 1;

  // Deleting the last row of the last page would strand the user on an empty page.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteExperience.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  return {
    data: {
      experiences: (data as any)?.experiences || [],
      count: (data as any)?.total || 0,
      page: (data as any)?.page || page,
      totalPages,
      isLoading,
      deleteId,
    },
    handlers: {
      setDeleteId,
      setPage,
      handleDelete,
    },
  };
};
