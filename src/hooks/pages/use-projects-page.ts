"use client";
import { useProjects, useDeleteProject } from "@/hooks/queries/project.wrapper";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiDeleteFiles } from "@/lib/api/storage.api";
import { collectStorageKeys } from "@/utils/helper/storage";

export const useProjectsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useProjects(page, 20);
  const deleteProject = useDeleteProject();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const totalPages = (data as any)?.total_pages || 1;

  // Deleting the last row of the last page would strand the user on an empty page.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // Map year to number for ProjectTableRow
  const projects = ((data as any)?.projects || []).map((project: any) => ({
    ...project,
    year:
      typeof project.year === "string"
        ? parseInt(project.year, 10)
        : project.year,
    tags: Array.isArray(project.tags) ? project.tags : [],
    link: project.link ?? undefined,
  }));

  const handleDelete = async () => {
    if (deleteId) {
      const target = ((data as any)?.projects || []).find(
        (p: any) => p.id === deleteId,
      );
      try {
        await deleteProject.mutateAsync(deleteId);
        if (target) {
          const paths = collectStorageKeys(target.image);
          if (paths.length) await apiDeleteFiles(paths).catch(() => {});
        }
        toast.success("Project deleted successfully!");
        setDeleteId(null);
      } catch {
        toast.error("Failed to delete project");
      }
    }
  };

  return {
    data: {
      projects,
      count: (data as any)?.total || 0,
      page: (data as any)?.page || page,
      totalPages,
      isLoading,
      deleteId,
    },
    state: {
      setDeleteId,
      setPage,
    },
    handlers: {
      handleDelete,
      deleteProject,
    },
  };
};
