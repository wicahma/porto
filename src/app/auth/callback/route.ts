import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function validateUserEmail(supabase: any): Promise<boolean> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return false;

  const allowedEmail = process.env.ADMIN_EMAIL;
  return user.email === allowedEmail;
}

function buildRedirectUrl(
  request: Request,
  origin: string,
  next: string,
): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  if (isLocalEnv) {
    return `${origin}${next}`;
  }

  if (forwardedHost) {
    return `https://${forwardedHost}${next}`;
  }

  return `${origin}${next}`;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  const isValidEmail = await validateUserEmail(supabase);

  if (!isValidEmail) {
    await supabase.auth.signOut();
    return NextResponse.redirect(
      `${origin}/login?error=unauthorized&message=Your GitHub email is not authorized to access this admin panel`,
    );
  }

  const redirectUrl = buildRedirectUrl(request, origin, next);
  return NextResponse.redirect(redirectUrl);
}
