export interface Project {
  id: string;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  image: string;
  tags: string[];
  year: string;
  link?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  image: string;
  tags: string[];
  year: string;
  link?: string;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string;
}
