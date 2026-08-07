"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiGetExperiences,
  apiGetExperienceById,
  apiCreateExperience,
  apiUpdateExperience,
  apiDeleteExperience,
  apiGetExperienceCount,
} from "@/lib/api/experience.api";
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "@/interface/entities/experience.interface";
import { errorWrapper } from "@/utils/error.util";

export const experienceKeys = {
  all: ["experiences"] as const,
  lists: () => [...experienceKeys.all, "list"] as const,
  list: (page: number, limit: number) =>
    [...experienceKeys.lists(), { page, limit }] as const,
  details: () => [...experienceKeys.all, "detail"] as const,
  detail: (id: string) => [...experienceKeys.details(), id] as const,
  count: () => [...experienceKeys.all, "count"] as const,
};

export function useExperiences(page: number = 1, limit: number = 50) {
  return useQuery({
    queryKey: experienceKeys.list(page, limit),
    queryFn: async () => {
      const result = await errorWrapper(apiGetExperiences(page, limit));
      return result.data;
    },
  });
}

export function useExperience(id: string) {
  return useQuery({
    queryKey: experienceKeys.detail(id),
    queryFn: async () => {
      const result = await errorWrapper(apiGetExperienceById(id), false);
      return result.data;
    },
    enabled: !!id,
  });
}

export function useExperienceCount() {
  return useQuery({
    queryKey: experienceKeys.count(),
    queryFn: async () => {
      const result = await errorWrapper(apiGetExperienceCount(), false);
      return result.data?.count ?? 0;
    },
  });
}

export function useCreateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create experience"],
    mutationFn: (input: CreateExperienceInput) =>
      errorWrapper(apiCreateExperience(input)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: experienceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: experienceKeys.count() });
    },
  });
}

export function useUpdateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update experience"],
    mutationFn: (input: UpdateExperienceInput) =>
      errorWrapper(apiUpdateExperience(input.id, input)),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: experienceKeys.lists() });
      if (data?.data?.id) {
        queryClient.invalidateQueries({
          queryKey: experienceKeys.detail(data.data.id),
        });
      }
    },
  });
}

export function useDeleteExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete experience"],
    mutationFn: (id: string) => errorWrapper(apiDeleteExperience(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: experienceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: experienceKeys.count() });
    },
  });
}
