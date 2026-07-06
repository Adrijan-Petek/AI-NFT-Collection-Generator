import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.35),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.25),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(239,68,68,0.25),transparent_45%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-amber-200">
            <Sparkles className="h-4 w-4" />
            AI-powered NFT launch engine
          </p>
          <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
            From one prompt to a complete 10,000 NFT collection.
          </h1>
          <p className="max-w-2xl text-lg text-slate-200">
            AI NFT Collection Generator creates concept, style, traits, rarity, metadata, IPFS-ready files, ERC-721A contract,
            and a deployable mint website in minutes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button className="inline-flex items-center gap-2 px-6 py-3 text-lg">
                Start building
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#live-demo">
              <Button variant="secondary" className="px-6 py-3 text-lg">
                See live demo
              </Button>
            </Link>
          </div>
        </div>
        <GlassCard className="w-full max-w-md space-y-4 text-white">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-200">Example prompt</p>
          <p className="text-sm text-slate-200">
            Generate 10,000 futuristic cyberpunk foxes with holographic backgrounds, laser eyes, robotic tails,
            and legendary golden helmets.
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-black/20 p-3">
              <p className="text-slate-300">Traits</p>
              <p className="font-semibold">9 categories</p>
            </div>
            <div className="rounded-xl bg-black/20 p-3">
              <p className="text-slate-300">Preview</p>
              <p className="font-semibold">20 NFTs instant</p>
            </div>
            <div className="rounded-xl bg-black/20 p-3">
              <p className="text-slate-300">Contract</p>
              <p className="font-semibold">ERC-721A ready</p>
            </div>
            <div className="rounded-xl bg-black/20 p-3">
              <p className="text-slate-300">Upload</p>
              <p className="font-semibold">IPFS one-click</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
