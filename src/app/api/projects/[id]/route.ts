import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser, resolveDbUser } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const clerkUserId = await requireUser();
  const user = await resolveDbUser(clerkUserId);

  const project = await db.project.findFirst({
    where: { id, ownerId: user.id },
    include: { items: true },
  });

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ project });
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  const clerkUserId = await requireUser();
  const user = await resolveDbUser(clerkUserId);

  await db.project.deleteMany({ where: { id, ownerId: user.id } });
  return NextResponse.json({ ok: true });
}
