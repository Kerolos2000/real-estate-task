import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/", /^\/[^/]+\/units$/];

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    route instanceof RegExp ? route.test(path) : route === path
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/:path*/units"],
};
