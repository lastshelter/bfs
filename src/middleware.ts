import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Strict route guardrails for admins/underwriters
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
      const role = token?.["role"];
      if (role !== "ADMIN" && role !== "UNDERWRITER") {
        if (pathname.startsWith("/api/")) {
          return new NextResponse(
            JSON.stringify({ success: false, message: "Forbidden: Access denied." }),
            { status: 403, headers: { "content-type": "application/json" } }
          );
        }
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
