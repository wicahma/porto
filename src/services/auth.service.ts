import { createClient } from "@/lib/supabase/server";

export class AuthService {
  static async signIn(email: string, password: string) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  }

  static async signOut() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  }

  static async getSession() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    return data.session;
  }

  static async getUser() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) throw error;

    return data.user;
  }
}
