import axios from "axios";
import { cookies } from "next/headers";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const satellite = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

satellite.interceptors.request.use(async (config) => {
  config.headers.set("X-API-Key", process.env.API_KEY || "");
  const token = (await cookies()).get("porto_access_token")?.value;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

let refreshing: Promise<boolean> | null = null;

async function refreshTokens(): Promise<boolean> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("porto_refresh_token")?.value;
  if (!refreshToken) return false;
  try {
    const res = await refreshClient.post(
      "/api/auth/refresh",
      { refresh_token: refreshToken },
      { headers: { "X-API-Key": process.env.API_KEY || "" } },
    );
    const data = res.data?.data;
    if (!data?.access_token || !data?.refresh_token) return false;
    cookieStore.set("porto_access_token", data.access_token, {
      path: "/",
      maxAge: 900,
    });
    cookieStore.set("porto_refresh_token", data.refresh_token, {
      path: "/",
      maxAge: 7 * 24 * 3600,
    });
    return true;
  } catch {
    return false;
  }
}

satellite.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original?._retry &&
      original?.url !== "/api/auth/refresh"
    ) {
      original._retry = true;
      refreshing = refreshing || refreshTokens();
      const ok = await refreshing;
      refreshing = null;
      if (ok) {
        const token = (await cookies()).get("porto_access_token")?.value;
        original.headers.set("Authorization", `Bearer ${token}`);
        return satellite(original);
      }
    }
    return Promise.reject(error);
  },
);
