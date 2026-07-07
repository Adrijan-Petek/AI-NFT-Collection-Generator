import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

async function getStats() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/admin/stats`, {
    cache: "no-store",
  });
  if (!response.ok) return null;
  return response.json();
}

export default async function AdminPage() {
  const stats = await getStats();

  return (
    <main className="min-h-screen bg-[#030712] px-6 py-8 text-white">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/20 bg-slate-200/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-200/40 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>
        <h1 className="text-3xl font-black">Admin Panel</h1>
        <div className="grid gap-4 md:grid-cols-4">
          <GlassCard><p className="text-sm text-slate-300">Users</p><p className="text-3xl font-bold">{stats?.users ?? 0}</p></GlassCard>
          <GlassCard><p className="text-sm text-slate-300">Projects</p><p className="text-3xl font-bold">{stats?.projects ?? 0}</p></GlassCard>
          <GlassCard><p className="text-sm text-slate-300">Active Subs</p><p className="text-3xl font-bold">{stats?.activeSubscriptions ?? 0}</p></GlassCard>
          <GlassCard><p className="text-sm text-slate-300">AI Units</p><p className="text-3xl font-bold">{stats?.generatedUnits ?? 0}</p></GlassCard>
        </div>
        <GlassCard>
          <h2 className="text-xl font-bold">Recent Error Logs</h2>
          <pre className="mt-3 max-h-96 overflow-auto rounded-xl bg-black/40 p-4 text-xs">
            {JSON.stringify(stats?.errors ?? [], null, 2)}
          </pre>
        </GlassCard>
      </div>
    </main>
  );
}
