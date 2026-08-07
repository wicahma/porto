const ACCESS_COOKIE = "porto_access_token";
const REFRESH_COOKIE = "porto_refresh_token";

function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof document === "undefined") return;
  const isSecure = window.location.protocol === "https:";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; ${isSecure ? "Secure; " : ""}SameSite=Lax; max-age=${maxAge}`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function removeCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

export function setTokens(
  accessToken: string,
  refreshToken: string,
  accessMaxAge = 900,
): void {
  setCookie(ACCESS_COOKIE, accessToken, accessMaxAge);
  setCookie(REFRESH_COOKIE, refreshToken, 7 * 24 * 3600);
}

export function getAccessToken(): string | null {
  return getCookie(ACCESS_COOKIE);
}

export function getRefreshToken(): string | null {
  return getCookie(REFRESH_COOKIE);
}

export function clearTokens(): void {
  removeCookie(ACCESS_COOKIE);
  removeCookie(REFRESH_COOKIE);
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null;
}
