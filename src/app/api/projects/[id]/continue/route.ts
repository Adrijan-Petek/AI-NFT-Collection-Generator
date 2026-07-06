import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser, resolveDbUser } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function POST(_: Request, { params }: Params) {
  const { id } = await params;
  const clerkUserId = await requireUser();
  const user = await resolveDbUser(clerkUserId);

  const project = await db.project.findFirst({
    where: { id, ownerId: user.id },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  await db.project.update({
    where: { id: project.id },
    data: { status: "GENERATING" },
  });

  return NextResponse.json({ ok: true });
}
