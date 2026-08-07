import { NextResponse, ProxyConfig, type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const adminSecretKey = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.nextUrl.pathname === "/admin/login") {
      const key = request.nextUrl.searchParams.get("key");
      if (!key || key !== adminSecretKey) {
        return NextResponse.redirect(new URL("/not-found", request.url));
      }

      const token = request.cookies.get("porto_access_token")?.value;
      if (token) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }

      return NextResponse.next();
    }

    const token = request.cookies.get("porto_access_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
