"use server";

import { ProjectService } from "@/services/project.service";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "@/interface/entities/project.interface";
import { revalidatePath } from "next/cache";

export async function getProjectsAction(page: number = 1, limit: number = 10) {
  try {
    const result = await ProjectService.getAllProjects(page, limit);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch projects",
    };
  }
}

export async function getProjectByIdAction(id: string) {
  try {
    const project = await ProjectService.getProjectById(id);
    return { success: true, data: project };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch project",
    };
  }
}

export async function createProjectAction(input: CreateProjectInput) {
  try {
    const project = await ProjectService.createProject(input);
    revalidatePath("/admin/projects");
    return { success: true, data: project };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create project",
    };
  }
}

export async function updateProjectAction(input: UpdateProjectInput) {
  try {
    const project = await ProjectService.updateProject(input);
    revalidatePath("/admin/projects");
    return { success: true, data: project };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update project",
    };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    await ProjectService.deleteProject(id);
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete project",
    };
  }
}

export async function getProjectCountAction() {
  try {
    const count = await ProjectService.getCount();
    return { success: true, data: count };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to get project count",
    };
  }
}
