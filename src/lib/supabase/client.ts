import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/constants/env";
import { Database } from "@/interface/entities/database.interface";

export function createClient() {
  return createBrowserClient<Database>(env.supabase.url, env.supabase.anonKey);
}
