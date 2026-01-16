"use server";

import { ExperienceService } from "@/services/experience.service";
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from "@/interface/entities/experience.interface";
import { revalidatePath } from "next/cache";

export async function getExperiencesAction(
  page: number = 1,
  limit: number = 50
) {
  try {
    const result = await ExperienceService.getAllExperiences(page, limit);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch experiences",
    };
  }
}

export async function getExperienceByIdAction(id: string) {
  try {
    const experience = await ExperienceService.getExperienceById(id);
    return { success: true, data: experience };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch experience",
    };
  }
}

export async function createExperienceAction(input: CreateExperienceInput) {
  try {
    const experience = await ExperienceService.createExperience(input);
    revalidatePath("/admin/experiences");
    return { success: true, data: experience };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create experience",
    };
  }
}

export async function updateExperienceAction(input: UpdateExperienceInput) {
  try {
    const experience = await ExperienceService.updateExperience(input);
    revalidatePath("/admin/experiences");
    return { success: true, data: experience };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update experience",
    };
  }
}

export async function deleteExperienceAction(id: string) {
  try {
    await ExperienceService.deleteExperience(id);
    revalidatePath("/admin/experiences");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete experience",
    };
  }
}

export async function getExperienceCountAction() {
  try {
    const count = await ExperienceService.getCount();
    return { success: true, data: count };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to get experience count",
    };
  }
}
