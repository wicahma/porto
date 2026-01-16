export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  tags: string[];
  read_time: string;
  // SEO fields
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  og_image?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateArticleInput {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  tags: string[];
  read_time: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  og_image?: string;
}

export interface UpdateArticleInput extends Partial<CreateArticleInput> {
  id: string;
}
