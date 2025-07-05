import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("✅ Middleware triggered:", req.nextUrl.pathname);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isTryingToAccessAdmin = req.nextUrl.pathname.startsWith("/admin");

  if (isTryingToAccessAdmin && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isTryingToAccessAdmin && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"], // ✅ untuk /admin dan turunannya
};
