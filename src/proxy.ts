import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { hasValidClerkConfig } from "@/lib/clerk";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/projects(.*)",
  "/api/generate(.*)",
  "/api/admin(.*)",
]);

const hasClerkConfig = hasValidClerkConfig();

function fallbackHandler(req: NextRequest) {
  if (isProtectedRoute(req) && req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Auth is not configured. Set Clerk environment variables." },
      { status: 503 },
    );
  }

  return NextResponse.next();
}

export function proxy(req: NextRequest, event: NextFetchEvent) {
  if (!hasClerkConfig) {
    return fallbackHandler(req);
  }

  const clerkHandler = clerkMiddleware((auth, request) => {
    if (isProtectedRoute(request)) {
      auth().protect();
    }
  });

  return clerkHandler(req, event);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};