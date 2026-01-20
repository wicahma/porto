export const env = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (globalThis.window === undefined
      ? "http://localhost:3000"
      : globalThis.window.location.origin),
  hotkeys: process.env.NEXT_PUBLIC_HOTKEYS as string,
  redirectPage: process.env.NEXT_PUBLIC_REDIRECT_PAGE as string,
  adminSecretKey: process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY as string,
  email: process.env.NEXT_PUBLIC_EMAIL as string,
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  },
};
