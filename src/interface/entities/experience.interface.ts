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
  /** Inline logo (data URI) or an absolute URL. Empty clears the logo. */
  logo?: string | null;
  jobs: Omit<ExperienceJob, "id">[];
}

export interface UpdateExperienceInput extends Partial<CreateExperienceInput> {
  id: string;
}

/** One position held at a company, flattened for display. */
export interface ExperiencePositionSummary {
  role: string;
  period: string;
  description: string;
  competency: string[];
  isCurrent?: boolean;
}

export interface JobFormData {
  id?: string;
  position: string;
  employment_type: string;
  description: string;
  competency: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
}
