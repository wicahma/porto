export interface ArticlesPageData {
  articles: any[];
  count: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  deleteId: string | null;
}

export interface ArticlesPageState {
  isDeleting: boolean;
}

export interface ArticlesPageHandlers {
  setPage: (page: number) => void;
  setDeleteId: (id: string | null) => void;
  handleDelete: () => Promise<void>;
}

export interface ArticlesPageHook {
  data: ArticlesPageData;
  state: ArticlesPageState;
  handlers: ArticlesPageHandlers;
}
