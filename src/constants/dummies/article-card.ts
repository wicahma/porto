export interface ArticleCard {
  id: string;
  image: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
}

export const articleCardData: ArticleCard[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=600&fit=crop",
    title: "Building Scalable React Applications with TypeScript",
    category: "Tech",
    date: "14.30 - Monday, January 6, 2026",
    readTime: "5 min read",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=600&fit=crop",
    title: "The Future of Web Development: AI-Powered Coding Tools",
    category: "AI",
    date: "09.15 - Wednesday, January 8, 2026",
    readTime: "8 min read",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=600&fit=crop",
    title: "Mastering Framer Motion for Stunning UI Animations",
    category: "Design",
    date: "16.45 - Thursday, January 9, 2026",
    readTime: "6 min read",
  },
];
