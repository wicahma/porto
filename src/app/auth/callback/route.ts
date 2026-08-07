import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const accessToken = searchParams.get("access_token");
  const refreshToken = searchParams.get("refresh_token");
  const error = searchParams.get("error");

  if (error) {
    const url = new URL("/admin/login", origin);
    url.searchParams.set("error", error);
    return NextResponse.redirect(url);
  }

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(
      new URL("/admin/login?error=no_token", origin),
    );
  }

  const response = NextResponse.redirect(new URL("/admin/dashboard", origin));
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set("porto_access_token", accessToken, {
    path: "/",
    maxAge: 900,
    httpOnly: false,
    sameSite: "lax",
    secure,
  });
  response.cookies.set("porto_refresh_token", refreshToken, {
    path: "/",
    maxAge: 7 * 24 * 3600,
    httpOnly: true,
    sameSite: "lax",
    secure,
  });

  return response;
}
