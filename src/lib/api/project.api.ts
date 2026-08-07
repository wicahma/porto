"use server";

import { APIBaseResponse } from "@/interface/api.interface";
import { satellite } from "@/config/api.config";

const BASE_PATH = "/api/projects";

export interface IProjectListResponse {
  projects: any[];
  total: number;
  page: number;
  total_pages: number;
}

export const apiGetProjects = async (
  page = 1,
  limit = 20,
): Promise<APIBaseResponse<IProjectListResponse>> => {
  const res = await satellite.get(`${BASE_PATH}?page=${page}&limit=${limit}`);
  return res.data;
};

export const apiGetProjectById = async (
  id: string,
): Promise<APIBaseResponse<any>> => {
  const res = await satellite.get(`${BASE_PATH}/${id}`);
  return res.data;
};

export const apiCreateProject = async (
  body: any,
): Promise<APIBaseResponse<any>> => {
  const res = await satellite.post(`${BASE_PATH}`, body);
  return res.data;
};

export const apiUpdateProject = async (
  id: string,
  body: any,
): Promise<APIBaseResponse<any>> => {
  const res = await satellite.put(`${BASE_PATH}/${id}`, body);
  return res.data;
};

export const apiDeleteProject = async (
  id: string,
): Promise<APIBaseResponse<null>> => {
  const res = await satellite.delete(`${BASE_PATH}/${id}`);
  return res.data;
};

export const apiGetProjectCount = async (): Promise<
  APIBaseResponse<{ count: number }>
> => {
  const res = await satellite.get(`${BASE_PATH}/count`);
  return res.data;
};
