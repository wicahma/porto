import { createClient } from "@/lib/supabase/server";
import {
  Experience,
  ExperienceJob,
  CreateExperienceInput,
  UpdateExperienceInput,
} from "@/interface/entities/experience.interface";
import { calculateTotalDuration } from "@/utils/helper/date.utils";

export class ExperienceService {
  static async getAllExperiences(
    page: number = 1,
    limit: number = 50
  ): Promise<{
    data: (Experience & { jobs: ExperienceJob[] })[];
    count: number;
  }> {
    const supabase = await createClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const {
      data: experiencesData,
      error: experiencesError,
      count,
    } = await supabase
      .from("experiences")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (experiencesError) throw experiencesError;

    if (!experiencesData || experiencesData.length === 0) {
      return { data: [], count: count || 0 };
    }

    const experienceIds = experiencesData.map((exp) => exp.id);
    const { data: jobsData, error: jobsError } = await supabase
      .from("experience_jobs")
      .select("*")
      .in("experience_id", experienceIds)
      .order("start_date", { ascending: false });

    if (jobsError) throw jobsError;

    const jobsByExperience = (jobsData || []).reduce(
      (acc, job) => {
        if (!acc[job.experience_id]) {
          acc[job.experience_id] = [];
        }
        acc[job.experience_id].push(job as ExperienceJob);
        return acc;
      },
      {} as Record<string, ExperienceJob[]>
    );

    const experiences = experiencesData.map((exp) => {
      const jobs = jobsByExperience[exp.id] || [];

      const totalDuration =
        jobs.length > 0
          ? calculateTotalDuration(jobs)
          : exp.total_duration || "0 mos";

      return {
        ...exp,
        jobs,
        total_duration: totalDuration,
      };
    });

    return { data: experiences, count: count || 0 };
  }

  static async getExperienceById(
    id: string
  ): Promise<(Experience & { jobs: ExperienceJob[] }) | null> {
    const supabase = await createClient();

    const { data: experienceData, error: experienceError } = await supabase
      .from("experiences")
      .select("*")
      .eq("id", id)
      .single();

    if (experienceError) {
      if (experienceError.code === "PGRST116") return null;
      throw experienceError;
    }

    const { data: jobsData, error: jobsError } = await supabase
      .from("experience_jobs")
      .select("*")
      .eq("experience_id", id)
      .order("start_date", { ascending: false });

    if (jobsError) throw jobsError;

    const jobs = (jobsData || []) as ExperienceJob[];

    const totalDuration =
      jobs.length > 0
        ? calculateTotalDuration(jobs)
        : experienceData.total_duration || "0 mos";

    return {
      ...experienceData,
      jobs,
      total_duration: totalDuration,
    };
  }

  static async createExperience(
    input: CreateExperienceInput
  ): Promise<Experience> {
    const supabase = await createClient();

    const { jobs, ...experienceData } = input;

    const totalDuration =
      jobs && jobs.length > 0
        ? calculateTotalDuration(
            jobs.map((job) => ({
              ...job,
              id: "",
            }))
          )
        : "0 mos";

    const { data: experienceResult, error: experienceError } = await supabase
      .from("experiences")
      .insert({
        ...experienceData,
        total_duration: totalDuration,
      })
      .select()
      .single();

    if (experienceError) throw experienceError;

    if (jobs && jobs.length > 0) {
      const jobsToInsert = jobs.map((job) => ({
        ...job,
        experience_id: experienceResult.id,
      }));

      const { data: jobsResult, error: jobsError } = await supabase
        .from("experience_jobs")
        .insert(jobsToInsert)
        .select();

      if (jobsError) throw jobsError;

      return {
        ...experienceResult,
        jobs: jobsResult as ExperienceJob[],
      } as Experience;
    }

    return {
      ...experienceResult,
      jobs: [],
    } as Experience;
  }

  static async updateExperience(
    input: UpdateExperienceInput
  ): Promise<Experience> {
    const supabase = await createClient();

    const { id, jobs, ...updateData } = input;

    let totalDuration: string | undefined = undefined;
    if (jobs && jobs.length > 0) {
      totalDuration = calculateTotalDuration(
        (jobs ?? []).map((job) => ({
          position: job.position,
          employment_type: job.employment_type,
          description: job.description,
          start_date: job.start_date,
          end_date: job.end_date,
          is_current: job.is_current,
          experience_id: job.experience_id,
          id: "",
          created_at: job.created_at,
          updated_at: job.updated_at,
          competency: job.competency,
        }))
      );
    }

    const { data: experienceResult, error: experienceError } = await supabase
      .from("experiences")
      .update({
        ...updateData,
        ...(totalDuration && { total_duration: totalDuration }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (experienceError) throw experienceError;

    if (jobs && jobs.length > 0) {
      await supabase.from("experience_jobs").delete().eq("experience_id", id);

      const jobsToInsert = jobs.map((job) => ({
        ...job,
        experience_id: id,
      }));

      const { data: jobsResult, error: jobsError } = await supabase
        .from("experience_jobs")
        .insert(jobsToInsert)
        .select();

      if (jobsError) throw jobsError;

      return {
        ...experienceResult,
        jobs: jobsResult as ExperienceJob[],
      } as Experience;
    }

    const { data: existingJobs } = await supabase
      .from("experience_jobs")
      .select("*")
      .eq("experience_id", id)
      .order("start_date", { ascending: false });

    return {
      ...experienceResult,
      jobs: (existingJobs || []) as ExperienceJob[],
    } as Experience;
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
