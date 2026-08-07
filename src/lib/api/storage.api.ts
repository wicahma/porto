"use server";

import { APIBaseResponse } from "@/interface/api.interface";
import { satellite } from "@/config/api.config";

export const apiUploadFile = async (
  folder: string,
  file: File,
): Promise<APIBaseResponse<{ path: string }>> => {
  const form = new FormData();
  form.append("folder", folder);
  form.append("file", file);
  const res = await satellite.post("/api/storage/upload", form);
  return res.data;
};

export const apiDeleteFiles = async (
  paths: string[],
): Promise<APIBaseResponse<{ message: string }>> => {
  const res = await satellite.delete("/api/storage", { data: { paths } });
  return res.data;
};
