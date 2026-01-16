import { createServerClient } from "@supabase/ssr";
import { NextResponse, ProxyConfig, type NextRequest } from "next/server";
import { env } from "@/constants/env";

export default async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(env.supabase.url, env.supabase.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.nextUrl.pathname === "/admin/login") {
      const key = request.nextUrl.searchParams.get("key");
      if (key !== env.adminSecretKey) {
        return NextResponse.redirect(new URL("/not-found", request.url));
      }

      if (user) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }

      return supabaseResponse;
    }

    if (!user) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  return supabaseResponse;
}

export const config: ProxyConfig = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
