"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getExperiencesAction,
  getExperienceByIdAction,
  createExperienceAction,
  updateExperienceAction,
  deleteExperienceAction,
  getExperienceCountAction,
} from "@/actions/experience.actions";
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "@/interface/entities/experience.interface";
import toast from "react-hot-toast";

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
      const result = await getExperiencesAction(page, limit);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useExperience(id: string) {
  return useQuery({
    queryKey: experienceKeys.detail(id),
    queryFn: async () => {
      const result = await getExperienceByIdAction(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!id,
  });
}

export function useExperienceCount() {
  return useQuery({
    queryKey: experienceKeys.count(),
    queryFn: async () => {
      const result = await getExperienceCountAction();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });
}

export function useCreateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateExperienceInput) => {
      const result = await createExperienceAction(input);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: experienceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: experienceKeys.count() });
      toast.success("Experience created successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create experience");
    },
  });
}

export function useUpdateExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateExperienceInput) => {
      const result = await updateExperienceAction(input);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: experienceKeys.lists() });
      if (data) {
        queryClient.invalidateQueries({
          queryKey: experienceKeys.detail(data.id),
        });
      }
      toast.success("Experience updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update experience");
    },
  });
}

export function useDeleteExperience() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteExperienceAction(id);
      if (!result.success) throw new Error(result.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: experienceKeys.lists() });
      queryClient.invalidateQueries({ queryKey: experienceKeys.count() });
      toast.success("Experience deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete experience");
    },
  });
}
