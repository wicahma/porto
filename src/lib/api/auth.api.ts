"use server";

import { APIBaseResponse } from "@/interface/api.interface";
import { satellite } from "@/config/api.config";

export const apiGetSession = async (): Promise<
  APIBaseResponse<{ user_id: string; email: string }>
> => {
  const res = await satellite.get("/api/auth/session");
  return res.data;
};

export const apiRefreshToken = async (
  refreshToken: string,
): Promise<
  APIBaseResponse<{
    access_token: string;
    refresh_token: string;
    expires_at: string;
  }>
> => {
  const res = await satellite.post("/api/auth/refresh", {
    refresh_token: refreshToken,
  });
  return res.data;
};

export const apiSignOut = async (
  refreshToken: string,
): Promise<APIBaseResponse<{ message: string }>> => {
  const res = await satellite.post("/api/auth/signout", {
    refresh_token: refreshToken,
  });
  return res.data;
};
