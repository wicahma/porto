export interface ExperienceCard {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  image?: string;
}

export const experienceCarouselData: ExperienceCard[] = [
  {
    id: "1",
    company: "Tech Corp",
    role: "Senior Frontend Developer",
    period: "2023 - Present",
    description:
      "Leading frontend architecture and implementation for enterprise-scale applications.",
    technologies: ["React", "TypeScript", "Next.js", "TailwindCSS"],
    image: "https://picsum.photos/seed/31/768/480",
  },
  {
    id: "2",
    company: "Digital Agency",
    role: "Full Stack Developer",
    period: "2021 - 2023",
    description:
      "Built responsive web applications and collaborated with design teams.",
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "Docker"],
    image: "https://picsum.photos/seed/31/768/480",
  },
  {
    id: "3",
    company: "Startup Inc",
    role: "Frontend Developer",
    period: "2020 - 2021",
    description:
      "Developed user interfaces and improved application performance.",
    technologies: ["React", "Redux", "SASS", "Webpack"],
    image: "https://picsum.photos/seed/31/768/480",
  },
  {
    id: "4",
    company: "Creative Studio",
    role: "Web Developer",
    period: "2019 - 2020",
    description:
      "Created interactive websites and landing pages for various clients.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery"],
    image: "https://picsum.photos/seed/31/768/480",
  },
  {
    id: "5",
    company: "Innovation Lab",
    role: "Junior Developer",
    period: "2018 - 2019",
    description:
      "Assisted in developing web applications and learning best practices.",
    technologies: ["JavaScript", "Bootstrap", "Git", "REST APIs"],
  },
];
