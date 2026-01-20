import {
  Experience,
  ExperienceJob,
} from "@/interface/entities/experience.interface";
import { ExperienceCard } from "@/constants/dummies/experience-carousel";
import { getNewestJob } from "@/utils/helper/date.utils";

export const mapExperienceToCard = (
  experience: Experience & { jobs: ExperienceJob[] },
): ExperienceCard => {
  const newestJob = getNewestJob(experience.jobs || []);

  const startDate = new Date(newestJob.start_date).getFullYear();
  let endDate = "Present";

  if (!newestJob.is_current && newestJob.end_date) {
    endDate = new Date(newestJob.end_date).getFullYear().toString();
  }

  const period = `${startDate} - ${endDate}`;

  return {
    id: experience.id,
    company: experience.company,
    role: newestJob.position,
    competency: newestJob.competency,
    period,
    description: newestJob.description,
    technologies: experience.tags || [],
    image: undefined,
  };
};

export const filterUniqueCompanies = (
  experiences: (Experience & { jobs: ExperienceJob[] })[],
): (Experience & { jobs: ExperienceJob[] })[] => {
  const companyMap = new Map<string, Experience & { jobs: ExperienceJob[] }>();

  experiences.forEach((exp) => {
    const existingExp = companyMap.get(exp.company);

    if (!existingExp) {
      companyMap.set(exp.company, exp);
      return;
    }

    const existingNewestJob = getNewestJob(existingExp?.jobs || []);
    const currentNewestJob = getNewestJob(exp?.jobs || []);
    const existingDate = new Date(existingNewestJob.start_date);
    const currentDate = new Date(currentNewestJob.start_date);

    if (currentDate > existingDate) {
      companyMap.set(exp.company, exp);
    }
  });

  return Array.from(companyMap.values());
};
