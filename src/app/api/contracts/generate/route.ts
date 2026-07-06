import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser, resolveDbUser } from "@/lib/auth";
import { buildERC721AContract } from "@/lib/blockchain/contract-template";

function ethToWei(eth: string) {
  const value = Number(eth);
  return String(BigInt(Math.floor(value * 1e18)));
}

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

  const source = buildERC721AContract({
    collectionName: project.name,
    symbol: project.symbol,
    maxSupply: project.size,
    mintPriceWei: ethToWei(project.mintPriceEth),
    royaltyBps: project.royaltyBps,
  });

  await db.project.update({
    where: { id: project.id },
    data: { contractSource: source },
  });

  return NextResponse.json({ source });
}
