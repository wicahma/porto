import { Database } from "./database.interface";

export type TProjectRow = Database["public"]["Tables"]["projects"]["Row"];

export interface Project extends TProjectRow {
  id: string;
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
