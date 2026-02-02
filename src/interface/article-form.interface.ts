export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  tags: string;
  readTime: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
}

export interface ArticleFormState {
  isEdit: boolean;
  isLoading: boolean;
  setTitle: (value: string) => void;
  setSlug: (value: string) => void;
  setExcerpt: (value: string) => void;
  setContent: (value: string) => void;
  setCategory: (value: string) => void;
  setImage: (value: string) => void;
  setTags: (value: string) => void;
  setReadTime: (value: string) => void;
  setMetaTitle: (value: string) => void;
  setMetaDescription: (value: string) => void;
  setMetaKeywords: (value: string) => void;
  setOgImage: (value: string) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  isUploading: boolean;
}

export interface ArticleFormHandlers {
  handleTitleChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  createArticle: any;
  updateArticle: any;
}

export interface UseArticleFormHooks {
  data: ArticleFormData;
  state: ArticleFormState;
  handlers: ArticleFormHandlers;
}
