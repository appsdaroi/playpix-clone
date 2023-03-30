import { NextResponse } from "next/server";

export function middleware(request) {
  const protectedRoutes = ["/", "/history"];
  const authRoutes = ["/login"];

  const currentUser = request.cookies.get("id")?.value;

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
  ) {
    request.cookies.delete("id");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("id");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}