import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";

export async function POST(req: Request) {
  if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature", detail: String(error) }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;

    if (userId) {
      await db.subscription.upsert({
        where: { userId },
        update: {
          status: "active",
          plan: "PRO",
          stripeCustomerId: typeof session.customer === "string" ? session.customer : null,
          stripeSubscriptionId:
            typeof session.subscription === "string" ? session.subscription : null,
        },
        create: {
          userId,
          status: "active",
          plan: "PRO",
          stripeCustomerId: typeof session.customer === "string" ? session.customer : null,
          stripeSubscriptionId:
            typeof session.subscription === "string" ? session.subscription : null,
        },
      });

      await db.user.update({
        where: { id: userId },
        data: { plan: "PRO" },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
