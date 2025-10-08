export interface IExperience {
  id: string;
  startYear: number;
  endYear: number | "Present";
  company: string;
  role: string;
  description: string;
  type: "Full-time" | "Part-time" | "Freelance" | "Contract" | "Internship";
  skills: string[];
  color: string;
  logo?: string;
  achievements?: string[];
  projects?: {
    name: string;
    description: string;
  }[];
}

export interface IExperienceDetailProps {
  experienceId: string;
}
