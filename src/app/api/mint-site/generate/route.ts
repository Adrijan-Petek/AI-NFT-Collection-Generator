import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser, resolveDbUser } from "@/lib/auth";
import { buildMintSiteHTML } from "@/lib/mint-site/template";

export async function POST(req: Request) {
  const clerkUserId = await requireUser();
  const user = await resolveDbUser(clerkUserId);
  const { projectId } = await req.json();

  const project = await db.project.findFirst({
    where: { id: projectId, ownerId: user.id },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const html = buildMintSiteHTML({
    collectionName: project.name,
    mintDateISO: project.mintDateISO,
    roadmap: [
      "Mint + reveal",
      "Community treasury",
      "Cross-chain holder utility",
      "Dynamic trait expansion",
    ],
    faq: [
      { q: "What wallet is supported?", a: "Any EVM wallet via RainbowKit." },
      { q: "Which chains are supported?", a: "Base, Ethereum, Polygon." },
    ],
  });

  await db.project.update({
    where: { id: project.id },
    data: { mintSiteHtml: html },
  });

  return NextResponse.json({ html });
}
