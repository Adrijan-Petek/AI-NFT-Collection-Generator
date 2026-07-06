import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [users, projects, subscriptions, usage, errors] = await Promise.all([
    db.user.count(),
    db.project.count(),
    db.subscription.count({ where: { status: "active" } }),
    db.usageEvent.aggregate({ _sum: { units: true } }),
    db.errorLog.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
  ]);

  return NextResponse.json({
    users,
    projects,
    activeSubscriptions: subscriptions,
    generatedUnits: usage._sum.units ?? 0,
    errors,
  });
}
