import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/projects(.*)",
  "/api/generate(.*)",
  "/api/admin(.*)",
]);

const hasClerkConfig = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
);

const clerkHandler = clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

function fallbackHandler(req: NextRequest) {
  if (isProtectedRoute(req)) {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Auth is not configured. Set Clerk environment variables." },
        { status: 503 },
      );
    }

    const redirectUrl = new URL("/", req.url);
    redirectUrl.searchParams.set("auth", "not-configured");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export default hasClerkConfig ? clerkHandler : fallbackHandler;

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
