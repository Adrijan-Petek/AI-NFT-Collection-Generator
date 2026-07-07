import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: "01",
    title: "Define the collection brief",
    summary: "Describe the universe, style, supply cap, and utility.",
    detail:
      "Write freely - describe the aesthetic, lore, supply cap, trait categories, and any special rules. The engine parses intent, extracts constraints, assigns trait weights, and produces a validated strategy document ready for generation.",
  },
  {
    id: "02",
    title: "Generate and validate",
    summary: "Create traits, rarity, and preview assets with automated checks.",
    detail:
      "The pipeline builds trait combinations weighted to your rarity targets, checks every token for exact and near-duplicate matches, and assembles a preview set for your review before committing to full export.",
  },
  {
    id: "03",
    title: "Deploy and launch",
    summary: "Export metadata, contract code, and mint site for production.",
    detail:
      "Outputs include OpenSea-compatible JSON metadata, an ERC-721A Solidity contract, and a deployable Next.js mint site. Push assets to IPFS via Pinata and deploy the mint site to Vercel in minutes.",
  },
];

export default function WorkflowPage() {
  return (
    <main className="min-h-screen bg-[#07111f] px-6 py-8 text-white">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/20 bg-slate-200/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-200/40 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>

        <div>
          <p className="kicker">Process</p>
          <h1 className="mt-1.5 text-3xl font-black tracking-[-0.03em]">How It Works</h1>
          <p className="mt-2 text-sm text-slate-400">Three steps from creative brief to production launch.</p>
        </div>

        <div className="relative space-y-3">
          {/* Connector line */}
          <div className="absolute left-[1.1rem] top-10 h-[calc(100%-5rem)] w-px bg-gradient-to-b from-cyan-400/40 via-blue-500/25 to-transparent" />

          {steps.map((step) => (
            <GlassCard key={step.id} className="relative p-6">
              <div className="flex items-start gap-5">
                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/35 bg-cyan-400/10 text-sm font-black text-cyan-300">
                  {step.id}
                </span>
                <div>
                  <h2 className="text-base font-bold leading-snug text-white">{step.title}</h2>
                  <p className="mt-1 text-sm text-slate-300">{step.summary}</p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">{step.detail}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link href="/capabilities" className="text-xs text-cyan-400 hover:underline">
            View full capabilities -&gt;
          </Link>
          <Link href="/dashboard">
            <Button className="inline-flex items-center gap-2 px-5 py-2.5 text-sm">
              Open dashboard
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
