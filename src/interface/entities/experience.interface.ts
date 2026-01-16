export interface Experience {
  id: string;
  company: string;
  position: string;
  employment_type: string;
  description: string;
  tags: string[];
  start_date: string;
  end_date?: string;
  is_current: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateExperienceInput {
  company: string;
  position: string;
  employment_type: string;
  description: string;
  tags: string[];
  start_date: string;
  end_date?: string;
  is_current: boolean;
}

export interface UpdateExperienceInput extends Partial<CreateExperienceInput> {
  id: string;
}
