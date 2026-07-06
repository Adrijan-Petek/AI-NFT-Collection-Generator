import { NextResponse } from "next/server";
import { verifyWalletAccessOnBase } from "@/lib/onchain/opensea-tool-registry";
import { accessCheckSchema } from "@/lib/validations/opensea-tool";

export async function POST(req: Request) {
  const payload = await req.json();
  const parsed = accessCheckSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const result = await verifyWalletAccessOnBase({
    wallet: parsed.data.wallet as `0x${string}`,
    policy: {
      nftContract: parsed.data.nftContract as `0x${string}` | undefined,
      minNftBalance: parsed.data.minNftBalance,
      tokenContract: parsed.data.tokenContract as `0x${string}` | undefined,
      minTokenBalance: parsed.data.minTokenBalance,
    },
  });

  return NextResponse.json(result);
}
