"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProjectsAction,
  getProjectByIdAction,
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
  getProjectCountAction,
} from "@/actions/project.actions";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "@/interface/entities/project.interface";
import toast from "react-hot-toast";

export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (page: number, limit: number) =>
    [...projectKeys.lists(), { page, limit }] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  count: () => [...projectKeys.all, "count"] as const,
};

export function useProjects(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: projectKeys.list(page, limit),
    queryFn: async () => {
      const result = await getProjectsAction(page, limit);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: async () => {
      const result = await getProjectByIdAction(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

export function useProjectCount() {
  return useQuery({
    queryKey: projectKeys.count(),
    queryFn: async () => {
      const result = await getProjectCountAction();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateProjectInput) => {
      const result = await createProjectAction(input);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.count() });
      toast.success("Project created successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create project");
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateProjectInput) => {
      const result = await updateProjectAction(input);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      if (data) {
        queryClient.invalidateQueries({
          queryKey: projectKeys.detail(data.id),
        });
      }
      toast.success("Project updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update project");
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteProjectAction(id);
      if (!result.success) throw new Error(result.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.count() });
      toast.success("Project deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete project");
    },
  });
}
