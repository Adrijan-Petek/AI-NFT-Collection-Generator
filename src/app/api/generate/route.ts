import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser, resolveDbUser } from "@/lib/auth";
import { generateCollection } from "@/lib/ai/collection-engine";
import { estimateMintRevenue } from "@/lib/ai/rarity";
import { verifyWalletAccessOnBase } from "@/lib/onchain/opensea-tool-registry";

export async function POST(req: Request) {
  const clerkUserId = await requireUser();
  const user = await resolveDbUser(clerkUserId);
  const { projectId, wallet } = await req.json();

  const project = await db.project.findFirst({
    where: { id: projectId, ownerId: user.id },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (project.size > 25) {
    if (!wallet) {
      return NextResponse.json(
        {
          error:
            "Pro generation requires wallet-based onchain access. Provide wallet and satisfy NFT/token gate.",
        },
        { status: 403 },
      );
    }

    const nftContract = process.env.PRO_NFT_GATE;
    const tokenContract = process.env.PRO_TOKEN_GATE;

    const access = await verifyWalletAccessOnBase({
      wallet,
      policy: {
        nftContract:
          nftContract && nftContract !== "0x0000000000000000000000000000000000000000"
            ? (nftContract as `0x${string}`)
            : undefined,
        minNftBalance: BigInt(process.env.PRO_MIN_NFT_BALANCE ?? "1"),
        tokenContract:
          tokenContract && tokenContract !== "0x0000000000000000000000000000000000000000"
            ? (tokenContract as `0x${string}`)
            : undefined,
        minTokenBalance: BigInt(process.env.PRO_MIN_TOKEN_BALANCE ?? "0"),
      },
    });

    if (!access.allowed) {
      return NextResponse.json(
        { error: "Onchain Pro access denied", reason: access.reason },
        { status: 403 },
      );
    }
  }

  const generation = generateCollection(project.prompt, {
    chain: project.chain as "base" | "ethereum" | "polygon",
    size: project.size,
    resolution: project.resolution as "1024x1024" | "2048x2048",
    imageType: project.imageType as "png" | "svg",
    animated: project.animated,
    metadataLanguage: project.metadataLanguage,
    royaltyBps: project.royaltyBps,
    mintPriceEth: project.mintPriceEth,
    mintDateISO: project.mintDateISO,
  });

  await db.$transaction([
    db.nFTItem.deleteMany({ where: { projectId: project.id } }),
    ...generation.items.map((item) =>
      db.nFTItem.create({
        data: {
          projectId: project.id,
          tokenId: item.tokenId,
          name: item.name,
          description: item.description,
          image: item.image,
          attributes: item.attributes,
        },
      }),
    ),
    db.project.update({
      where: { id: project.id },
      data: {
        status: "READY",
        draftJson: generation.draft,
        totalGenerated: generation.items.length,
        duplicateCount: generation.duplicates.length,
        estimatedRevenue: String(
          estimateMintRevenue(project.size, project.mintPriceEth),
        ),
      },
    }),
    db.usageEvent.create({
      data: {
        userId: user.id,
        projectId: project.id,
        type: "generation",
        units: project.size,
      },
    }),
  ]);

  return NextResponse.json({
    draft: generation.draft,
    preview: generation.items.slice(0, 20),
    duplicates: generation.duplicates,
  });
}
