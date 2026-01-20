import {
  useExperiences,
  useDeleteExperience,
} from "@/hooks/queries/experience.wrapper";
import { useState } from "react";
import { ExperiencesPageHook } from "@/interface/pages/experiences-page.interface";

export const useExperiencesPageHook = (): ExperiencesPageHook => {
  const { data, isLoading } = useExperiences(1, 100);
  const deleteExperience = useDeleteExperience();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteExperience.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  return {
    data: {
      experiences: data?.data || [],
      count: data?.count || 0,
      isLoading,
      deleteId,
    },
    handlers: {
      setDeleteId,
      handleDelete,
    },
  };
};
