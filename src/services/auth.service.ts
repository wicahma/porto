import { createClient } from "@/lib/supabase/server";

export class AuthService {
  static async signInWithGithub(redirectTo?: string, captchaToken?: string) {
    const supabase = await createClient();

    const options: {
      redirectTo: string;
      queryParams?: { [key: string]: string };
    } = {
      redirectTo:
        redirectTo || `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    };

    // Add captcha token as a query parameter if provided
    if (captchaToken) {
      options.queryParams = {
        captcha_token: captchaToken,
      };
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options,
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

  static async validateAdminEmail(email: string): Promise<boolean> {
    const allowedEmail =
      process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_EMAIL;
    return email === allowedEmail;
  }
}
