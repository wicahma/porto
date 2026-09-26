/**
 * Pagination envelope returned by every list endpoint
 * (articles, projects, experiences) — snake_case from the Go API.
 */
export interface PaginationMeta {
  total: number;
  page: number;
  total_pages: number;
}

export interface ArticleListResponse extends PaginationMeta {
  articles: any[];
}

export interface ProjectListResponse extends PaginationMeta {
  projects: any[];
}

export interface ExperienceListResponse extends PaginationMeta {
  experiences: any[];
}
