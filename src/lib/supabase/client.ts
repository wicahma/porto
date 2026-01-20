import { createBrowserClient } from "@supabase/ssr";
import { vals } from "@/constants/val";
import { Database } from "@/interface/entities/database.interface";

export function createClient() {
  return createBrowserClient<Database>(
    vals.supabase.url,
    vals.supabase.anonKey,
  );
}
