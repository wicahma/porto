export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  link?: string;
}

export const projectCardData: ProjectCard[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with payment integration",
    image: "https://picsum.photos/seed/project1/600/600",
    tags: ["Next.js", "TypeScript", "Stripe"],
    year: "2025",
    link: "https://example.com",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Real-time collaborative task management application",
    image: "https://picsum.photos/seed/project2/600/600",
    tags: ["React", "Firebase", "Tailwind"],
    year: "2024",
    link: "https://example.com",
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "Modern portfolio website with stunning animations",
    image: "https://picsum.photos/seed/project3/600/600",
    tags: ["Next.js", "Framer Motion", "TypeScript"],
    year: "2024",
  },
];
