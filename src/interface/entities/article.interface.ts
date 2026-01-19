import { Database } from "./database.interface";

export type TArticleRow = Database["public"]["Tables"]["articles"]["Row"];

export interface Article extends TArticleRow {
  id: string;
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
