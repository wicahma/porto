"use server";

import { APIBaseResponse } from "@/interface/api.interface";
import { satellite } from "@/config/api.config";

const BASE_PATH = "/api/articles";

export interface IArticleListResponse {
  articles: any[];
  total: number;
  page: number;
  total_pages: number;
}

export const apiGetArticles = async (
  page = 1,
  limit = 20,
): Promise<APIBaseResponse<IArticleListResponse>> => {
  const res = await satellite.get(`${BASE_PATH}?page=${page}&limit=${limit}`);
  return res.data;
};

export const apiGetArticleById = async (
  id: string,
): Promise<APIBaseResponse<any>> => {
  const res = await satellite.get(`${BASE_PATH}/${id}`);
  return res.data;
};

export const apiGetArticleBySlug = async (
  slug: string,
): Promise<APIBaseResponse<any>> => {
  const res = await satellite.get(`${BASE_PATH}/slug/${slug}`);
  return res.data;
};

export const apiGetRelatedArticles = async (
  id: string,
  category: string,
  limit = 5,
): Promise<APIBaseResponse<any[]>> => {
  const res = await satellite.get(`${BASE_PATH}/${id}/related?limit=${limit}`, {
    params: { category },
  });
  return res.data;
};

export const apiCreateArticle = async (
  body: any,
): Promise<APIBaseResponse<any>> => {
  const res = await satellite.post(`${BASE_PATH}`, body);
  return res.data;
};

export const apiUpdateArticle = async (
  id: string,
  body: any,
): Promise<APIBaseResponse<any>> => {
  const res = await satellite.put(`${BASE_PATH}/${id}`, body);
  return res.data;
};

export const apiDeleteArticle = async (
  id: string,
): Promise<APIBaseResponse<null>> => {
  const res = await satellite.delete(`${BASE_PATH}/${id}`);
  return res.data;
};

export const apiGetArticleCount = async (): Promise<
  APIBaseResponse<{ count: number }>
> => {
  const res = await satellite.get(`${BASE_PATH}/count`);
  return res.data;
};
