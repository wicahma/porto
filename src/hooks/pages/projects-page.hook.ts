"use client";
import { useProjects, useDeleteProject } from "@/hooks/queries/project.wrapper";
import { useState } from "react";
import toast from "react-hot-toast";

export const useProjectsPageHooks = () => {
  const { data, isLoading } = useProjects(1, 100);
  const deleteProject = useDeleteProject();
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
      try {
        await deleteProject.mutateAsync(deleteId);
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
      isLoading,
      deleteId,
    },
    state: {
      setDeleteId,
    },
    handlers: {
      handleDelete,
      deleteProject,
    },
  };
};
