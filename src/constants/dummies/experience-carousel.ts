export interface ExperienceCard {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  competency: string[];
  /** Company mark stored on the experience row (data URI or URL). */
  logo?: string;
  /** Optional photo used as a soft corner wash when no logo exists. */
  image?: string;
}
