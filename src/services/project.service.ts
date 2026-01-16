import { createClient } from "@/lib/supabase/server";
import {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from "@/interface/entities/project.interface";

export class ProjectService {
  static async getAllProjects(
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: Project[]; count: number }> {
    const supabase = await createClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("projects")
      .select("*", { count: "exact" })
      .order("year", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return { data: data as Project[], count: count || 0 };
  }

  static async getProjectById(id: string): Promise<Project | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    return data as Project;
  }

  static async createProject(input: CreateProjectInput): Promise<Project> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("projects")
      .insert(input)
      .select()
      .single();

    if (error) throw error;

    return data as Project;
  }

  static async updateProject(input: UpdateProjectInput): Promise<Project> {
    const supabase = await createClient();

    const { id, ...updateData } = input;

    const { data, error } = await supabase
      .from("projects")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Project;
  }

  static async deleteProject(id: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw error;
  }

  static async getCount(): Promise<number> {
    const supabase = await createClient();

    const { count, error } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return count || 0;
  }
}
