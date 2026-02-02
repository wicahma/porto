import { createBrowserClient } from "@supabase/ssr";
import { vals } from "@/constants/val";
import { Database } from "@/interface/entities/database.interface";

export async function createClient() {
  const resolvedVal = await vals();
  return createBrowserClient<Database>(
    resolvedVal.supabase.url,
    resolvedVal.supabase.anonKey,
  );
}
