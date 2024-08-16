import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const userToken = cookies().get("userToken")?.value || "";

  if (isPublicPath && userToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !userToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/profile", "/verifyuseremail"],
};
