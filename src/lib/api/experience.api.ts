"use server";

import { APIBaseResponse } from "@/interface/api.interface";
import { satellite } from "@/config/api.config";

const BASE_PATH = "/api/experiences";

export interface IExperienceListResponse {
  experiences: any[];
  total: number;
  page: number;
  total_pages: number;
}

export const apiGetExperiences = async (
  page = 1,
  limit = 50,
): Promise<APIBaseResponse<IExperienceListResponse>> => {
  const res = await satellite.get(`${BASE_PATH}?page=${page}&limit=${limit}`);
  return res.data;
};

export const apiGetExperienceById = async (
  id: string,
): Promise<APIBaseResponse<any>> => {
  const res = await satellite.get(`${BASE_PATH}/${id}`);
  return res.data;
};

export const apiCreateExperience = async (
  body: any,
): Promise<APIBaseResponse<any>> => {
  const res = await satellite.post(`${BASE_PATH}`, body);
  return res.data;
};

export const apiUpdateExperience = async (
  id: string,
  body: any,
): Promise<APIBaseResponse<any>> => {
  const res = await satellite.put(`${BASE_PATH}/${id}`, body);
  return res.data;
};

export const apiDeleteExperience = async (
  id: string,
): Promise<APIBaseResponse<null>> => {
  const res = await satellite.delete(`${BASE_PATH}/${id}`);
  return res.data;
};

export const apiGetExperienceCount = async (): Promise<
  APIBaseResponse<{ count: number }>
> => {
  const res = await satellite.get(`${BASE_PATH}/count`);
  return res.data;
};
