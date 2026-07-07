import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, TimerReset } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-20 md:px-6 md:pt-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(79,201,218,0.22),transparent_38%),radial-gradient(circle_at_80%_10%,rgba(232,177,79,0.23),transparent_35%),radial-gradient(circle_at_48%_90%,rgba(108,139,255,0.2),transparent_48%)]" />
      <div className="mx-auto grid w-full max-w-6xl items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal max-w-3xl space-y-7">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-100/20 bg-slate-100/10 px-4 py-1 text-sm text-cyan-100">
            <Sparkles className="h-4 w-4" />
            Enterprise-grade AI collection pipeline
          </p>
          <h1 className="text-5xl font-black leading-[1.02] text-white md:text-7xl">
            Launch premium NFT collections from a single creative brief.
          </h1>
          <p className="max-w-2xl text-lg text-slate-200 md:text-xl">
            Replace fragmented tooling with one studio for trait strategy, rarity balancing, metadata generation,
            ERC-721A contracts, and deployment-grade mint pages.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/dashboard">
              <Button className="inline-flex items-center gap-2 px-6 py-3 text-base md:text-lg">
                Open production dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#workflow">
              <Button variant="secondary" className="px-6 py-3 text-base md:text-lg">
                Review workflow
              </Button>
            </Link>
          </div>
          <div className="grid max-w-2xl gap-3 pt-2 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200/20 bg-slate-100/5 px-4 py-3">
              <p className="kicker">Scale</p>
              <p className="mt-1 text-2xl font-bold text-white">10,000</p>
              <p className="text-xs text-slate-300">NFT output / run</p>
            </div>
            <div className="rounded-xl border border-slate-200/20 bg-slate-100/5 px-4 py-3">
              <p className="kicker">Latency</p>
              <p className="mt-1 text-2xl font-bold text-white">&lt; 7 min</p>
              <p className="text-xs text-slate-300">collection blueprint</p>
            </div>
            <div className="rounded-xl border border-slate-200/20 bg-slate-100/5 px-4 py-3">
              <p className="kicker">Output</p>
              <p className="mt-1 text-2xl font-bold text-white">1 export</p>
              <p className="text-xs text-slate-300">contract + metadata + site</p>
            </div>
          </div>
        </div>

        <aside className="reveal panel w-full rounded-3xl p-6 text-white md:p-7">
          <p className="kicker">Project command center</p>
          <h2 className="mt-2 text-2xl font-bold">Cyberpunk Foxes Season I</h2>
          <p className="mt-2 text-sm text-slate-300">Primary brief parsed, constraints validated, generation queued.</p>

          <div className="mt-5 grid gap-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-200/20 bg-slate-900/35 px-4 py-3">
              <div className="flex items-center gap-2 text-slate-100">
                <TimerReset className="h-4 w-4 text-cyan-300" />
                <span className="text-sm">Trait architecture</span>
              </div>
              <span className="text-sm font-semibold text-emerald-300">Completed</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200/20 bg-slate-900/35 px-4 py-3">
              <div className="flex items-center gap-2 text-slate-100">
                <ShieldCheck className="h-4 w-4 text-cyan-300" />
                <span className="text-sm">Duplicate safeguards</span>
              </div>
              <span className="text-sm font-semibold text-emerald-300">Passed</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200/20 bg-slate-900/35 px-4 py-3">
              <div className="flex items-center gap-2 text-slate-100">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                <span className="text-sm">Metadata + contract package</span>
              </div>
              <span className="text-sm font-semibold text-amber-200">Generating</span>
            </div>

            <div className="rounded-xl border border-cyan-200/25 bg-cyan-200/10 px-4 py-3 text-sm text-cyan-100">
              Next milestone: deployable mint site with wallet connect and payment gating.
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
