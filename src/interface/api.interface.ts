export interface APIBaseResponse<T = unknown> {
  status: "success" | "error";
  message?: string;
  data?: T;
}

export interface IApiError {
  message?: string;
}
