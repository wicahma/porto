import { IExperience } from "@/interface/app/experience";

export const experiences: IExperience[] = [
  {
    id: "exp-01",
    startYear: 2024,
    endYear: "Present",
    company: "Tech Innovators Inc.",
    role: "Senior Frontend Developer",
    description:
      "Leading the development of next-generation web applications using React, Next.js, and TypeScript. Responsible for architecture decisions, performance optimization, and mentoring junior developers.",
    type: "Full-time",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Motion Animation",
      "CI/CD",
    ],
    color: "#3B82F6",
    achievements: [
      "Reduced page load time by 40% through optimization techniques",
      "Implemented a new component library used across 5 products",
      "Led a team of 4 developers to deliver major platform redesign",
    ],
    projects: [
      {
        name: "Company Design System",
        description:
          "Created a comprehensive design system with reusable components",
      },
      {
        name: "Customer Dashboard",
        description:
          "Built an interactive analytics dashboard with real-time data visualization",
      },
    ],
  },
  {
    id: "exp-02",
    startYear: 2022,
    endYear: 2024,
    company: "Digital Solutions Co.",
    role: "Frontend Developer",
    description:
      "Developed and maintained multiple client-facing web applications with focus on performance and accessibility. Collaborated with designers to implement pixel-perfect UI components.",
    type: "Full-time",
    skills: [
      "React",
      "JavaScript",
      "CSS",
      "GSAP",
      "Responsive Design",
      "RESTful APIs",
    ],
    color: "#10B981",
    achievements: [
      "Implemented accessibility improvements resulting in WCAG 2.1 AA compliance",
      "Built interactive data visualization components for financial dashboards",
      "Reduced build time by 50% by optimizing webpack configuration",
    ],
  },
  {
    id: "exp-03",
    startYear: 2021,
    endYear: 2022,
    company: "StartUp Vision",
    role: "UI/UX Developer",
    description:
      "Worked in an agile team to design and develop user interfaces for a SaaS product. Created interactive prototypes and implemented frontend components with animations.",
    type: "Contract",
    skills: ["Vue.js", "Figma", "SCSS", "Animation", "Prototyping"],
    color: "#F59E0B",
    achievements: [
      "Redesigned user onboarding flow, increasing conversion by 25%",
      "Created and implemented animation system for user interactions",
      "Collaborated with product team to define feature requirements",
    ],
  },
  {
    id: "exp-04",
    startYear: 2020,
    endYear: 2021,
    company: "Creative Agency",
    role: "Junior Web Developer",
    description:
      "Developed responsive websites for various clients in different industries. Worked closely with design team to bring creative concepts to life.",
    type: "Full-time",
    skills: ["HTML", "CSS", "JavaScript", "WordPress", "Responsive Design"],
    color: "#EC4899",
    achievements: [
      "Built 12+ client websites from design to deployment",
      "Implemented custom WordPress themes and plugins",
      "Optimized site performance for mobile devices",
    ],
  },
  {
    id: "exp-05",
    startYear: 2019,
    endYear: 2020,
    company: "Tech University",
    role: "Research Assistant",
    description:
      "Assisted in web application development for academic research projects. Designed and implemented data visualization tools for complex datasets.",
    type: "Part-time",
    skills: ["JavaScript", "D3.js", "Python", "Data Visualization", "Research"],
    color: "#8B5CF6",
  },
];
