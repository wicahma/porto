"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiGetProjects,
  apiGetProjectById,
  apiCreateProject,
  apiUpdateProject,
  apiDeleteProject,
  apiGetProjectCount,
} from "@/lib/api/project.api";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "@/interface/entities/project.interface";
import { errorWrapper } from "@/utils/error.util";

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
      const result = await errorWrapper(apiGetProjects(page, limit));
      return result.data;
    },
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: async () => {
      const result = await errorWrapper(apiGetProjectById(id), false);
      return result.data;
    },
    enabled: !!id,
  });
}

export function useProjectCount() {
  return useQuery({
    queryKey: projectKeys.count(),
    queryFn: async () => {
      const result = await errorWrapper(apiGetProjectCount(), false);
      return result.data?.count ?? 0;
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create project"],
    mutationFn: (input: CreateProjectInput) =>
      errorWrapper(apiCreateProject(input)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.count() });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update project"],
    mutationFn: (input: UpdateProjectInput) =>
      errorWrapper(apiUpdateProject(input.id, input)),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      if (data?.data?.id) {
        queryClient.invalidateQueries({
          queryKey: projectKeys.detail(data.data.id),
        });
      }
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete project"],
    mutationFn: (id: string) => errorWrapper(apiDeleteProject(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.count() });
    },
  });
}
