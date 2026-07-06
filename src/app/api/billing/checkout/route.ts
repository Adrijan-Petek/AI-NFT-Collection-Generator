import { NextResponse } from "next/server";
import { requireUser, resolveDbUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";

export async function POST() {
  const clerkUserId = await requireUser();
  const user = await resolveDbUser(clerkUserId);

  if (!stripe || !env.STRIPE_PRICE_PRO_MONTHLY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: env.STRIPE_PRICE_PRO_MONTHLY,
        quantity: 1,
      },
    ],
    success_url: `${env.NEXT_PUBLIC_APP_URL}/dashboard?upgrade=success`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing?upgrade=cancelled`,
    customer_email: user.email,
    metadata: {
      userId: user.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
