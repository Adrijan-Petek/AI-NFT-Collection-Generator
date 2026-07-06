import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser, resolveDbUser } from "@/lib/auth";
import { projectSchema } from "@/lib/validations/project";

export async function GET() {
  const clerkUserId = await requireUser();
  const user = await resolveDbUser(clerkUserId);

  const projects = await db.project.findMany({
    where: { ownerId: user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      items: { take: 1 },
    },
  });

  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  const clerkUserId = await requireUser();
  const user = await resolveDbUser(clerkUserId);

  const payload = await req.json();
  const parsed = projectSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const project = await db.project.create({
    data: {
      ownerId: user.id,
      prompt: parsed.data.prompt,
      name: parsed.data.name,
      symbol: parsed.data.symbol,
      chain: parsed.data.chain,
      size: parsed.data.size,
      resolution: parsed.data.resolution,
      imageType: parsed.data.imageType,
      animated: parsed.data.animated,
      metadataLanguage: parsed.data.metadataLanguage,
      royaltyBps: parsed.data.royaltyBps,
      mintPriceEth: parsed.data.mintPriceEth,
      mintDateISO: parsed.data.mintDateISO,
    },
  });

  return NextResponse.json({ project }, { status: 201 });
}
