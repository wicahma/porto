"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { vals } from "@/constants/val";
import { Database } from "@/interface/entities/database.interface";

export async function createClient() {
  const cookieStore = await cookies();
  const resolvedVal = await vals();

  return createServerClient<Database>(
    resolvedVal.supabase.url,
    resolvedVal.supabase.anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // noop action
          }
        },
      },
    },
  );
}
