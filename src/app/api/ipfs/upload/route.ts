import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser, resolveDbUser } from "@/lib/auth";
import { uploadJSONToIPFS } from "@/lib/ipfs/pinata";

export async function POST(req: Request) {
  const clerkUserId = await requireUser();
  const user = await resolveDbUser(clerkUserId);
  const { projectId } = await req.json();

  const project = await db.project.findFirst({
    where: { id: projectId, ownerId: user.id },
    include: { items: true },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const metadataUpload = await uploadJSONToIPFS(project.items, `${project.name}-metadata`);

  await db.project.update({
    where: { id: project.id },
    data: {
      metadataCID: metadataUpload.cid,
    },
  });

  return NextResponse.json({ metadataUpload });
}
