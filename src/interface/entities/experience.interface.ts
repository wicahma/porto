import { Database } from "./database.interface";

export type TExperienceRow = Database["public"]["Tables"]["experiences"]["Row"];
export type TExperienceJobRow =
  Database["public"]["Tables"]["experience_jobs"]["Row"];

export interface ExperienceJob extends TExperienceJobRow {
  id: string;
}

export interface Experience extends TExperienceRow {
  id: string;
}

export interface CreateExperienceInput {
  company: string;
  location: string;
  tags: string[];
  jobs: Omit<ExperienceJob, "id">[];
}

export interface UpdateExperienceInput extends Partial<CreateExperienceInput> {
  id: string;
}
