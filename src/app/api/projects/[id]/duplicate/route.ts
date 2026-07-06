import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser, resolveDbUser } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function POST(_: Request, { params }: Params) {
  const { id } = await params;
  const clerkUserId = await requireUser();
  const user = await resolveDbUser(clerkUserId);

  const original = await db.project.findFirst({
    where: { id, ownerId: user.id },
  });

  if (!original) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const duplicate = await db.project.create({
    data: {
      ownerId: user.id,
      prompt: original.prompt,
      name: `${original.name} Copy`,
      symbol: original.symbol,
      chain: original.chain,
      size: original.size,
      resolution: original.resolution,
      imageType: original.imageType,
      animated: original.animated,
      metadataLanguage: original.metadataLanguage,
      royaltyBps: original.royaltyBps,
      mintPriceEth: original.mintPriceEth,
      mintDateISO: original.mintDateISO,
      draftJson: original.draftJson,
      status: "DRAFT",
    },
  });

  return NextResponse.json({ project: duplicate }, { status: 201 });
}
