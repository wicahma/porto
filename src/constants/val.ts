"use server";

export const vals = async () => ({
  hotkeys: process.env.NEXT_PUBLIC_HOTKEYS as string,
  redirectPage: process.env.NEXT_PUBLIC_REDIRECT_PAGE as string,
  adminSecretKey: process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY as string,
  email: process.env.NEXT_PUBLIC_EMAIL as string,
  apiUrl:
    (process.env.NEXT_PUBLIC_API_URL as string) || "http://localhost:8080",
});
