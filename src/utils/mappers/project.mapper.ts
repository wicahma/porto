import { Project } from "@/interface/entities/project.interface";

export interface ProjectUI {
  id: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  link?: string;
  image: string;
}

export const mapProjectToUI = (project: Project): ProjectUI => {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    year: project.year,
    tags: project.tags,
    link: project.link,
    image: project.image,
  };
};
