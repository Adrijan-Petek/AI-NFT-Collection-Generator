import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function requireUser() {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }

  return session.userId;
}

export async function resolveDbUser(clerkUserId: string) {
  const existing = await db.user.findUnique({ where: { clerkUserId } });
  if (existing) return existing;

  return db.user.create({
    data: {
      clerkUserId,
      email: `${clerkUserId}@example.local`,
      name: "AI NFT User",
    },
  });
}
