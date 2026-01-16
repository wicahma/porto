import { createClient } from "@/lib/supabase/server";
import {
  Experience,
  CreateExperienceInput,
  UpdateExperienceInput,
} from "@/interface/entities/experience.interface";

export class ExperienceService {
  static async getAllExperiences(
    page: number = 1,
    limit: number = 50
  ): Promise<{ data: Experience[]; count: number }> {
    const supabase = await createClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("experiences")
      .select("*", { count: "exact" })
      .order("start_date", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return { data: data as Experience[], count: count || 0 };
  }

  static async getExperienceById(id: string): Promise<Experience | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }

    return data as Experience;
  }

  static async createExperience(
    input: CreateExperienceInput
  ): Promise<Experience> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("experiences")
      .insert(input)
      .select()
      .single();

    if (error) throw error;

    return data as Experience;
  }

  static async updateExperience(
    input: UpdateExperienceInput
  ): Promise<Experience> {
    const supabase = await createClient();

    const { id, ...updateData } = input;

    const { data, error } = await supabase
      .from("experiences")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Experience;
  }

  static async deleteExperience(id: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from("experiences").delete().eq("id", id);

    if (error) throw error;
  }

  static async getCount(): Promise<number> {
    const supabase = await createClient();

    const { count, error } = await supabase
      .from("experiences")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return count || 0;
  }
}
