import { clerkMiddleware } from "@clerk/nextjs/server";
import type { NextFetchEvent, NextRequest } from "next/server";

const clerkProxy = clerkMiddleware();

export function proxy(req: NextRequest, event: NextFetchEvent) {
  return clerkProxy(req, event);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
