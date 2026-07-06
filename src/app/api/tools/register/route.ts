import { NextResponse } from "next/server";
import { requireUser, resolveDbUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { buildToolRegistrationPayload } from "@/lib/onchain/opensea-tool-registry";
import { registerToolSchema } from "@/lib/validations/opensea-tool";

export async function POST(req: Request) {
  const clerkUserId = await requireUser();
  const user = await resolveDbUser(clerkUserId);

  const payload = await req.json();
  const parsed = registerToolSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const registrationPayload = buildToolRegistrationPayload(parsed.data);

  await db.usageEvent.create({
    data: {
      userId: user.id,
      type: "opensea_registry_registration",
      units: 1,
      metadata: registrationPayload,
    },
  });

  return NextResponse.json({
    message:
      "Payload generated. Submit this with the OpenSea ERC-8257 tool SDK CLI flow to finalize onchain registration on Base.",
    registrationPayload,
  });
}
