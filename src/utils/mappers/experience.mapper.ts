import { Experience } from "@/interface/entities/experience.interface";
import { ExperienceCard } from "@/constants/dummies/experience-carousel";

export const mapExperienceToCard = (experience: Experience): ExperienceCard => {
  const startDate = new Date(experience.start_date).getFullYear();
  const endDate = experience.is_current
    ? "Present"
    : experience.end_date
    ? new Date(experience.end_date).getFullYear()
    : "";

  const period = `${startDate} - ${endDate}`;

  return {
    id: experience.id,
    company: experience.company,
    role: experience.position,
    period,
    description: experience.description,
    technologies: experience.tags,
    image: undefined,
  };
};
