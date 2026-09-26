export interface ProjectTableRow {
  id: string;
  title: string;
  year: number;
  tags: string[];
  link?: string;
}

export interface ProjectsPageData {
  projects: ProjectTableRow[];
  count: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  deleteId: string | null;
}

export interface ProjectsPageState {
  setDeleteId: (id: string | null) => void;
  setPage: (page: number) => void;
}

export interface ProjectsPageHandlers {
  handleDelete: () => Promise<void>;
  deleteProject: any;
}

export interface UseProjectsPageHooks {
  data: ProjectsPageData;
  state: ProjectsPageState;
  handlers: ProjectsPageHandlers;
}
