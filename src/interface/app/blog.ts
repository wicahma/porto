export type TBlogCategory = {
  id: number;
  label: string;
  active: boolean;
};

export type TBlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  isNew: boolean;
  tags: string[];
  image?: string;
  content?: TBlogContent[];
  author?: {
    name: string;
    avatar?: string;
  };
};

export type TBlogContent = {
  type: "heading" | "paragraph" | "code" | "image" | "quote" | "list";
  content: string | string[];
  language?: string; // for code blocks
  alt?: string; // for images
};

export type TBlogCustom = {
  i: number;
};
